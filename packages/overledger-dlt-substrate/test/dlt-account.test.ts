import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

const mockSeed = 'circle umbrella admit renew length shrimp dinosaur ivory eternal trend remain cradle';
const sdkOptions = {
    dlts: [{ dlt: DltNameOptions.SUBSTRATE },],
};
describe('Unit Tests:', () => {

    beforeAll(async() => {
        var start = new Date().getTime();
        while (new Date().getTime() < start + 1000);
      },1000);
    
    test('Can construct the DLT', () => {

        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.SUBSTRATE].setAccount({
            privateKey: mockSeed,
        },);

        expect(sdk.dlts[DltNameOptions.SUBSTRATE].name).toEqual(DltNameOptions.SUBSTRATE);
        expect(sdk.dlts[DltNameOptions.SUBSTRATE].account.privateKey).toEqual(mockSeed);
    });

    // test('Can create an account', async () => {
    //
    //     const sdk = new OverledgerSDK(sdkOptions);
    //     const account = await sdk.dlts[DltNameOptions.BITCOIN].createAccount();
    //
    //     expect(typeof account.privateKey).toBe('string');
    //     expect(account.privateKey.length).toEqual(52);
    //     expect(typeof account.address).toBe('string');
    //     expect(account.address.length).toEqual(34);
    //     expect(typeof account.publicKey).toBe('string');
    //     expect(account.publicKey.length).toEqual(66);
    //     expect(typeof account.password).toBe('string');
    //     expect(account.password.length).toEqual(0);
    //     expect(typeof account.provider).toBe('string');
    //     expect(account.provider.length).toEqual(0);
    // });

    test('Can sign a transaction', async () => {


        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.BITCOIN].setAccount({
            privateKey: mockSeed,
        },);

        const substratePreparedTransaction = require('./resources/substrate-prepared-transaction.json');
        let signedTransaction = (await sdk.sign(DltNameOptions.SUBSTRATE, substratePreparedTransaction)).signedTransaction;
        expect(signedTransaction).toEqual("02000000017dd10c997c0ec2dedd3396ecd2ce82c899ca6b3140fbd405da2b6582a1596a22010000006b483045022100d5d88a4586fa97823495492ed738de7356a5e0f3ddc46efb44e7715d5ca595ca02205f4718f53a4f477de65dc732b07ffe3632c6d4606b740450c1157d0c4cf1adc0012103c8edf6e94319f2b0bb251fa5df8ba4ffbda9343857c36d961d8048ab0a04af54ffffffff030a000000000000001976a9148c202dc31b453e900cc7c14c17dd852ac517a50488acda250000000000001976a91488121d06d124b59a4cfc85baf73d681c73ee7ed688ac0000000000000000196a174f564c205472616e73616374696f6e204d65737361676500000000");

    });

});
