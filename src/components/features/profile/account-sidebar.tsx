"use client";

// heroui
import { addToast, Skeleton } from "@heroui/react";
import { CheckIcon, CopyIcon, TrashIcon } from "@phosphor-icons/react";
// next
import Image from "next/image";
// react
import React, { FC, Fragment, useCallback, useRef, useState } from "react";
// thirdweb
import { Address } from "thirdweb";
import {
  AccountAvatar,
  AccountBlobbie,
  AccountProvider,
  useActiveAccount,
  useEnsAvatar,
  useEnsName,
} from "thirdweb/react";
// configs
import { thirdwebClient } from "@/common/configs";

// helpers
import { classnames, shortenAddress } from "@/common/helpers";

// hooks
import {
  useUpdateUserProfile,
  useUploadFileOnGraphNode,
} from "@/common/hooks/api/mutations";

// types
import { User } from "@/common/types/models/user";
// icon components
import { EditPencilIcon, ShareForwardIcon } from "@/components/icons";

type AccountSidebarProps = {
  loading?: boolean;
  user?: User;
};

const AccountSidebar: FC<AccountSidebarProps> = ({ loading, user }) => {
  // state
  const [copied, setCopied] = useState(false);

  // hooks
  const account = useActiveAccount();
  const { data: ensName } = useEnsName({
    client: thirdwebClient,
    address: account?.address as Address,
  });
  const { data: ensAvatar } = useEnsAvatar({
    client: thirdwebClient,
    ensName,
  });
  const { mutateAsync: uploadFile } = useUploadFileOnGraphNode();
  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // handlers
  const handleEditClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        addToast({
          color: "warning",
          title: "Invalid file type",
          description: "Please select an image file.",
        });
        return;
      }

      if (!account) {
        addToast({
          color: "warning",
          title: "Please connect your wallet to update your profile image.",
        });
        return;
      }

      try {
        const uploadResponse = await uploadFile({ file });
        const ipfsUrl = `https://ipfs.io/ipfs/${uploadResponse.Hash}`;

        await updateUserProfile({
          walletAddress: account.address as `0x${string}`,
          input: { avatar: ipfsUrl },
        });

        addToast({
          color: "success",
          title: "Profile image updated",
          description: "Your profile image has been updated successfully.",
        });
      } catch (error) {
        addToast({
          color: "danger",
          title: "Error uploading image",
          description: (error as Error)?.message || "Failed to upload image.",
        });
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [account, uploadFile, updateUserProfile],
  );

  const handleCopy = useCallback(() => {
    const address = user?.walletAddress || account?.address;
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [user?.walletAddress, account?.address]);

  return (
    <div className="flex w-full flex-col gap-[17px] lg:w-4/12">
      {loading ? (
        <Skeleton className="h-[226px] w-[228px] rounded-[24px]" />
      ) : (
        <div className="relative overflow-clip rounded-[24px] border-4 border-[#E9ECEF] bg-[#FBBC05]">
          <div className="relative h-[226px] w-full">
            <button
              type="button"
              className="absolute top-4 right-4 z-10 rounded-full bg-[#E9ECEF] p-1.5"
              onClick={handleEditClick}
            >
              <EditPencilIcon size={15} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {Boolean(user?.avatar || ensAvatar) ? (
              <Fragment>
                <Image
                  src={(user?.avatar || ensAvatar)!}
                  unoptimized
                  fill
                  alt="Profile"
                  className="hidden object-cover lg:block"
                />
                <Image
                  src={(user?.avatar || ensAvatar)!}
                  unoptimized
                  fill
                  alt="Profile"
                  className="object-cover lg:hidden"
                />
              </Fragment>
            ) : (
              <AccountProvider
                client={thirdwebClient}
                address={account?.address as Address}
              >
                <AccountAvatar
                  loadingComponent={
                    <Skeleton className="w-full h-full object-cover" />
                  }
                  fallbackComponent={
                    <AccountBlobbie className="w-full h-full object-cover" />
                  }
                  className="w-full h-full object-cover"
                />
              </AccountProvider>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col">
        {loading ? (
          <>
            <Skeleton className="mb-2 h-6 w-3/4 rounded-xl" />
            <Skeleton className="h-4 w-1/2 rounded-xl" />
          </>
        ) : (
          <>
            <h1
              className={classnames(
                "text-xl font-bold dark:text-[#E9ECEF]",
                user?.fullName ? "text-[#343A40]" : "text-[#868E96]",
              )}
            >
              {user?.fullName ?? "Set Your Name"}
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-[#868E96] dark:text-gray-400">
                {ensName ||
                  shortenAddress(user?.walletAddress || account?.address)}
              </span>
              <button onClick={handleCopy}>
                {copied ? (
                  <CheckIcon size={15.27} className="dark:text-[#E9ECEF]" />
                ) : (
                  <CopyIcon size={15.27} className="dark:text-[#E9ECEF]" />
                )}
              </button>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {loading ? (
          <>
            <Skeleton className="h-[60px] w-full rounded-[12px]" />
            <Skeleton className="h-[60px] w-full rounded-[12px]" />
            <Skeleton className="h-[60px] w-full rounded-[12px]" />
          </>
        ) : (
          <>
            <div className="flex h-[60px] items-center rounded-[12px] border border-[#E9ECEF] dark:border-[#343A40] px-3.5">
              <div className="flex items-center gap-1">
                <ShareForwardIcon size={18} />
                <h2 className="text-xs font-semibold text-[#343A40] dark:text-[#E9ECEF]">
                  Share Profile
                </h2>
              </div>
            </div>
            <div className="flex h-[60px] items-center rounded-[12px] border border-[#E9ECEF] dark:border-[#343A40] px-3.5">
              <div className="flex items-center gap-1">
                <TrashIcon size={18} color="#dc4343" />
                <h2 className="text-xs font-semibold text-[#343A40] dark:text-[#E9ECEF] ">
                  Delete Account
                </h2>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(AccountSidebar);
