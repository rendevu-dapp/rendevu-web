'use client';

// imports
import { useActiveAccount } from 'thirdweb/react';
import { NavbarMenu, NavbarMenuItem } from '@heroui/react';

// components
import MobileNavItem from './nav-item';

// shared components
import { ConnectButton } from '@/components/shared';

// icons
import { TicketAltIcon, ExploreIcon } from '@/components/icons';

const MobileMenu = () => {
  // hooks
  const activeAccount = useActiveAccount();

  return (
    <NavbarMenu className="pt-10 px-10 gap-5 dark:bg-[#181A1B]">
      <MobileNavItem href="/events" icon={TicketAltIcon}>
        Events
      </MobileNavItem>
      <MobileNavItem
        href="/explore"
        icon={ExploreIcon}
        iconProps={{ size: 26 }}
      >
        Explore
      </MobileNavItem>
      {!activeAccount && (
        <NavbarMenuItem>
          <ConnectButton
            connectButton={{
              className: '!w-full !py-3',
              style: { height: 'auto' },
            }}
          />
        </NavbarMenuItem>
      )}
    </NavbarMenu>
  );
};

export default MobileMenu;
