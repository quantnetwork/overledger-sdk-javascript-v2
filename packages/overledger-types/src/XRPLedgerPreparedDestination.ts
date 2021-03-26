import XRPLedgerPreparedAmount from "./XRPLedgerPreparedAmount";

/**
 * @memberof module:overledger-types
 */
type XRPLedgerPreparedDestination = {

  address: string,
  minAmount: XRPLedgerPreparedAmount,
};

export default XRPLedgerPreparedDestination;
