// next
import Link from "next/link";
// imports
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  DropdownSection,
} from "@heroui/react";
import { useDisconnect, useActiveWallet, Blobbie } from "thirdweb/react";

// shared components
import { ConnectButton } from "@/components/shared";

// hooks
import { useGetUserProfile } from "@/common/hooks/api/queries";

const UserProfileDropdown = () => {
  // hooks
  const { disconnect } = useDisconnect();
  const activeWallet = useActiveWallet();
  const activeAccount = activeWallet?.getAccount();
  const { data: userProfile } = useGetUserProfile(activeAccount?.address);

  // handlers
  const handleDisconnect = () => {
    if (activeWallet) {
      disconnect(activeWallet);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown backdrop="blur" placement="bottom-end">
        <DropdownTrigger>
          {userProfile?.avatar ? (
            <Avatar
              as="button"
              className="w-10 h-10 transition-transform"
              src={userProfile.avatar}
            />
          ) : activeAccount ? (
            <button className="cursor-pointer">
              <Blobbie
                address={activeAccount.address}
                className="w-10 h-10 transition-transform rounded-full"
              />
            </button>
          ) : (
            <Avatar
              as="button"
              className="w-10 h-10 transition-transform"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          )}
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="faded">
          <DropdownSection title={userProfile?.email} showDivider>
            <DropdownItem
              key="account"
              textValue="account"
              className="p-0"
              as={ConnectButton}
            />
          </DropdownSection>
          <DropdownSection>
            <DropdownItem
              as={Link}
              href="/profile"
              key="profile"
              // textValue="profile"
            >
              Profile
            </DropdownItem>
            <DropdownItem
              as={Link}
              href="/profile"
              key="preferences"
              // textValue="preferences"
            >
              Preferences
            </DropdownItem>
            <DropdownItem key="help_and_feedback" textValue="help_and_feedback">
              Help & Feedback
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              textValue="logout"
              onPress={handleDisconnect}
            >
              Log Out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserProfileDropdown;
