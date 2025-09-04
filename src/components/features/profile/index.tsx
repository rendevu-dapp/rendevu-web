"use client";

// thirdweb
import { useActiveAccount } from "thirdweb/react";
// hooks
import { useGetUserProfile } from "@/common/hooks/api/queries";
import AccountSidebar from "./account-sidebar";
// components
import AccountTabs from "./account-tabs";

export const ProfilePage = () => {
  const account = useActiveAccount();
  const { data: userProfile, isPending: loadingUserProfile } =
    useGetUserProfile(account?.address);

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col gap-6 px-4 pt-20 pb-40 xl:px-0">
      <div className="mt-27 flex w-full flex-col justify-between gap-[65px] lg:flex-row">
        {/* account sidebar */}
        <AccountSidebar loading={loadingUserProfile} user={userProfile} />
        {/* account tabs */}
        <AccountTabs loading={loadingUserProfile} user={userProfile} />
      </div>
    </div>
  );
};
