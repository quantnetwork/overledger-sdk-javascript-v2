import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

const mockAddress = 'mo54poo7oLL5LvHEYwhDmYdCpqvx7j3Ks2';
const mockPrivateKey = 'cNmsFjPqWCaVdhbPoHQJqDpayYdtKR9Qo81KVAEMHJwmgRVJZjDu';
const sdkOptions = {
    dlts: [{ dlt: DltNameOptions.BITCOIN },],
};
describe('Dlt', () => {

    test('Can create an account', async () => {

        const sdk = new OverledgerSDK(sdkOptions);
        const account = await sdk.dlts[DltNameOptions.BITCOIN].createAccount();

        expect(typeof account.privateKey).toBe('string');
        expect(account.privateKey.length).toEqual(52);
        expect(typeof account.address).toBe('string');
        expect(account.address.length).toEqual(34);
        expect(typeof account.publicKey).toBe('string');
        expect(account.publicKey.length).toEqual(66);
        expect(typeof account.password).toBe('string');
        expect(account.password.length).toEqual(0);
        expect(typeof account.provider).toBe('string');
        expect(account.provider.length).toEqual(0);
    });

});
