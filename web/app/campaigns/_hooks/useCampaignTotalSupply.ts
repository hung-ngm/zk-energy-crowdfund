import { useMemo } from 'react';
import { useReadContract } from 'wagmi';
import { useZKGreenEnergyCrowdFunding } from '../_contracts/useZKGreenEnergyCrowdFunding';


function useCampaignTotalSupply(address: `0x${string}`) {
  const contract = useZKGreenEnergyCrowdFunding(address)

  const contractReadResult = useReadContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'totalSupply',
  });

  return useMemo(
    () => ({
      totalSupply:
        contractReadResult.status === 'success' ? (contractReadResult.data) : 0,
      refetchTotalSupply: contractReadResult.refetch,
    }),
    [contractReadResult],
  );
}

export default useCampaignTotalSupply