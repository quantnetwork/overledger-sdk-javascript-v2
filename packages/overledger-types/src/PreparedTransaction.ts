import EthereumPreparedTransactionNativeData from "./EthereumPreparedTransactionNativeData";
import BitcoinPreparedTransactionNativeData from "./BitcoinPreparedTransactionNativeData";
/**
 */

/**
 * @memberof module:overledger-types
 */
type PreparedTransaction = {
  requestId: string,
  gatewayFee: BigInteger,
  gatewayFeeUnit: string,
  nativeData: EthereumPreparedTransactionNativeData | BitcoinPreparedTransactionNativeData,  //if you are adding a new native data type, use ||, e.g. EthereumPreparedTransactionNativeData||BitcoinPreparedTransactionNativeData
};

export default PreparedTransaction;