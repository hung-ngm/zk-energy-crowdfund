import { PublicClient } from 'viem';
import fetchSingleCampaign from './fetchSingleCampaign';

export default async function fetchCampaigns(client: PublicClient, addresses: readonly `0x${string}`[]) {
  const campaigns = await Promise.all(
    addresses.map(async (address) => {
      const campaign = await fetchSingleCampaign(client, address);
      return campaign;
    })
  );

  return campaigns;
}