/**
 */

import BitcoinPreparedInput from "./BitcoinPreparedInput";
import BitcoinPreparedOutput from "./BitcoinPreparedOutput";

/**
 * @memberof module:overledger-types
 */
type BitcoinPreparedTransactionNativeData = {
    data: string,
    inputs: BitcoinPreparedInput[],
    outputs: BitcoinPreparedOutput[],
    fee: string,
};

export default BitcoinPreparedTransactionNativeData;