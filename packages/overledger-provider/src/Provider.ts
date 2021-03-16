import { NetworkOptions, ProviderOptions } from '@quantnetwork/overledger-types';
import axios, {AxiosInstance} from 'axios';
import log4js from 'log4js';
export const TESTNET: NetworkOptions = 'testnet';
export const MAINNET: NetworkOptions = 'mainnet';

/**
 * @memberof module:overledger-provider
 */
const log = log4js.getLogger('Provider');
log.level = "info";
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
  createRequest(accessToken?: string, contentType?: string, acceptString? :string): AxiosInstance {
    log.info("createRequest: " + accessToken + ", " + contentType + ", " + acceptString);

    let overledgerUri: string;

    if (this.network === TESTNET) {
      overledgerUri = 'https://api.testnet.overledger.io/v2';
    }  else if (this.network === MAINNET) {
      overledgerUri = 'https://api.overledger.io/v2';
    } else {
      overledgerUri = this.network;
    }

    const baseUrl: string = overledgerUri;
    log.info("baseUrl: " + baseUrl);

    let headersString = accessToken ? { 'Authorization': `Bearer ${accessToken}`, 'Content-type': contentType || 'application/json' ,
      'Accept': acceptString || 'application/json', } : { 'Content-type': contentType || 'application/json', 'Accept': acceptString || 'application/json', };

    log.info("headersString: " + JSON.stringify(headersString));

    return axios.create({
      baseURL: baseUrl,
      timeout: this.options.timeout || 5000,
      headers: headersString,
    });
  }

}

export default Provider;

