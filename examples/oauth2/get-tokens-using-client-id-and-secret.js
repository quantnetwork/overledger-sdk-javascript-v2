
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
            { dlt: DltNameOptions.XRP_LEDGER }],
            userPoolID: 'us-east-1_xfjNg5Nv9', //your userpool id
            provider: { network: 'https://api.sandbox.overledger.io/' },
            envFilePassword: 'password',
        });

        const refreshTokensResponse = await overledger.getTokensUsingClientIdAndSecret(process.env.USER_NAME, process.env.PASSWORD,
            process.env.CLIENT_ID, process.env.CLIENT_SECRET);
            console.log('accessToken:\n', refreshTokensResponse.accessToken)
            console.log('expiresIn:\n', refreshTokensResponse.expiresIn);
            console.log('tokenType:\n', refreshTokensResponse.tokenType);
    } catch (e) {
        console.error('error', e);
    }
})();

