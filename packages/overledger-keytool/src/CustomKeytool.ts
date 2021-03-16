
import log4js from 'log4js';
import Keytool from 'node-keytool';
import jks from 'jks-js';
import fs from 'fs';

/**
 * @memberof module:overledger-keytool
 */
const log = log4js.getLogger('CustomKeytool');
log.level = "info";
class CustomKeytool {
    storetype: string;
    debug: boolean;

    constructor(storetype?: string, debug?: boolean) {
        this.storetype = storetype !== undefined ? storetype : "JCEKS";
        this.debug = debug !== undefined ? debug : false;
    }

    //TODO: pass the alias as a parameter in the method
    //TODO: pass the dname as a parameter
    //TODO: pass the validity 
    public createKeystoreFile(fileName:string): Object {
        log.info("Creating keystore file: " + fileName);

        const store = Keytool(fileName, 'changeit', {debug: this.debug, storetype: this.storetype});

        var alias = 'keyalias' + Math.round(Math.random()*100);
        var keypass = "changeit";
        var dname = "CN=" + alias;
        var validity = 120;
        var valid_from = new Date();

        store.genkeypair(alias, keypass, dname, validity, null, null, null, null, valid_from, function(err, res) {
            if (err) {
                log.info(err);
                return;
            }
            log.info('alias', res.alias, 'created');
        });

        if(store !== undefined)
            log.info("Successfully created file: " + fileName);

        return store;
    }

    public readKeystoreFile(fileName:string): void {
        log.info("Reading keystore file: " + fileName);

        const keystore = jks.toPem(fs.readFileSync(fileName), 'changeit');
        if(keystore !== undefined)
            log.info("read keystore successfully");

        log.info(keystore);
        if(keystore['keyalias55'] !== undefined) {
            const {cert, key} = keystore['keyalias55'];
            if (cert !== undefined)
                log.info(cert);
            if (key !== undefined)
                log.info(key);
        }
        else {
            log.info("alias element seems to be undefined");
        }
    }


}

export default CustomKeytool;

