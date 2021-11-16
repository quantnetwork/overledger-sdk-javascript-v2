import OverledgerSDK from '@quantnetwork/overledger-core';
import { DltNameOptions } from '@quantnetwork/overledger-types';

const sdkOptions = {
    dlts: [{ dlt: DltNameOptions.ETHEREUM },],
    userPoolID: 'us-east-1_xfjNg5Nv9', //your userpool id
    provider: { network: 'https://auth.overledger.io/' }
};

describe('Unit Tests:', () => {

    test('Can get latest block via prep-execute', async () => {

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
            const overledgerResponse = await overledgerInstance.post("/preparation/search/block/latest",overledgerRequest);
            //typeof checks
            expect(typeof overledgerResponse.data.requestId).toBe('string');
            expect(typeof overledgerResponse.data.gatewayFee.amount).toBe('string');
            expect(typeof overledgerResponse.data.gatewayFee.unit).toBe('string');
            //data checks
            expect(overledgerResponse.data.requestId.length).toBeGreaterThan(20);
            expect(overledgerResponse.data.gatewayFee.amount.length).toBeGreaterThan(0);
            expect(parseInt(overledgerResponse.data.gatewayFee.amount)).toBeGreaterThanOrEqual(0);
            expect(overledgerResponse.data.gatewayFee.unit.length).toBeGreaterThan(2);

            const overledgerResponse2 = await overledgerInstance.post("/execution/search/block?requestId="+overledgerResponse.data.requestId,overledgerRequest);
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
            expect(typeof overledgerResponse2.data.block.timestamp).toBe('number');
            expect(typeof overledgerResponse2.data.block.number).toBe('number');
            expect(typeof overledgerResponse2.data.block.hashes[0].value).toBe('string');
            expect(typeof overledgerResponse2.data.block.hashes[0].type).toBe('string');
            expect(typeof overledgerResponse2.data.block.linkedBlocks.parent).toBe('string');
            expect(typeof overledgerResponse2.data.block.linkedBlocks.child).toBe('string');
            expect(typeof overledgerResponse2.data.block.size.type).toBe('string');
            expect(typeof overledgerResponse2.data.block.size.value).toBe('string');
            expect(typeof overledgerResponse2.data.block.numberOfTransactions).toBe('number');
            expect(typeof overledgerResponse2.data.block.transactionIds).toBe('object');
            expect(typeof overledgerResponse2.data.block.nativeData).toBe('object');
            //data checks
            expect(typeof overledgerResponse2.data.location.technology).toBe('Ethereum');
            let networkCheck = false;
            if ((overledgerResponse2.data.location.network == 'Ropsten Testnet')||(overledgerResponse2.data.location.network == 'Mainnet')){
                networkCheck = true;
            }
            expect(networkCheck).toBe(true);
            expect(overledgerResponse2.data.status.value).toBe('PENDING');
            expect(overledgerResponse2.data.status.code).toBe('BLK1002');
            //no data check needed on status.description or status.message. Rely on status.value or status.code only
            //STATUS.TIMESTAMP format for Ethereum needs changing.
            //expect(parseInt(overledgerResponse2.data.status.timestamp)).toBeGreaterThan(1637058121);
            expect(overledgerResponse2.data.block.blockId.length).toEqual(66);
            expect(overledgerResponse2.data.block.blockId.substring(0,2)).toBe('0x');
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(overledgerResponse2.data.block.timestamp).toBeGreaterThan(1637058121);
            expect(overledgerResponse2.data.block.number).toBeGreaterThan(11436732);
            expect(overledgerResponse2.data.block.hashes.length).toEqual(5);
            expect(overledgerResponse2.data.block.hashes[0].value.length).toEqual(66);
            expect(overledgerResponse2.data.block.hashes[0].value.substring(0,2)).toBe('0x');
            expect(overledgerResponse2.data.block.hashes[0].type).toBe('PARENT_HASH');
            expect(overledgerResponse2.data.block.hashes[1].value).toEqual(overledgerResponse2.data.block.blockId);
            expect(overledgerResponse2.data.block.hashes[1].type).toBe('BLOCK_HASH');
            expect(overledgerResponse2.data.block.hashes[2].value.length).toEqual(66);
            expect(overledgerResponse2.data.block.hashes[2].value.substring(0,2)).toBe('0x');
            expect(overledgerResponse2.data.block.hashes[2].type).toBe('TRANSACTIONS_MERKLE_ROOT');
            expect(overledgerResponse2.data.block.hashes[3].value.length).toEqual(66);
            expect(overledgerResponse2.data.block.hashes[3].value.substring(0,2)).toBe('0x');
            expect(overledgerResponse2.data.block.hashes[3].type).toBe('STATE_MERKLE_ROOT');
            expect(overledgerResponse2.data.block.hashes[4].value.length).toEqual(66);
            expect(overledgerResponse2.data.block.hashes[4].value.substring(0,2)).toBe('0x');
            expect(overledgerResponse2.data.block.hashes[4].type).toBe('TRANSACTION_RECEIPTS_MERKLE_ROOT');
            expect(overledgerResponse2.data.block.linkedBlocks.parent.length).toEqual(66);
            expect(overledgerResponse2.data.block.linkedBlocks.parent.substring(0,2)).toBe('0x');
            expect(overledgerResponse2.data.block.linkedBlocks.child.length).toEqual(0);
            expect(overledgerResponse2.data.block.size.length).toEqual(2);
            expect(overledgerResponse2.data.block.size[0].type).toBe('MEMORY');
            expect(parseInt(overledgerResponse2.data.block.size[0].value)).toBeGreaterThan(3);
            expect(overledgerResponse2.data.block.size[1].type).toBe('COMPUTATION');
            expect(parseInt(overledgerResponse2.data.block.size[1].value)).toBeGreaterThan(3);
            expect(overledgerResponse2.data.block.numberOfTransactions).toBeGreaterThanOrEqual(0);
            expect(overledgerResponse2.data.block.transactionIds.length).toBe(overledgerResponse2.data.block.numberOfTransactions);
        }
    });

    test('Standardised latest block and native block align via prep-execute', async () => {

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
            const overledgerResponse = await overledgerInstance.post("/preparation/search/block/latest",overledgerRequest);

            const overledgerResponse2 = await overledgerInstance.post("/execution/search/block?requestId="+overledgerResponse.data.requestId,overledgerRequest);

            //location information is not taken from nativeData
            //status information is not takenn directly from native block data
            expect(overledgerResponse2.data.block.blockId).toBe(overledgerResponse2.data.block.nativeData.hash);
            //TIMESTAMP IS DIFFERENT OBJECT
            expect(overledgerResponse2.data.block.timestamp).toBe(overledgerResponse2.data.block.nativeData.timestamp);
            expect(overledgerResponse2.data.block.number).toBe(overledgerResponse2.data.block.nativeData.number);
            expect(overledgerResponse2.data.block.hashes[0].value.length).toEqual(overledgerResponse2.data.block.nativeData.parentHash);
            expect(overledgerResponse2.data.block.hashes[1].value).toEqual(overledgerResponse2.data.block.nativeData.hash);
            expect(overledgerResponse2.data.block.hashes[2].value.length).toEqual(overledgerResponse2.data.block.nativeData.transactionsRoot);
            expect(overledgerResponse2.data.block.hashes[3].value.length).toEqual(overledgerResponse2.data.block.nativeData.stateRoot);
            expect(overledgerResponse2.data.block.hashes[4].value.length).toEqual(overledgerResponse2.data.block.nativeData.receiptsRoot);
            expect(overledgerResponse2.data.block.linkedBlocks.parent).toBe(overledgerResponse2.data.block.nativeData.parentHash);
            //child is not found directly from native data
            //memory is not found directly from a native data parameter
            expect(overledgerResponse2.data.block.size[1].value).toBe(overledgerResponse2.data.block.nativeData.gasUsed);
            expect(overledgerResponse2.data.block.numberOfTransactions).toBe(overledgerResponse2.data.block.nativeData.transactions.length);
            //transactionId issue in nativeData

        }


    });

    test('Can get block by hash via prep-execute', async () => {

    });

    test('Standardised block by hash and native block align via prep-execute', async () => {

    });

    test('Can get block by number via prep-execute', async () => {

    });

    test('Standardised block by number and native block align via prep-execute', async () => {

    });

});
