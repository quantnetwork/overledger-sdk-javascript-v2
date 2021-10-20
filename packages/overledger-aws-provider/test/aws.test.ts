import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';
//const path = require('path');
//const thisPath = path.resolve(__dirname, '../../../.env');
//console.log("thisPath: " + thisPath);
//require('dotenv-flow').config({ path: thisPath });

describe('Aws', () => {

    test('Can get tokens using client ID and client secret', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Clean exit from token test");
        } else {
            console.log("Running full token test");
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
            // id token is variable in length but must have at least 3 sections split by .
            expect(typeof refreshTokensResponse.idToken).toBe('string');
            expect(refreshTokensResponse.idToken.length).toBeGreaterThan(4);
            expect(refreshTokensResponse.idToken.split(".").length).toEqual(3);
        }

    });

});
