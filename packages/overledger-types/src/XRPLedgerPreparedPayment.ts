import XRPLedgerPreparedMemos from "./XRPLedgerPreparedMemos";
import XRPLedgerPreparedSource from "./XRPLedgerPreparedSource";
import XRPLedgerPreparedDestination from "./XRPLedgerPreparedDestination";

/**
 * @memberof module:overledger-types
 */
type XRPLedgerPreparedPayment = {

  source: XRPLedgerPreparedSource,
  destination: XRPLedgerPreparedDestination,
  memos: XRPLedgerPreparedMemos,
};

export default XRPLedgerPreparedPayment;
