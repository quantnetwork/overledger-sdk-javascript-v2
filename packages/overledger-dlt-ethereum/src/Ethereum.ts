// import Accounts from 'web3-eth-accounts';
import Web3 from 'web3';
import { MAINNET } from '@quantnetwork/overledger-provider';
import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import {Account } from '@quantnetwork/overledger-types';

/**
 * @memberof module:overledger-dlt-ethereum
*/
class Ethereum extends AbstractDLT {
  chainId: number;
  account: Account;
  web3: Web3;

  /**
   * Name of the DLT
   */
  name: string = 'Ethereum';

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

    if (sdk.network === MAINNET) {
      this.chainId = 1;
    } else {
      this.chainId = 3;
    }
  }

  /**
   * Create an Ethereum account
   *
   * @return {Account} the new Ethereum account
   */
  createAccount(): Account {
    let web3Account = this.web3.eth.accounts.create();
    let thisAccount = {
      privateKey: web3Account.privateKey,
      address: web3Account.address,
      publicKey: "",
      password: "",
      provider: "",
    }
    return thisAccount;
  }

  /**
   * Set an account for signing transactions for a specific DLT
   *
   * @param {Account} accountInfo The standardised account information
   */
  setAccount(accountInfo: Account): void {
    if ((typeof accountInfo.privateKey === 'undefined')&&((typeof accountInfo.provider === 'undefined')||(typeof accountInfo.password === 'undefined')||(typeof accountInfo.address !== 'undefined'))){
      throw "either accountInfo.privateKey must be set (signing client side) or, accountInfo.provider AND accountInfo.password AND accountInfo.address must be set (signing via the node)";
    }
    let thisPrivateKey = "";
    let thisAddress = "";
    let thisPublicKey = "";
    let thisProvider = "";
    let thisPassword = "";
    if ((typeof accountInfo.privateKey !== 'undefined')){
      let web3Account = this.web3.eth.accounts.privateKeyToAccount(accountInfo.privateKey);
      thisPrivateKey = web3Account.privateKey;
      thisAddress = web3Account.address;
    } else if ((typeof accountInfo.provider !== 'undefined')&&(typeof accountInfo.password !== 'undefined')&&(typeof accountInfo.address !== 'undefined')){
      thisPrivateKey = "";
      thisAddress = accountInfo.address;
    }
    if ((typeof accountInfo.publicKey !== 'undefined')){
      thisPublicKey = accountInfo.publicKey;
    } else {
      thisPublicKey = "";
    }
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
}

export default Ethereum;
