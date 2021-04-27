import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

describe('Dlt', () => {
    test('Can construct the DLT', () => {
        const mockAddress = 'rJ9qPMfCdFFpvXDYxjEcWDRPabNBYKkm3M'
        const mockPrivateKey = 'ssy454BXBNCGmeUnqB3zvnG56ArCm';

        const sdkOptions = {
            dlts: [{ dlt: DltNameOptions.XRP_LEDGER },],
        };
      
        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.XRP_LEDGER].setAccount({
            privateKey: mockPrivateKey,
            address: mockAddress,
        },);

        expect(sdk.dlts[DltNameOptions.XRP_LEDGER].name).toEqual(DltNameOptions.XRP_LEDGER);
        expect(sdk.dlts[DltNameOptions.XRP_LEDGER].account.privateKey).toEqual(mockPrivateKey);
    });
});
