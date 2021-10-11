import * as bitcoin from 'bitcoinjs-lib';
import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import { MAINNET } from '@quantnetwork/overledger-provider';
import { Account, PreparedTransaction, BitcoinPreparedTransactionNativeData } from '@quantnetwork/overledger-types';
import log4js from "log4js";

/**
 * @memberof module:overledger-dlt-bitcoin
*/
const log = log4js.getLogger('Bitcoin');
log.level = "info";
class Bitcoin extends AbstractDLT {
  addressType: bitcoin.Network;
  account: Account;
  /**
   * Name of the DLT
   */
  name: string = 'bitcoin';

  /**
   * Symbol of the DLT
   */
  symbol: string = 'Bitcoin';

  /**
   * @param {any} sdk - the sdk instance
   * @param {Object} options - any additional options to instantiate this dlt
   */
  constructor(sdk: any) {
    super(sdk);
    if (sdk.network === MAINNET) {
      this.addressType = bitcoin.networks.bitcoin;
    }
    else {
      this.addressType = bitcoin.networks.testnet;
    }
  }



  /**
   * Create a Bitcoin account
   *
   * @return {Account} the new Bitcoin account
   */
  createAccount(): Account {

    const keyPair = bitcoin.ECPair.makeRandom({ network: this.addressType });
    const privateKey = keyPair.toWIF();
    const { address, pubkey } = bitcoin.payments
      .p2pkh({ pubkey: keyPair.publicKey, network: this.addressType });
    return {
      privateKey,
      address,
      publicKey: pubkey.toString('hex'),
      password: "",
      provider: "",
    };

  }

  /**
   * Set an account for signing transactions for a specific DLT
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
    const keyPair = bitcoin.ECPair.fromWIF(accountInfo.privateKey, this.addressType);
    thisPrivateKey = accountInfo.privateKey;
    thisAddress = bitcoin.payments
      .p2pkh({ pubkey: keyPair.publicKey, network: this.addressType }).address;

    thisPublicKey = keyPair.publicKey.toString('hex');
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
    const transactionData = unsignedTransaction.nativeData as BitcoinPreparedTransactionNativeData;
    // for each input sign them:
    const myKeyPair = bitcoin.ECPair.fromWIF(this.account.privateKey, this.addressType);

    // Set maximum fee rate = 0 to be flexible on fee rate
    const transaction = new bitcoin.Psbt({ network: this.addressType });
    transactionData.inputs.forEach(input => transaction.addInput({ hash: input.hash, index: input.index, nonWitnessUtxo: Buffer.from(input.rawTransaction, 'hex') }));
    transactionData.outputs.forEach(output => transaction.addOutput(output));

    // Message is inserted as an additional transaction output
    const data = transactionData.data;
    const dataLength = data.length;
    if (data && dataLength > 0) {
      const unspendableReturnPayment = bitcoin.payments.embed({ data: [Buffer.from(data, 'utf8')], network: this.addressType });
      const dataOutput = { script: unspendableReturnPayment.output, value: 0 };
      transaction.addOutput(dataOutput);
    }

    for (let i = 0; i < transactionData.inputs.length; i++) {
      transaction.signInput(i, myKeyPair);
      transaction.validateSignaturesOfInput(i);
      transaction.finalizeInput(i);
    }

    return Promise.resolve(transaction.extractTransaction(true).toHex());
  }
}

export default Bitcoin;
