import type { Address } from 'viem';

export type Campaign = {
    totalSupply: bigint; // currently funded
    recipientAddress: Address;
    // recipientAddress: `0x${string}`;
    name?: string;
    description?: string;
    goalMin: bigint; // target
    endsAt: bigint;
}
