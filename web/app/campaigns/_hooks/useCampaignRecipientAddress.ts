import { useMemo } from 'react';
import { useReadContract } from 'wagmi';
import { useZKGreenEnergyCrowdFunding } from '../_contracts/useZKGreenEnergyCrowdFunding';


function useCampaignRecipientAddress(address: `0x${string}`) {
  const contract = useZKGreenEnergyCrowdFunding(address)

  const contractReadResult = useReadContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'recipientAddress',
  });

  return useMemo(
    () => ({
      recipientAddress:
        contractReadResult.status === 'success' ? (contractReadResult.data) : 0,
      refetchRecipientAddress: contractReadResult.refetch,
    }),
    [contractReadResult],
  );
}

export default useCampaignRecipientAddress;