import { generateMetadata } from '@/utils/generateMetadata';

export const metadata = generateMetadata({
  title: 'Create campaign',
  description:
    'Create your very own campaign.',
  images: 'themes.png',
  pathname: 'create-campaign',
});

export default async function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
