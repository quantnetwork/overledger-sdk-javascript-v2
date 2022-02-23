import EthereumPreparedTransactionNativeData from './EthereumPreparedTransactionNativeData';
import BitcoinPreparedTransactionNativeData from './BitcoinPreparedTransactionNativeData';
import XRPLedgerPreparedTransactionNativeData from './XRPLedgerPreparedTransactionNativeData';
import SubstratePreparedTransactionNativeData from './SubstratePreparedTransactionNativeData';


/**
 */

/**
 * @memberof module:overledger-types
 */
type PreparedTransaction = {
  requestId: string,
  gatewayFee: BigInteger,
  gatewayFeeUnit: string,
  nativeData: EthereumPreparedTransactionNativeData |
    BitcoinPreparedTransactionNativeData |
    XRPLedgerPreparedTransactionNativeData |
    SubstratePreparedTransactionNativeData, // If you are adding a new native data type, use ||, e.g. EthereumPreparedTransactionNativeData||BitcoinPreparedTransactionNativeData
};

export default PreparedTransaction;
