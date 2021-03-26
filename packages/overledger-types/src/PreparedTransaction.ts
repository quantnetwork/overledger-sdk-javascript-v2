import EthereumPreparedTransactionNativeData from "./EthereumPreparedTransactionNativeData";
import XRPLedgerPreparedTransactionNativeData from "./XRPLedgerPreparedTransactionNativeData";

/**
 */

/**
 * @memberof module:overledger-types
 */
type PreparedTransaction = {
  requestId: string,
  gatewayFee: BigInteger,
  gatewayFeeUnit: string,
  nativeData: EthereumPreparedTransactionNativeData | XRPLedgerPreparedTransactionNativeData,  //if you are adding a new native data type, use |, e.g. EthereumPreparedTransactionNativeData||BitcoinPreparedTransactionNativeData
};

export default PreparedTransaction;