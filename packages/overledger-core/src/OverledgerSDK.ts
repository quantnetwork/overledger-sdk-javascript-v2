import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';

/**
 * **
 * @memberof module:overledger-core
 */
class OverledgerSDK {
    /**
     * The object storing the DLTs loaded by the Overledger SDK
     */
    dlts: { [key: string]: AbstractDLT } = {};

}

export default OverledgerSDK;

