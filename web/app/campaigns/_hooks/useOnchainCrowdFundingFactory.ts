import { useMemo } from 'react';
import { useReadContract } from 'wagmi';
// import { markStep } from '@/utils/analytics';
import { useZKGreenEnergyCrowdFundingFactory } from '../_contracts/useZKGreenEnergyCrowdFundingFactory';
// import type { CoffeeMemo } from '../_components/types';

/**
 * Hooks is abstracting away the logic of calling a read-only function on a contract.
 * offers a refetch function to refetch the data.
 * @returns The memos and a function to refetch them.
 */
function useOnchainZKEnergyCrowdFundingFactory() {
  const contract = useZKGreenEnergyCrowdFundingFactory();

//   markStep('useReadContract.refetchMemos');
  const contractReadResult = useReadContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'getZkGreenEnergyCrowdFundingProxies',
  });
//   markStep('useReadContract.refetchMemos');

  return useMemo(
    () => ({
      campaignProxies:
        contractReadResult.status === 'success' ? (contractReadResult.data) : [],
      refetchCampaignProxies: contractReadResult.refetch,
    }),
    [contractReadResult],
  );
}

export default useOnchainZKEnergyCrowdFundingFactory