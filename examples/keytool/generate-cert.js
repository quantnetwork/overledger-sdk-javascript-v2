//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const customKeytool = require('@quantnetwork/overledger-keytool').default;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------

//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------


/*
 * Example to request and then generate a cert from a cert file
 * The following example is doing these:
 * 1. create a keystore file
 * 2. from the keystore file created, request a cert and save that into a .req file
 * 3. from the .req file generate a cert and put the result in the .cer file
 * 4. import the .cer file into a keystore
 */
; (async () => {
    try {
        const test = new customKeytool("JKS", true);

        await test.createKeystoreFile("richardtestcert.jks", "mypassword", "certalias", "CN=certalias", 120);
        await test.certRequest("richardtestcert.jks", "mypassword", "certalias", "CN=certalias", "requestFileForCert.req");

        await test.generateCert("richardtestcert.jks",  "mypassword", "certalias", "CN=certalias2","requestFileForCert.req",null,"outfileForCert.cer",true);

    } catch (e) {
        console.error('Error happened: ', e);
    }
})();
