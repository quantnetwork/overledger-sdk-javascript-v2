import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

const mockAddress = '0xb619bca484d0247D88281dAF4ad62Aba666E4A8f';
const mockPrivateKey = '0x0070999c7d2b8cf84db93ac1075ef99af3df7f59be22a7b5339fc9867c8bbf25';
const sdkOptions = {
    dlts: [{ dlt: DltNameOptions.ETHEREUM },],
};

describe('Unit Tests:', () => {

    beforeAll(async() => {
        jest.setTimeout(10000);
      });
    
    test('Can construct the DLT', () => {

        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.ETHEREUM].setAccount({
            privateKey: mockPrivateKey,
            address: mockAddress,
        },);

        expect(sdk.dlts[DltNameOptions.ETHEREUM].name).toEqual(DltNameOptions.ETHEREUM);
        expect(sdk.dlts[DltNameOptions.ETHEREUM].account.privateKey).toEqual(mockPrivateKey);
    });

    test('Can create an account', async () => {

        const sdk = new OverledgerSDK(sdkOptions);
        const account = await sdk.dlts[DltNameOptions.ETHEREUM].createAccount();

        expect(typeof account.privateKey).toBe('string');
        expect(account.privateKey.length).toEqual(66);
        expect(typeof account.address).toBe('string');
        expect(account.address.length).toEqual(42);
        expect(typeof account.publicKey).toBe('string');
        expect(account.publicKey.length).toEqual(0);
        expect(typeof account.password).toBe('string');
        expect(account.password.length).toEqual(0);
        expect(typeof account.provider).toBe('string');
        expect(account.provider.length).toEqual(0);
    });

    test('Can sign a london upgrade transaction (eip1559 transaction type 2)', async () => {

        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.ETHEREUM].setAccount({
            privateKey: mockPrivateKey,
            address: mockAddress,
        },);

        const ethPreparedTransaction = require('./resources/ethereum-prepared-transaction.json');
        let signedTransaction = (await sdk.sign(DltNameOptions.ETHEREUM, ethPreparedTransaction)).signedTransaction;
        expect(signedTransaction).toEqual("0x02f889031985174876e80085174876e81482537894fd218e9a20400535ffaa8fae54d07d375b3a38278609184e72a000974f564c205472616e73616374696f6e204d657373616765c001a053b8d4131d64c39958505d489b35ce4a71b98e9ebc33b8ab4165396e006f90c8a063d3167741da1309d4048ec6af33d3a85f4992c1a2564fbe13284a5798a92cae");

    });

    test('Can sign a legacy transaction (transaction type 0)', async () => {

        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.ETHEREUM].setAccount({
            privateKey: mockPrivateKey,
            address: mockAddress,
        },);

        const ethPreparedTransaction = require('./resources/ethereum-prepared-transaction-legacy.json');
        let signedTransaction = (await sdk.sign(DltNameOptions.ETHEREUM, ethPreparedTransaction)).signedTransaction;
        expect(signedTransaction).toEqual("0xf87f82049785012a05f2008263c494b3ea4d180f31b4000f2fbcc58a085ef2ffd5a76385e8d4a5100094000000323520414b34375320363934323036363629a083dab32421b966ab6900a022df55c082dc2b1f9bdd3fb4d2cb461e17192756b9a07b026d7bdc6ef6df44310ea73d9d26c6b9fa928a02caa5bf8cf2c0b3027aca9c");

    });
});
