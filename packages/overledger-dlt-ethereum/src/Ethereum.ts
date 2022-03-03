// import Accounts from 'web3-eth-accounts';
import Web3 from 'web3';
import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import { Account, PreparedTransaction } from '@quantnetwork/overledger-types';
import log4js from 'log4js';

/**
 * @memberof module:overledger-dlt-ethereum
*/
const log = log4js.getLogger('Ethereum');
log.level = 'info';
class Ethereum extends AbstractDLT {
  account: Account;
  web3: Web3;

  /**
   * Name of the DLT
   */
  name: string = 'ethereum';

  /**
   * Symbol of the DLT
   */
  symbol: string = 'ETH';

  /**
   * @param {any} sdk - the sdk instance
   */
  constructor(sdk: any) {
    super(sdk);

    this.web3 = new Web3();
  }

  /**
   * Create an Ethereum account
   *
   * @return {Account} the new Ethereum account
   */
  createAccount(): Account {
    const web3Account = this.web3.eth.accounts.create();
    const thisAccount = {
      privateKey: web3Account.privateKey,
      address: web3Account.address,
      publicKey: '',
      password: '',
      provider: '',
    };
    return thisAccount;
  }

  /**
   * Set an account for signing transactions for a specific DLT
   *
   * @param {Account} accountInfo The standardised account information
   */
  setAccount(accountInfo: Account): void {
    if ((typeof accountInfo.privateKey === 'undefined') && ((typeof accountInfo.provider === 'undefined') || (typeof accountInfo.password === 'undefined') || (typeof accountInfo.address !== 'undefined'))) {
      throw 'Either accountInfo.privateKey must be set (signing client side) or, accountInfo.provider AND accountInfo.password AND accountInfo.address must be set (signing via the node)';
    }
    let thisPrivateKey = '';
    let thisAddress = '';
    let thisPublicKey = '';
    let thisProvider = '';
    let thisPassword = '';
    if ((typeof accountInfo.privateKey !== 'undefined')) {
      const web3Account = this.web3.eth.accounts.privateKeyToAccount(accountInfo.privateKey);
      thisPrivateKey = web3Account.privateKey;
      thisAddress = web3Account.address;
    } else if ((typeof accountInfo.provider !== 'undefined') && (typeof accountInfo.password !== 'undefined') && (typeof accountInfo.address !== 'undefined')) {
      thisPrivateKey = '';
      thisAddress = accountInfo.address;
    }
    if ((typeof accountInfo.publicKey !== 'undefined')) {
      thisPublicKey = accountInfo.publicKey;
    } else {
      thisPublicKey = '';
    }
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
      address: thisAddress,
      publicKey: thisPublicKey,
      provider: thisProvider,
      password: thisPassword,
    };
    this.account = thisAccount;
  }

  async sign(unsignedTransaction: PreparedTransaction): Promise<string> {
    return new Promise((resolve, reject) => {

      const transactionConfig = unsignedTransaction.nativeData as object;
      this.web3.eth.accounts.signTransaction(transactionConfig, this.account.privateKey, (err, data) => {
        if (err) {
          log.error(`Error: ${err}`);
          return reject(err);
        }
        return resolve(data.rawTransaction);
      });
    });
  }
}

export default Ethereum;
