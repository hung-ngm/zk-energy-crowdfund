import CampaignCard from './CampaignCard';
import type { Campaign } from './types';

type CampaignProps = {
  campaigns: Campaign[];
};

/**
 * Memos received from coffee purchases in BuyMeACoffee smart contract.
 *
 * @param memos List of memos.
 */
function Campaigns({ campaigns }: CampaignProps) {
  if (!campaigns) {
    return null;
  }
  return (
    <ul className="flex w-full flex-col items-center gap-10">
      {campaigns
        .map((campaign) => {
          return (
            <CampaignCard
              key={campaign.recipientAddress.toString()}
              totalSupply={campaign.totalSupply}
              recipientAddress={campaign.recipientAddress}
              name={campaign.name}
              description={campaign.description}
              goalMin={campaign.goalMin}
              endsAt={campaign.endsAt}
            />
          );
        })
        .reverse()
        .slice(0, 8)}
    </ul>
  );
}

export default Campaigns;
