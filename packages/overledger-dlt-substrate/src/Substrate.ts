import * as bitcoin from 'bitcoinjs-lib';
import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import {Account, PreparedTransaction, SubstratePreparedTransactionNativeData} from '@quantnetwork/overledger-types';
import log4js from 'log4js';
import {Keyring} from '@polkadot/api';
import {construct, deriveAddress, getRegistry, KeyringPair, methods, PolkadotSS58Format} from '@substrate/txwrapper-polkadot';
import {BlockNumber} from '@polkadot/types/interfaces';
import {EXTRINSIC_VERSION} from '@polkadot/types/extrinsic/v4/Extrinsic';
import { cryptoWaitReady } from '@polkadot/util-crypto';

/**
 * @memberof module:overledger-dlt-substrate
*/
const log = log4js.getLogger('Substrate');
log.level = 'info';
class Substrate extends AbstractDLT {
  addressType: bitcoin.Network;
  account: Account;
  substrateKeypair: KeyringPair;

  name: string = 'substrate';

  /**
   * @param {any} sdk - the sdk instance
   * @param {Object} options - any additional options to instantiate this dlt
   */
  constructor(sdk: any) {
    super(sdk);
  }

  /**
   * Create a Substrate account
   *
   * @return {Account} the new Substrate account
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

    const thisAccount = {
      privateKey: accountInfo.privateKey,
      address: '',
      publicKey: '',
      provider: '',
      password: '',

    };
    this.account = thisAccount;
  }

  async sign(unsignedTransaction: PreparedTransaction): Promise<string> {

    await cryptoWaitReady();
    const keyring = new Keyring({ type: "sr25519" });
    // Some mnemonic phrase
    // Add an account, straight mnemonic
    this.substrateKeypair = keyring.addFromUri(this.account.privateKey);

    const nativeData = unsignedTransaction.nativeData as SubstratePreparedTransactionNativeData;
    const value = nativeData.value;
    const dest = nativeData.dest;

    const specVersion = nativeData.runtimeVersion.specVersion;
    const transactionVersion = nativeData.runtimeVersion.transactionVersion;
    const specName = nativeData.runtimeVersion.specName;

    const metadataRpc = nativeData.metadata;

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
          address: deriveAddress(this.substrateKeypair.publicKey, PolkadotSS58Format.polkadot),
          blockHash,
          blockNumber: (registry
              .createType('BlockNumber', blockNumber) as unknown as BlockNumber).toNumber(),
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
}

export default Substrate;
