
import log4js from 'log4js';
import Keytool from 'node-keytool';
import jks from 'jks-js';
import fs from 'fs';

/**
 * @memberof module:overledger-keytool
 */
const util = require('util');
const readFile = util.promisify(fs.readFile);
const log = log4js.getLogger('CustomKeytool');
log.level = "info";
class CustomKeytool {
    storetype: string;
    debug: boolean;

    constructor(storetype?: string, debug?: boolean) {
        this.storetype = storetype !== undefined ? storetype : "JCEKS";
        this.debug = debug !== undefined ? debug : false;
    }

    public async createKeystoreFile(fileName:string, keypass: string, alias: string, dname: string, validity: number): Promise<Object> {
        log.info("Creating keystore file: " + fileName);

        const store = Keytool(fileName, keypass, {debug: this.debug, storetype: this.storetype});

        const valid_from = new Date();

        /*
         *   genkeypair(alias, keypass, dname, validity, keysize, keyalg, sigalg, destalias, startdate, x509ext, cb)
         */
        let result = new Promise(function(myResolve, myReject) {
            store.genkeypair(alias, keypass, dname, validity, null, null, null, null, valid_from, function(err, res) {
                if (err) {
                    log.info(err);
                    myReject(err);
                    return;
                }
                log.info('alias', res.alias, 'created');
                myResolve("Done");
                return store;
        })});

        log.info("Ending creating keystore file");
        return await result;
    }

    public async readKeystoreFile(fileName: string, keypass: string, alias: string): Promise<void> {
        log.info("Reading keystore file: " + fileName);

        const content = await readFile(fileName);

        const keystore = jks.toPem(content, keypass);

        if(keystore !== undefined)
            log.info("Read keystore successfully");

        log.info(keystore);
        if(keystore[alias] !== undefined) {
            const {cert, key} = keystore[alias];
            if (cert !== undefined)
                log.info(cert);
            if (key !== undefined)
                log.info(key);
        }
        else {
            log.info("alias element seems to be undefined");
        }
    }

    public async getKeyFromFile(fileName: string, keypass: string, alias: string): Promise<string> {
        log.info("Getting key from keystore file: " + fileName);

        const content = await readFile(fileName);

        const keystore = jks.toPem(content, keypass);

        if(keystore !== undefined)
            log.info("Read keystore successfully");

        log.info(keystore);
        if(keystore[alias] !== undefined) {
            const {cert, key} = keystore[alias];
            if (cert !== undefined)
                log.info(cert);
            if (key !== undefined) {
                let keystr = key as string;
                console.info("keystr: " + keystr);
                let result = keystr.match(/-----BEGIN PRIVATE KEY-----([.\s\S]*)-----END PRIVATE KEY-----/);
                console.info("result: " + result[1]);
                return result[1];
            }
        }
        else {
            log.info("alias element seems to be undefined");
        }
        return "";
    }

    private static printList(err, res): void {
        if (err) {
            log.error('Error listing keystore content', err);
            return;
        }

        log.info('Keystore type: ' + res.storetype + ' Provider: ' + res.provider + ' (' + res.certs.length + ' certificates)');
        let index = 0;

        res.certs.map(resobj => {
            log.info('#' + index, resobj.certtype, '(' + resobj.issued + ')', resobj.alias, resobj.algorithm, resobj.fingerprint);
            index++;
        });
    }

    public listContentKeystoreFile(fileName: string, keypass: string): void {
        log.info("Listing content of keystore file: " + fileName);

        const store = Keytool(fileName, keypass, {debug: this.debug, storetype: this.storetype});

        if(store !== undefined)
            log.info("Found keystore file successfully");

        store.list(function(err, res) {
            CustomKeytool.printList(err, res);
        });
    }


    /**
     * Generates a certificate from the request given as a) an input file (parameter infile) or b) as a string in-memory (parameter datain).
     * If the parameter outfile is omitted or null, the result object contains the certificate data.
     * If the parameter dname is specified, this will be used in favor of the distinguished name used to generate the request.
     * signature:  store.gencert(alias, keypass, dname, infile, datain, outfile, rfcoutput)
     * example:    store.gencert(ca_alias, 'changeit', 'CN=request_override_dn,OU=example', 'example.req', null, null, true)
     * @param fileName
     * @param alias
     * @param keypass
     * @param dname
     * @param infile
     * @param datain
     * @param outfile
     * @param rfcoutput
     */
    public async generateCert(fileName:string,  keypass: string, alias: string,  dname: string, infile: string, datain: string, outfile: string, rfcoutput: boolean): Promise<Object> {
        log.info("Generating certificate: " + alias);

        const store = Keytool(fileName, keypass, {debug: this.debug, storetype: this.storetype});

        let result = new Promise(function(myResolve, myReject) {
            store.gencert(alias, keypass, dname, infile, datain, outfile, rfcoutput, function(err, res) {
                if (err || !res || !res.outdata) {
                    if (err) {
                        log.info("err: " + err);
                        myReject(err);
                        return;
                    }
                    log.info("Successfully created cert");
                    if(!res || !res.outdata) {
                        log.info('Certificate content (RFC formatted)');
                        log.info(res.outdata);
                    }
                    myResolve("Done");
                    return store;
                }
            })});

        log.info("Ending generating certificate");
        return await result;
    }

    /**
     * Generated a certificate request for the given alias. If outfile is omitted or null, res.outdata will contain the certificate data.
     */
    public async certRequest(fileName: string,  keypass: string, alias: string, dname: string, outfile: string): Promise<Object> {
        log.info("Requesting certificate: " + alias);

        const store = Keytool(fileName, keypass, {debug: this.debug, storetype: this.storetype});

        let result = new Promise(function(myResolve, myReject) {
            store.certreq(alias, keypass, dname, outfile, function(err, res) {
                if (err) {
                    log.error(err);
                    myReject(err);
                    return;
                }
                log.info("Request stored in file: " + outfile);
                log.info('response: ' + res);
                myResolve("Done");
            });
                return store;
            });

        log.info("Ending requesting certificate");
        return await result;
    }

    public async importCert(fileName: string,  keypass: string, alias: string, infile: string, datain: string): Promise<Object> {
        log.info("Importing certificate: " + alias);

        const store = Keytool(fileName, keypass, {debug: this.debug, storetype: this.storetype});

        //importcert(alias, keypass, infile, datain, trustcacerts, cb)
        //store.importcert('imported-fromstdin', 'changeit', undefined, res.outdata, true, function(err, res) {
        let result = new Promise(function(myResolve, myReject) {
            store.importcert(alias, keypass, infile, datain, function(err, res) {
                if (err) {
                    log.error(err);
                    myReject(err);
                    return;
                }
                log.info("Certificate imported.");
                log.info('response: ' + JSON.stringify(res));
                myResolve("Done");
            });
            return store;
        });

        log.info("Ending importing certificate");
        return await result;
    }

}

export default CustomKeytool;

