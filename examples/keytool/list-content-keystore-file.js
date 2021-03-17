//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const customKeytool = require('@quantnetwork/overledger-keytool').default;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------

//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------


/*
 * Example to list the content of a keystore file, assume there is a file already called richard.jks, or change the filename as required
 */
; (async () => {
    try {
        const test = new customKeytool("JKS", true);

        test.listContentKeystoreFile("richard.jks", "changeit");

    } catch (e) {
        console.error('error', e);
    }
})();
