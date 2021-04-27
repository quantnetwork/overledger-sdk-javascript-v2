import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

describe('Dlt', () => {
    test('Can construct the DLT', () => {
        const mockAddress = 'mo54poo7oLL5LvHEYwhDmYdCpqvx7j3Ks2';
        const mockPrivateKey = 'cNmsFjPqWCaVdhbPoHQJqDpayYdtKR9Qo81KVAEMHJwmgRVJZjDu';

        const sdkOptions = {
            dlts: [{ dlt: DltNameOptions.BITCOIN },],
        };

        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.BITCOIN].setAccount({
            privateKey: mockPrivateKey,
            address: mockAddress,
        },);

        expect(sdk.dlts[DltNameOptions.BITCOIN].name).toEqual(DltNameOptions.BITCOIN);
        expect(sdk.dlts[DltNameOptions.BITCOIN].account.privateKey).toEqual(mockPrivateKey);
    });
});
