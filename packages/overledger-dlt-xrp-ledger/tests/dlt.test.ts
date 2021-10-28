import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

const mockAddress = 'rJ9qPMfCdFFpvXDYxjEcWDRPabNBYKkm3M'
const mockSeed = 'ssy454BXBNCGmeUnqB3zvnG56ArCm';
const sdkOptions = {
    dlts: [{ dlt: DltNameOptions.XRP_LEDGER },],
};

describe('Unit Tests:', () => {
    test('Can construct the DLT', () => {

        const mockPrivateKeyVersionOfSeed = '000FEA7F693B30168E216DA364DC45A0D6D18E0D84AFC1A2D4C9150BC8CA688B2A';

        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.XRP_LEDGER].setAccount({
            privateKey: mockSeed,
            address: mockAddress,
        },);

        expect(sdk.dlts[DltNameOptions.XRP_LEDGER].name).toEqual(DltNameOptions.XRP_LEDGER);
        expect(sdk.dlts[DltNameOptions.XRP_LEDGER].account.privateKey).toEqual(mockPrivateKeyVersionOfSeed);
    });

    test('Can create an account', async () => {

        const sdk = new OverledgerSDK(sdkOptions);
        const account = await sdk.dlts[DltNameOptions.XRP_LEDGER].createAccount();

        expect(typeof account.privateKey).toBe('string');
        expect(account.privateKey.length).toEqual(29);
        expect(typeof account.address).toBe('string');
        // between 25-35 characters: https://support.uphold.com/hc/en-us/articles/360000879426-How-do-I-send-XRP-from-my-Uphold-account-to-an-external-XRP-ledger-address-
        expect(account.address.length).toBeGreaterThanOrEqual(25);
        expect(account.address.length).toBeLessThanOrEqual(35);
        expect(typeof account.publicKey).toBe('string');
        expect(account.publicKey.length).toEqual(66);
        expect(typeof account.password).toBe('string');
        expect(account.password.length).toEqual(0);
        expect(typeof account.provider).toBe('string');
        expect(account.provider.length).toEqual(0);
    });

    test('Can sign a transaction', async () => {
        const mockSeed2 = "sswERuW1KWEwMXF6VFpRY72PxfC9b";
        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.XRP_LEDGER].setAccount({
            privateKey: mockSeed2,
            address: mockAddress,
        },);

        const xrpPreparedTransaction = require('./resources/xrp-ledger-prepared-transaction.json');
        let signedTransaction = (await sdk.sign(DltNameOptions.XRP_LEDGER, xrpPreparedTransaction)).signedTransaction;
        expect(signedTransaction).toEqual("120000240000023C201B7FFFFFFF6140000000000F424068400000000000000C732102C89001A0430915E7B04CDA19C6017E2B15F9357785A1CBDF63272737002CA36874463044022050B5042F7B2C6B46619DD8459AC3B15A7438B5AC47F57D5E0331272038AEDA2B02205F1CBCF90E379B9405E536C55C660277996372440CCD35199FDDA1B9686119C7811425D805136F5ADD815575F2AB8E49432876602AA58314CE324CF16ECAE2966CDE652726E922FFA2A1B0BDF9EA7D11323520414B343753203639343230363636E1F1");

    });
});
