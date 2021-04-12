import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import Provider, { TESTNET } from '@quantnetwork/overledger-provider';
import { NetworkOptions, DLTOptions, SDKOptions, EchoRequest, PreparedTransaction, SignedPreparedTransaction, RefreshTokensResponse } from '@quantnetwork/overledger-types';
import { AxiosInstance, AxiosPromise } from "axios";
import log4js from 'log4js';
import CognitoProvider from '../../overledger-aws-provider/dist';

/**
 * **
 * @memberof module:overledger-core
 */
const log = log4js.getLogger('OverledgerSDK');
log.level = "info";
class OverledgerSDK {
    /**
     * The object storing the DLTs loaded by the Overledger SDK
     */
    dlts: { [key: string]: AbstractDLT } = {};
    network: NetworkOptions;
    provider: Provider;
    request: AxiosInstance;
    cognitoProvider: CognitoProvider;


    /**
     * Create the Overledger SDK
     *
     * @constructor
     * @param {SDKOptions} options The DLT Options and Provider Options
     */
    constructor(options: SDKOptions) {
        this.network = options.provider && options.provider.network || TESTNET;

        this.validateOptions(options);

        options.dlts.forEach((dltConfig: DLTOptions) => {
            const dlt = this.loadDlt(dltConfig);
            this.dlts[dlt.name] = dlt;
        });

        this.provider = new Provider(options.provider);
        this.cognitoProvider = new CognitoProvider(options.userPoolID);

        let secureEnv = require('secure-env');
        process.env = secureEnv({secret: options.envPassword});

    }

    /**
     * Validate the provided Overledger SDK Options
     *
     * @param {SDKOptions} options The DLT Options and Provider Options
     */
    private validateOptions(options: SDKOptions): void {
        if (!options.dlts) {
            throw new Error('The dlts are missing');
        }
    }

    /**
     * Load the DLT in the Overledger SDK
     *
     * @param {DLTOptions} config DLT name and an optional Private Key to use as the main account
     *
     * @return {AbstractDLT} The loaded DLT class
     */
    private loadDlt(config: DLTOptions): AbstractDLT {

        const dltName = `overledger-dlt-${config.dlt}`;
        try {
            const provider = require(`@quantnetwork/${dltName}`).default;

            return new provider(this, config);
        } catch (error) {
            if (error.code === 'MODULE_NOT_FOUND') {
                throw `Could not find the package for this DLT. Please install @quantnetwork/${dltName} manually.`;
            }
        }
    }

    /**
     * Calls echoecho endpoint, just used to see if things connect
     * @param echoRequest
     */
    public getEcho(echoRequest: EchoRequest, accessToken?:string, pathToCall?:string): Object {
        log.info("getEcho: " + echoRequest + ", " + accessToken + ", " + pathToCall);
        let echoRequestJson = JSON.stringify(echoRequest);
        log.info("echoRequestJson: " + echoRequestJson);

        this.request = this.provider.createRequest(accessToken, undefined);

        return this.request.post(pathToCall==undefined?'/echoecho':pathToCall, echoRequestJson);
    }

    /**
     * refresh access token
     */
    public refreshAccessToken(client_id: string, client_secret: string, refresh_token: string, pathToCall?: string): AxiosPromise<Object> {
        log.info("refreshAccessToken: " + client_id + ", " + client_secret + ", " + refresh_token + ", " + pathToCall);

        this.request = this.provider.createRequest(undefined, "application/x-www-form-urlencoded");

        const params = new URLSearchParams()
        params.append('grant_type', 'refresh_token')
        params.append('client_id', client_id)
        params.append('client_secret', client_secret)
        params.append('refresh_token', refresh_token)

        return this.request.post(pathToCall==undefined?"/oauth2/token":pathToCall, params);
    }


    /**
     * get new set of tokens using clientId, username and password
     */
    public async getTokensUsingClientIdAndSecret(client_id: string, username: string, password: string): Promise<RefreshTokensResponse> {
        const refreshExpiredTokensResult = await this.cognitoProvider.performSRPAuthentication(username, password, client_id);

        return {
            accessToken: refreshExpiredTokensResult.accessToken,
            refreshToken: refreshExpiredTokensResult.refreshToken,
            idToken: refreshExpiredTokensResult.idToken,
        };
    }

    /**
     * Signing a prepared object
     * @param unsignedData
     */
    public async sign(dltName: string, unsignedData: PreparedTransaction): Promise<SignedPreparedTransaction> {

        const signedTransaction = await this.dlts[dltName].sign(unsignedData);

        return {
            signedTransaction: signedTransaction,
        };
    }

}

export default OverledgerSDK;

