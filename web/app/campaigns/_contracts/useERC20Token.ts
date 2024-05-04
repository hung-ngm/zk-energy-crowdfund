import { baseSepolia } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';
import ERC20TokenABI from './ERC20TokenABI';

export const useERC20Token = generateContractHook({
    abi: ERC20TokenABI,
    [baseSepolia.id]: {
      chain: baseSepolia,
      address: '0x7C65d5C1497472B5Dd0434D681FBe619935D1fF4'
    },

    // ... more chains for this contract go here
  })