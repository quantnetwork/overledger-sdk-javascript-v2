import log4js from 'log4js';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import CognitoUserSession from 'amazon-cognito-identity-js/lib/CognitoUserSession';
import BigInteger from 'amazon-cognito-identity-js/lib/BigInteger';
import util from 'aws-sdk/lib/util';
import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';

const log = log4js.getLogger('CognitoProvider');
log.level = 'info';

class CognitoUserImpl {

  username: string;
  pool: AmazonCognitoIdentity.CognitoUserPool;
  authenticationFlowType: string;
  secretKey: string;
  client: CognitoIdentityServiceProvider;
  session: AmazonCognitoIdentity.CognitoUserSession;
  signInUserSession: CognitoUserSession;

  constructor(username: string, pool: AmazonCognitoIdentity.CognitoUserPool, secretKey: string) {
    this.username = username;
    this.pool = pool;

    this.authenticationFlowType = 'USER_SRP_AUTH';

    this.client = new CognitoIdentityServiceProvider({
      apiVersion: '2016-04-19',
      region: this.pool.getUserPoolId().split('_')[0],
      endpoint: `https://cognito-idp. ${this.pool.getUserPoolId().split('_')[0]}.amazonaws.com/`,
    });
    this.secretKey = secretKey;
    this.session = null;
    this.signInUserSession = null;
  }

  public async authenticateUser(authDetails: AmazonCognitoIdentity.AuthenticationDetails, callback: any): Promise<AmazonCognitoIdentity.CognitoUserSession> {
    const amazonCognitoIdentity = require('amazon-cognito-identity-js');
    const authenticationHelper = new amazonCognitoIdentity.AuthenticationHelper(this.pool.getUserPoolId().split('_')[1]);
    const dateHelper = new amazonCognitoIdentity.DateHelper();

    let serverBValue;
    let salt;
    let secretHash;

    return await authenticationHelper.getLargeAValue((errOnAValue, aValue) => {
      // getLargeAValue callback start
      if (errOnAValue) {
        callback.onFailure(errOnAValue);
      }

      if (this.secretKey != null) {
        secretHash = this.calculateSecretHash(this.pool.getClientId(), this.secretKey, this.username);
      }

      const authParameters = {
        USERNAME: this.username,
        SRP_A: aValue.toString(16),
        SECRET_HASH: secretHash,
      };

      const jsonReq = {
        AuthFlow: this.authenticationFlowType,
        ClientId: this.pool.getClientId(),
        AuthParameters: authParameters,
        ClientMetadata: authDetails.getValidationData(),
      };

      this.client.makeUnauthenticatedRequest('initiateAuth', jsonReq, (err, initiateAuthResult) => {
        if (err) {
          callback.onFailure(err);
        }

        const challengeParameters = initiateAuthResult.ChallengeParameters;

        this.username = challengeParameters.USER_ID_FOR_SRP;
        serverBValue = new BigInteger(challengeParameters.SRP_B, 16);
        salt = new BigInteger(challengeParameters.SALT, 16);

        authenticationHelper.getPasswordAuthenticationKey(this.username, authDetails.getPassword(), serverBValue, salt, (errOnHkdf, hkdf) => {
          // getPasswordAuthenticationKey callback start
          if (errOnHkdf) {
            callback.onFailure(errOnHkdf);
          }

          const dateNow = dateHelper.getNowString();
          const signatureString = util.crypto.hmac(
              hkdf,
              util.buffer.concat([
                new util.Buffer(this.pool.getUserPoolId().split('_')[1], 'utf8'),
                new util.Buffer(this.username, 'utf8'),
                new util.Buffer(challengeParameters.SECRET_BLOCK, 'base64'),
                new util.Buffer(dateNow, 'utf8')]),
              'base64',
              'sha256');

          const challengeResponses = {
            USERNAME: this.username,
            PASSWORD_CLAIM_SECRET_BLOCK: challengeParameters.SECRET_BLOCK,
            TIMESTAMP: dateNow,
            PASSWORD_CLAIM_SIGNATURE: signatureString,
            SECRET_HASH: authParameters.SECRET_HASH,
          };

          const respondToAuthChallenge = (challenge, challengeCallback) =>
            this.client.makeUnauthenticatedRequest('respondToAuthChallenge', challenge, (errChallenge, dataChallenge) => {
              return challengeCallback(errChallenge, dataChallenge);
            });

          const jsonReqResp = {
            ChallengeName: 'PASSWORD_VERIFIER',
            ClientId: this.pool.getClientId(),
            ChallengeResponses: challengeResponses,
            Session: initiateAuthResult.Session,
          };

          respondToAuthChallenge(jsonReqResp, (errAuthenticate, dataAuthenticate) => {
            if (errAuthenticate) {
              callback.onFailure(errAuthenticate);
            } else {
              return this.authenticateUserInternal(dataAuthenticate, callback);
            }
          });
          return undefined;
        });
        return undefined;
      });
    // getLargeAValue callback end
    });
  }

  private calculateSecretHash(clientId: string, secretKey: string, userName: string): string {
    const crypto = require('crypto');
    const result = crypto.createHmac('SHA256', secretKey)
      .update(userName + clientId)
      .digest('base64');
    return result;
  }

  authenticateUserInternal(dataAuthenticate, callback: any): AmazonCognitoIdentity.CognitoUserSession {
    this.signInUserSession = this.getCognitoUserSession(dataAuthenticate.AuthenticationResult);

    const newDeviceMetadata = dataAuthenticate.AuthenticationResult.NewDeviceMetadata;
    if (newDeviceMetadata == null) {
      return callback.onSuccess(this.signInUserSession);
    }
    return undefined;
  }

    /**
     * This is used to build a user session from tokens retrieved in the authentication result
     * @param {object} authResult Successful auth response from server.
     * @returns {CognitoUserSession} The new user session.
     * @private
     */
  private getCognitoUserSession(authResult): AmazonCognitoIdentity.CognitoUserSession {
    const idToken = new AmazonCognitoIdentity.CognitoIdToken(authResult);
    const accessToken = new AmazonCognitoIdentity.CognitoAccessToken(authResult);
    const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken(authResult);

    const sessionData = {
      IdToken: idToken,
      AccessToken: accessToken,
      RefreshToken: refreshToken,
    };
    return new AmazonCognitoIdentity.CognitoUserSession(sessionData);
  }
}

export default CognitoUserImpl;
