const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
// Importing an example preparedTransaction from the Overledger Preparation API
const preparedTransaction = require('./ethereum-prepared-transaction.json');
// Constructing the Overledger library
const overledger = new OverledgerSDK({
    dlts: [{ dlt: DltNameOptions.ETHEREUM }],
    provider: { network: 'testnet' },
    envFilePassword: 'password'
});
// Setting our private key from the encrypted .env file
overledger.dlts[DltNameOptions.ETHEREUM].setAccount({privateKey: process.env.PARTY_A_ETHEREUM_PRIVATE_KEY});
// Wraping the main function in an async block to be able to call the sign function
; (async () => {
    try {
        // Signing the prepared transaction
        let signedTransaction = (await overledger.sign(DltNameOptions.ETHEREUM, preparedTransaction)).signedTransaction;
        // Building the Overledger Execution API request
        let executeTransactionRequest = {
            requestId: preparedTransaction.requestId,
            signed: signedTransaction
        }

        console.log('Overleder Transaction Execution Request: \n' + JSON.stringify(executeTransactionRequest, null, 2));

    } catch (e) {
        console.error('error', e);
    }
})();