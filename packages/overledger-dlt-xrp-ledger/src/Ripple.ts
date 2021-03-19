import { RippleAPI } from 'ripple-lib';
import { deriveKeypair, deriveAddress } from 'ripple-keypairs';
import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import { Account, PreparedTransaction } from '@quantnetwork/overledger-types';
import log4js from "log4js";

/**
 * @memberof module:overledger-dlt-xrp-ledger
*/
const log = log4js.getLogger('Ripple');
log.level = "info";
class Ripple extends AbstractDLT {
  rippleAPI: RippleAPI;
  account: Account;
  /**
   * Name of the DLT
   */
  name: string = 'xrp-ledger';

  /**
   * Symbol of the DLT
   */
  symbol: string = 'XRP';

  /**
   * @param {any} sdk
   */
  constructor(sdk: any) {
    super(sdk);

    this.rippleAPI = new RippleAPI();

  }

  /**
   * Create an XRP account
   *
   * @return {Account} (privateKey, address)
   */
  createAccount(): Account {
    const generated = this.rippleAPI.generateAddress();
    const keypair = deriveKeypair(generated.secret);
    const account = {
      address: generated.address,
      privateKey: generated.secret,
      publicKey: keypair.publicKey,
      password: "",
      provder: "",
    };

    return account;
  }

  /**
   * Set an account for signing for a specific DLT
   *
   * @param {Account} accountInfo The standardised account information
   */
  setAccount(accountInfo: Account): void {
    if (typeof accountInfo.privateKey === 'undefined'){
      throw "accountInfo.privateKey must be set";
    }
    let thisPrivateKey = "";
    let thisAddress = "";
    let thisPublicKey = "";
    let thisProvider = "";
    let thisPassword = "";
    const keypair = deriveKeypair(accountInfo.privateKey);
    const generatedAddress = deriveAddress(keypair.publicKey);
    thisPrivateKey = accountInfo.privateKey;
    thisPublicKey = keypair.publicKey;
    thisAddress = generatedAddress;
    if ((typeof accountInfo.provider !== 'undefined')){
      thisProvider = accountInfo.provider;
    } else {
      thisProvider = "";
    }
    if ((typeof accountInfo.password !== 'undefined')){
      thisPassword = accountInfo.password;
    } else {
      thisPassword = "";
    }
    let thisAccount = {
      privateKey: thisPrivateKey,
      address: thisAddress,
      publicKey: thisPublicKey,
      provider: thisProvider,
      password: thisPassword,
    }
   this.account = thisAccount;
  }

  sign(unsignedTransaction: PreparedTransaction): Promise<string> {
    log.info(unsignedTransaction);
    return Promise.resolve("Not Implemented");
  }

}


export default Ripple;
