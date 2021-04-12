
//NOTE: Please create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE.
//Run: secure-env .env -s mySecretPassword
//You will then get a .env.enc file created in your project root directory. You can delete the .env file after this to prevent stealing.
//pass in the password in OverledgerSdk
//

//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;

; (async () => {
    try {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const overledger = new OverledgerSDK({
            dlts: [{ dlt: DltNameOptions.BITCOIN },
            { dlt: DltNameOptions.ETHEREUM },
            { dlt: DltNameOptions.XRP_LEDGER }],
            userPoolID: 'us-east-2_EsD2OUTDD', //your userpool id
            envPassword: 'password',
        });

        const response = await new Promise((resolve, reject) => readline.question("Please enter the username: ", (username) => {
            readline.question("Please enter the password: ", function (password) {
                readline.close();
                resolve({
                    password_var: password,
                    username_var: username,
                });

            });
        })).then(async (res) => {
            const refreshTokensResponse = await overledger.getTokensUsingClientIdAndSecret(process.env.CLIENT_ID, res.username_var, res.password_var);
            console.log('accessToken:\n', refreshTokensResponse.accessToken)
            console.log('refreshToken:\n', refreshTokensResponse.refreshToken);
            console.log('idToken:\n', refreshTokensResponse.idToken);
        });
    } catch (e) {
        console.error('error', e);
    }
})();

