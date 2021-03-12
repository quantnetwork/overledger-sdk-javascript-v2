import Dlt from '../src';
import OverledgerSDK from '@quantnetwork/overledger-core';

describe('Dlt', () => {
  test('Can construct the DLT', () => {
    const mappId = 'mockMappId';
    const bpiKey = 'mockBpiKey';
    const mockPrivateKey = '0x9b28cc593f9847c085635d05200be8a68a4ea6836c6918e6ef5659ca993ab72b';

    const sdkOptions = {
      dlts: [
        { dlt: 'ethereum' },
      ],
    };

    const sdk = new OverledgerSDK(mappId, bpiKey, sdkOptions);
    sdk.dlts.ethereum.setAccount({privateKey: mockPrivateKey});

    expect(sdk.dlts.ethereum.name).toEqual('ethereum');
    expect(sdk.dlts.ethereum.account.privateKey).toEqual(mockPrivateKey);
  });
});
