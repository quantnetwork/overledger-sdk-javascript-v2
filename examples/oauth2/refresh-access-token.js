//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------
const clientID = '45ei2llnq25eugla3h0khrnr6m'; //your app clientId
const clientSecret = '7l5egg2k4q0im91gcmb7lb2htrn1fvg50cb9up5tcnub0pt2atm';
const refreshToken = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.tV45v6hDYj-kfLNxoaJynquTe6S98-x_5IcZwL_CN-PpFBiVDnOGgcWYhPvUISuZccVNR1ffplQLqrA1ou9qeuiqI7hvHSDAa1MgmrsjnqmElpelLDHNFH7VHslaWhnXGcdIXvt66KREzhXkaeWgghxvpB0HyU5JSciZf38DDeJlAaDtQTY-6mVg3ghdsPyTkTsKE69JFxJo0oxSCa1G3i2HeBq-54FvucgN8Af3mclMZgwch-KDNF9Jbr-0KGMEGdasbGbHVSXFLDPh1FvGlgz1JwmgTAoRtspucagWfmgWeWeUgumvFn-L3M0VpYGQ2o74agOb6Jdea9Q0ApjAVQ.U-owlYLGGoeCQ3mx.6zmWnB9A8bIz4XDsrE7x15_jSPSKafBOiNt_G5gNLyY3UXmZOVVAg2Zv5tUpx6T4KU5q0uu5qdSy4wqVxftyhw9UfTCUqn0wE-n5BH31lelQazpes7UccJU8WJ7LdT-El32BiZ02juv-poUAdWmq_9ZxSsCt-xB00DKUQD6436UjNjjl9_QzCcvRszHFdGvtVsv2COIh0ffNv7UX1vGOormQ0so4ywvWQXkL_buQuCZKT5uKGdFz9VLUChJMiZAP5TzvQ4MPWikOa1imxLiRvYLvHwZjINCZxBf1ZZVEHWu3Wvk9nHm_ouWN6ueT1g2tXAmL-DPHIn23iFdHbh3yRsJHN1AZdWWshuNmbt87ItV7VkwwET1xaI91dVC4vzzMAjPCIbRaEHxjR5TBNdSLam17uTE8C_IDfWEsF6zyMJKRJ96HvuhcPyfJbY_jhxslBaXfIH58p5gDsF0Su2x4NLzXsjhG8NmaDGk6x0PowJDpZV7mEZYgrb3Betyt5-wNhXXOgxUbMrylyxvXsyGFOjdIF3xMb95IkkytPuEhbzr7g1x5umaO0Ail52dPHkbY5ODPR1dccNSeQyoDk4WIo02LxxgC0HqZS85_vuDs9hSs79iy4jUZHDN3i34f7JL7t1Z4sxpHXoOqTtbl-Yl5yzOV2b26VZ2O7OB2_0TNQYEhaxVLDpoldXlpil6yTzLGFg3-vGnCDAI2g3KtQAUugAolkEixbvfMyFLPrPe3E5al6rEcF2XrjuarVjdBGFPa5INpEzn6Aq4Xw7m9i60SfIyRiHmOejWoVK8g0uKNcftL4eglD5p2hvCQrWebcKlq_D4-enkYQqsl74faGNWjCOKqzD2-ZjEn-RzXlYQTO6C-FH83ELYbYB9IlaDooafYuD60HOHpSUNCwFnKWmNAY9DxeIqSky3wq057TpiK1hTr4GxX4j_7OKGcUCVMRhr7CKVclrVTZP-0f_XOtTPfCbO4FupCNk7QWwJvAzDRRPVMGYbr3RuTyxRc46l0mnNmjHjGFHAKr6T4w_c_SbWLCuB4HiSPI6aqIi5yTC8bE8hAk0ipq335KEgkH1P68m2P1MaZeaaTcEs2MIJLqSBbJ-3Xp3Mw_lwhj3m7Wl_RbuirvQdCGLyQ5_sXvU5CybFtRjnNUgJWov8CWUj99woD7aJNqF9SmZpggdu66-yAIw3A7RaZwVSS_3n2xzn4OJI_zv1-cym0_gniT5Um0giQNQRQBwrAWohOliWEf6t9fzzAPkFUikDaCenvwIGKhDE5rm4VArmd4eE8_y81II2mz6Vg_JCLFAZWjYYA8qarMN5Y-4n_xYAvZC5HKkw.G5ZLtWj2C68C-PDKztvpIg'; //refresh token that is issued by authorisation server
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
