import { PublicClient } from 'viem';
import ZKGreenEnergyCrowdFundingABI from '../_contracts/ZKGreenEnergyCrowdFundingABI';
import { convertBigIntTimestampToDate } from '@/utils/timestamp';


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

  // Get the token IDs and metadata by token ID
//   var tokens = [] as string[];

//   for (let i = 0; i < Number(numTokens); i++) {
//     const tokenID = await client.readContract({
//       address: contractAddress,
//       abi: PaymasterBundlerABI,
//       functionName: 'tokenOfOwnerByIndex',
//       args: [address, BigInt(i)],
//     });

//     const tokenJSONLink = await client.readContract({
//       address: contractAddress,
//       abi: PaymasterBundlerABI,
//       functionName: 'tokenURI',
//       args: [BigInt(tokenID)],
//     });

//     tokens.push(tokenJSONLink);
//   }

//   const fetchOps = [] as Promise<unknown>[];
//   const tokenJSONs = [] as NFTType[];

//   tokens.forEach((token) => {
//     fetchOps.push(
//       (async () => {
//         try {
//           const tokenResponse = await fetch(token);
//           const parsedToken = (await tokenResponse.json()) as NFTType;

//           tokenJSONs.push(parsedToken);
//         } catch (e) {
//           console.error('Error parsing JSON');
//         }
//       })(),
//     );
//   });

//   await Promise.all(fetchOps);

//   return tokenJSONs;
}