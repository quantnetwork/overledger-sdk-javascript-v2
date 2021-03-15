//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
//TODO: Following example will need to be modified once we have the OAuth2 in place, i am hardcoding the authorization header value with the v1 values
//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------

; (async () => {
  try {
    // Connect to overledger and choose which distributed ledgers to use:
    const overledger = new OverledgerSDK({
      dlts: [{ dlt: DltNameOptions.BITCOIN }, { dlt: DltNameOptions.ETHEREUM }, { dlt: DltNameOptions.XRP_LEDGER }],
      provider: { network: 'http://api.devnet.overledger.io/v1' },
    });


    let request = {
      echo: "echo"
    }

    // Get the address sequences.
    const ethereumSequenceRequest = await overledger.dlts.ethereum.getEcho(request.data);
    console.log(JSON.stringify(ethereumSequenceRequest.data, null, 2));

    const xrpSequenceRequest = await overledger.dlts["xrp-ledger"].getEcho(request.data);
    console.log(JSON.stringify(xrpSequenceRequest.data, null, 2));

  } catch (e) {
    console.error('error:', e);
  }
})();
