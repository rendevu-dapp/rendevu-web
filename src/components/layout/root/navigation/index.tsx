'use client';

// react
import { Fragment, useLayoutEffect, useState } from 'react';
// next
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// imports
import { useActiveAccount } from 'thirdweb/react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
} from '@heroui/react';

// components
import NavLink from './nav-link';
import MobileMenu from './mobile-menu';
import UserProfileDropdown from './user-profile-dropdown';
import NotificationsDropdown from './notifications-dropdown';

// icon components
import { TicketAltIcon, ExploreIcon } from '@/components/icons';

// shared components
import { ConnectButton } from '@/components/shared';

// static assets
import logoLightSvg from '@/../public/images/logo-light.svg';
import logoDarkSvg from '@/../public/images/logo-dark.svg';

// Dynamically import ThemeSwitcher with SSR disabled
const ThemeSwitcher = dynamic(() => import('./theme-switcher'), { ssr: false });

const Navigation = () => {
  // state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // hooks
  const pathname = usePathname();
  const activeAccount = useActiveAccount();

  // effects
  useLayoutEffect(() => {
    // close the menu when the pathname changes
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <Navbar
      isBlurred={!isMenuOpen}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: 'w-full bg-surfaces-bg-primary dark:bg-surfaces-bg-primaryinverse py-4 px-0 md:px-11 flex flex-row items-center',
        wrapper: 'max-w-full',
      }}
    >
      {/* logo, nav links and search */}
      <div className="flex flex-row items-center gap-2">
        {/* logo */}
        <NavbarBrand
          as={Link}
          href="/"
          className="relative bg-surfaces-bg-secondary dark:bg-[#1A1E22] py-3 px-6 border-text-primary-inverse dark:border-text-primary rounded-2xl"
        >
          <div className="relative w-[80px] h-[24px]">
            <Image
              src={logoDarkSvg}
              alt="Rendevu Logo (Dark)"
              width={80}
              height={24}
              className="object-contain dark:hidden"
            />
            <Image
              src={logoLightSvg}
              alt="Rendevu Logo (Light)"
              width={80}
              height={24}
              className="object-contain hidden dark:block"
            />
          </div>
        </NavbarBrand>
        {/* search and nav links */}
        <div className="bg-surfaces-bg-secondary dark:bg-[#343A40] p-1 hidden md:flex md:flex-row md:gap-1.5 rounded-2xl">
          {/* nav links */}
          <NavbarContent className="bg-surfaces-bg-primary dark:bg-surfaces-bg-primaryinverse h-12 py-2.5 px-6 flex flex-row gap-1.5 rounded-2xl">
            {/* nav item */}
            <NavLink href="/events" icon={TicketAltIcon}>
              Events
            </NavLink>
            {/* nav item */}
            <NavLink
              href="/explore"
              icon={ExploreIcon}
              iconProps={{ size: 20 }}
            >
              Explore
            </NavLink>
          </NavbarContent>
        </div>
      </div>
      {/* theme switcher, notifications and profile */}
      <div className="flex flex-row items-center gap-1.5">
        {/* theme switcher */}
        <ThemeSwitcher />
        {activeAccount ? (
          <Fragment>
            {/* notifications */}
            <NotificationsDropdown />
            {/* profile */}
            <UserProfileDropdown />
          </Fragment>
        ) : (
          <div className="hidden md:flex">
            <ConnectButton />
          </div>
        )}
        {/* mobile menu trigger */}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden min-w-0 w-11 h-11 py-4 px-1 cursor-pointer"
        />
      </div>
      {/* mobile menu */}
      <MobileMenu />
    </Navbar>
  );
};

export default Navigation;
