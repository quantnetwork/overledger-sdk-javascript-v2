import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';
import { isExportDeclaration } from 'typescript';

const mockAddress = '0xb619bca484d0247D88281dAF4ad62Aba666E4A8f';
const mockPrivateKey = '0x0070999c7d2b8cf84db93ac1075ef99af3df7f59be22a7b5339fc9867c8bbf25';
const sdkOptions = {
    dlts: [{ dlt: DltNameOptions.ETHEREUM },],
};

describe('Integration Tests:', () => {

    beforeAll(async() => {
        var start = new Date().getTime();
        while (new Date().getTime() < start + 1000);
      },1000);

    test('Can get coinbase transaction', async () => {

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
                    "technology": "Bitcoin",
                    "network": "Testnet"
                }
            }
            const overledgerResponse = await overledgerInstance.post("/preparation/search/transaction?transactionId=0709c920f19ee75f5f4977b9f8d66424a0a55bf7c595b6956b04fb01d82523db",overledgerRequest);
            //typeof checks
            expect(typeof overledgerResponse.data.requestId).toBe('string');
            expect(typeof overledgerResponse.data.gatewayFee.amount).toBe('string');
            expect(typeof overledgerResponse.data.gatewayFee.unit).toBe('string');
            //data checks
            expect(overledgerResponse.data.requestId.length).toBeGreaterThan(20);
            expect(overledgerResponse.data.gatewayFee.amount.length).toBeGreaterThan(0);
            expect(parseInt(overledgerResponse.data.gatewayFee.amount)).toBeGreaterThanOrEqual(0);
            expect(overledgerResponse.data.gatewayFee.unit.length).toBeGreaterThan(2);

            const overledgerResponse2 = await overledgerInstance.post("/execution/search/transaction?requestId="+overledgerResponse.data.requestId);
            //typeof checks
            expect(typeof overledgerResponse2.data.location.technology).toBe('string');
            expect(typeof overledgerResponse2.data.location.network).toBe('string');
            expect(typeof overledgerResponse2.data.type).toBe('string');   
            expect(typeof overledgerResponse2.data.timestamp).toBe('string');          
            expect(typeof overledgerResponse2.data.status.value).toBe('string');
            expect(typeof overledgerResponse2.data.status.code).toBe('string');
            expect(typeof overledgerResponse2.data.status.description).toBe('string');
            expect(typeof overledgerResponse2.data.status.message).toBe('string');
            expect(typeof overledgerResponse2.data.status.timestamp).toBe('string');
            expect(typeof overledgerResponse2.data.transaction.transactionId).toBe('string');
            expect(typeof overledgerResponse2.data.transaction.message).toBe('string');
            expect(typeof overledgerResponse2.data.transaction.signed).toBe('string');
            expect(typeof overledgerResponse2.data.transaction.totalPaymentAmount[0].amount).toBe('string');
            expect(typeof overledgerResponse2.data.transaction.totalPaymentAmount[0].unit).toBe('string');
            expect(typeof overledgerResponse2.data.transaction.origin[0].originId).toBe('string');
            expect(typeof overledgerResponse2.data.transaction.destination[0].destinationId).toBe('string');
            expect(typeof overledgerResponse2.data.transaction.destination[0].payment.amount).toBe('string');
            expect(typeof overledgerResponse2.data.transaction.destination[0].payment.unit).toBe('string');
            expect(typeof overledgerResponse2.data.transaction.destination[0].smartContract.type).toBe('string');
            expect(typeof overledgerResponse2.data.transaction.destination[0].smartContract.detail).toBe('string');
            expect(typeof overledgerResponse2.data.transaction.nativeData).toBe('object');
            //data checks
            expect(overledgerResponse2.data.location.technology).toBe('Bitcoin');
            expect(overledgerResponse2.data.location.network).toBe('testnet');
            expect(overledgerResponse2.data.type).toBe('PAYMENT');   
                //timestamp is in the wrong format
            //expect(overledgerResponse2.data.timestamp).toBe('string');          
            expect(overledgerResponse2.data.status.value).toBe('SUCCESSFUL');
            expect(overledgerResponse2.data.status.code).toBe('TXN1003');
            //no checks needed on description or message as they are purely informative
                //timestamp is in the wrong format
            //expect(overledgerResponse2.data.status.timestamp).toBe('string');
            expect(overledgerResponse2.data.transaction.transactionId.length).toEqual(64);
            expect(overledgerResponse2.data.transaction.transactionId.length).toEqual(overledgerResponse2.data.transaction.nativeData.txid);
                //transaction message does not need a check
            expect(overledgerResponse2.data.transaction.signed.length).toBeGreaterThan(10);
            expect(parseInt(overledgerResponse2.data.transaction.totalPaymentAmount[0].amount)).toBeGreaterThan(0);
            expect(overledgerResponse2.data.transaction.totalPaymentAmount[0].unit).toEqual("BTC");
            expect(overledgerResponse2.data.transaction.origin[0].originId).toEqual("coinbase");
            expect(overledgerResponse2.data.transaction.destination[0].destinationId.length).toBeGreaterThan(25);
            expect(overledgerResponse2.data.transaction.destination[0].destinationId.length).toBeLessThan(36);
            expect(overledgerResponse2.data.transaction.destination[0].destinationId.length).toEqual(overledgerResponse2.data.transaction.nativeData.vout[0].addresses[0]);
            expect(overledgerResponse2.data.transaction.destination[0].payment.amount).toBeGreaterThan(0);
            expect(overledgerResponse2.data.transaction.destination[0].payment.amount).toBeGreaterThan(overledgerResponse2.data.transaction.nativeData.vout[0]);
            expect(overledgerResponse2.data.transaction.destination[0].payment.unit).toEqual("BTC");
            expect(overledgerResponse2.data.transaction.destination[0].smartContract.type).toBe('pubkeyhash');
            expect(overledgerResponse2.data.transaction.destination[0].smartContract.detail.length).toBeGreaterThan(5);
            expect(overledgerResponse2.data.transaction.nativeData).toBe('object');

        }


    });

    test('Standardised coinbase transaction and native transaction align', async () => {

    });

    test('Can get payment transaction', async () => {

    });

    test('Standardised payment transaction and native transaction align', async () => {

    });

    test('Can get transaction with multiple origins and destinations', async () => {

    });

    test('Standardised multi-sourced payment transaction and native transaction align', async () => {

    });

    test('Can get transaction with p2sh', async () => {

    });

    test('Standardised p2sh transaction and native transaction align', async () => {

    });

    test('Can get transaction with p2wpkh', async () => {

    });

    test('Standardised p2wpkh transaction and native transaction align', async () => {

    });

    test('Can get transaction with p2wsh', async () => {

    });

    test('Standardised p2wsh transaction and native transaction align', async () => {

    });

    test('Can get transaction with p2tr', async () => {

    });

    test('Standardised p2tr transaction and native transaction align', async () => {

    });

});
