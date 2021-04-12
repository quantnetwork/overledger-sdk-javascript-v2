//NOTE: Please create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE.
//Run: secure-env .env -s mySecretPassword
//You will then get a .env.enc file created in your project root directory. You can delete the .env file after this to prevent stealing.
//pass in the password in OverledgerSdk
//

//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
//TODO: Following example will need to be modified once we have the OAuth2 in place, i am hardcoding the authorization header value with the v1 values
//TODO: this is because we don't have yet a proper api gateway with v2 stuff in place and working perfectly....
//TODO: this example is simply to show we can connect somewhere and do something, in this case connect to v1 and get sequence
//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------

; (async () => {
  try {
    // Connect to overledger and choose which distributed ledgers to use:
    const overledger = new OverledgerSDK({
      dlts: [{ dlt: DltNameOptions.BITCOIN }, { dlt: DltNameOptions.ETHEREUM }, { dlt: DltNameOptions.XRP_LEDGER }],
      provider: { network: 'http://api.devnet.overledger.io/v1' },
      envPassword: 'password',
    });

    let request = {
      echo: "echo"
    }
    console.log("************Ethereum connector************");
    // Get the address sequences.
    const ethereumSequenceRequest = await overledger.dlts.ethereum.getEcho(request, "network.quant.devnet:quantbpikey");
    console.log(JSON.stringify(ethereumSequenceRequest.data, null, 2));

    console.log("************XRP Ledger connector************");
    const xrpSequenceRequest = await overledger.dlts["xrp-ledger"].getEcho(request, "network.quant.devnet:quantbpikey");
    console.log(JSON.stringify(xrpSequenceRequest.data, null, 2));

  } catch (e) {
    console.error('error:', e);
  }
})();
