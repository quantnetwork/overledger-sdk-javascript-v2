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
//const clientID = '45ei2llnq25eugla3h0khrnr6m'; //your app clientId
//const clientSecret = '7l5egg2k4q0im91gcmb7lb2htrn1fvg50cb9up5tcnub0pt2atm'; //your app clientSecret
//your refresh token
const refreshToken = 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.N8h9RwB1rxcjSDbDqjW0nipb1rOAAgXPOn3TBufM0rifl5J7S395WWkl5y4yG_wGxpbBMzP1v1pKOG1Cl7htreU1g1RUZco5ZCuQczr7TRvbizAJHOX2HQnYoBHk32YjxNTcqjM9RqSOwiUjTRlXrXATcJ9KagRgJ3ecH6Y3FmUFcav7AQRtXtPhrOHFAHpzAv4BCllQ5LoOmHDv7Xy27p5tjAjHJv1-52TISMieUPH6zwHNDlkBVuic0JAqQFBLD2MFXUibDXwe73N211MQqt8eclftt6sa8UhHK0VBkN1z32QPR8q9qXuMSUZgc87K0LKuZA_OB4jz0setx3eg8A.Lo7tQLYSjCLHpfsN.K9riG5qNDO9-MDiT2K8Be-RU5ssirveUN7eHNCqsHcTyI6ChSmycM0BOqy0ol6Ep7jncqW03IVxRSJzWDXzP-64smTaqQVL8mQil5n-fIFnqWUWxUdPkJlv25ZAk2G0KxDPW9cYKoJukfpk95np9GPMsBzljAWRf6hwbrQLTzEwMQm7VAlEqIOMK33z1HELezP5p-YK7S-3dfp2ewjdpfXFPlmIsHhYFU6ZQ6Cf0wNZ_ZyVEYJ1SbAvDTobXeMwsgZtk8n4Lr2cX-Tdo4IRzP5LKTkRTwZHJ8YJOzHnonGZhA9vmiKAV0yvYwyEn_MOFu8xPjbbsVgo1mBEU9gs_a5KlXwW1RAUKgzfrMXA5IE07wMs7nJDLBFWLtvXOVttGKqx9PzwGe5OPaPcoH4Wbj-Vl40L8llQHnwiSf4_bn0-M2V9Wp93s_0gX5zazfjPuOy2D0nlq3DpCVRRWaIcFEEsh89mlA5FgUsd9YiF6gt8ObNRfgBtllx03J0rtbIUFZBVqesPn94eycPYCvLb540vR6PSSUDfqbjQ6Dn1JyF1dhW3Nz-5McHxCvaz3s4C4hYwBm656hjPyxqLUyedcyCKKSzCpeo3rKd5IC7DNQPNZpVpgs8Ks3OG2vYb7qsWJ-9vtsOgkQShS1aaZzHiQ06xJOKROCsa3YBuBRJIvGXQo61BrMI_Z3Tx7bcSlcJpRVLgiHqDnhadfxB1ZzosiZOjm3DLpVM6Pdec-cosf-SU9mOXFOUEeepmWxSTo4e1QT-dNTMmjuNUNDxuvbAUNeeGWLLDJ-eTBLIqDUUVRHT5KhGdOnb5Zpy0DHaIEOPj2uIGNaye8Jaw_oLwuvK7jSepRusWKd0QvjlghP7lh7kVo2Z3ZPccgk9sajEufx1YoN2dshGepNyDjtOyRHjh_NgR_FAIMD1ySUQjnSUdNm0N6vXC03CjAXFk9skWhDCi2DV8K9U8ClSrSYd0EM11MXtHIyfi-dY20DUmyFd361HW-rjvmNmjKa3N-C4wSVaSx4xBfm94dc8SSgOPJwpsxINioa78BUSMJAZ_pzoVyrdP_AduIbTwgE1qgrxG33Haa5ENaf3ZBj3wgC0E0pUBlPzT49cizJD_-p9YzK4fOvV__AtQXXdyEna7u3eR57BXI025_C4kqrYT6lAL_qwARZZ9pms2_oTnZhiAX28NK_DxhhGllEDazyYmy5Ee3Az-VlgUSaBJB5_ItxLMV4fPmokV-OoxaI6nZRd8fjEFWIUf22R2E34KLjZ1DfL3gnvmFT3yoaP4ryo0Nq3_43oCXfUS6-jY0IiaK0XRtD0mkv7o6XSOpyKKxG4uPPz4.s1ShMdEIFDzCpK2IF8VhFg';
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
            envFilePassword: 'password',
        });

        const response = await overledger.refreshAccessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET, refreshToken);
        console.log('response code: ', response.status)
        console.log('response:\n', response.data);

    } catch (e) {
        console.error('error', e);
    }
})();
