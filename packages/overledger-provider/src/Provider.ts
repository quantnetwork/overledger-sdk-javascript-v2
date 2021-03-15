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
   * Creating a request, making this as flexible as possible with the possible values in the headers being passed in the method signature
   * @param path
   * @param accessToken
   * @param contentType
   * @param acceptString
   */
  createRequest(path?: string, accessToken?: string, contentType?: string, acceptString? :string): AxiosInstance {
    let overledgerUri: string;

    if (this.network === TESTNET) {
      overledgerUri = 'https://api.testnet.overledger.io/v2';
    }  else if (this.network === MAINNET) {
      overledgerUri = 'https://api.overledger.io/v2';
    } else {
      overledgerUri = this.network;
    }

    console.log(accessToken);
    const baseUrl: string = path ? overledgerUri + path : overledgerUri;

    let headersString = accessToken ? { 'Authorization': `Bearer ${accessToken}`, 'Content-type': contentType || 'application/json' ,
      'Accept': acceptString || 'application/json', } : { 'Content-type': contentType || 'application/json', 'Accept': acceptString || 'application/json', };

    return axios.create({
      baseURL: baseUrl,
      timeout: this.options.timeout || 5000,
      headers: headersString,
    });
  }

}

export default Provider;

