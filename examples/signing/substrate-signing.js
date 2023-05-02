// ****************************************** //
// *** JUST A QUICK AND DIRTY TEST SCRIPT *** //
// ********** DO NOT MERGE ****************** // 
// ****************************************** //








//NOTE: Please create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE.
//Run: secure-env .env -s mySecretPassword
//You will then get a .env.enc file created in your project root directory. You can delete the .env file after this to prevent stealing.
//pass in the password of the .env.enc file in OverledgerSDK and copy the .env.enc file to this folder
//

const OverledgerSDK = require('@quantnetwork/overledger-bundle').default;
const DltNameOptions = require('@quantnetwork/overledger-types').DltNameOptions;
const Account = require('@quantnetwork/overledger-types').Account;
const PreparedTransaction = require('@quantnetwork/overledger-types').PreparedTransaction;
const SubstratePreparedTransactionNativeData = require('@quantnetwork/overledger-types').SubstratePreparedTransactionNativeData;
const unpack = require('msgpackr').unpack;
const decode = require('@substrate/txwrapper-polkadot').decode;
const BN = require('bn.js').BN;
const Keyring = require('@polkadot/api').Keyring;
const EXTRINSIC_VERSION = require ('@polkadot/types/extrinsic/v4/Extrinsic');
const cryptoWaitReady = require("@polkadot/util-crypto").cryptoWaitReady;
const u8aToHex = require('@polkadot/util').u8aToHex;
const u8aToU8a = require('@polkadot/util').u8aToU8a;
const u8aConcat = require('@polkadot/util').u8aConcat;
const blake2b = require('@noble/hashes/blake2b').blake2b;
const blake2bJs = require('@noble/hashes/blake2b').blake2bJs;
const bnToU8a = require('@polkadot/util').bnToU8a;
const hasBigInt = require('@polkadot/util').hasBigInt;
const isReady = require('@polkadot/wasm-crypto').isReady;
const construct = require('@substrate/txwrapper-polkadot').construct;
const deriveAddress = require('@substrate/txwrapper-polkadot').deriveAddress;
const getRegistry = require('@substrate/txwrapper-polkadot').getRegistry;
const KeyringPair = require('@substrate/txwrapper-polkadot').KeyringPair;
const methods = require('@substrate/txwrapper-polkadot').methods;

const TYPE_PREFIX = {
  ecdsa: new Uint8Array([2]),
  ed25519: new Uint8Array([0]),
  ethereum: new Uint8Array([2]),
  sr25519: new Uint8Array([1])
};


function hasher (hashType, data, onlyJs) {
    return hashType === 'keccak'
      ? blake2AsU8a(data, undefined, undefined, onlyJs)
      : blake2AsU8a(data, undefined, undefined, onlyJs);
  }

  function blake2AsU8a (data, bitLength, key, onlyJs) {
    const byteLength = Math.ceil(bitLength / 8);
    const u8a = u8aToU8a(data);
  
    return !hasBigInt || (!onlyJs && isReady())
      ? blake2b(u8a, u8aToU8a(key), byteLength)
      : key
        ? blake2bJs(u8a, { dkLen: byteLength, key })
        : blake2bJs(u8a, { dkLen: byteLength });
  }

//type HashType = 'blake2' | 'keccak';
const BN_BE_256_OPTS = { bitLength: 256, isLe: false };

// Importing an example preparedTransaction from the Overledger Preparation API
const preparedTransaction = require('./substrate-prepared-transaction.json');
test();

// Setting our private key from the encrypted .env file
//secret: 'will tenant method tobacco salt thing pill clump boat throw someone other'}); 
// Wraping the main function in an async block to be able to call the sign function
(async () => {
    try {
        // Signing the prepared transaction
        let signedTransaction = (await signAWSStyle(preparedTransaction,'life fee table ahead modify maximum dumb such tobacco boss dry nurse')).signedTransaction;
        // Building the Overledger Execution API request
        let executeTransactionRequest = {
            requestId: preparedTransaction.requestId,
            signed: signedTransaction
        };

        console.log('Overledger Transaction Execution Request: \n' + JSON.stringify(executeTransactionRequest, null, 2));
    
     //   const tx = await ApiPromise.tx(signedTransaction);
       // console.log('tx is: ' + JSON.stringify(tx));

    } catch (e) {
        console.error('error', e);
    }
})();


function test(){

    console.log("TESTING");

};


