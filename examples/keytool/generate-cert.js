//NOTE: replace @quantnetwork/ with ../../packages/ for all require statements below if you have not built the SDK yourself
const customKeytool = require('@quantnetwork/overledger-keytool').default;

//  ---------------------------------------------------------
//  -------------- BEGIN VARIABLES TO UPDATE ----------------
//  ---------------------------------------------------------

//  ---------------------------------------------------------
//  -------------- END VARIABLES TO UPDATE ------------------
//  ---------------------------------------------------------


/*
 * Example to request and then generate a cert from a cert file and then importing the cert to another keystore
 * The following example is doing these:
 * 1. create a keystore file
 * 2. from the keystore file created, request a cert and save that into a .req file
 * 3. from the .req file generate a cert and put the result in the .cer file
 * 4. create a different keystore file
 * 5. import the .cer file into a different keystore file
 * 6. listing the content of the keystore file to see if the new cert has gone into it
 */
; (async () => {
    try {
        const test = new customKeytool("JKS", true);
        console.log("================1=======================");
        await test.createKeystoreFile("richardtestcert.jks", "mypassword", "certalias", "CN=certalias", 120);
        console.log("================2======================");
        await test.certRequest("richardtestcert.jks", "mypassword", "certalias", "CN=certalias", "requestFileForCert.req");
        console.log("================3======================");

        await test.generateCert("richardtestcert.jks",  "mypassword", "certalias", "CN=certalias2","requestFileForCert.req",null,"outfileForCert.cer",true);
        console.log("================4======================");
        await test.createKeystoreFile("richard.jks", "changeit", "secret", "CN=secret", 120);
        console.log("================5======================");
        await test.importCert("richard.jks", "changeit","importedFromCerFile", "outfileForCert.cer", null);
        console.log("================6======================");
        test.listContentKeystoreFile("richard.jks", "changeit");

    } catch (e) {
        console.error('Error happened: ', e);
    }
})();
