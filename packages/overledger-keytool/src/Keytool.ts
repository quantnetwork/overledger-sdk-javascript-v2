
import log4js from 'log4js';


/**
 * @memberof module:overledger-keytool
 */
const log = log4js.getLogger('Keytool');
log.level = "info";
class Keytool {
    storetype: string;
    debug: boolean;

    constructor(storetype?: string, debug?: boolean) {
        storetype == undefined? this.storetype = "JCEKS" : this.storetype = storetype;
        debug == undefined? this.debug = false : this.debug = debug;
    }


    public createKeystoreFile(fileName:string): void {
        var Keytool = require('node-keytool');
        var store = Keytool(fileName, 'changeit', {debug: this.debug, storetype: this.storetype});

        if(store != undefined)
            console.log("Successfully created file: " + fileName);
    }


}

export default Keytool;

