import * as bitcoin from 'bitcoinjs-lib';
import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import { Account, PreparedTransaction } from '@quantnetwork/overledger-types';
import log4js from 'log4js';
import {Keyring} from '@polkadot/api';
import {construct, decode, deriveAddress, getRegistry, KeyringPair, methods, PolkadotSS58Format} from '@substrate/txwrapper-polkadot';
import {BlockNumber} from '@polkadot/types/interfaces';
import {EXTRINSIC_VERSION} from '@polkadot/types/extrinsic/v4/Extrinsic';

/**
 * @memberof module:overledger-dlt-bitcoin
*/
const log = log4js.getLogger('Substract');
log.level = 'info';
class Substract extends AbstractDLT {
  addressType: bitcoin.Network;
  account: Account;
  substractKeypair: KeyringPair;

  /**
   * @param {any} sdk - the sdk instance
   * @param {Object} options - any additional options to instantiate this dlt
   */
  constructor(sdk: any) {
    super(sdk);
  }

  /**
   * Create a Substract account
   *
   * @return {Account} the new Substract account
   */
  createAccount(): Account {
    return {
      privateKey: '',
      address: '',
      publicKey: '',
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
    if (typeof accountInfo.privateKey === 'undefined') {
      throw 'accountInfo.privateKey must be set';
    }

    const keyring = new Keyring({ type: "sr25519" });
    // Some mnemonic phrase
    // Add an account, straight mnemonic
    this.substractKeypair = keyring.addFromUri(accountInfo.privateKey);

    const thisAccount = {
      privateKey: '',
      address: this.substractKeypair.address,
      publicKey: '',
      provider: '',
      password: '',

    };
    this.account = thisAccount;
  }

  sign(unsignedTransaction: PreparedTransaction): Promise<string> {
    const value = unsignedTransaction.nativeData.value;
    const dest = unsignedTransaction.nativeData.dest;

    const specVersion = unsignedTransaction.nativeData.runtimeVersion.specVersion;
    const transactionVersion = unsignedTransaction.nativeData.runtimeVersion.transactionVersion;
    const specName = unsignedTransaction.nativeData.runtimeVersion.specName;

    const metadataRpc = unsignedTransaction.nativeData.metadataRpc;

    const nonce = unsignedTransaction.nativeData.nonce;
    const blockHash = unsignedTransaction.nativeData.blockHash;
    const blockNumber = unsignedTransaction.nativeData.blockNumber;
    const genesisHash = unsignedTransaction.nativeData.genesisHash;

    const registry = getRegistry({
      chainName: 'Polkadot',
      specName,
      specVersion,
      metadataRpc
    });

    const unsigned = methods.balances.transferKeepAlive(
        {
          value: value,
          dest: dest, // Bob
        },
        {
          address: deriveAddress(this.substractKeypair.publicKey, PolkadotSS58Format.polkadot),
          blockHash,
          blockNumber: (registry
              .createType('BlockNumber',blockNumber) as unknown as BlockNumber).toNumber(),
          eraPeriod: 50,
          genesisHash,
          metadataRpc,
          nonce: nonce.toNumber(),
          specVersion,
          tip: 0,
          transactionVersion,
        },
        {
          metadataRpc,
          registry,
        }
    );

    const signingPayload = construct.signingPayload(unsigned, { registry });
    // Decode the information from a signing payload.
    const payloadInfo = decode(signingPayload, {
      metadataRpc,
      registry,
    });
    console.log(
        `\nDecoded Transaction\n  To: ${
            (payloadInfo.method.args.dest as { id: string })?.id
        }\n` + `  Amount: ${payloadInfo.method.args.value}`
    );

    const { signature } = registry
        .createType('ExtrinsicPayload', signingPayload, {
          version: EXTRINSIC_VERSION,
        })
        .sign(this.substractKeypair);

    const signedTransaction = construct.signedTx(unsigned, signature, {
      metadataRpc,
      registry,
    });

    return signedTransaction;
  }
}

export default Substract;
