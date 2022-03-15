/**
 * @memberof module:overledger-types
 */

type SubstratePreparedTransactionNativeDataHexMetaData = {
  address: string,
  blockHash: string,
  blockNumber: string,
  era: string,
  genesisHash: string,
  metadataRpc: string,
  method: string,
  nonce: string,
  signedExtensions: object,
  specVersion: string,
  tip: string,
  transactionVersion: string,
  version: string,
};

export default SubstratePreparedTransactionNativeDataHexMetaData;
