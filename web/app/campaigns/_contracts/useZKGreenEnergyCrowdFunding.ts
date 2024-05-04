import { baseSepolia } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';
import ZKGreenEnergyCrowdFundingABI from './ZKGreenEnergyCrowdFundingABI';

export const useZKGreenEnergyCrowdFunding = (address: `0x${string}`) => {
    return generateContractHook({
        abi: ZKGreenEnergyCrowdFundingABI,
        [baseSepolia.id]: {
          chain: baseSepolia,
          address: address,
        },
      
        // ... more chains for this contract go here
    })();
}