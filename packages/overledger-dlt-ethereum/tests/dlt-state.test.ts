import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

const sdkOptions = {
    dlts: [{ dlt: DltNameOptions.ETHEREUM },],
    userPoolID: 'us-east-1_xfjNg5Nv9', //your userpool id
    provider: { network: 'https://api.sandbox.overledger.io/v2' }
};

let address = "0x650A87cfB9165C9F4Ccc7B971D971f50f753e761";

describe('Integration Tests:', () => {

    beforeAll(async() => {
        jest.setTimeout(10000);
      });
    

    test('Can get address balance via prep-execute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(process.env.USER_NAME, process.env.PASSWORD,
                process.env.CLIENT_ID, process.env.CLIENT_SECRET);   
                const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 

            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Ethereum",
                    "network": "Ropsten Testnet"
                }
            }
            const overledgerResponse = await overledgerInstance.post("/preparation/search/address/balance/" + address,overledgerRequest);
            //typeof checks
            expect(typeof overledgerResponse.data.requestId).toBe('string');
            expect(typeof overledgerResponse.data.gatewayFee.amount).toBe('string');
            expect(typeof overledgerResponse.data.gatewayFee.unit).toBe('string');
            //data checks
            expect(overledgerResponse.data.requestId.length).toBeGreaterThan(20);
            expect(overledgerResponse.data.gatewayFee.amount.length).toBeGreaterThan(0);
            expect(parseInt(overledgerResponse.data.gatewayFee.amount)).toBeGreaterThanOrEqual(0);
            expect(overledgerResponse.data.gatewayFee.unit.length).toBeGreaterThan(2);

            const overledgerResponse2 = await overledgerInstance.post("/execution/search/address/balance?requestId="+overledgerResponse.data.requestId);
            //typeof checks
            expect(typeof overledgerResponse2.data.location.technology).toBe('string');
            expect(typeof overledgerResponse2.data.location.network).toBe('string');
            expect(typeof overledgerResponse2.data.balances[0].unit).toBe('string');
            //balances.value instead of balances.amount
            //addressId is in the wrong place
            expect(overledgerResponse2.data.location.technology).toEqual('Ethereum');
            expect(overledgerResponse2.data.location.network).toEqual('ropsten testnet');
            expect(overledgerResponse2.data.balances[0].unit).toEqual('ETH');
            //balances.value instead of balances.amount
            //addressId is in the wrong place
        }

    });

    test('Can get address sequence via prep-execute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(process.env.USER_NAME, process.env.PASSWORD,
                process.env.CLIENT_ID, process.env.CLIENT_SECRET);   
                const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 

            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Ethereum",
                    "network": "Ropsten Testnet"
                }
            }
            const overledgerResponse = await overledgerInstance.post("/preparation/search/address/sequence/" + address,overledgerRequest);
            //typeof checks
            expect(typeof overledgerResponse.data.requestId).toBe('string');
            expect(typeof overledgerResponse.data.gatewayFee.amount).toBe('string');
            expect(typeof overledgerResponse.data.gatewayFee.unit).toBe('string');
            //data checks
            expect(overledgerResponse.data.requestId.length).toBeGreaterThan(20);
            expect(overledgerResponse.data.gatewayFee.amount.length).toBeGreaterThan(0);
            expect(parseInt(overledgerResponse.data.gatewayFee.amount)).toBeGreaterThanOrEqual(0);
            expect(overledgerResponse.data.gatewayFee.unit.length).toBeGreaterThan(2);

            const overledgerResponse2 = await overledgerInstance.post("/execution/search/block?requestId="+overledgerResponse.data.requestId);
            //typeof checks
                //typeof checks
                expect(typeof overledgerResponse2.data.location.technology).toBe('string');
                expect(typeof overledgerResponse2.data.location.network).toBe('string');
                expect(typeof overledgerResponse2.data.sequence).toBe('string');
                expect(typeof overledgerResponse2.data.addressId).toBe('string');
            //data checks
                expect(overledgerResponse2.data.location.technology).toEqual('Ethereum');
                expect(overledgerResponse2.data.location.network).toEqual('ropsten testnet');
                expect(parseInt(overledgerResponse2.data.sequence)).toBeGreaterThan(0);
                expect(overledgerResponse2.data.addressId.length).toEqual(42);      
        }
    });


    test('Can get address balance via autoexecute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(process.env.USER_NAME, process.env.PASSWORD,
                process.env.CLIENT_ID, process.env.CLIENT_SECRET);   
                const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 

            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Ethereum",
                    "network": "Ropsten Testnet"
                }
            }
            const overledgerResponse2 = await overledgerInstance.post("/autoexecution/search/address/balance/" + address,overledgerRequest);
            //typeof checks
            expect(typeof overledgerResponse2.data.location.technology).toBe('string');
            expect(typeof overledgerResponse2.data.location.network).toBe('string');
            expect(typeof overledgerResponse2.data.balances[0].unit).toBe('string');
            expect(typeof overledgerResponse2.data.balances[0].amount).toBe('string');
            expect(typeof overledgerResponse2.data.addressId).toBe('string');
            //addressId is in the wrong place
            expect(overledgerResponse2.data.location.technology).toEqual('Ethereum');
            expect(overledgerResponse2.data.location.network).toEqual('ropsten testnet');
            expect(overledgerResponse2.data.balances[0].unit).toEqual('ETH');
            expect(parseInt(overledgerResponse2.data.balances[0].amount)).toBeGreaterThanOrEqual(0);
            //balances.value instead of balances.amount
            //addressId is in the wrong place
        }

    });

    test('Can get address sequence via autoexecute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(process.env.USER_NAME, process.env.PASSWORD,
                process.env.CLIENT_ID, process.env.CLIENT_SECRET);   
                const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 

            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Ethereum",
                    "network": "Ropsten Testnet"
                }
            }
            const overledgerResponse2 = await overledgerInstance.post("/autoexecution/search/address/sequence/" + address,overledgerRequest);
                //typeof checks
                expect(typeof overledgerResponse2.data.location.technology).toBe('string');
                expect(typeof overledgerResponse2.data.location.network).toBe('string');
                expect(typeof overledgerResponse2.data.sequence).toBe('string');
                expect(typeof overledgerResponse2.data.addressId).toBe('string');
            //data checks
                expect(overledgerResponse2.data.location.technology).toEqual('Ethereum');
                expect(overledgerResponse2.data.location.network).toEqual('ropsten testnet');
                expect(parseInt(overledgerResponse2.data.sequence)).toBeGreaterThan(0);
                expect(overledgerResponse2.data.addressId.length).toEqual(42);      
        }
    });



});
