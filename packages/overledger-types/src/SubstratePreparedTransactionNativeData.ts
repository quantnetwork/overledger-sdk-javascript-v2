/**
 * @memberof module:overledger-types
 */


type SubstratePreparedTransactionNativeData = {
  value: string,
  dest: string,
  runtimeVersion: {
    specVersion: number,
    transactionVersion: number,
    specName
  }
  nonce: any,
  blockHash: string,
  blockNumber: string,
  genesisHash: string,
  metadata,
};

export default SubstratePreparedTransactionNativeData;
