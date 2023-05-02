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
import { unpack } from 'msgpackr';
import { decode } from "@substrate/txwrapper-polkadot";
import { EcdsaSigAsnParse } from "./helper_function";
import  { u8aToHex, u8aConcat, bnToU8a } from '@polkadot/util';
import { hasher } from './hasher';
import * as secp from '@noble/secp256k1';
import BN from 'bn.js';
const TYPE_PREFIX = {
  ecdsa: new Uint8Array([2]),
  ed25519: new Uint8Array([0]),
  ethereum: new Uint8Array([2]),
  sr25519: new Uint8Array([1])
};

//type HashType = 'blake2' | 'keccak';
const BN_BE_256_OPTS = { bitLength: 256, isLe: false };

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

  async signAWSStyle(unsignedTransaction: PreparedTransaction): Promise<string> {

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

    //NEW CODE MOCKING AWS INTERACTION FROM HERE
    const encodedHash = hasher('blake2', signingPayload);
    //const encodedHashBuffer = Buffer.from(encodedHash);
    console.log("mock sign the payload with aws KMS");
    const msgHash = encodedHash;
    const privKey = this.account.privateKey;
    const pubKey = secp.getPublicKey(privKey); // Make pubkey from the private key
    console.log("msgHash: " + msgHash);
    console.log("privKey: " + privKey);
    console.log("pubKey: " + pubKey);
    const signature = await secp.signAsync(msgHash, privKey); // sign
    console.log("signature: " + signature);
    const isValid = secp.verify(signature, msgHash, pubKey); // verify
    console.log("isValid: " + isValid);

    if (signature == undefined) {
      throw "Error: Signature is undefined";
    }

    console.log("decoding the signature");
    const decoded = EcdsaSigAsnParse.decode(signature, "der");
    console.log(`kms signature: ${JSON.stringify(decoded)}`);

    const r = decoded.r;
    let s = decoded.s;
    console.log("r: " + r.toString('hex'));
    console.log("s: " + s.toString('hex'));
    
    console.log("calculating the signature to get r and s");
    const secp256k1N = new BN("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", 16);
    
    console.log("half of the curve");
    const secp256k1halfN = secp256k1N.div(new BN(2));

    // According to EIP2 https://github.com/ethereum/EIPs/blob/master/EIPS/eip-2.md
    // not all elliptic curve signatures are accepted
    // the value of s needs to be SMALLER than half of the curve
    // i.e. we need to flip s if it's greater than half of the curve
    if (s.gt(secp256k1halfN)) {
        s = secp256k1N.sub(s);
        console.debug("new s: " + s.toString('hex'));
    }

    console.log("Construct signature");
    console.log("get the public key from the created master key pair");
    //from 
   // const publicKey = '0x022c57b36335b55119897542630ee695bd80b64fa09cc0abd2423654d329ed3c9a'; 

    //const publicKeyBuffer = publicKey as Buffer;
    //let ethAddr = getEvmAddress(publicKeyBuffer);
    //let recoveredPubAddr = findRightKey(encodedHashBuffer, r, s, ethAddr);
    const v = 0;
    //console.debug("v: " + recoveredPubAddr.v);


    console.log('Concatenating r,s and v');
    const secp256k1_signature = u8aConcat(
        bnToU8a(r.toBuffer(), BN_BE_256_OPTS),
        bnToU8a(s.toBuffer(), BN_BE_256_OPTS),
        new Uint8Array([v])
    );

    const signatureBuild = u8aConcat(TYPE_PREFIX["ecdsa"], secp256k1_signature);
    
    console.debug("Construct the signed transaction");
    const signedTransaction = construct.signedTx(unsigned, `${u8aToHex(signatureBuild)}`, {
        metadataRpc,
        registry
    });

    // const decode_signedTransaction = decode(signedTransaction, {metadataRpc, registry});

    console.debug("Derive the transaction hash of the signed transaction");
    const hashSignedTx = construct.txHash(signedTransaction);

   // const response = {
    //    "signed_tx_payload": signedTransaction,
   //    "signed_tx_hash": hashSignedTx,
        // "decode_signedTransaction": decode_signedTransaction,
        // "isValidSignature - valid?": isValidSignature(encodedHash, `${u8aToHex(signature)}`, address),
        // "kecp256k1Verify - valid?": secp256k1Verify(signingPayload, `${u8aToHex(secp256k1_signature)}`, ethAddr)
   // };
    console.log('signedTransaction: ' + JSON.stringify(signedTransaction));
    console.log('hashSignedTx: ' + JSON.stringify(hashSignedTx));
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
