//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const customKeytool = require('@quantnetwork/overledger-keytool').default;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------

//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------


/*
 */
; (async () => {
    try {
        const test = new customKeytool("JKS", true);
        //test.createKeystoreFile("richard.jks");

        test.readKeystoreFile(("richard.jks"));

    } catch (e) {
        console.error('error', e);
    }
})();
