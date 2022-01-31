
// NOTE: Please create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE.
// Run: secure-env .env -s mySecretPassword
// You will then get a .env.enc file created in your project root directory. You can delete the .env file after this to prevent stealing.
// pass in the password of the .env.enc file in OverledgerSDK and copy the .env.enc file to this folder
// 

// NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;

; (async () => {
  try {
    // Paste the requestId and signedTransaction output from the preparation-example.js here
    const executeTransactionRequest = {
      requestId: '',
      signed: '',
    };

    if (executeTransactionRequest.requestId === '' || executeTransactionRequest.signed === '') {
      throw new Error('Run preparation-example.js first and paste the requestId and transactionSigned output into execution-example.js');
    }

    const overledger = new OverledgerSDK({
      dlts: [{ dlt: DltNameOptions.BITCOIN },
      { dlt: DltNameOptions.ETHEREUM },
      { dlt: DltNameOptions.XRP_LEDGER }],
      userPoolID: 'us-east-1_xfjNg5Nv9', // your userpool id
      provider: { network: 'https://api.sandbox.overledger.io/v2' },
      envFilePassword: 'password',
    });

    // Set dlt accounts
    overledger.dlts[DltNameOptions.BITCOIN].setAccount({
      privateKey: process.env.PARTY_A_BITCOIN_PRIVATE_KEY,
    });
    overledger.dlts[DltNameOptions.ETHEREUM].setAccount({
      privateKey: process.env.PARTY_A_ETHEREUM_PRIVATE_KEY,
    });
    overledger.dlts[DltNameOptions.XRP_LEDGER].setAccount({
      privateKey: process.env.PARTY_A_XRP_LEDGER_PRIVATE_KEY,
    });

    // Get required token
    const refreshTokensResponse = await overledger.getTokensUsingClientIdAndSecret(process.env.USER_NAME, process.env.PASSWORD,
      process.env.CLIENT_ID, process.env.CLIENT_SECRET);
    console.log('accessToken:\n', refreshTokensResponse.accessToken);
    console.log('refreshToken:\n', refreshTokensResponse.refreshToken);
    console.log('idToken:\n', refreshTokensResponse.idToken);

    // Create request
    const overledgerInstance = overledger.provider.createRequest(
      refreshTokensResponse.accessToken.toString(),
    );

    // Submit the signed transaction to Overledger
    const overledgerResponse = await overledgerInstance.post(
      "/execution/transaction",
      executeTransactionRequest,
    );

    console.log("\n\nOverledgerResponse: " + JSON.stringify(overledgerResponse.data));

  } catch (e) {
    console.error('error', e);
  }
})();

