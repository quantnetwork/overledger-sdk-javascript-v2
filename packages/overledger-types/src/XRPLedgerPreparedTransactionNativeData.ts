import XRPLedgerPreparedPayment from "./XRPLedgerPreparedPayment";
import XRPLedgerPreparedInstructions from "./XRPLedgerPreparedInstructions";

/**
 * @memberof module:overledger-types
 */
type XRPLedgerPreparedTransactionNativeData = {

  address: string,
  payment: XRPLedgerPreparedPayment,
  instructions: XRPLedgerPreparedInstructions,
};

export default XRPLedgerPreparedTransactionNativeData;
