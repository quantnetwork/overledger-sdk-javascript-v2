import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

// adapted from overledger-aws-provider tests
describe('Integration Tests:', () => {

    beforeAll(async () => {
        var start = new Date().getTime();
        while (new Date().getTime() < start + 1000);
    }, 1000);

    test('Can get tokens using client ID and client secret', async () => {
        jest.setTimeout(7500);
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
                provider: { network: 'https://auth.overledger.io/', timeout: 7500 }
            });
            const refreshTokensResponse = await overledger.getTokensUsingClientIdAndSecret(
                process.env.USER_NAME,
                process.env.PASSWORD,
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
            );
            // access token is variable in length but must have at least 3 sections split by .
            expect(typeof refreshTokensResponse.accessToken).toBe('string');
            expect(refreshTokensResponse.accessToken.length).toBeGreaterThan(4);
            expect(refreshTokensResponse.accessToken.split(".").length).toEqual(3);
            expect(typeof refreshTokensResponse.refreshToken).toBe('string');
            expect(refreshTokensResponse.refreshToken).toEqual('');
            expect(typeof refreshTokensResponse.idToken).toBe('string');
            expect(refreshTokensResponse.idToken).toEqual('');
            expect(typeof refreshTokensResponse.expiresIn).toBe('number');
            expect(refreshTokensResponse.expiresIn).toBeGreaterThan(0);
            expect(typeof refreshTokensResponse.tokenType).toBe('string');
            expect(refreshTokensResponse.tokenType).toEqual('Bearer');
        }
    });
});
