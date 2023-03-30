import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

const sdkOptions = {
    dlts: [{ dlt: DltNameOptions.BITCOIN },],
    userPoolID: 'us-east-1_xfjNg5Nv9', //your userpool id
    provider: { network: 'https://api.sandbox.overledger.io/v2' }
};

//the changeable links after .../block/
const latestBlock = "latest";
const blockByHash = "000000000000001c2422de32fdb31718cd518a7dc89d2354464810160dbc1d40";
const blockByNumber = "2104199";

describe('Integration Tests:', () => {

    beforeAll(async() => {
        var start = new Date().getTime();
        while (new Date().getTime() < start + 1000);
      },1000);
      
    test('Can get latest standardised block via prep-execute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(
                process.env.USER_NAME,
                process.env.PASSWORD,
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
            );   
            const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 

            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Bitcoin",
                    "network": "Testnet"
                }
            };
            const overledgerResponse = await overledgerInstance.post("/preparation/search/block/" + latestBlock,overledgerRequest);
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
            expect(typeof overledgerResponse2.data.location.technology).toBe('string');
            expect(typeof overledgerResponse2.data.location.network).toBe('string');
            expect(typeof overledgerResponse2.data.status.value).toBe('string');
            expect(typeof overledgerResponse2.data.status.code).toBe('string');
            expect(typeof overledgerResponse2.data.status.description).toBe('string');
            expect(typeof overledgerResponse2.data.status.message).toBe('string');
            expect(typeof overledgerResponse2.data.status.timestamp).toBe('string');
            expect(typeof overledgerResponse2.data.block.blockId).toBe('string');
            expect(typeof overledgerResponse2.data.block.timestamp).toBe('string');
            expect(typeof overledgerResponse2.data.block.number).toBe('number');
            expect(typeof overledgerResponse2.data.block.hashes[0].value).toBe('string');
            expect(typeof overledgerResponse2.data.block.hashes[0].type).toBe('string');
            expect(typeof overledgerResponse2.data.block.linkedBlocks.parent).toBe('string');
            expect(typeof overledgerResponse2.data.block.linkedBlocks.child).toBe('string');
            expect(typeof overledgerResponse2.data.block.size[0].type).toBe('string');
            expect(typeof overledgerResponse2.data.block.size[0].value).toBe('string');
            expect(typeof overledgerResponse2.data.block.numberOfTransactions).toBe('number');
            expect(typeof overledgerResponse2.data.block.transactionIds).toBe('object');
            expect(typeof overledgerResponse2.data.block.nativeData).toBe('object');
            //data checks
            expect(overledgerResponse2.data.location.technology).toBe('Bitcoin');
            expect(overledgerResponse2.data.location.network).toBe('testnet');
            expect(overledgerResponse2.data.status.value).toBe('PENDING');
            expect(overledgerResponse2.data.status.code).toBe('BLK1002');
            //no data check needed on status.description or status.message. Rely on status.value or status.code only
            expect(parseInt(overledgerResponse2.data.status.timestamp)).toBeGreaterThan(1637082153);
            expect(overledgerResponse2.data.block.blockId.length).toEqual(64);
            expect(parseInt(overledgerResponse2.data.block.timestamp)).toBeGreaterThan(1637082153);
            expect(overledgerResponse2.data.block.number).toBeGreaterThan(2104198);
            expect(overledgerResponse2.data.block.hashes.length).toEqual(3);
            expect(overledgerResponse2.data.block.hashes[0].value.length).toEqual(64);
            expect(overledgerResponse2.data.block.hashes[2].type).toBe('TRANSACTIONS_MERKLE_ROOT');
            expect(overledgerResponse2.data.block.hashes[0].value).toEqual(overledgerResponse2.data.block.blockId);
            expect(overledgerResponse2.data.block.hashes[0].type).toBe('BLOCK_HASH');
            expect(overledgerResponse2.data.block.linkedBlocks.parent.length).toEqual(64);
            //child block doesn't exist in bitcoin latest block search
            //expect(overledgerResponse2.data.block.linkedBlocks.child.length).toEqual(0);
            expect(overledgerResponse2.data.block.size.length).toEqual(1);
            expect(overledgerResponse2.data.block.size[0].type).toBe('MEMORY');
            expect(parseInt(overledgerResponse2.data.block.size[0].value)).toBeGreaterThan(3);
            expect(overledgerResponse2.data.block.numberOfTransactions).toBeGreaterThanOrEqual(0);
            expect(overledgerResponse2.data.block.transactionIds.length).toBe(overledgerResponse2.data.block.numberOfTransactions);
        }
    }, 6000);

    test('Standardised latest block and native block align via prep-execute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(
                process.env.USER_NAME,
                process.env.PASSWORD,
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
            );   
            const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 
            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Bitcoin",
                    "network": "Testnet"
                }
            };
            const overledgerResponse = await overledgerInstance.post("/preparation/search/block/" + latestBlock,overledgerRequest);

            const overledgerResponse2 = await overledgerInstance.post("/execution/search/block?requestId="+overledgerResponse.data.requestId);

            //location information is not taken from nativeData
            //status information is not takenn directly from native block data
            expect(overledgerResponse2.data.block.blockId).toBe(overledgerResponse2.data.block.nativeData.hash);
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(overledgerResponse2.data.block.timestamp).toBe(overledgerResponse2.data.block.nativeData.time.toString());
            expect(overledgerResponse2.data.block.number).toBe(overledgerResponse2.data.block.nativeData.height);
            expect(overledgerResponse2.data.block.hashes[2].value).toEqual(overledgerResponse2.data.block.nativeData.merkleroot);
            expect(overledgerResponse2.data.block.hashes[0].value).toEqual(overledgerResponse2.data.block.nativeData.hash);
            expect(overledgerResponse2.data.block.linkedBlocks.parent).toBe(overledgerResponse2.data.block.nativeData.previousblockhash);
            //child is not found directly from native data
            //memory is not found directly from a native data parameter
            expect(parseInt(overledgerResponse2.data.block.size[0].value)).toBe(overledgerResponse2.data.block.nativeData.size);
            expect(overledgerResponse2.data.block.numberOfTransactions).toBe(overledgerResponse2.data.block.nativeData.nTx);
            let count = 0;
            let txsSame = true;
            while (count < overledgerResponse2.data.block.nativeData.tx.length){
                if (!(overledgerResponse2.data.block.transactionIds[count] === overledgerResponse2.data.block.nativeData.tx[count])){
                    txsSame = false;
                    count = overledgerResponse2.data.block.nativeData.tx.length;
                }
                count = count + 1;
            }
            expect(txsSame).toBe(true);

        }

    });

    test('Can get a standardised block by hash via prep-execute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(
                process.env.USER_NAME,
                process.env.PASSWORD,
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
            );   
            const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 

            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Bitcoin",
                    "network": "Testnet"
                }
            };
            const overledgerResponse = await overledgerInstance.post("/preparation/search/block/" + blockByHash,overledgerRequest);
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
            expect(typeof overledgerResponse2.data.location.technology).toBe('string');
            expect(typeof overledgerResponse2.data.location.network).toBe('string');
            expect(typeof overledgerResponse2.data.status.value).toBe('string');
            expect(typeof overledgerResponse2.data.status.code).toBe('string');
            expect(typeof overledgerResponse2.data.status.description).toBe('string');
            expect(typeof overledgerResponse2.data.status.message).toBe('string');
            expect(typeof overledgerResponse2.data.status.timestamp).toBe('string');
            expect(typeof overledgerResponse2.data.block.blockId).toBe('string');
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(typeof overledgerResponse2.data.block.timestamp).toBe('string');
            expect(typeof overledgerResponse2.data.block.number).toBe('number');
            expect(typeof overledgerResponse2.data.block.hashes[0].value).toBe('string');
            expect(typeof overledgerResponse2.data.block.hashes[0].type).toBe('string');
            expect(typeof overledgerResponse2.data.block.linkedBlocks.parent).toBe('string');
            expect(typeof overledgerResponse2.data.block.linkedBlocks.child).toBe('string');
            expect(typeof overledgerResponse2.data.block.size[0].type).toBe('string');
            expect(typeof overledgerResponse2.data.block.size[0].value).toBe('string');
            expect(typeof overledgerResponse2.data.block.numberOfTransactions).toBe('number');
            expect(typeof overledgerResponse2.data.block.transactionIds).toBe('object');
            expect(typeof overledgerResponse2.data.block.nativeData).toBe('object');
            //data checks
            expect(overledgerResponse2.data.location.technology).toBe('Bitcoin');
            expect(overledgerResponse2.data.location.network).toBe('testnet');
            expect(overledgerResponse2.data.status.value).toBe('SUCCESSFUL');
            expect(overledgerResponse2.data.status.code).toBe('BLK1003');
            //no data check needed on status.description or status.message. Rely on status.value or status.code only
            expect(parseInt(overledgerResponse2.data.status.timestamp)).toBeGreaterThan(1637082153);
            expect(overledgerResponse2.data.block.blockId.length).toEqual(64);
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(parseInt(overledgerResponse2.data.block.timestamp)).toBeGreaterThan(1637082153);
            expect(overledgerResponse2.data.block.number).toBeGreaterThan(2104198);
            expect(overledgerResponse2.data.block.hashes.length).toEqual(4);
            expect(overledgerResponse2.data.block.hashes[0].value.length).toEqual(64);
            expect(overledgerResponse2.data.block.hashes[3].type).toBe('TRANSACTIONS_MERKLE_ROOT');
            expect(overledgerResponse2.data.block.hashes[0].value).toEqual(overledgerResponse2.data.block.blockId);
            expect(overledgerResponse2.data.block.hashes[0].type).toBe('BLOCK_HASH');
            expect(overledgerResponse2.data.block.linkedBlocks.parent.length).toEqual(64);
            expect(overledgerResponse2.data.block.linkedBlocks.child.length).toEqual(64);
            expect(overledgerResponse2.data.block.size.length).toEqual(1);
            expect(overledgerResponse2.data.block.size[0].type).toBe('MEMORY');
            expect(parseInt(overledgerResponse2.data.block.size[0].value)).toBeGreaterThan(3);
            expect(overledgerResponse2.data.block.numberOfTransactions).toBeGreaterThanOrEqual(0);
            expect(overledgerResponse2.data.block.transactionIds.length).toBe(overledgerResponse2.data.block.numberOfTransactions);
        }

    });

    test('Standardised block by hash and native block align via prep-execute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(
                process.env.USER_NAME,
                process.env.PASSWORD,
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
            );   
            const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 
            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Bitcoin",
                    "network": "Testnet"
                }
            };
            const overledgerResponse = await overledgerInstance.post("/preparation/search/block/" + blockByHash,overledgerRequest);

            const overledgerResponse2 = await overledgerInstance.post("/execution/search/block?requestId="+overledgerResponse.data.requestId);

            //location information is not taken from nativeData
            //status information is not takenn directly from native block data
            expect(overledgerResponse2.data.block.blockId).toBe(overledgerResponse2.data.block.nativeData.hash);
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(overledgerResponse2.data.block.timestamp).toBe(overledgerResponse2.data.block.nativeData.time.toString());
            expect(overledgerResponse2.data.block.number).toBe(overledgerResponse2.data.block.nativeData.height);
            expect(overledgerResponse2.data.block.hashes[3].value).toEqual(overledgerResponse2.data.block.nativeData.merkleroot);
            expect(overledgerResponse2.data.block.hashes[0].value).toEqual(overledgerResponse2.data.block.nativeData.hash);
            expect(overledgerResponse2.data.block.linkedBlocks.parent).toBe(overledgerResponse2.data.block.nativeData.previousblockhash);
            //child is not found directly from native data
            //memory is not found directly from a native data parameter
            expect(parseInt(overledgerResponse2.data.block.size[0].value)).toBe(overledgerResponse2.data.block.nativeData.size);
            expect(overledgerResponse2.data.block.numberOfTransactions).toBe(overledgerResponse2.data.block.nativeData.nTx);
            let count = 0;
            let txsSame = true;
            while (count < overledgerResponse2.data.block.nativeData.tx.length){
                if (!(overledgerResponse2.data.block.transactionIds[count] === overledgerResponse2.data.block.nativeData.tx[count])){
                    txsSame = false;
                    count = overledgerResponse2.data.block.nativeData.tx.length;
                }
                count = count + 1;
            }
            expect(txsSame).toBe(true);

        }

    });

    test('Can get a standardised block by number via prep-execute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(
                process.env.USER_NAME,
                process.env.PASSWORD,
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
            );   
            const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 

            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Bitcoin",
                    "network": "Testnet"
                }
            };
            const overledgerResponse = await overledgerInstance.post("/preparation/search/block/" + blockByNumber,overledgerRequest);
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
            expect(typeof overledgerResponse2.data.location.technology).toBe('string');
            expect(typeof overledgerResponse2.data.location.network).toBe('string');
            expect(typeof overledgerResponse2.data.status.value).toBe('string');
            expect(typeof overledgerResponse2.data.status.code).toBe('string');
            expect(typeof overledgerResponse2.data.status.description).toBe('string');
            expect(typeof overledgerResponse2.data.status.message).toBe('string');
            expect(typeof overledgerResponse2.data.status.timestamp).toBe('string');
            expect(typeof overledgerResponse2.data.block.blockId).toBe('string');
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(typeof overledgerResponse2.data.block.timestamp).toBe('string');
            expect(typeof overledgerResponse2.data.block.number).toBe('number');
            expect(typeof overledgerResponse2.data.block.hashes[0].value).toBe('string');
            expect(typeof overledgerResponse2.data.block.hashes[0].type).toBe('string');
            expect(typeof overledgerResponse2.data.block.linkedBlocks.parent).toBe('string');
            expect(typeof overledgerResponse2.data.block.linkedBlocks.child).toBe('string');
            expect(typeof overledgerResponse2.data.block.size[0].type).toBe('string');
            expect(typeof overledgerResponse2.data.block.size[0].value).toBe('string');
            expect(typeof overledgerResponse2.data.block.numberOfTransactions).toBe('number');
            expect(typeof overledgerResponse2.data.block.transactionIds).toBe('object');
            expect(typeof overledgerResponse2.data.block.nativeData).toBe('object');
            //data checks
            expect(overledgerResponse2.data.location.technology).toBe('Bitcoin');
            expect(overledgerResponse2.data.location.network).toBe('testnet');
            expect(overledgerResponse2.data.status.value).toBe('SUCCESSFUL');
            expect(overledgerResponse2.data.status.code).toBe('BLK1003');
            //no data check needed on status.description or status.message. Rely on status.value or status.code only
            expect(parseInt(overledgerResponse2.data.status.timestamp)).toBeGreaterThan(1637082153);
            expect(overledgerResponse2.data.block.blockId.length).toEqual(64);
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(parseInt(overledgerResponse2.data.block.timestamp)).toBeGreaterThan(1637082153);
            expect(overledgerResponse2.data.block.number).toBeGreaterThan(2104198);
            expect(overledgerResponse2.data.block.hashes.length).toEqual(4);
            expect(overledgerResponse2.data.block.hashes[0].value.length).toEqual(64);
            expect(overledgerResponse2.data.block.hashes[3].type).toBe('TRANSACTIONS_MERKLE_ROOT');
            expect(overledgerResponse2.data.block.hashes[0].value).toEqual(overledgerResponse2.data.block.blockId);
            expect(overledgerResponse2.data.block.hashes[0].type).toBe('BLOCK_HASH');
            expect(overledgerResponse2.data.block.linkedBlocks.parent.length).toEqual(64);
            expect(overledgerResponse2.data.block.linkedBlocks.child.length).toEqual(64);
            expect(overledgerResponse2.data.block.size.length).toEqual(1);
            expect(overledgerResponse2.data.block.size[0].type).toBe('MEMORY');
            expect(parseInt(overledgerResponse2.data.block.size[0].value)).toBeGreaterThan(3);
            expect(overledgerResponse2.data.block.numberOfTransactions).toBeGreaterThanOrEqual(0);
            expect(overledgerResponse2.data.block.transactionIds.length).toBe(overledgerResponse2.data.block.numberOfTransactions);
        }

    });

    test('Standardised block by number and native block align via prep-execute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(
                process.env.USER_NAME,
                process.env.PASSWORD,
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
            );   
            const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 
            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Bitcoin",
                    "network": "Testnet"
                }
            };
            const overledgerResponse = await overledgerInstance.post("/preparation/search/block/" + blockByNumber,overledgerRequest);

            const overledgerResponse2 = await overledgerInstance.post("/execution/search/block?requestId="+overledgerResponse.data.requestId);

            //location information is not taken from nativeData
            //status information is not takenn directly from native block data
            expect(overledgerResponse2.data.block.blockId).toBe(overledgerResponse2.data.block.nativeData.hash);
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(overledgerResponse2.data.block.timestamp).toBe(overledgerResponse2.data.block.nativeData.time.toString());
            expect(overledgerResponse2.data.block.number).toBe(overledgerResponse2.data.block.nativeData.height);
            expect(overledgerResponse2.data.block.hashes[3].value).toEqual(overledgerResponse2.data.block.nativeData.merkleroot);
            expect(overledgerResponse2.data.block.hashes[0].value).toEqual(overledgerResponse2.data.block.nativeData.hash);
            expect(overledgerResponse2.data.block.linkedBlocks.parent).toBe(overledgerResponse2.data.block.nativeData.previousblockhash);
            //child is not found directly from native data
            //memory is not found directly from a native data parameter
            expect(parseInt(overledgerResponse2.data.block.size[0].value)).toBe(overledgerResponse2.data.block.nativeData.size);
            expect(overledgerResponse2.data.block.numberOfTransactions).toBe(overledgerResponse2.data.block.nativeData.nTx);
            let count = 0;
            let txsSame = true;
            while (count < overledgerResponse2.data.block.nativeData.tx.length){
                if (!(overledgerResponse2.data.block.transactionIds[count] === overledgerResponse2.data.block.nativeData.tx[count])){
                    txsSame = false;
                    count = overledgerResponse2.data.block.nativeData.tx.length;
                }
                count = count + 1;
            }
            expect(txsSame).toBe(true);

        }

    });



    test('Can get latest standardised block via autoexecute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(
                process.env.USER_NAME,
                process.env.PASSWORD,
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
            );   
            const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 

            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Bitcoin",
                    "network": "Testnet"
                }
            };
            const overledgerResponse2 = await overledgerInstance.post("/autoexecution/search/block/" + latestBlock,overledgerRequest);
            //typeof checks
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.location.technology).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.location.network).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.status.value).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.status.code).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.status.description).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.status.message).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.status.timestamp).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.blockId).toBe('string');
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.timestamp).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.number).toBe('number');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].value).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].type).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.linkedBlocks.parent).toBe('string');
            //child doesn't exist in the latest bitcoin block
            //expect(typeof overledgerResponse2.data.block.linkedBlocks.child).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.size[0].type).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.size[0].value).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.numberOfTransactions).toBe('number');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.transactionIds).toBe('object');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.nativeData).toBe('object');
            //data checks
            expect(overledgerResponse2.data.executionBlockSearchResponse.location.technology).toBe('Bitcoin');
            expect(overledgerResponse2.data.executionBlockSearchResponse.location.network).toBe('testnet');
            expect(overledgerResponse2.data.executionBlockSearchResponse.status.value).toBe('PENDING');
            expect(overledgerResponse2.data.executionBlockSearchResponse.status.code).toBe('BLK1002');
            //no data check needed on status.description or status.message. Rely on status.value or status.code only
            expect(parseInt(overledgerResponse2.data.executionBlockSearchResponse.status.timestamp)).toBeGreaterThan(1637082153);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.blockId.length).toEqual(64);
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(parseInt(overledgerResponse2.data.executionBlockSearchResponse.block.timestamp)).toBeGreaterThan(1637082153);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.number).toBeGreaterThan(2104198);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes.length).toEqual(3);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].value.length).toEqual(64);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[2].type).toBe('TRANSACTIONS_MERKLE_ROOT');
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].value).toEqual(overledgerResponse2.data.executionBlockSearchResponse.block.blockId);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].type).toBe('BLOCK_HASH');
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.linkedBlocks.parent.length).toEqual(64);
            //child block doesn't exist in bitcoin latest block search
            //expect(overledgerResponse2.data.block.linkedBlocks.child.length).toEqual(0);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.size.length).toEqual(1);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.size[0].type).toBe('MEMORY');
            expect(parseInt(overledgerResponse2.data.executionBlockSearchResponse.block.size[0].value)).toBeGreaterThan(3);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.numberOfTransactions).toBeGreaterThanOrEqual(0);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.transactionIds.length).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.numberOfTransactions);
        }
    });

    test('Standardised latest block and native block align via autoexecute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(
                process.env.USER_NAME,
                process.env.PASSWORD,
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
            );   
            const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 
            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Bitcoin",
                    "network": "Testnet"
                }
            };
            const overledgerResponse2 = await overledgerInstance.post("/autoexecution/search/block/" + latestBlock,overledgerRequest);

            //location information is not taken from nativeData
            //status information is not takenn directly from native block data
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.blockId).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.hash);
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.timestamp).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.time.toString());
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.number).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.height);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[2].value).toEqual(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.merkleroot);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].value).toEqual(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.hash);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.linkedBlocks.parent).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.previousblockhash);
            //child is not found directly from native data
            //memory is not found directly from a native data parameter
            expect(parseInt(overledgerResponse2.data.executionBlockSearchResponse.block.size[0].value)).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.size);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.numberOfTransactions).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.nTx);
            let count = 0;
            let txsSame = true;
            while (count < overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.tx.length){
                if (!(overledgerResponse2.data.executionBlockSearchResponse.block.transactionIds[count] === overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.tx[count])){
                    txsSame = false;
                    count = overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.tx.length;
                }
                count = count + 1;
            }
            expect(txsSame).toBe(true);

        }

    });

    test('Can get a standardised block by hash via autoexecute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(
                process.env.USER_NAME,
                process.env.PASSWORD,
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
            );   
            const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 

            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Bitcoin",
                    "network": "Testnet"
                }
            };
            const overledgerResponse2 = await overledgerInstance.post("/autoexecution/search/block/" + blockByHash,overledgerRequest);
            //typeof checks
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.location.technology).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.location.network).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.status.value).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.status.code).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.status.description).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.status.message).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.status.timestamp).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.blockId).toBe('string');
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.timestamp).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.number).toBe('number');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].value).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].type).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.linkedBlocks.parent).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.linkedBlocks.child).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.size[0].type).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.size[0].value).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.numberOfTransactions).toBe('number');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.transactionIds).toBe('object');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.nativeData).toBe('object');
            //data checks
            expect(overledgerResponse2.data.executionBlockSearchResponse.location.technology).toBe('Bitcoin');
            expect(overledgerResponse2.data.executionBlockSearchResponse.location.network).toBe('testnet');
            expect(overledgerResponse2.data.executionBlockSearchResponse.status.value).toBe('SUCCESSFUL');
            expect(overledgerResponse2.data.executionBlockSearchResponse.status.code).toBe('BLK1003');
            //no data check needed on status.description or status.message. Rely on status.value or status.code only
            expect(parseInt(overledgerResponse2.data.executionBlockSearchResponse.status.timestamp)).toBeGreaterThan(1637082153);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.blockId.length).toEqual(64);
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(parseInt(overledgerResponse2.data.executionBlockSearchResponse.block.timestamp)).toBeGreaterThan(1637082153);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.number).toBeGreaterThan(2104198);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes.length).toEqual(4);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[3].value.length).toEqual(64);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[3].type).toBe('TRANSACTIONS_MERKLE_ROOT');
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].value).toEqual(overledgerResponse2.data.executionBlockSearchResponse.block.blockId);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].type).toBe('BLOCK_HASH');
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.linkedBlocks.parent.length).toEqual(64);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.linkedBlocks.child.length).toEqual(64);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.size.length).toEqual(1);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.size[0].type).toBe('MEMORY');
            expect(parseInt(overledgerResponse2.data.executionBlockSearchResponse.block.size[0].value)).toBeGreaterThan(3);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.numberOfTransactions).toBeGreaterThanOrEqual(0);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.transactionIds.length).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.numberOfTransactions);
        }

    });

    test('Standardised block by hash and native block align via autoexecute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(
                process.env.USER_NAME,
                process.env.PASSWORD,
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
            );   
            const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 
            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Bitcoin",
                    "network": "Testnet"
                }
            };
            const overledgerResponse2 = await overledgerInstance.post("/autoexecution/search/block/" + blockByHash,overledgerRequest);

            //location information is not taken from nativeData
            //status information is not takenn directly from native block data
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.blockId).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.hash.toString());
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.timestamp).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.time.toString());
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.number).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.height);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[3].value).toEqual(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.merkleroot);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].value).toEqual(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.hash);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.linkedBlocks.parent).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.previousblockhash);
            //child is not found directly from native data
            //memory is not found directly from a native data parameter
            expect(parseInt(overledgerResponse2.data.executionBlockSearchResponse.block.size[0].value)).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.size);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.numberOfTransactions).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.nTx);
            let count = 0;
            let txsSame = true;
            while (count < overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.tx.length){
                if (!(overledgerResponse2.data.executionBlockSearchResponse.block.transactionIds[count] === overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.tx[count])){
                    txsSame = false;
                    count = overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.tx.length;
                }
                count = count + 1;
            }
            expect(txsSame).toBe(true);

        }

    });

    test('Can get a standardised block by number via autoexecute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(
                process.env.USER_NAME,
                process.env.PASSWORD,
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
            );   
            const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 

            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Bitcoin",
                    "network": "Testnet"
                }
            };
            const overledgerResponse2 = await overledgerInstance.post("/autoexecution/search/block/" + blockByNumber,overledgerRequest);
            //typeof checks
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.location.technology).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.location.network).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.status.value).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.status.code).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.status.description).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.status.message).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.status.timestamp).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.blockId).toBe('string');
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.timestamp).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.number).toBe('number');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].value).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].type).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.linkedBlocks.parent).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.linkedBlocks.child).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.size[0].type).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.size[0].value).toBe('string');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.numberOfTransactions).toBe('number');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.transactionIds).toBe('object');
            expect(typeof overledgerResponse2.data.executionBlockSearchResponse.block.nativeData).toBe('object');
            //data checks
            expect(overledgerResponse2.data.executionBlockSearchResponse.location.technology).toBe('Bitcoin');
            expect(overledgerResponse2.data.executionBlockSearchResponse.location.network).toBe('testnet');
            expect(overledgerResponse2.data.executionBlockSearchResponse.status.value).toBe('SUCCESSFUL');
            expect(overledgerResponse2.data.executionBlockSearchResponse.status.code).toBe('BLK1003');
            //no data check needed on status.description or status.message. Rely on status.value or status.code only
            expect(parseInt(overledgerResponse2.data.executionBlockSearchResponse.status.timestamp)).toBeGreaterThan(1637082153);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.blockId.length).toEqual(64);
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(parseInt(overledgerResponse2.data.executionBlockSearchResponse.block.timestamp)).toBeGreaterThan(1637082153);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.number).toBeGreaterThan(2104198);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes.length).toEqual(4);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[3].value.length).toEqual(64);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[3].type).toBe('TRANSACTIONS_MERKLE_ROOT');
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].value).toEqual(overledgerResponse2.data.executionBlockSearchResponse.block.blockId);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].type).toBe('BLOCK_HASH');
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.linkedBlocks.parent.length).toEqual(64);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.linkedBlocks.child.length).toEqual(64);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.size.length).toEqual(1);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.size[0].type).toBe('MEMORY');
            expect(parseInt(overledgerResponse2.data.executionBlockSearchResponse.block.size[0].value)).toBeGreaterThan(3);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.numberOfTransactions).toBeGreaterThanOrEqual(0);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.transactionIds.length).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.numberOfTransactions);
        }

    });

    test('Standardised block by number and native block align via autoexecute', async () => {

        if (typeof process.env.USER_NAME == 'undefined') {
            //do not run tests
            expect(0).toEqual(0);
            console.log("Test only to completion via automated github");
        } else {
            //setup sdk
            const sdk = new OverledgerSDK(sdkOptions);
            //get required token if secrets are available
            const refreshTokensResponse = await sdk.getTokensUsingClientIdAndSecret(
                process.env.USER_NAME,
                process.env.PASSWORD,
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
            );   
            const overledgerInstance = sdk.provider.createRequest(refreshTokensResponse.accessToken.toString()); 
            //setup overledger preparation request
            const overledgerRequest = {
                "location": {
                    "technology": "Bitcoin",
                    "network": "Testnet"
                }
            };
            const overledgerResponse2 = await overledgerInstance.post("/autoexecution/search/block/" + blockByNumber,overledgerRequest);

            //location information is not taken from nativeData
            //status information is not takenn directly from native block data
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.blockId).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.hash.toString());
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.timestamp).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.time.toString());
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.number).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.height);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[3].value).toEqual(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.merkleroot);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.hashes[0].value).toEqual(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.hash);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.linkedBlocks.parent).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.previousblockhash);
            //child is not found directly from native data
            //memory is not found directly from a native data parameter
            expect(parseInt(overledgerResponse2.data.executionBlockSearchResponse.block.size[0].value)).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.size);
            expect(overledgerResponse2.data.executionBlockSearchResponse.block.numberOfTransactions).toBe(overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.nTx);
            let count = 0;
            let txsSame = true;
            while (count < overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.tx.length){
                if (!(overledgerResponse2.data.executionBlockSearchResponse.block.transactionIds[count] === overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.tx[count])){
                    txsSame = false;
                    count = overledgerResponse2.data.executionBlockSearchResponse.block.nativeData.tx.length;
                }
                count = count + 1;
            }
            expect(txsSame).toBe(true);

        }

    });




});