async function signAWSStyle(preparedTransaction, secret){

    await cryptoWaitReady();
    const webcrypto = await import('node:crypto');
// @ts-ignore
    if (!globalThis.crypto) globalThis.crypto = webcrypto;
    const secp256k1 = await import('@noble/secp256k1');
    //const hmac = (await import('@noble/hashes/hmac')).hmac;
    //const sha256 = (await import('@noble/hashes/sha256')).sha256;
    console.log("Signing via ecdsa");
    //substrate can handle keys generated with the ed25519, ecdsa & sr25519 curves.
    //but the signing curve must match the curve used when generating the account.
    const keyring = new Keyring({ type: "ecdsa" }); 
    // Some mnemonic phrase
    // Add an account, straight mnemonic
    const substrateKeypair = keyring.addFromMnemonic(secret);
    const accountAddress = deriveAddress(substrateKeypair.publicKey, 0);
    console.log("substrateKeypair: " + Object.keys(substrateKeypair.toJson));
    //console.log("substrateKeypair: " + substrateKeypair.toJson);
    console.log("substrateKeypair.address: " + substrateKeypair.address);
    console.log("substrateKeypair.publicKey: " + substrateKeypair.publicKey);
    const accountPublicKey = u8aToHex(substrateKeypair.publicKey);
    console.log("accountPublicKey: " + accountPublicKey);
    
    const nativeData = preparedTransaction.nativeData;
    const value = nativeData.value;
    const dest = nativeData.dest;

    const specVersion = nativeData.runtimeVersion.specVersion;
    const transactionVersion = nativeData.runtimeVersion.transactionVersion;
    const specName = nativeData.runtimeVersion.specName;

    const metadataBuffer = Buffer.from(nativeData.metadata,"base64");
    let data = unpack(metadataBuffer);
    
    const metadataRpc = data;

    const nonce = nativeData.nonce;
    const blockHash = nativeData.blockHash;
    const blockNumber = nativeData.blockNumber;
    const genesisHash = nativeData.genesisHash;

    const registry = getRegistry({
                                   chainName: 'Polkadot',
                                   specName,
                                   specVersion,
                                   metadataRpc
                                 });

    const unsigned = methods.balances.transferKeepAlive(
        {
          value: value,
          dest: dest,
        },
        {
          address: '5EUBZqkHXLy5QuYYtHigvZQ79nbSnJoLAGHNXgyswnkN6prs',
          blockHash,
          blockNumber: registry.createType('BlockNumber', blockNumber).toNumber(),
          eraPeriod: 50,
          genesisHash,
          metadataRpc,
          nonce: nonce,
          specVersion,
          tip: 0,
          transactionVersion,
        },
        {
          metadataRpc,
          registry,
        }
    );

    const signingPayload = construct.signingPayload(unsigned, {registry});
    console.log("hash");
    //NEW CODE MOCKING AWS INTERACTION FROM HERE
    const encodedHash = hasher('blake2', signingPayload);
    console.log("encodedHash: " + encodedHash);
    //const encodedHashBuffer = Buffer.from(encodedHash);
    console.log("mock sign the payload with aws KMS");
    const msgHash = u8aToHex(encodedHash);
    console.log("msgHash: " + msgHash);
    const msgHashWithout0x = msgHash.substring(2);
    console.log("msgHashWithout0x: " + msgHashWithout0x);

    //const seed = mnemonicToLegacySeed(secret);
    //console.log("secret: " + secret)
    //console.log("seed: " + seed)
    //let { publicKey, secretKey } = secp256k1PairFromSeed(seed);
        //PUBLIC KEYS ARE DIFFERENT!
    //console.log('gen pubkey: ' + publicKey);
    //console.log('gen secretKey: ' + secretKey);
    //const genAddress = u8aToHex(publicKey);
    //console.log("gen address: " + genAddress);
    //let { secretKey1, publicKey1 } = naclBoxPairFromSecret(secret);
    //console.log('nacl pubkey: ' + secretKey1);
    //console.log('nacl secretKey: ' + publicKey1);
    //const naclAddress = u8aToHex(publicKey1);
    //console.log("nacl Address: " + naclAddress);
    //const privKey = secretKey;

    //const pubKey = substrateKeypair.publicKey;//secp256k1.getPublicKey(privKey); // Make pubkey from the private key

    //console.log("privKey: " + privKey);
    //console.log("pubKey: " + pubKey);


    //private key compatible with westend taken from https://github.com/polkadot-js/common/blob/e5cb0ba2b4a6b5817626cc964b4f66334f2410e4/packages/util-crypto/src/secp256k1/pair/fromSeed.spec.ts#L19
        //polkadot libraries don't like 0x...
    const testpk = 'f2360e871c830d397fe221382b503f07ddd8763df81a94bb2504390a2fb91f59';
    const validpk = secp256k1.utils.isValidPrivateKey(testpk);
        //the following returns true:
    console.log("validpk: " + validpk);
    //generates compatible public key
    const validPublicKey = secp256k1.getPublicKey(testpk);
    console.log("validPublicKey: " + validPublicKey);
    //converts to hex and removes 0x at the start
    const validPublicKeyHex = u8aToHex(validPublicKey).substring(2);
        // the following returns 036b0aa6beab469dd2b748a0ff5ddbe3d13df1e15c9d28a2aa057212994e127bea
        // as expected from https://github.com/polkadot-js/common/blob/e5cb0ba2b4a6b5817626cc964b4f66334f2410e4/packages/util-crypto/src/secp256k1/pair/fromSeed.spec.ts#L20
    console.log("validPublicKeyHex: " + validPublicKeyHex);
    //signs the message
        //documentation stats that "Generates low-s deterministic-k RFC6979 ECDSA signature."
    const signature = await secp256k1.signAsync(msgHashWithout0x, testpk); // sign
    //converts signature to SigLike object (i've also tried just passing in signature object)
    const isValid = secp256k1.verify({r: signature.r, s: signature.s }, msgHashWithout0x, validPublicKeyHex); // verify
        //other verify functions I have tried
        //const isValid = secp256k1.verify(signature, msgHashWithout0x, validPublicKeyHex); // verify
        //const isValid = secp256k1.verify(signature, msgHashWithout0x, validPublicKeyHex, {lowS: false}); // verify
        //const isValid = secp256k1.verify({r: signature.r, s: signature.s }, msgHashWithout0x, validPublicKeyHex, {lowS: false}); // verify
        //const isValid = secp256k1.verify(signature, msgHashWithout0x, validPublicKeyHex, {lowS: true}); // verify
        //const isValid = secp256k1.verify({r: signature.r, s: signature.s }, msgHashWithout0x, validPublicKeyHex, {lowS: true}); // verify
    //always returning false
    console.log("isValid: " + isValid);
      //try to recover public key but it keeps giving me a "Uint8Array expected" error
    //const recoveredPublicKeyTest = signature.recoverPublicKey(u8aToU8a(encodedHash));
    //console.log("recoveredPublicKeyTest: " + recoveredPublicKeyTest);
        

    if (signature == undefined) {
      throw "Error: Signature is undefined";
    }

    console.log("decoding the signature");
    //const decoded = EcdsaSigAsnParse.decode(signature, "der");

    const r = signature.r;
    let s = signature.s;
    console.log("r: " + r.toString(16));
    console.log("s: " + s.toString(16));
    
    console.log("calculating the signature to get r and s");
    const secp256k1N = new BN("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", 16);
    
    console.log("half of the curve");
    const secp256k1halfN = secp256k1N.div(new BN(2));

    // According to EIP2 https://github.com/ethereum/EIPs/blob/master/EIPS/eip-2.md
    // not all elliptic curve signatures are accepted
    // the value of s needs to be SMALLER than half of the curve
    // i.e. we need to flip s if it's greater than half of the curve
    if (s.gt(secp256k1halfN)) {
        s = secp256k1N.sub(s);
        console.debug("new s: " + s.toString(16));
    }

    console.log("Construct signature");
    console.log("get the public key from the created master key pair");
    //from 
   // const publicKey = '0x022c57b36335b55119897542630ee695bd80b64fa09cc0abd2423654d329ed3c9a'; 

    //const publicKeyBuffer = publicKey as Buffer;
    //let ethAddr = getEvmAddress(publicKeyBuffer);
    //let recoveredPubAddr = findRightKey(encodedHashBuffer, r, s, ethAddr);
    const v = 0;
    //console.debug("v: " + recoveredPubAddr.v);


    console.log('Concatenating r,s and v');
    const secp256k1_signature = u8aConcat(
        bnToU8a(r.toBuffer(), BN_BE_256_OPTS),
        bnToU8a(s.toBuffer(), BN_BE_256_OPTS),
        new Uint8Array([v])
    );

    const signatureBuild = u8aConcat(TYPE_PREFIX["ecdsa"], secp256k1_signature);
    
    console.debug("Construct the signed transaction");
    const signedTransaction = construct.signedTx(unsigned, `${u8aToHex(signatureBuild)}`, {
        metadataRpc,
        registry
    });

    // const decode_signedTransaction = decode(signedTransaction, {metadataRpc, registry});

    console.debug("Derive the transaction hash of the signed transaction");
    const hashSignedTx = construct.txHash(signedTransaction);

   // const response = {
    //    "signed_tx_payload": signedTransaction,
   //    "signed_tx_hash": hashSignedTx,
        // "decode_signedTransaction": decode_signedTransaction,
        // "isValidSignature - valid?": isValidSignature(encodedHash, `${u8aToHex(signature)}`, address),
        // "kecp256k1Verify - valid?": secp256k1Verify(signingPayload, `${u8aToHex(secp256k1_signature)}`, ethAddr)
   // };
    console.log('signedTransaction: ' + JSON.stringify(signedTransaction));
    console.log('hashSignedTx: ' + JSON.stringify(hashSignedTx));
    // Decode a signed tx
    const txInfo = decode(signedTransaction, { metadataRpc, registry });
    console.log('txInfo keys: ' + Object.keys(txInfo));
    console.log('txInfo address: ' + JSON.stringify(txInfo.address));
    console.log('txInfo eraPeriod: ' + JSON.stringify(txInfo.eraPeriod));
    console.log('txInfo method: ' + JSON.stringify(txInfo.method));
    console.log('txInfo nonce: ' + JSON.stringify(txInfo.nonce));
    console.log('txInfo tip: ' + JSON.stringify(txInfo.tip));

    //const txHash = getTxHash(signedTransaction);
    //console.log('txInfo: ' + JSON.stringify(txHash));

    return Promise.resolve(signedTransaction);

}

