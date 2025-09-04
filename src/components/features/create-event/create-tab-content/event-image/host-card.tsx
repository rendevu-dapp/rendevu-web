// imports
import { Avatar, Skeleton } from "@heroui/react";
import { Blobbie, useActiveAccount } from "thirdweb/react";
// helpers
import { shortenAddress } from "@/common/helpers";
// hooks
import { useGetUserProfile } from "@/common/hooks/api/queries";

export const HostCard = () => {
  // hooks
  const account = useActiveAccount()!;
  const { data: user, isPending: loading } = useGetUserProfile(account.address);

  return (
    <div className="w-full gap-1 rounded-2xl border border-[#E9ECEF] dark:border-[#343A40] bg-[#F8F9FA] dark:bg-[#181A1B] px-3.5 py-3">
      <div className="flex flex-col items-start justify-center gap-2">
        <span className="text-xs font-semibold text-[#868E96]">Host</span>
        <div className="flex flex-row items-center justify-start gap-2">
          <Skeleton isLoaded={!loading} className="rounded-full">
            {user ? (
              <Avatar name={user.fullName} size="sm" src={user?.avatar} />
            ) : (
              <Blobbie
                address={account.address}
                size={32}
                className="rounded-full"
              />
            )}
          </Skeleton>
          <Skeleton isLoaded={!loading} className="rounded-lg">
            <p className="text-sm font-bold text-[#868E96]">
              <span>
                {user ? user.fullName : shortenAddress(account.address)}
              </span>
              <span className="text-[#DEE2E6]">(You)</span>
            </p>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
