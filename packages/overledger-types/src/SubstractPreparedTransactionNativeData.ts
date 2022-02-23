/**
 * @memberof module:overledger-types
 */

import {u32, Text} from "@polkadot/types";

type SubstractPreparedTransactionNativeData = {
  value: string,
  dest: string,
  runtimeVersion: {
    specVersion: u32,
    transactionVersion: u32,
    specName: Text
  }
  nonce: u32,
  blockhash: BigInteger,
  blockNumber: string,
  genesisHash: string,
  metadataRpc: Object,
};

export default SubstractPreparedTransactionNativeData;
