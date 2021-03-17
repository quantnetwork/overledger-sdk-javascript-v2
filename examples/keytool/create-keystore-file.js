//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const customKeytool = require('@quantnetwork/overledger-keytool').default;

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
        const test = new customKeytool("JKS", true);
        test.createKeystoreFile("richard.jks", "changeit", "secret", "CN=secret", 120).then(
            function(value) {test.readKeystoreFile("richard.jks", "changeit", "secret");},
            function(error){console.log("Error: " + error);}
        );

    } catch (e) {
        console.error('error', e);
    }
})();