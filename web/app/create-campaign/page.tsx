/* eslint-disable import/no-extraneous-dependencies */
'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from "next-auth/react"
import Button from '@/components/Button/Button';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
import BuyMeCoffeeContractDemo from './_components/ContractDemo';
/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function CreateCampaign() {
  const [isMounted, setIsMounted] = useState(false);
  const { data: session, status } = useSession({ required: true });
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Header />
      <Main>
        {session ? (
          <BuyMeCoffeeContractDemo />
        ) : (
          <p>You need to verify to view this page</p>
        )}
      </Main>
      <Footer />
    </>
  );
}
