
import log4js from 'log4js';
import { RefreshTokensResponse } from '@quantnetwork/overledger-types';
import CognitoUserImpl from './CognitoUserImpl';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

/**
 * @memberof module:overledger-provider
 */
const log = log4js.getLogger('CognitoProvider');
log.level = 'info';

class CognitoProvider {
  POOL_ID: string;

  constructor(userPoolID: string) {
    this.POOL_ID = userPoolID;
  }

  public async getNewSetOfTokens(username: string, password: string, clientId: string, clientsecret: string): Promise<RefreshTokensResponse> {
    const amazonCognitoIdentity = require('amazon-cognito-identity-js');

    const userPool = new amazonCognitoIdentity.CognitoUserPool({
      UserPoolId: this.POOL_ID, // your user pool id here
      ClientId: clientId, // your client id here
    });

    const cognitoUser = new CognitoUserImpl(username, userPool, clientsecret);

    const authenticationData = {
      Username: username,
      Password: password,
    };

    const authenticationDetails = new amazonCognitoIdentity.AuthenticationDetails(authenticationData);

    log.info('Starting to get new tokens from aws cognito.');

    return new Promise<CognitoUserSession>(async (resolve) => {
      await cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess(result) {
          resolve(result);
        },
        onFailure(err) {
          log.error(JSON.stringify(err, null, 2));
        },
      });
    }).then((response) => {
      log.info('Successfully got the response from aws cognito.');
      return {
        accessToken: response.getAccessToken().getJwtToken(),
        refreshToken: response.getRefreshToken().getToken(),
        idToken: response.getIdToken().getJwtToken(),
      };
    });
  }
}
export default CognitoProvider;
