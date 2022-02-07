import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

const sdkOptions = {
    dlts: [{ dlt: DltNameOptions.XRP_LEDGER },],
    userPoolID: process.env.USER_POOL_ID, //your userpool id
    provider: { network: process.env.NETWORK }
};

let address = "rKoGTTkPefCuQR31UHsfk9jKnrQHz6LtKe";

describe('Integration Tests:', () => {

    beforeAll(async() => {
        var start = new Date().getTime();
        while (new Date().getTime() < start + 1000);
      },1000);
    

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
                    "technology": "XRP Ledger",
                    "network": "Testnet"
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
                //XRP ledger location different here to in block response
            //expect(overledgerResponse2.data.location.technology).toEqual('XRP Ledger');
            expect(overledgerResponse2.data.location.network).toEqual('testnet');
            expect(overledgerResponse2.data.balances[0].unit).toEqual('XRP');
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
                    "technology": "XRP Ledger",
                    "network": "Testnet"
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

            const overledgerResponse2 = await overledgerInstance.post("/execution/search/address/sequence?requestId="+overledgerResponse.data.requestId);
            //typeof checks
                //typeof checks
                expect(typeof overledgerResponse2.data.location.technology).toBe('string');
                expect(typeof overledgerResponse2.data.location.network).toBe('string');
                expect(typeof overledgerResponse2.data.sequence).toBe('string');
                expect(typeof overledgerResponse2.data.addressId).toBe('string');
            //data checks
                            //XRP ledger location different here to in block response
                //expect(overledgerResponse2.data.location.technology).toEqual('XRP Ledger');
                expect(overledgerResponse2.data.location.network).toEqual('testnet');
                expect(parseInt(overledgerResponse2.data.sequence)).toBeGreaterThan(0);
                expect(overledgerResponse2.data.addressId.length).toBeGreaterThanOrEqual(25);     
                expect(overledgerResponse2.data.addressId.length).toBeLessThanOrEqual(35);
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
                    "technology": "XRP Ledger",
                    "network": "Testnet"
                }
            }
            const overledgerResponse2 = await overledgerInstance.post("/autoexecution/search/address/balance/" + address,overledgerRequest);
            //typeof checks
                //location object not yet in autoexecute
            //expect(typeof overledgerResponse2.data.executionAddressBalanceSearchResponse.location.technology).toBe('string');
            //expect(typeof overledgerResponse2.data.executionAddressBalanceSearchResponse.location.network).toBe('string');
            expect(typeof overledgerResponse2.data.executionAddressBalanceSearchResponse.balances[0].unit).toBe('string');
                //balance amount format needs to be changed
            //expect(typeof overledgerResponse2.data.executionAddressBalanceSearchResponse.balances[0].amount).toBe('string');
            expect(typeof overledgerResponse2.data.executionAddressBalanceSearchResponse.addressId).toBe('string');
            //addressId is in the wrong place
                                //XRP ledger location different here to in block response
            //expect(overledgerResponse2.data.executionAddressBalanceSearchResponse.location.technology).toEqual('XRP Ledger');
            //expect(overledgerResponse2.data.executionAddressBalanceSearchResponse.location.network).toEqual('testnet');
            expect(overledgerResponse2.data.executionAddressBalanceSearchResponse.balances[0].unit).toEqual('XRP');
                //balance amount format needs to be changed
            //expect(parseInt(overledgerResponse2.data.executionAddressBalanceSearchResponse.balances[0].amount)).toBeGreaterThanOrEqual(0);
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
                    "technology": "XRP Ledger",
                    "network": "Testnet"
                }
            }
            const overledgerResponse2 = await overledgerInstance.post("/autoexecution/search/address/sequence/" + address,overledgerRequest);
                //typeof checks
                expect(typeof overledgerResponse2.data.executionAddressSequenceSearchResponse.location.technology).toBe('string');
                expect(typeof overledgerResponse2.data.executionAddressSequenceSearchResponse.location.network).toBe('string');
                expect(typeof overledgerResponse2.data.executionAddressSequenceSearchResponse.sequence).toBe('string');
                expect(typeof overledgerResponse2.data.executionAddressSequenceSearchResponse.addressId).toBe('string');
            //data checks
                                    //XRP ledger location different here to in block response
                //expect(overledgerResponse2.data.executionAddressSequenceSearchResponse.location.technology).toEqual('XRP Ledger');
                expect(overledgerResponse2.data.executionAddressSequenceSearchResponse.location.network).toEqual('testnet');
                expect(parseInt(overledgerResponse2.data.executionAddressSequenceSearchResponse.sequence)).toBeGreaterThan(0);
                expect(overledgerResponse2.data.executionAddressSequenceSearchResponse.addressId.length).toBeGreaterThanOrEqual(25);  
                expect(overledgerResponse2.data.executionAddressSequenceSearchResponse.addressId.length).toBeLessThanOrEqual(35);   
        }
    });



});
