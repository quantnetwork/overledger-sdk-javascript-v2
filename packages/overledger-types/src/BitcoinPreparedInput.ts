/**
 */

/**
 * @memberof module:overledger-types
 */
type BitcoinPreparedInput = {
  hash: string,
  index: number,
  rawTransaction: string,
  scriptPubKey: string,
  value: number,
};

export default BitcoinPreparedInput;
