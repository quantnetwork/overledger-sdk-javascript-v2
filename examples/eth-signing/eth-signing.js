//NOTE: You may need to run "yarn install" inside the examples/create-account folder, then node create-account.js
//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const CustomKeytool = require('@quantnetwork/overledger-keytool').default;
//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const partyAEthereumPrivateKey = "e352ad01a835ec50ba301ed7ffb305555cbf3b635082af140b3864f8e3e443d3";

//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------

; (async () => {
    try {
        //read from JKS file input,. contain above key eventually after reading
        const test = new CustomKeytool("JKS", true);
        let keyFromFile = await test.getKeyFromFile("pk.jks", "password", "1");
        console.log("Key: " + keyFromFile);

        //TODO: how do i convert the keyFromFile to be same as partyAEthereumPrivateKey???


        const overledger = new OverledgerSDK({
            dlts: [{ dlt: DltNameOptions.BITCOIN },
            { dlt: DltNameOptions.ETHEREUM },
            { dlt: DltNameOptions.XRP_LEDGER }
            ],
            provider: { network: 'testnet' },
        });

        let preparedTransaction = "{\n" +
            "    \"requestId\": \"b6832e2d-a30b-4282-af84-674ea3eb331a\",\n" +
            "    \"requestTime\": null,\n" +
            "    \"gatewayFee\": 10,\n" +
            "    \"gatewayFeeUnit\": \"QNT\",\n" +
            "    \"nativeData\": {\n" +
            "        \"nonce\": 1041,\n" +
            "        \"chainId\": 3,\n" +
            "        \"to\": \"0xfD218E9A20400535ffaa8FAe54D07d375B3A3827\",\n" +
            "        \"gas\": \"22156\",\n" +
            "        \"gasPrice\": \"1000001234\",\n" +
            "        \"value\": \"755\",\n" +
            "        \"data\": \"25 AK47S 69420666\"\n" +
            "    }\n" +
            "}";
        //TODO: I am assuming the data field is NOT in HEX form, the code inside SDK will do some hex conversion at this point in time. Better to have PREP do this.
        overledger.dlts[DltNameOptions.ETHEREUM].setAccount({privateKey: partyAEthereumPrivateKey});

        let result = await overledger.sign(DltNameOptions.ETHEREUM, JSON.parse(preparedTransaction) );
        console.log("Signed: " + JSON.stringify(result));

    } catch (e) {
        console.error('error', e);
    }
})();