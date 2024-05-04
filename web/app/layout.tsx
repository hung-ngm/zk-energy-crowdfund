import './global.css';

import { getServerSession } from 'next-auth/next';
import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytics';
import OnchainProviders from '@/OnchainProviders';
import { initAnalytics } from '@/utils/analytics';
import SessionWrapper from './components/SessionWrapper';
import { inter } from './fonts';
import type { Metadata } from 'next';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  manifest: '/manifest.json',
  other: {
    boat: '0.17.0',
  },
};

// Stat analytics before the App renders,
// so we can track page views and early events
initAnalytics();

/** Root layout to define the structure of every page
 * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 */
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const session = await getServerSession();
  return (
    <SessionWrapper>
      <html lang="en" className={`${inter.className}`}>
        <body className="flex flex-1 flex-col">
          <SessionWrapper session={session}>
            <OnchainProviders>{children}</OnchainProviders>
          </SessionWrapper>
        </body>
        <GoogleAnalytics />
      </html>
    </SessionWrapper>
  );
}
