import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import {Account, PreparedTransaction, SubstratePreparedTransactionNativeData} from '@quantnetwork/overledger-types';
import log4js from 'log4js';
import {Keyring} from '@polkadot/api';
import {construct, deriveAddress, getRegistry, KeyringPair, methods} from '@substrate/txwrapper-polkadot';
import {EXTRINSIC_VERSION} from '@polkadot/types/extrinsic/v4/Extrinsic';
import {
  cryptoWaitReady,
  mnemonicGenerate,
} from "@polkadot/util-crypto";
import { u8aToHex } from "@polkadot/util";
import { unpack } from 'msgpackr';
import { decode } from "@substrate/txwrapper-polkadot";

/**
 * @memberof module:overledger-dlt-substrate
*/
const log = log4js.getLogger('Substrate');
log.level = 'info';
class Substrate extends AbstractDLT {
  account: Account;
  network: string; 
  substrateKeypair: KeyringPair;

  name: string = 'substrate';

  /**
   * @param {any} sdk - the sdk instance
   * @param {Object} options - any additional options to instantiate this dlt
   */
  constructor(sdk: any) {
    super(sdk);
    this.network = sdk.network;
  }

  /**
   * Create a Substrate account using curve sr25519
   * @return {Account} the new Substrate account
   */
  async createAccountSr25519(): Promise<Account> {

    await cryptoWaitReady();
    //substrate can handle keys generated with the ed25519, ecdsa & sr25519 curves.
    //but the signing curve must match the curve used when generating the account.
    const keyring = new Keyring({type: 'sr25519'});

    // Create mnemonic string for Alice using BIP39
    const mnemonic = mnemonicGenerate();
    const pair = keyring.createFromUri(mnemonic);

    // Create valid address
    let thisAddress;
    if (this.network.toLowerCase() === 'testnet') {
      thisAddress = pair.address;
    } else if (this.network.toLowerCase() === 'mainnet'){
      keyring.setSS58Format(0);
      thisAddress = pair.address;
      //add kusama later
    //}  else if (this.network.toLowerCase() === 'kusama mainnet'){
    //  keyring.setSS58Format(2);
    //  thisAddress = pair.address;
    } else {
      thisAddress = pair.address;
    }

      //private private key format not needed
    //const { publicKey, secretKey } = naclKeypairFromSeed(seed);

    return {
      privateKey: '',
      secret: mnemonic,
      address: thisAddress,
      publicKey: u8aToHex(pair.publicKey),
      password: '',
      provider: '',
    };

  }

  /**
   * Create a Substrate account using curve Secp256k1
   * @return {Account} the new Substrate account
   */
  async createAccount(): Promise<Account> {

    await cryptoWaitReady();
    //substrate can handle keys generated with the ed25519, ecdsa & sr25519 curves.
    //but the signing curve must match the curve used when generating the account.
    const keyring = new Keyring({type: 'ecdsa'});

    // Create mnemonic string for Alice using BIP39
    const mnemonic = mnemonicGenerate();
    const pair = keyring.createFromUri(mnemonic);

    // Create valid address
    let thisAddress;
    if (this.network.toLowerCase() === 'testnet') {
      thisAddress = pair.address;
    } else if (this.network.toLowerCase() === 'mainnet'){
      keyring.setSS58Format(0);
      thisAddress = pair.address;
      //add kusama later
    //}  else if (this.network.toLowerCase() === 'kusama mainnet'){
    //  keyring.setSS58Format(2);
    //  thisAddress = pair.address;
    } else {
      thisAddress = pair.address;
    }

      //private private key format not needed
    //const { publicKey, secretKey } = naclKeypairFromSeed(seed);

    return {
      privateKey: '',
      secret: mnemonic,
      address: thisAddress,
      publicKey: u8aToHex(pair.publicKey),
      password: '',
      provider: '',
    };

  }

  /**
   * Set an account for signing transactions for a specific DLT
   *
   * @param {Account} accountInfo The standardised account information
   */
  setAccount(accountInfo: Account): void {
    if ((typeof accountInfo.privateKey === 'undefined')&&(typeof accountInfo.secret === 'undefined')) {
      throw 'accountInfo.privateKey or accountInfo.secret must be set';
    }
    let thisSecret;
    if (typeof accountInfo.privateKey === 'undefined') {
      thisSecret = accountInfo.secret;
    } else {
      thisSecret = accountInfo.privateKey;
    } 
    //address and private key to be added later
    const thisAccount = {
      privateKey: '',
      secret: thisSecret,
      address: '',
      publicKey: '',
      provider: '',
      password: '',
    };
    this.account = thisAccount;
  }

