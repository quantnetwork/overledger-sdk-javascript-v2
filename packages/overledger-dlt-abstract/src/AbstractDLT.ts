import { Account, PreparedTransaction } from '@quantnetwork/overledger-types';
import { AxiosPromise } from 'axios';

/**
 * @memberof module:overledger-dlt-abstract
*/
abstract class AbstractDLT {
  name: string;
  sdk: any;
  options: Object;

  account?: Account;

  /**
   * @param {any} sdk
   */
  constructor(sdk: any) {
    this.sdk = sdk;
  }

  /**
   * Create an account for a specific DLT
   *
   * Abstract method to be implemented in each DLT
   * @return {Account}
   */
  public createAccount(): Account {
    throw new Error('createAccount: abstract method must be implemented');
  }

  /**
   * Set an account for signing transactions for a specific DLT
   *
   * Abstract method to be implemented in each DLT
   * @param {Account} AccountInfo The standardised Account Object
   */
  public setAccount(_accountInfo: Account): void {
    throw new Error('setAccount: abstract method must be implemented');
  }

  /**
   */
  public getEcho(request: string, accessToken?: string): AxiosPromise<Object> {
    return this.sdk.getEcho(request, accessToken);
  }

  abstract sign(unsignedTransaction: PreparedTransaction): Promise<string>;

}

export default AbstractDLT;
