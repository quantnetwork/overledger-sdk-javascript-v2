import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

describe('Dlt', () => {
    test('Can construct the DLT', () => {
        const mockAddress = '0x93Cdb71c0De6700706D61C8eE0BcF8eE1cedb17d';
        const mockPrivateKey = '0xac47bab8ad27c796f6080eeec866ef93c2d4b344e2b0b188af6980292505594a';

        const sdkOptions = {
            dlts: [{ dlt: DltNameOptions.ETHEREUM },],
        };

        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.ETHEREUM].setAccount({
            privateKey: mockPrivateKey,
            address: mockAddress,
        },);

        expect(sdk.dlts[DltNameOptions.ETHEREUM].name).toEqual(DltNameOptions.ETHEREUM);
        expect(sdk.dlts[DltNameOptions.ETHEREUM].account.privateKey).toEqual(mockPrivateKey);
    });
});
