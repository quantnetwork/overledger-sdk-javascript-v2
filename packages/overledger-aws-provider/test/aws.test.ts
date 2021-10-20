import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

let refreshToken = "";

describe('Integration Tests:', () => {

    test('Can get tokens using client ID and client secret', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Clean exit from token test 1");
        } else {
            console.log("Running full token test 1");
            //run tests using github secrets - see github repo
            const overledger = new OverledgerSDK({
                dlts: [{ dlt: DltNameOptions.BITCOIN },
                { dlt: DltNameOptions.ETHEREUM },
                { dlt: DltNameOptions.XRP_LEDGER }],
                userPoolID: 'us-east-1_xfjNg5Nv9', //your userpool id
                provider: { network: 'https://auth.overledger.io/' }
            });
            const refreshTokensResponse = await overledger.getTokensUsingClientIdAndSecret(process.env.USER_NAME, process.env.PASSWORD,
                process.env.CLIENT_ID, process.env.CLIENT_SECRET);
            // access token is variable in length but must have at least 3 sections split by .
            expect(typeof refreshTokensResponse.accessToken).toBe('string');
            expect(refreshTokensResponse.accessToken.length).toBeGreaterThan(4);
            expect(refreshTokensResponse.accessToken.split(".").length).toEqual(3);
            // refresh token is variable in length but must have at least 3 sections split by .
            expect(typeof refreshTokensResponse.refreshToken).toBe('string');
            expect(refreshTokensResponse.refreshToken.length).toBeGreaterThan(4);
            expect(refreshTokensResponse.refreshToken.split(".").length).toBeGreaterThanOrEqual(3);
            refreshToken = refreshTokensResponse.refreshToken;
            // id token is variable in length but must have at least 3 sections split by .
            expect(typeof refreshTokensResponse.idToken).toBe('string');
            expect(refreshTokensResponse.idToken.length).toBeGreaterThan(4);
            expect(refreshTokensResponse.idToken.split(".").length).toEqual(3);
        }

    });

    test('Can refresh access token', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Clean exit from token test 2");
        } else {
            console.log("Running full token test 2");
            //run tests using github secrets - see github repo
            const overledger = new OverledgerSDK({
                dlts: [{ dlt: DltNameOptions.BITCOIN }, { dlt: DltNameOptions.ETHEREUM }, { dlt: DltNameOptions.XRP_LEDGER }],
                provider: { network: 'https://auth.overledger.io/' },
            });
            const response = await overledger.refreshAccessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET, refreshToken);
    
            // access token is variable in length but must have at least 3 sections split by .
            expect(typeof response.data.accessToken).toBe('string');
            expect(response.data.accessToken.length).toBeGreaterThan(4);
            expect(response.data.accessToken.split(".").length).toEqual(3);
            // id token is variable in length but must have at least 3 sections split by .
            expect(typeof response.data.idToken).toBe('string');
            expect(response.data.idToken.length).toBeGreaterThan(4);
            expect(response.data.idToken.split(".").length).toEqual(3);
        }

    });

});
