//NOTE: You may need to run "yarn install" inside the examples/create-account folder, then node create-account.js
//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;


//  -------------- BEGIN VARIABLES TO UPDATE ----------------

const partyABitcoinPrivateKey = 'cNmsFjPqWCaVdhbPoHQJqDpayYdtKR9Qo81KVAEMHJwmgRVJZjDu';

//  -------------- END VARIABLES TO UPDATE ------------------

; (async () => {
    try {

        const overledger = new OverledgerSDK({
            dlts: [
                { dlt: DltNameOptions.BITCOIN },
            ],
            provider: { network: 'testnet' },
        });

        overledger.dlts.bitcoin.setAccount({privateKey: partyABitcoinPrivateKey});

        let preparedTransaction = "{\n  " +
            " \"requestId\": \"393f80e3-6a54-4f78-9c48-de1fb3cee8e1\",\n  " +
            "  \"gatewayFee\": \"10\",\n  " +
            "  \"gatewayFeeUnit\": \"QNT\",\n  " +
            "  \"nativeData\": {\n      " +
            "      \"data\": \"OVL SDK Test\",\n   " +
            "       \"inputs\": [\n {\n         " +
            "          \"transactionHash\": \"6a23a5b1cda511b8004c67cd873aa84d704ead7b313ef565c50918dead03f0d8\",\n   " +
            "           \"vout\": \"1\", \n      " +
            "           \"address\": \"mo54poo7oLL5LvHEYwhDmYdCpqvx7j3Ks2\"\n        " +
            "       }\n ],\n      " +

            "       \"outputs\": [\n " +
            "               {\n       " +
            "                   \"address\": \"mtHsSjGeVhSQVqcM3fv5A79qoSJ5TgEjtj\",\n       " +
            "                   \"amount\": 200 \n       " +     
            "               },\n      " +
            "               {\n    "+          
            "                   \"address\": \"mgRvRj22C38dusBc8xqViKn168CCgHFzgv\",\n  " +
            "                    \"amount\": 100 \n   "+       
            "               }\n        ],\n      " +
            "  \"fee\": \"2200\"\n    }" +
            "\n}";
        //TODO: I am assuming the data field is NOT in HEX form, the code inside SDK will do some hex conversion at this point in time. Better to have PREP do this.
        overledger.dlts.bitcoin.setAccount({ privateKey: partyABitcoinPrivateKey });

        let result = await overledger.sign(DltNameOptions.BITCOIN, JSON.parse(preparedTransaction));
        console.log("Signed: " + JSON.stringify(result));

    } catch (e) {
        console.error('error', e);
    }
})();