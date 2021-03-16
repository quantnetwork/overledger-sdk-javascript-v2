
import log4js from 'log4js';


/**
 * @memberof module:overledger-provider
 */
const log = log4js.getLogger('Keytool');
log.level = "info";
class Keytool {


    public createKeystoreFile(fileName:string): void {
        var Keytool = require('node-keytool');
        var store = Keytool(fileName, 'changeit', {debug: false, storetype: 'JCEKS'});

        if(store != undefined)
            console.log("Successfully created file: " + fileName);
    }


}

export default Keytool;

