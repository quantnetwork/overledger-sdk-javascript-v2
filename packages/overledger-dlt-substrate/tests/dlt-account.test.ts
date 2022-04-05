import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

const mockSeed = 'circle umbrella admit renew length shrimp dinosaur ivory eternal trend remain cradle';
const sdkOptions = {
    dlts: [{ dlt: DltNameOptions.SUBSTRATE },],
    provider: { network: 'westend' },
};
describe('Unit Tests:', () => {

    beforeAll(async() => {
        var start = new Date().getTime();
        while (new Date().getTime() < start + 1000);
      },1000);
    
    test('Can construct the DLT', () => {

        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.SUBSTRATE].setAccount({
            secret: mockSeed,
            address: 'test',
        });

        expect(sdk.dlts[DltNameOptions.SUBSTRATE].name).toEqual(DltNameOptions.SUBSTRATE);
        expect(sdk.dlts[DltNameOptions.SUBSTRATE].account.secret).toEqual(mockSeed);
    });

     test('Can create an account', async () => {
    
         const sdk = new OverledgerSDK(sdkOptions);
         const account = await sdk.dlts[DltNameOptions.SUBSTRATE].createAccount();
    
         expect(typeof account.secret).toBe('string');
         expect(account.secret.length).toBeGreaterThan(30);
         expect(typeof account.address).toBe('string');
         expect(account.address.length).toEqual(48);
         expect(typeof account.publicKey).toBe('string');
         expect(account.publicKey.length).toEqual(66);
         expect(typeof account.password).toBe('string');
         expect(account.password.length).toEqual(0);
         expect(typeof account.provider).toBe('string');
         expect(account.provider.length).toEqual(0);
     });

    test('Can sign a transaction', async () => {


        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.SUBSTRATE].setAccount({
                                                          secret: mockSeed,
                                                          address: 'test',
                                                      });

        const substratePreparedTransaction = require('./resources/substrate-prepared-transaction.json');
        let signedTransaction = (await sdk.sign(DltNameOptions.SUBSTRATE, substratePreparedTransaction)).signedTransaction;
        expect(signedTransaction).toContain("0x390284009ed163c421d103b589f0d1fbe6973a02f47d777ae7e92e2517ad600cf8845f1d01");

    });

});
