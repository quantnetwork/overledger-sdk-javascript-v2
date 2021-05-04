/**
 */

/**
 * @memberof module:overledger-types
 */
type BitcoinPreparedInput = {
  transactionHash: string,
  vout: string,
  rawTransaction: string,
  address: string,
};

export default BitcoinPreparedInput;
