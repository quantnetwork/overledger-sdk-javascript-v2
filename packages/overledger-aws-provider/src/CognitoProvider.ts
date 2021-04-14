
import log4js from 'log4js';
import { RefreshTokensResponse } from '@quantnetwork/overledger-types';
import CognitoUserImpl from './CognitoUserImpl';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

/**
 * @memberof module:overledger-provider
 */
const log = log4js.getLogger('CognitoProvider');
log.level = "info";

class CognitoProvider {
    POOL_ID: string;

    constructor(userPoolID: string) {
        this.POOL_ID = userPoolID;
    }

    public async getNewSetOfTokens(username: string, password: string, client_id: string, clientsecret: string): Promise<RefreshTokensResponse> {
        let AmazonCognitoIdentity = require('amazon-cognito-identity-js');

        let userPool = new AmazonCognitoIdentity.CognitoUserPool({
            UserPoolId: this.POOL_ID, // your user pool id here
            ClientId: client_id // your client id here
        });

        let cognitoUser = new CognitoUserImpl(username, userPool, clientsecret);

        let authenticationData = {
            Username: username,
            Password: password,
        };
        let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

        log.info("Starting to get new tokens from aws cognito.");

        return new Promise<CognitoUserSession>(async (resolve) => {
            await cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    resolve(result);
                },
                onFailure: function (err) {
                    log.error(JSON.stringify(err, null, 2));
                },
            });
        }).then((response) => {
            log.info("Successfully got the response from aws cognito.");
            return {
                accessToken: response.getAccessToken().getJwtToken(),
                refreshToken: response.getRefreshToken().getToken(),
                idToken: response.getIdToken().getJwtToken(),
            };
        });;
    }
}
export default CognitoProvider;
