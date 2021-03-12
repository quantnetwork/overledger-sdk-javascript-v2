import { NetworkOptions, ProviderOptions } from '@quantnetwork/overledger-types';

export const TESTNET: NetworkOptions = 'testnet';
export const MAINNET: NetworkOptions = 'mainnet';

/**
 * @memberof module:overledger-provider
 */
class Provider {
  options: ProviderOptions;
  network: NetworkOptions;

  /**
   * @param {string} mappId The Multi-chain Application ID
   * @param {string} bpiKey The Overledger Blockchain Programming Interface license key
   * @param {ProviderOptions} ProviderOptions Overledger network provider options
   */
  constructor(options: ProviderOptions = {}) {
    this.options = options;
    this.network = this.options.network || TESTNET;
  }
}

export default Provider;

