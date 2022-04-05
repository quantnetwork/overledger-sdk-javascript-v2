
//NOTE: Please create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE.
//Run: secure-env .env -s mySecretPassword
//You will then get a .env.enc file created in your project root directory. You can delete the .env file after this to prevent stealing.
//pass in the password of the .env.enc file in OverledgerSDK and copy the .env.enc file to this folder
//

const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
// Importing an example preparedTransaction from the Overledger Preparation API
const preparedTransaction = require('./xrp-ledger-prepared-transaction.json');
// Constructing the Overledger library
const overledger = new OverledgerSDK({
    dlts: [{ dlt: DltNameOptions.XRP_LEDGER }],
    provider: { network: 'testnet' },
    envFilePassword: 'password'
});
// Setting our private key from the encrypted .env file
overledger.dlts[DltNameOptions.XRP_LEDGER].setAccount({secret: process.env.PARTY_A_XRP_LEDGER_SECRET});
// Wraping the main function in an async block to be able to call the sign function
; (async () => {
    try {
        // Signing the prepared transaction
        let signedTransaction = (await overledger.sign(DltNameOptions.XRP_LEDGER, preparedTransaction)).signedTransaction;
        // Building the Overledger Execution API request
        let executeTransactionRequest = {
            requestId: preparedTransaction.requestId,
            signed: signedTransaction
        }

        console.log('Overledger Transaction Execution Request: \n' + JSON.stringify(executeTransactionRequest, null, 2));
    
    } catch (e) {
        console.error('error', e);
    }
})();