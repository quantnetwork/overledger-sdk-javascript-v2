//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const clientID = '45ei2llnq25eugla3h0khrnr6m'; //your app clientId
const clientSecret = '7l5egg2k4q0im91gcmb7lb2htrn1fvg50cb9up5tcnub0pt2atm'; //your app clientSecret
//your refresh token
const refreshToken = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.lvB4HNeZnCz3xjERT5YqwfPfhNJxaRoxMYwiZOhbnBqB_ehjts77dBO1GHvmsLKuxsk3kKdcpqX4-9WQTgfNpdYAtrrJOGzIVa2surFu_gl6V-w3ERhZk0f7ppRyGCedjaK4k1G0XX7U9p0wGAqirKLsxxxIO-Lh1EzyrDSKZ70zZLGNSt_QPuErS_fjGwemwc8Wg6fhv4Ek5XMSGaMnhypYovsFyMWhjW93Wr1GoKLyTpaoCHDcbd3RqDrxUCxvfU9DqVpZqc7zrdCuO_2TiNU7SWGjd9X1kfiAhbZYyA9D9Ruiyy_ZghSEdnscwWrThUAovFA-5wWH5XsG8PmfDw.T4ngD0FRbxVVFF1e.JdLwW-VP7oF4BGJ8MrlkG7-BJN8JO9mITkn0rN393v-ygZL4zNV9mRjbF0DcaqbLtMZ_jUAIMgfxtGU6ZlLb4WK1_gcc68VeQPrDTVNAycfbv4leRTyqVdwc0vIG1lQ8R-D9iCxEfC161_UYp0t9yb5QwvRHSfj4xBcgiefshm-h0DfiImRV9fxBYJ6x9bo_C64XcYwHux9nCDVXL7nn_HjfDy5YEkOsmjV8X7WZ-Wk5EV0ZMft6PdpK86VrloU3QVZc2K9GPuIF0_uI2tH41ZtXblavveZliLFCQwSMWxkoDn0KCYEAa1N-Lzlnas4FUt-zh_mcRIjnzH_TS17A9NWB_NJ_jbU47ZKa9KnmoWRk1HVKgoebqWQId0glCUGvJvvMKUpvZyl7uPsol8T-wFO1Z1dy4tMYlwXPdqD_yUD6gMW_vsED3yagNF9pf5vvMUoHeyzsDMKlsW-Zcbcqdv9L9rv5zFslR9AZLQdeuAFNzeepKY1gVYmQBZjUOJq804rQOaHOjYVDhMTraZ3eWeEwsI0m_1c1mPhxJffjgMbvq3sALP_Lfsdzh_4Is3iL56kpyEnO0Nl1_0z8jWzaFIlmj6AUhuBe6VkWU945Sao2D_h4fSkJCG35G5sTiOE0g7sc38pgP-cpsHhPD1YyaLd3cG5QkDhKomm-E6pAMF3NzSLsn3xihVecsYVOtV-eBlid2Tp9i3iMHuqtOI76eA5uwr7dLm7_jC1S5aWl35axvfwdSgli9jVFAPkvrOaupewc4eFV2zrZoIj_7fp5ohjV1vYMQvAsM5lRxCahFsXZ02WK6qr4gvr8aQ_X9qv1It0BnnKmOxv78JgpTPIGwKMaaS4JZHZyW1gePe_tPu3Cm29pkUuy6nTkoRrreFsUStuzweDyuSxR7tY-fNYWU83dYuDMmXz2GfYWTf7wR782-v3YQS1VaBVscOZ3qVkRh3WMcHFiwUuT4bpdAFHl2lDbJ17gWzwOmACbsJirVSOd5bdqJo6jyYU9Veto2O5bn1MHup-zb1h3kH8u3DL28LDqG7qgUsAv77HsX8VU0pz7bVwfnpgrWCcebByO5b_3j9i6tXW8lKzJEOjoPa8c-rAkTT39VIlZWziwKoJ9LWBThrbJ4cwhoWONo2ZfAXvnEEPNoSIpv9sMzhwCh19tQGmcuiPT_SUMqCRHuUk_lKUSlU3xuKvDz7A6XiR51F_oTtVQ62toitYbvMMZpvbqk4_UXmymlJsPLTmQxcJs3eT3-FUXAPQkH-oZUlLi4gO31lbSfPMda97398aio1PtYV1oZVSUKP8s7YtpxRkEtbg2aM20gnLF1lWAHIY.QUFItNZPa2anwytv-a6Icg';
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
            provider: { network: 'https://richardquant.auth.us-east-2.amazoncognito.com' },
        });

        const response = await overledger.refreshAccessToken(clientID, clientSecret, refreshToken);
        console.log('response code: ', response.status)
        console.log('response:\n', response.data);

    } catch (e) {
        console.error('error', e);
    }
})();
