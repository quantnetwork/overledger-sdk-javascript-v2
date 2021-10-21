//NOTE: Please create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE.
//Run: secure-env .env -s mySecretPassword
//You will then get a .env.enc file created in your project root directory. You can delete the .env file after this to prevent stealing.
//pass in the password of the .env.enc file in OverledgerSdk
//

//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
//your refresh token (e.g. from the getTokensUsingClientIDAndSecret.js example)
const refreshToken = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.sOvS6ARn13ojdubxuPPZmhiu7RVgOvM7PvgCaGm9G41czzpBiCs0mvw8xRPiF_zoo7U-buv36UmsRbqEV5FKau5-ldKVX7gYDUa5AzhfhgYaDB7Jeww5HubnpkhOGW5JQmJG49AKsJ1d49og5EDGkgZrpNHhLFUXj4SrxO9WgsdW5VgFG5MT0GpYJzR5Pn-OWvyGlqmV7g3jWAOpEB7LXcbupEDfwp-OYuF-K4NFqYF_-mEJp9w7H1VCFwG8apX7If8iigxusQC7tAQChZgE98YL3bg7QvEeSvB2crx79P7NlR3L5uYH_aJF3aavaB0OV917iTTa4eFMc464sg3epA.cwQMjOe_rIUJy9Lc.5Z3w8cb-Dv_amlA6OS9rslOHh4KmAWd2tBxC4CxwgATHvVx692V2z0Vm8m0trPQQj9pQJyeIUBH3b6rE8ZDrc4V9CurEx-qYmad55FqNqSuaUvk6MdATtMoc3h8nHVjNF1ZnWahQZeO0ezn9qbdNk9SqMRj5CXr3JYQlV3egUfVzf-3HrGP7WyyIxrMlQYgcResrLNGsqy9ClOzroSrAoN7-iYcwsNVM2MJjsbwkE6Ex9FQt0N7p2DSJ_3mxRcw1qIaopyYb4duR2ppzyP43XZuLvEPgp2IyWtad_sVdrTzy5A5dghBPbOnoT94HxUdE3CMXya-vY4LW6u9JeOxZlZfdgzzRsHWayaj2liSNS58dxvcrumoLHiuDFFIEPU6SkG3_AW6VqyMAFGjzjc2r_rSH4aQ8xSW8tMKFlckZBWMUxWueE8mQsFm7lX7jV6gm7EPOt-DqHJzALxNJW_NAxmAMNcolfnxNw8x1GS8uQbayvmash01QdYm2zdBHJiTJU8TzA5I-0z9Ce-_85CcieBoTIdrAevtsMaXRVDeVRVC3Abu_VuywRxlTuK1dna2ZJNnc3U6OH9-YSKfxifjK_JVK6QWhJD9_osg4GmodnrZyM2JxL-Gz5QJYsu7o1cRu9_2GNooOUjhVhsRhhVT04A0SxU9jfrRSR4VuAdlwVv_NzoHlsJO3AZEQpo67gt5gDnZYEDnuo_2GcJSxUxoVeR9v0oKsHvHVJUOVYTfGc6io8EteOXoXotFH27wQthZSlahi1numDxj7e733luVB-R9Mxmzr1kEEqx_c637nasXpKnY4ZdYtLobyC14pepxJ1OtwAom7DaTiG2OTV23ECEhcVnC0ppHUduljc7iId85mpr5A4ryMUdD6kUmM92ccubA4TxQXzVCwGjKEOxR_n1SHdk7IfY6vAUHJa7AnrayEZWw-mMsVugKQD4CKI0G4MWIcnTCWKX5OAlX2a6sp3VW0R5xKxtBHlK4GhEUk_Hj_DhxEXYmVQQ2KVPcLIQReh4UvZfh5oGJr7M86u9MtPAhklKsCn1Oc1M5RpMxqrTza0HTFjAHj-IHIdH_L_se6XiXctNNyqCj6aqGY7BDUvB32QDm0sg9dskJkwEJjIUMafmm-3DXaJ9AWZwYvay8yl_U_wXzMiZLRlHGo_FH3AKLsdvegcVVrUcoCAyUVJtoP_RT5K8jDhM6IucbDfLs5T-0KSNwKn7MKRxtl1fJmkgbJ982LNJsmHuoBUo9yERYRul_K504_SgD__q_wznYawzD-JIDhCw-K9ebfpoPJKIksus2GCJppbj1p.3hHZ0ZD-clFsf1nQa2PbMA';
//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------


/*
 * This example will be pointing directly to the cognito URL, the path /oauth2/token will be set inside the OverledgerSDK
 * Update the variables above to contain clientID, clientSecret and the refreshToken
 * Upon successful run, a new access token will be provided
 */
; (async () => {
    try {
        const overledger = new OverledgerSDK({
            dlts: [{ dlt: DltNameOptions.BITCOIN }, { dlt: DltNameOptions.ETHEREUM }, { dlt: DltNameOptions.XRP_LEDGER }],
            provider: { network: 'https://auth.overledger.io/' },
            envFilePassword: 'password',
        });

        const response = await overledger.refreshAccessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET, refreshToken);
        console.log('response:\n', response);

    } catch (e) {
        console.error('error', e);
    }
})();
