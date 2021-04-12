
import log4js from 'log4js';
import { RefreshTokensResponse } from '@quantnetwork/overledger-types';
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

    public async performSRPAuthentication(username: string, password: string, client_id: string): Promise<RefreshTokensResponse> {
        let AmazonCognitoIdentity = require('amazon-cognito-identity-js');

        let userPool = new AmazonCognitoIdentity.CognitoUserPool({
            UserPoolId: this.POOL_ID, // your user pool id here
            ClientId: client_id // your client id here
        });

        let cognitoUser = new AmazonCognitoIdentity.CognitoUser({
            Username: username, // your username here
            Pool: userPool
        });


        let authenticationData = {
            Username: username,
            Password: password,
        };
        let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

        log.info("Starting to get new tokens from aws cognito.");
        return new Promise<CognitoUserSession>(async (resolve, reject) => {
            await cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    resolve(result);
                },
                onFailure: function (err) {
                    log.error(err);
                    reject(err);
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
