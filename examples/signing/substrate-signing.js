
//NOTE: Please create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE.
//Run: secure-env .env -s mySecretPassword
//You will then get a .env.enc file created in your project root directory. You can delete the .env file after this to prevent stealing.
//pass in the password of the .env.enc file in OverledgerSDK and copy the .env.enc file to this folder
//

const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const ApiPromise =  require('@polkadot/api/promise').ApiPromise;

// Importing an example preparedTransaction from the Overledger Preparation API
const preparedTransaction = require('./substrate-prepared-transaction.json');
// Constructing the Overledger library
const overledger = new OverledgerSDK({
    dlts: [{ dlt: DltNameOptions.SUBSTRATE }],
    provider: { network: 'testnet' },
    envFilePassword: 'password'
});
// Setting our private key from the encrypted .env file
overledger.dlts[DltNameOptions.SUBSTRATE].setAccount({secret: 'will tenant method tobacco salt thing pill clump boat throw someone other'}); // You can load a mnemonic from .env instead
// Wraping the main function in an async block to be able to call the sign function
(async () => {
    try {
        // Signing the prepared transaction
        let signedTransaction = (await overledger.sign(DltNameOptions.SUBSTRATE, preparedTransaction)).signedTransaction;
        // Building the Overledger Execution API request
        let executeTransactionRequest = {
            requestId: preparedTransaction.requestId,
            signed: signedTransaction
        };

        console.log('Overledger Transaction Execution Request: \n' + JSON.stringify(executeTransactionRequest, null, 2));
    
     //   const tx = await ApiPromise.tx(signedTransaction);
       // console.log('tx is: ' + JSON.stringify(tx));

    } catch (e) {
        console.error('error', e);
    }
})();
