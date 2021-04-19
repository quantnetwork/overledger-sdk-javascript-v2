import XRPLedgerPreparedMemos from './XRPLedgerPreparedMemos';

/**
 * @memberof module:overledger-types
 */
type XRPLedgerPreparedTransactionNativeData = {

  transactionType: string,
  account: string,
  destination: string,
  amount: string,
  flags: string,
  memos: XRPLedgerPreparedMemos,
  lastLedgerSequence: BigInteger,
  fee: string,
  sequence: BigInteger,
};

export default XRPLedgerPreparedTransactionNativeData;
