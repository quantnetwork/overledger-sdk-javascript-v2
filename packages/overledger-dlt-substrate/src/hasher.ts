export type HashType = 'blake2' | 'keccak';

import { blake2AsU8a } from './blake2/index';

export function hasher (hashType: HashType, data: Uint8Array | string, onlyJs?: boolean): Uint8Array {
  return hashType === 'keccak'
    ? blake2AsU8a(data, undefined, undefined, onlyJs)
    : blake2AsU8a(data, undefined, undefined, onlyJs);
}