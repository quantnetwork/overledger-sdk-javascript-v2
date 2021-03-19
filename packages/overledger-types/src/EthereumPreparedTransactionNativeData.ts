/**
 */

/**
 * @memberof module:overledger-types
 */
type EthereumPreparedTransactionNativeData = {
  nonce: BigInteger,
  chainId: BigInteger,
  toAddress: string,
  gas: string,
  gasPrice: string,
  value: string,
  data: string,
};

export default EthereumPreparedTransactionNativeData;
