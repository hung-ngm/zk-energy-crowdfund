'use client';

import { useEffect, useState } from 'react';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
import FormCampaignDetails from '../_components/FormCampaignDetails';
import useCampaignEndsAt from '../_hooks/useCampaignEndsAt';
import useCampaignGoalMax from '../_hooks/useCampaignGoalMax';
import useCampaignTotalSupply from '../_hooks/useCampaignTotalSupply';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function CampaginDetailsPage({ params }: { params: { id: string } }) {
  const [isMounted, setIsMounted] = useState(false);

  const address = params.id;
  console.log('address', address);

  const { endsAt } = useCampaignEndsAt(address as `0x${string}`);
  console.log('endsAt', endsAt);

  const { goalMax } = useCampaignGoalMax(address as `0x${string}`);
  console.log('goalMax', goalMax);

  const { totalSupply, refetchTotalSupply } = useCampaignTotalSupply(address as `0x${string}`);
  console.log('totalSupply', totalSupply);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //  Fix hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Header />
      <Main>
        <div />
        <FormCampaignDetails 
          address={address as `0x${string}`} 
          refetchTotalSupply={refetchTotalSupply}
        />
      </Main>
      <Footer />
    </>
  );
}
