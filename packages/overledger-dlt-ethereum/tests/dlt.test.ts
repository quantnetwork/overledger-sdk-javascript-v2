import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

const mockAddress = '0x93Cdb71c0De6700706D61C8eE0BcF8eE1cedb17d';
const mockPrivateKey = '0xe352ad01a835ec50ba301ed7ffb305555cbf3b635082af140b3864f8e3e443d3';
const sdkOptions = {
    dlts: [{ dlt: DltNameOptions.ETHEREUM },],
};

describe('Dlt', () => {
    test('Can construct the DLT', () => {

        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.ETHEREUM].setAccount({
            privateKey: mockPrivateKey,
            address: mockAddress,
        },);

        expect(sdk.dlts[DltNameOptions.ETHEREUM].name).toEqual(DltNameOptions.ETHEREUM);
        expect(sdk.dlts[DltNameOptions.ETHEREUM].account.privateKey).toEqual(mockPrivateKey);
    });

    test('Can sign a transaction', async () => {

        const sdk = new OverledgerSDK(sdkOptions);
        sdk.dlts[DltNameOptions.ETHEREUM].setAccount({
            privateKey: mockPrivateKey,
            address: mockAddress,
        },);

        const ethPreparedTransaction = require('./resources/ethereum-prepared-transaction.json');
        let signedTransaction = (await sdk.sign(DltNameOptions.ETHEREUM, ethPreparedTransaction)).signedTransaction;
        expect(signedTransaction).toEqual("0x02f889031985174876e80085174876e81482537894fd218e9a20400535ffaa8fae54d07d375b3a38278609184e72a000974f564c205472616e73616374696f6e204d657373616765c001a0240117c3c9584dde1ab630ece2eb4b0337a31420961ffa57ef90488c2232596ca03f67e961aae17f9ef92ebbceb3690ec021b0a37164a763b1782cde41a581cc58");

    });
});
