'use client';

import { useEffect, useState } from 'react';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
import useOnchainZKEnergyCrowdFundingFactory from './_hooks/useOnchainCrowdFundingFactory';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function CampaginsPage() {
  const [isMounted, setIsMounted] = useState(false);

  const { campaignProxies } = useOnchainZKEnergyCrowdFundingFactory();

  console.log(campaignProxies);

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