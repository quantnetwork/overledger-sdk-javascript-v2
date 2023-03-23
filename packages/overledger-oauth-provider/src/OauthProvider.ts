import log4js from 'log4js';
import { RefreshTokensResponse } from '@quantnetwork/overledger-types';
import axios from 'axios';

/**
 * @memberof module:overledger-provider
 */
const log = log4js.getLogger('OauthProvider');
log.level = 'info';

class OauthProvider {

  constructor() { }

  // @ts-ignore keeping unused parameters username and password for backwards compatibility
  public async getNewSetOfTokens(username: string, password: string, clientId: string, clientSecret: string): Promise<RefreshTokensResponse> {
    try {
      const params = new URLSearchParams({ grant_type: 'client_credentials' });
      const response = await axios.request({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        baseURL: 'https://auth.overledger.io',
        url: 'oauth2/token',
        auth: {
          username: clientId,
          password: clientSecret,
        },
        data: params,
      });
      const refreshTokensResponse: RefreshTokensResponse = {
        accessToken: response.data.access_token,
        refreshToken: '',
        idToken: '',
        expiresIn: response.data.expires_in,
        tokenType: response.data.token_type,
      }
      return refreshTokensResponse;
    } catch (err) {
      log.error(JSON.stringify(err, null, 2));
    }
  }
}

export default OauthProvider;
