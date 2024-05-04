import { useMemo } from 'react';
import { useReadContract } from 'wagmi';
import { useZKGreenEnergyCrowdFunding } from '../_contracts/useZKGreenEnergyCrowdFunding';

function useCampaignEndsAt(address: `0x${string}`) {
  const contract = useZKGreenEnergyCrowdFunding(address);

  const contractReadResult = useReadContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'endsAt',
  });

  return useMemo(
    () => ({
      endsAt: contractReadResult.status === 'success' ? contractReadResult.data : 0,
      refetchEndsAt: contractReadResult.refetch,
    }),
    [contractReadResult],
  );
}

export default useCampaignEndsAt;
