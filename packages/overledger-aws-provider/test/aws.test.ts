import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

describe('Integration Tests:', () => {

    beforeAll(async() => {
        var start = new Date().getTime();
        while (new Date().getTime() < start + 1000);
      },1000);

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
                userPoolID: process.env.USER_POOL_ID, //your userpool id
                provider: { network: process.env.NETWORK }
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
                dlts: [{ dlt: DltNameOptions.BITCOIN },
                { dlt: DltNameOptions.ETHEREUM },
                { dlt: DltNameOptions.XRP_LEDGER }],
                userPoolID: process.env.USER_POOL_ID, //your userpool id
                provider: { network: process.env.NETWORK }
            });
            const refreshTokensResponse1 = await overledger.getTokensUsingClientIdAndSecret(process.env.USER_NAME, process.env.PASSWORD,
                process.env.CLIENT_ID, process.env.CLIENT_SECRET);
            const refreshTokensResponse2 = await overledger.refreshAccessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET, refreshTokensResponse1.refreshToken);
            // access token is variable in length but must have at least 3 sections split by .
            expect(typeof refreshTokensResponse2.accessToken).toBe('string');
            expect(refreshTokensResponse2.accessToken.length).toBeGreaterThan(4);
            expect(refreshTokensResponse2.accessToken.split(".").length).toEqual(3);
            // id token is variable in length but must have at least 3 sections split by .
            expect(typeof refreshTokensResponse2.idToken).toBe('string');
            expect(refreshTokensResponse2.idToken.length).toBeGreaterThan(4);
            expect(refreshTokensResponse2.idToken.split(".").length).toEqual(3);
            // upon refresh, token will be given an expiry
            expect(typeof refreshTokensResponse2.expiresIn).toBe('number');
            expect(refreshTokensResponse2.expiresIn).toBeGreaterThan(0);
            // upon refresh, token type given will be Bearer
            expect(refreshTokensResponse2.tokenType).toEqual('Bearer');
        }

    });

});