  async signSr25519(unsignedTransaction: PreparedTransaction): Promise<string> {

    await cryptoWaitReady();
    //substrate can handle keys generated with the ed25519, ecdsa & sr25519 curves.
    //but the signing curve must match the curve used when generating the account.
    const keyring = new Keyring({ type: "sr25519" }); 
    // Some mnemonic phrase
    // Add an account, straight mnemonic
    this.substrateKeypair = keyring.addFromUri(this.account.secret);
    this.account.address = deriveAddress(this.substrateKeypair.publicKey, 0);
    this.account.publicKey = u8aToHex(this.substrateKeypair.publicKey);

    const nativeData = unsignedTransaction.nativeData as SubstratePreparedTransactionNativeData;
    const value = nativeData.value;
    const dest = nativeData.dest;

    const specVersion = nativeData.runtimeVersion.specVersion;
    const transactionVersion = nativeData.runtimeVersion.transactionVersion;
    const specName = nativeData.runtimeVersion.specName;

    const metadataBuffer = Buffer.from(nativeData.metadata,"base64");
    let data = unpack(metadataBuffer);
    
    const metadataRpc = data;

    const nonce = nativeData.nonce as number;
    const blockHash = nativeData.blockHash;
    const blockNumber = nativeData.blockNumber;
    const genesisHash = nativeData.genesisHash;

    const registry = getRegistry({
                                   chainName: 'Polkadot',
                                   specName,
                                   specVersion,
                                   metadataRpc
                                 });

    const unsigned = methods.balances.transferKeepAlive(
        {
          value: value,
          dest: dest,
        },
        {
          address: this.account.address,
          blockHash,
          blockNumber: registry.createType('BlockNumber', blockNumber).toNumber(),
          eraPeriod: 50,
          genesisHash,
          metadataRpc,
          nonce: nonce,
          specVersion,
          tip: 0,
          transactionVersion,
        },
        {
          metadataRpc,
          registry,
        }
    );

    const signingPayload = construct.signingPayload(unsigned, {registry});

    const {signature} = registry
        .createType('ExtrinsicPayload', signingPayload, {
          version: EXTRINSIC_VERSION,
        })
        .sign(this.substrateKeypair);

    const signedTransaction = construct.signedTx(unsigned, signature, {
      metadataRpc,
      registry,
    });

    return Promise.resolve(signedTransaction);
  }

  async sign(unsignedTransaction: PreparedTransaction): Promise<string> {

    await cryptoWaitReady();
    console.log("Signing via ecdsa");
    //substrate can handle keys generated with the ed25519, ecdsa & sr25519 curves.
    //but the signing curve must match the curve used when generating the account.
    const keyring = new Keyring({ type: "ecdsa" }); 
    // Some mnemonic phrase
    // Add an account, straight mnemonic
    this.substrateKeypair = keyring.addFromUri(this.account.secret);
    this.account.address = deriveAddress(this.substrateKeypair.publicKey, 0);
    this.account.publicKey = u8aToHex(this.substrateKeypair.publicKey);

    const nativeData = unsignedTransaction.nativeData as SubstratePreparedTransactionNativeData;
    const value = nativeData.value;
    const dest = nativeData.dest;

    const specVersion = nativeData.runtimeVersion.specVersion;
    const transactionVersion = nativeData.runtimeVersion.transactionVersion;
    const specName = nativeData.runtimeVersion.specName;

    const metadataBuffer = Buffer.from(nativeData.metadata,"base64");
    let data = unpack(metadataBuffer);
    
    const metadataRpc = data;

    const nonce = nativeData.nonce as number;
    const blockHash = nativeData.blockHash;
    const blockNumber = nativeData.blockNumber;
    const genesisHash = nativeData.genesisHash;

    const registry = getRegistry({
                                   chainName: 'Polkadot',
                                   specName,
                                   specVersion,
                                   metadataRpc
                                 });

    const unsigned = methods.balances.transferKeepAlive(
        {
          value: value,
          dest: dest,
        },
        {
          address: '5EUBZqkHXLy5QuYYtHigvZQ79nbSnJoLAGHNXgyswnkN6prs',
          blockHash,
          blockNumber: registry.createType('BlockNumber', blockNumber).toNumber(),
          eraPeriod: 50,
          genesisHash,
          metadataRpc,
          nonce: nonce,
          specVersion,
          tip: 0,
          transactionVersion,
        },
        {
          metadataRpc,
          registry,
        }
    );

    const signingPayload = construct.signingPayload(unsigned, {registry});

    const {signature} = registry
        .createType('ExtrinsicPayload', signingPayload, {
          version: EXTRINSIC_VERSION,
        })
        .sign(this.substrateKeypair);

    const signedTransaction = construct.signedTx(unsigned, signature, {
      metadataRpc,
      registry,
    });

    // Decode a signed tx
    const txInfo = decode(signedTransaction, { metadataRpc, registry });
    console.log('txInfo keys: ' + Object.keys(txInfo));
    console.log('txInfo address: ' + JSON.stringify(txInfo.address));
    console.log('txInfo eraPeriod: ' + JSON.stringify(txInfo.eraPeriod));
    console.log('txInfo method: ' + JSON.stringify(txInfo.method));
    console.log('txInfo nonce: ' + JSON.stringify(txInfo.nonce));
    console.log('txInfo tip: ' + JSON.stringify(txInfo.tip));

    //const txHash = getTxHash(signedTransaction);
    //console.log('txInfo: ' + JSON.stringify(txHash));

    return Promise.resolve(signedTransaction);
  }
}


export default Substrate;
