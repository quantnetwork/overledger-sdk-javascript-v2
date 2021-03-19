
/**
 */

/**
 * @memberof module:overledger-types
 */
type PreparedTransaction = {
  requestId: string,
  gatewayFee: BigInteger,
  gatewayFeeUnit: string,
  nativeData: Object,
};

export default PreparedTransaction;