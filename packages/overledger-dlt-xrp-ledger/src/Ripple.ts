import { RippleAPI } from 'ripple-lib';
import { deriveKeypair, deriveAddress } from 'ripple-keypairs';
import { bytesToHex } from 'ripple-keypairs/dist/utils';
import BN from 'bn.js';

import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import { Account, PreparedTransaction, XRPLedgerPreparedTransactionNativeData } from '@quantnetwork/overledger-types';
import log4js from "log4js";

/**
 * @memberof module:overledger-dlt-xrp-ledger
*/
const log = log4js.getLogger('Ripple');
const elliptic = require("elliptic");
const Secp256k1 = elliptic.ec('secp256k1');

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
      provider: "",
    };

    return account;
  }

  /**
   * Set an account for signing for a specific DLT
   *
   * @param {Account} accountInfo The standardised account information
   */
  setAccount(accountInfo: Account): void {
    if (typeof accountInfo.privateKey === 'undefined') {
      throw "accountInfo.privateKey must be set";
    }
    let thisPrivateKey = "";
    let thisAddress = "";
    let thisPublicKey = "";
    let thisProvider = "";
    let thisPassword = "";
    let keypair;

    if (this.isValidSeed(accountInfo.privateKey)) {
      log.info("Using seed to generate keypair.")
      keypair = deriveKeypair(accountInfo.privateKey);
    } else {
      log.info("Using privateKey to generate publicKey.");
      let privateKey = this.formatPrivateKey(accountInfo.privateKey);
      const publicKey = bytesToHex(Secp256k1.keyFromPrivate(privateKey.slice(2)).getPublic().encodeCompressed());
      keypair = { privateKey, publicKey };
    }

    const generatedAddress = deriveAddress(keypair.publicKey);
    thisPrivateKey = keypair.privateKey;
    thisPublicKey = keypair.publicKey;
    thisAddress = generatedAddress;
    if ((typeof accountInfo.provider !== 'undefined')) {
      thisProvider = accountInfo.provider;
    } else {
      thisProvider = "";
    }
    if ((typeof accountInfo.password !== 'undefined')) {
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

    let transactionData = unsignedTransaction.nativeData as XRPLedgerPreparedTransactionNativeData;

    const signedData = this.rippleAPI.sign(JSON.stringify(transactionData), {
      privateKey: this.account.privateKey,
      publicKey: this.account.publicKey
    });
    return Promise.resolve(signedData.signedTransaction);
  }

  /**
 * ripple seed validation
 */
  isValidSeed(seed: string): boolean {
    try {
      deriveKeypair(seed);
      return true;
    } catch (err) {
      return false;
    }
  };

  formatPrivateKey(privateKey: string): string {
    const prefix = '00';
    return prefix + new BN(privateKey).toString(16, 64);
  }

}

export default Ripple;
