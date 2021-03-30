//NOTE: Please create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE.
//Run: secure-env .env -s mySecretPassword
//You will then get a .env.enc file created in your project root directory. You can delete the .env file after this to prevent stealing.
//pass in the password in OverledgerSdk
//

//NOTE: You may need to run "yarn install" inside the examples/create-account folder, then node create-account.js
//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
//const partyAxrpPrivateKey = 'sswERuW1KWEwMXF6VFpRY72PxfC9b';

//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------

; (async () => {
    try {

        const overledger = new OverledgerSDK({
            dlts: [{ dlt: DltNameOptions.BITCOIN },
            { dlt: DltNameOptions.ETHEREUM },
            { dlt: DltNameOptions.XRP_LEDGER }
            ],
            provider: { network: 'testnet' },
            password: 'password',
        });

        console.log("=====")
        console.log(process.env.PARTY_A_XRP_PRIVATE_KEY);
        console.log("=====")


        let preparedTransaction = "{\n" +
            " \"requestId\": \"b670c3ec-1bd9-4773-8e9d-aa18868c8648\",\n" +
            "    \"requestTime\": null,\n" +
            "    \"gatewayFee\": 10,\n" +
            "    \"gatewayFeeUnit\": \"QNT\",\n" +
            "    \"nativeData\": {\n" +
            "\t\t\t  \"TransactionType\":\"Payment\",\n" +
            "\t\t\t  \"Account\":\"rhTa8RGotyJQAW8sS2tFVVfvcHYXaps9hC\",\n" +
            "\t\t\t  \"Destination\":\"rKoGTTkPefCuQR31UHsfk9jKnrQHz6LtKe\",\n" +
            "\t\t\t  \"Amount\":\"1\",\n" +
            "\t\t\t  \"Flags\":2147483648,\n" +
            "\t\t\t  \"Memos\":\n" +
            "\t\t\t    [\n" +
            "\t\t\t        {\n" +
            "\t\t\t            \"Memo\":\n" +
            "\t\t\t                {\n" +
            "\t\t\t                    \"MemoData\":\"4F564C2053444B2054657374\"\n" +
            "\t\t\t                }\n" +
            "\t\t\t        }\n" +
            "\t\t\t   ],\n" +
            "\t\t\t   \"LastLedgerSequence\":4294967295,\n" +
            "\t\t\t   \"Fee\":\"12\",\n" +
            "\t\t\t   \"Sequence\":557\n" +
            "\t\t\t }\n" +
            "}"

        overledger.dlts[DltNameOptions.XRP_LEDGER].setAccount({privateKey: process.env.PARTY_A_XRP_PRIVATE_KEY});

        let result = await overledger.sign(DltNameOptions.XRP_LEDGER, JSON.parse(preparedTransaction) );
        console.log("Signed: " + JSON.stringify(result));

    } catch (e) {
        console.error('error', e);
    }
})();