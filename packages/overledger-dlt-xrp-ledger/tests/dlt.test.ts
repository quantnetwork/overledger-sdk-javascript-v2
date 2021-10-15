import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

describe('Dlt', () => {
    test('Can construct the DLT', () => {
        const mockAddress = 'rJ9qPMfCdFFpvXDYxjEcWDRPabNBYKkm3M'
        const mockSeed = 'ssy454BXBNCGmeUnqB3zvnG56ArCm';
        const mockPrivateKeyVersionOfSeed = '000FEA7F693B30168E216DA364DC45A0D6D18E0D84AFC1A2D4C9150BC8CA688B2A';
        const sdkOptions = {
            dlts: [{ dlt: DltNameOptions.XRP_LEDGER },],
        };

        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.XRP_LEDGER].setAccount({
            privateKey: mockSeed,
            address: mockAddress,
        },);

        expect(sdk.dlts[DltNameOptions.XRP_LEDGER].name).toEqual(DltNameOptions.XRP_LEDGER);
        expect(sdk.dlts[DltNameOptions.XRP_LEDGER].account.privateKey).toEqual(mockPrivateKeyVersionOfSeed);
    });
});
