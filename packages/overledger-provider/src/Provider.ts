import { NetworkOptions, ProviderOptions } from '@quantnetwork/overledger-types';
import axios, {AxiosInstance} from 'axios';
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

  /**
   *
   *
   * @param {string} path Request endpoint resource path
   */
  createRequest(path?: string): AxiosInstance {
    let overledgerUri: string;

    if (this.network === TESTNET) {
      overledgerUri = 'https://api.testnet.overledger.io/v2';
    }  else if (this.network === MAINNET) {
      overledgerUri = 'https://api.overledger.io/v2';
    } else {
      overledgerUri = this.network;
    }

    const baseUrl: string = path ? overledgerUri + path : overledgerUri;

    //TODO: Following code will need to be modified once we have the OAuth2 in place, i am hardcoding the authorization header value with the v1 values
    return axios.create({
      baseURL: baseUrl,
      timeout: this.options.timeout || 5000,
      headers: {
        Authorization: `Bearer network.quant.devnet:quantbpikey`,
        'Content-type': 'application/json',
      },
    });
  }
}

export default Provider;

