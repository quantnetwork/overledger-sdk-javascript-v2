import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';
//const path = require('path');
//const thisPath = path.resolve(__dirname, '../../../.env');
//console.log("thisPath: " + thisPath);
//require('dotenv-flow').config({ path: thisPath });

describe('Aws', () => {

    test('Can get tokens using client ID and client secret', async () => {

        const overledger = new OverledgerSDK({
            dlts: [{ dlt: DltNameOptions.BITCOIN },
            { dlt: DltNameOptions.ETHEREUM },
            { dlt: DltNameOptions.XRP_LEDGER }],
            userPoolID: 'us-east-1_xfjNg5Nv9', //your userpool id
            provider: { network: 'https://auth.overledger.io/' },
            envFilePassword: 'password',
        });

        const refreshTokensResponse = await overledger.getTokensUsingClientIdAndSecret(process.env.USER_NAME, process.env.PASSWORD,
            process.env.CLIENT_ID, process.env.CLIENT_SECRET);

        expect(typeof refreshTokensResponse.accessToken).toBe('string');
        //expect(account.privateKey.length).toEqual(52);
        expect(typeof refreshTokensResponse.refreshToken).toBe('string');
        //expect(account.address.length).toEqual(34);
        expect(typeof refreshTokensResponse.idToken).toBe('string');
        //expect(account.publicKey.length).toEqual(66);
        //expect(typeof account.password).toBe('string');
        //expect(account.password.length).toEqual(0);
        //expect(typeof account.provider).toBe('string');
        //expect(account.provider.length).toEqual(0);
    });

});
