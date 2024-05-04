import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
export default async function CreateCampaign() {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <Header />
      <Main>
        This is a protected route.
        <br />
        You will only see this if you are authenticated.
      </Main>
      <Footer />
    </>
  );
}