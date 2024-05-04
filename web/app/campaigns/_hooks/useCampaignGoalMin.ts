import { useMemo } from 'react';
import { useReadContract } from 'wagmi';
import { useZKGreenEnergyCrowdFunding } from '../_contracts/useZKGreenEnergyCrowdFunding';


function useCampaignGoalMin(address: `0x${string}`) {
  const contract = useZKGreenEnergyCrowdFunding(address)

  const contractReadResult = useReadContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'goalMin',
  });

  return useMemo(
    () => ({
      goalMin:
        contractReadResult.status === 'success' ? (contractReadResult.data) : 0,
      refetchGoalMin: contractReadResult.refetch,
    }),
    [contractReadResult],
  );
}

export default useCampaignGoalMin;