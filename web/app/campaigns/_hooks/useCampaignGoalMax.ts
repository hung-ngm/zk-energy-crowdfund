import { useMemo } from 'react';
import { useReadContract } from 'wagmi';
import { useZKGreenEnergyCrowdFunding } from '../_contracts/useZKGreenEnergyCrowdFunding';

function useCampaignGoalMax(address: `0x${string}`) {
  const contract = useZKGreenEnergyCrowdFunding(address);

  const contractReadResult = useReadContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'goalMax',
  });

  return useMemo(
    () => ({
      goalMax: contractReadResult.status === 'success' ? contractReadResult.data : 0,
      refetchGoalMax: contractReadResult.refetch,
    }),
    [contractReadResult],
  );
}

export default useCampaignGoalMax;
