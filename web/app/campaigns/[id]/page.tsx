'use client';

import { useEffect, useState } from 'react';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
import useCampaignEndsAt from '../_hooks/useCampaignEndsAt';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function CampaginDetailsPage({ params }: { params: { id: string } }) {
  const [isMounted, setIsMounted] = useState(false);

  const address = params.id;
  console.log(address);

  const { endsAt } = useCampaignEndsAt(address as `0x${string}`);
  console.log(endsAt);
  

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
      </Main>
      <Footer />
    </>
  );
}