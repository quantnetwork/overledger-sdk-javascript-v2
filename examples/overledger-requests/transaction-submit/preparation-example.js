
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
    // Change the index to set the selected dlt (Bitcoin = 0, Ethereum = 1, XRP Ledger = 2)
    const index = 0;

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

    // Create request object with the correct location
    const overledgerRequestLocations = [
      {
        location: {
          technology: "Bitcoin",
          network: "Testnet",
        },
      },
      {
        location: {
          technology: "Ethereum",
          network: "Ropsten Testnet",
        },
      },
      {
        location: {
          technology: "XRP Ledger",
          network: "Testnet",
        },
      },
    ];

    let bitcoinOrigin;
    if (index === 0) {
      // Check the bitcoin funding transaction
      const overledgerTransactionSearchResponse = await overledgerInstance.post(
        `/autoexecution/search/transaction?transactionId=${process.env.PARTY_A_BITCOIN_FUNDING_TX}`,
        overledgerRequestLocations[0],
      );
      // Loop over UTXOs in the funding transaction and wait for a match to the users Bitcoin address
      let count = 0;
      const bitcoinTxDestinations =
        overledgerTransactionSearchResponse.data
          .executionTransactionSearchResponse.transaction.destination.length;
      let destination;
      while (count < bitcoinTxDestinations) {
        destination =
          overledgerTransactionSearchResponse.data
            .executionTransactionSearchResponse.transaction.destination[count];
        if (destination.destinationId == process.env.PARTY_A_BITCOIN_ADDRESS) {
          bitcoinOrigin = `${process.env.PARTY_A_BITCOIN_FUNDING_TX}:${count.toString()}`;
        }
        count += 1;
      }
      if (!bitcoinOrigin) {
        throw new Error(
          "The providing bitcoin funding transaction does not have a transaction output assigned to your Bitcoin address. Please recheck the provided bitcoinTx.",
        );
      }
    }

    // Set the origins. Recall that Account based DLT origins are accountIds,
    // whereas UTXO based DLT origins are transactionIds:TransactionOutputIndex (hence the search for the bitcoin origin above)
    const overledgerOriginAddresses = [
      bitcoinOrigin,
      process.env.PARTY_A_ETHEREUM_ADDRESS,
      process.env.PARTY_A_XRP_LEDGER_ADDRESS,
    ]

    // Setting the minimal amount of each main protocol token (BTC, ETH, XRP) on each DLT network
    const overledgerAmounts = ["0.00001", "0.000000000000000001", "0.00001"];
    const overledgerUnits = ["BTC", "ETH", "XRP"];

    // Create random addresses to send tokens to
    const bitcoinAccount = await overledger.dlts.bitcoin.createAccount();
    const ethAccount = await overledger.dlts.ethereum.createAccount();
    const xrpAccount = await overledger.dlts["xrp-ledger"].createAccount();

    // Setting array of destination addresses
    const overledgerDestinationAddresses = [
      bitcoinAccount.address,
      ethAccount.address,
      xrpAccount.address,
    ]

    // Format the transaction request
    const prepareTransactionRequest = {
      type: "PAYMENT",
      location: {
        technology: overledgerRequestLocations[index].location.technology,
        network: overledgerRequestLocations[index].location.network,
      },
      urgency: "normal",
      requestDetails: {
        overledgerSigningType: "overledger-javascript-library",
        message: "OVL Message Example",
        origin: [
          {
            originId: overledgerOriginAddresses[index],
          },
        ],
        destination: [
          {
            destinationId: overledgerDestinationAddresses[index],
            payment: {
              amount: overledgerAmounts[index],
              unit: overledgerUnits[index],
            },
          },
        ],
      },
    };

    // Send the standardised transaction to Overledger to prepare the native data stucture
    const overledgerResponse = await overledgerInstance.post(
      "/preparation/transaction",
      prepareTransactionRequest,
    );

    console.log("\n\nOverledgerResponse: " + JSON.stringify(overledgerResponse.data));

    // Sign the native transaction
    const overledgerResponse2 = await overledger.sign(
      overledgerRequestLocations[index].location.technology.replace(/\s+/g, '-').toLowerCase(),
      overledgerResponse.data,
    );

    console.log("\n\nOverledgerResponse: " + JSON.stringify(overledgerResponse2));

  } catch (e) {
    console.error('error', e);
  }
})();

