import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { PublicClient, createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import useCampaignProxies from '../_hooks/useCampaignProxies';
import fetchCampaigns from '../_utils/fetchCampaigns';
import { rpcUrl } from '../constants';
import Campaigns from './Campaigns';
import type { Campaign } from './types';

export default function CampaignsContractDemo() {
  const { campaignProxies } = useCampaignProxies();

  console.log(campaignProxies);
  
  const [client, setPublicClient] = useState<PublicClient | undefined>();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const publicClient = createPublicClient({
      chain: sepolia, // Replace this with the chain of your app
      transport: http(rpcUrl),
    });

    setPublicClient(publicClient);

    const fetchAllCampaigns = async () => {
      if (client) {
        const fetchedCampaigns = await fetchCampaigns(client, campaignProxies);
        console.log(fetchedCampaigns);
        setCampaigns(fetchedCampaigns as Campaign[]);
      }
    }

    
    void fetchAllCampaigns();
    
  }, [campaignProxies])

  return (
    <div
      className={clsx([
        'grid grid-cols-1 items-stretch justify-start',
        'md:grid-cols-2CoffeeMd md:gap-9 lg:grid-cols-2CoffeeLg',
      ])}
    >
      <section
        className={clsx([
          'rounded-lg border border-solid border-boat-color-palette-line',
          'bg-boat-color-palette-backgroundalternate p-10',
        ])}
      >
        <h2 className="mb-5 w-fit text-2xl font-semibold text-white">All campaigns</h2>

        {campaigns?.length > 0 && <Campaigns campaigns={campaigns} />}
      </section>
      <aside>
        <div
          className={clsx([
            'mt-10 rounded-lg border border-solid border-boat-color-palette-line',
            'bg-boat-color-palette-backgroundalternate p-10 md:mt-0',
          ])}
        >
          {/* <FormBuyCoffee refetchMemos={refetchMemos} /> */}
        </div>
      </aside>
    </div>
  );
}
