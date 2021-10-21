/**
 */

/**
 * @memberof module:overledger-types
 */
type RefreshTokensResponse = {
  accessToken: string,
  refreshToken: string,
  idToken: string,
  expiresIn: number,
  tokenType: string,
};

export default RefreshTokensResponse;
