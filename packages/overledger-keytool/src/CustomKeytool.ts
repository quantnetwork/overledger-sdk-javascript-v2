
import log4js from 'log4js';


/**
 * @memberof module:overledger-keytool
 */
const log = log4js.getLogger('CustomKeytool');
log.level = "info";
class CustomKeytool {
    storetype: string;
    debug: boolean;

    constructor(storetype?: string, debug?: boolean) {
        storetype == undefined? this.storetype = "JCEKS" : this.storetype = storetype;
        debug == undefined? this.debug = false : this.debug = debug;
    }


    public createKeystoreFile(fileName:string): Object {
        var nodeKeytool = require('node-keytool');
        var store = nodeKeytool(fileName, 'changeit', {debug: this.debug, storetype: this.storetype});

        if(store != undefined)
            console.log("Successfully created file: " + fileName);

        return store;
    }


}

export default CustomKeytool;

