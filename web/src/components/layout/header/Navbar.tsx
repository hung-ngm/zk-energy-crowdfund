import { ChevronDownIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { clsx } from 'clsx';
import NextLink from 'next/link';
import AccountConnect from './AccountConnect';

export function NavbarLink({
  href,
  children,
  target,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
  ariaLabel?: string;
}) {
  return (
    <NextLink
      href={href}
      className="font-robotoMono px-0 text-center text-base font-normal text-white no-underline"
      target={target}
      aria-label={ariaLabel}
    >
      {children}
    </NextLink>
  );
}

export function NavbarTitle() {
  return (
    <div className="flex h-8 items-center justify-start gap-4">
      <NextLink href="/" passHref className="relative h-8 w-8" aria-label="Home page">
        <div className="absolute size-8 rounded-full bg-white" />
      </NextLink>
      <NextLink
        href="/"
        passHref
        className="font-robotoMono text-center text-xl font-medium text-white no-underline"
        aria-label="build-onchain-apps Github repository"
      >
        BUILD ONCHAIN APPS
      </NextLink>
    </div>
  );
}

function Navbar() {
  return (
    <nav
      className={clsx(
        'flex flex-1 flex-grow items-center justify-between',
        'rounded-[50px] border border-stone-300 bg-white bg-opacity-10 p-4 backdrop-blur-2xl',
      )}
    >
      <div className="flex h-8 grow items-center justify-between gap-4">
        <NavbarTitle />
        <div className="flex items-center justify-start gap-8">
          <ul className="hidden items-center justify-start gap-8 md:flex">
            <li className="flex">
              <NavbarLink href="https://github.com/coinbase/build-onchain-apps" target="_blank">
                <GitHubLogoIcon
                  width="24"
                  height="24"
                  aria-label="build-onchain-apps Github respository"
                />
              </NavbarLink>
            </li>
            <li className="flex">
              <NavbarLink href="/#get-started">Get Started</NavbarLink>
            </li>
            <li className="flex">
              <NavbarLink href="/campaigns">Campaigns</NavbarLink>
            </li>
            <li className="flex">
              <NavbarLink href="/create-campaign">Create Campaign</NavbarLink>
            </li>
          </ul>
          <AccountConnect />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;