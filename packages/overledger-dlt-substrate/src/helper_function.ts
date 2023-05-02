
import { asn1 } from 'asn1.js';

export interface SignTxDotPaymentRequestBody {
    keyId: string;
    dest: string;
    value: number;
    // blockHash: string;
    // blockNumber: number;
    // genesisHash: string;
    nonce: number;
    // specVersion: number;
    // specName: string;
    // transactionVersion: number;
    // metadataRpc: string;
}


const EcdsaSigAsnParse = asn1.define('EcdsaSig', function(this: any) {
    // parsing this according to https://tools.ietf.org/html/rfc3279#section-2.2.3 
    this.seq().obj( 
        this.key('r').int(), 
        this.key('s').int(),
    );
});

export { EcdsaSigAsnParse }