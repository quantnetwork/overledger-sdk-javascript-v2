//NOTE: Please create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE.
//Run: secure-env .env -s mySecretPassword
//You will then get a .env.enc file created in your project root directory. You can delete the .env file after this to prevent stealing.
//pass in the password of the .env.enc file in OverledgerSDK and copy the .env.enc file to this folder
//

//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;

; (async () => {
    try {
        const overledger = new OverledgerSDK({
            dlts: [{ dlt: DltNameOptions.BITCOIN },
            { dlt: DltNameOptions.ETHEREUM },
            { dlt: DltNameOptions.XRP_LEDGER },
            { dlt: DltNameOptions.SUBSTRATE }
            ],
            provider: { network: 'testnet' },
            envFilePassword: 'password',
        });
        
        const bitcoinAccount = await overledger.dlts.bitcoin.createAccount();
        console.log('Bitcoin account:\n', bitcoinAccount);
        console.log("");

        const ethAccount = await overledger.dlts.ethereum.createAccount();
        console.log('Ethereum account:\n', ethAccount);
        console.log("");

        const subAccount = await overledger.dlts.substrate.createAccount();
        console.log('Substrate account:\n', subAccount);
        console.log("");

        const xrpAccount = await overledger.dlts["xrp-ledger"].createAccount();
        console.log('XRP ledger account:\n', xrpAccount);
        console.log("");
    } catch (e) {
        console.error('error', e);
    }
})();
