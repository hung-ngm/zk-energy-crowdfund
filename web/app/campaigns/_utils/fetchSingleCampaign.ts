import { PublicClient } from 'viem';
import ZKGreenEnergyCrowdFundingABI from '../_contracts/ZKGreenEnergyCrowdFundingABI';

export default async function fetchSingleCampaign(client: PublicClient, address: `0x${string}`) { 
  if (!address) return;

  const totalSupply = await client.readContract({
    address: address,
    abi: ZKGreenEnergyCrowdFundingABI,
    functionName: 'totalSupply',
  });

  console.log(totalSupply);

  const recipientAddress = await client.readContract({
    address: address,
    abi: ZKGreenEnergyCrowdFundingABI,
    functionName: 'recipientAddress',
  });

  console.log(recipientAddress);

  const goalMin = await client.readContract({
    address: address,
    abi: ZKGreenEnergyCrowdFundingABI,
    functionName: 'goalMin',
  });

  console.log(goalMin);

  const endsAt = await client.readContract({
    address: address,
    abi: ZKGreenEnergyCrowdFundingABI,
    functionName: 'endsAt',
  });

  console.log(endsAt);
  

  return {
    totalSupply,
    recipientAddress,
    goalMin,
    endsAt,
  }
}