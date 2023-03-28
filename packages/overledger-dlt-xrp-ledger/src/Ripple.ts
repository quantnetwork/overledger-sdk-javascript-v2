import { deriveKeypair, deriveAddress, sign, verify } from 'ripple-keypairs';
import { bytesToHex } from 'ripple-keypairs/dist/utils';
import * as xrpl from 'xrpl';
import ECDSA from 'xrpl/dist/npm/ECDSA';
import BN from 'bn.js';
import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import { Account, PreparedTransaction } from '@quantnetwork/overledger-types';
import log4js from 'log4js';

/**
 * @memberof module:overledger-dlt-xrp-ledger
*/
const log = log4js.getLogger('Ripple');
const elliptic = require('elliptic');
const secp256k1 = elliptic.ec('secp256k1');
log.level = 'info';
class Ripple extends AbstractDLT {
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
  }

  /**
   * Create an XRP account
   *
   * @return {Account} (privateKey, address)
   */
  createAccount(): Account {
    const generated = xrpl.Wallet.generate(ECDSA.secp256k1);
    const account = {
      address: generated.classicAddress,
      privateKey: generated.privateKey,
      secret: generated.seed,
      publicKey: generated.publicKey,
      password: '',
      provider: '',
    };

    return account;
  }

  /**
   * Set an account for signing for a specific DLT
   *
   * @param {Account} accountInfo The standardised account information
   */
/**
   * Set an account for signing for a specific DLT
   *
   * @param {Account} accountInfo The standardised account information
   */
  setAccount(accountInfo: Account): void {
    if ((typeof accountInfo.privateKey === 'undefined')&&(typeof accountInfo.secret === 'undefined')) {
      throw 'accountInfo.privateKey or accountInfo.secret must be set';
    }
    let thisPrivateKey = '';
    let thisSecret = '';
    let thisAddress = '';
    let thisPublicKey = '';
    let thisProvider = '';
    let thisPassword = '';
    let keypair;
    if (typeof accountInfo.privateKey === 'undefined') {
      thisSecret = accountInfo.secret;
    } else {
      thisSecret = accountInfo.privateKey;
    } 
    if (this.isValidSeed(thisSecret)) {
      keypair = deriveKeypair(thisSecret);
    } else {
      const privateKey = this.formatPrivateKey(thisSecret);
      const publicKey = bytesToHex(secp256k1.keyFromPrivate(privateKey.slice(2)).getPublic().encodeCompressed());
      this.validateKeyPair(privateKey, publicKey);
      keypair = { privateKey, publicKey };
    }

    const generatedAddress = deriveAddress(keypair.publicKey);
    thisPrivateKey = keypair.privateKey;
    thisPublicKey = keypair.publicKey;
    thisAddress = generatedAddress;
    if ((typeof accountInfo.provider !== 'undefined')) {
      thisProvider = accountInfo.provider;
    } else {
      thisProvider = '';
    }
    if ((typeof accountInfo.password !== 'undefined')) {
      thisPassword = accountInfo.password;
    } else {
      thisPassword = '';
    }
    const thisAccount = {
      privateKey: thisPrivateKey,
      secret: thisSecret,
      address: thisAddress,
      publicKey: thisPublicKey,
      provider: thisProvider,
      password: thisPassword,
    };
    this.account = thisAccount;
  }

  sign(unsignedTransaction: PreparedTransaction): Promise<string> {
    const wallet = xrpl.Wallet.fromSeed(this.account.secret);
    //@ts-ignore
    const signedData = wallet.sign(unsignedTransaction.nativeData as xrpl.Transaction);
    return Promise.resolve(signedData.tx_blob);
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
  }

  formatPrivateKey(privateKey: string): string {
    const prefix = '00';
    return prefix + new BN(privateKey).toString(16, 64);
  }

  validateKeyPair(privateKey: string, publicKey: string): boolean {

    const messageToVerify = Buffer.from('This test message should verify.').toString('hex');
    const signature = sign(messageToVerify, privateKey);

    /* istanbul ignore if */
    if (!verify(messageToVerify, signature, publicKey)) {
      throw new Error('derived keypair did not generate verifiable signature');
    }
    return true;
  }

}

export default Ripple;
