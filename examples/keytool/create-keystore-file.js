//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const CustomKeytool = require('@quantnetwork/overledger-keytool').default;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------

//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------


/*
 * Example to create a keystore file with the filename supplied
 */
; (async () => {
    try {
        const test = new CustomKeytool("JKS", true);
        await test.createKeystoreFile("mykeystore.jks", "changeit", "secret", "CN=secret", 120);
        await test.readKeystoreFile("mykeystore.jks", "changeit", "secret");

    } catch (e) {
        console.error('error', e);
    }
})();
