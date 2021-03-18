//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const CustomKeytool = require('@quantnetwork/overledger-keytool').default;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------

//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------


/*
 * Example to read a keystore file, assume there is a file already called richard.jks, or change the filename as required
 * This will read the file and give back the cert and key portions of the file
 */
; (async () => {
    try {
        const test = new CustomKeytool("JKS", true);

        test.readKeystoreFile("richard.jks", "changeit", "secret");

    } catch (e) {
        console.error('error', e);
    }
})();
