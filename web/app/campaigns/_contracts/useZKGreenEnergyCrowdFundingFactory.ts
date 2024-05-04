import { baseSepolia } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';
import ZKGreenEnergyCrowdFundingFactoryABI from './ZKGreenEnergyCrowdFundingFactoryABI';

/**
 * Returns contract data for the BuyMeACoffee contract.
 */
export const useZKGreenEnergyCrowdFundingFactory = generateContractHook({
  abi: ZKGreenEnergyCrowdFundingFactoryABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0x0EB1Bb029eCc7Ed1bac818a26f59F36a25801883',
  },

  // ... more chains for this contract go here
});
