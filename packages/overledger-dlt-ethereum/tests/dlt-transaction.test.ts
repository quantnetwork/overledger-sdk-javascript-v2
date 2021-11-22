import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

const mockAddress = '0xb619bca484d0247D88281dAF4ad62Aba666E4A8f';
const mockPrivateKey = '0x0070999c7d2b8cf84db93ac1075ef99af3df7f59be22a7b5339fc9867c8bbf25';
const sdkOptions = {
    dlts: [{ dlt: DltNameOptions.ETHEREUM },],
};

describe('Integration Tests:', () => {

    beforeAll(async() => {
        var start = new Date().getTime();
        while (new Date().getTime() < start + 1000);
      },1000);
    
    test('Can construct the DLT', () => {

        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.ETHEREUM].setAccount({
            privateKey: mockPrivateKey,
            address: mockAddress,
        },);

        expect(sdk.dlts[DltNameOptions.ETHEREUM].name).toEqual(DltNameOptions.ETHEREUM);
        expect(sdk.dlts[DltNameOptions.ETHEREUM].account.privateKey).toEqual(mockPrivateKey);
    });

    test('Can get payment transaction', async () => {

    });

    test('Standardised payment transaction and native transaction align', async () => {

    });

    test('Can get smart contract invoke transaction', async () => {

    });

    test('Standardised smart contract invoke transaction and native transaction align', async () => {

    });

    test('Can get smart contract create transaction', async () => {

    });

    test('Standardised smart contract create transaction and native transaction align', async () => {

    });

});
