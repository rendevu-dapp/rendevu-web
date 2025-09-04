"use client";

// heroui
import { addToast, Skeleton, Switch } from "@heroui/react";

// next
import Image from "next/image";
// react
import React, { FC, useCallback, useState } from "react";
// thirdweb
import { Address } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
// static assets
import ConditionsIcon from "@/../public/images/conditions.svg";
import NotificationFillIcon from "@/../public/images/notification-fill.svg";
// hooks
import { useUpdateUserProfile } from "@/common/hooks/api/mutations";
// types
import { User } from "@/common/types/models/user";
// shared components
import { HelpSupportDrawer } from "@/components/drawers";

type SettingsTabProps = {
  loading?: boolean;
  user?: User;
};

const SettingsTab: FC<SettingsTabProps> = ({ loading, user }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationsAllowedState, setNotificationsAllowedState] = useState(
    user?.notificationsAllowed ?? true,
  );

  const account = useActiveAccount();
  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();

  const handleNotificationToggle = useCallback(
    async (value: boolean) => {
      if (!account) {
        addToast({
          color: "warning",
          title: "Please connect your wallet to update settings.",
        });
        return;
      }

      if (!user) {
        addToast({
          color: "warning",
          title: "Setup your profile to update settings.",
        });
        return;
      }

      setNotificationsAllowedState(value);

      try {
        setIsSubmitting(true);
        await updateUserProfile({
          walletAddress: account.address as Address,
          input: { notificationsAllowed: value },
        });
        addToast({
          color: "success",
          title: "Notification settings updated successfully.",
        });
      } catch (error) {
        setNotificationsAllowedState(user.notificationsAllowed ?? true);
        addToast({
          color: "danger",
          title:
            (error as Error)?.message ||
            "Failed to update notification settings.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [account, user, updateUserProfile],
  );

  return (
    <div className="flex flex-col gap-[41px]">
      <div className="flex h-24 items-center justify-between gap-2.5 rounded-[12px] border border-[#E9ECEF] dark:border-[#343A40] px-3.5">
        <div className="flex items-start gap-[9px]">
          <Image
            src={NotificationFillIcon}
            width={18}
            height={18}
            alt="Notification Bell"
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-xs font-bold text-[#343A40] dark:text-[#E9ECEF]">
              Notification
            </h2>
            <p className="text-xs font-semibold text-[#868E96] dark:text-gray-400">
              Receive Notifications for Events, Payments, Payments & Other
              important Updates
            </p>
          </div>
        </div>
        {loading ? (
          <Skeleton className="h-6 w-11 rounded" />
        ) : (
          <Switch
            aria-label="Automatic updates"
            data-selected={notificationsAllowedState}
            isSelected={notificationsAllowedState}
            isDisabled={isSubmitting}
            onValueChange={handleNotificationToggle}
            classNames={{
              wrapper: [
                "p-0.5 h-6 w-11 bg-[#CED4DA] group-data-[selected=true]:bg-[#6B1ACF]",
              ],
              label: [isSubmitting && "cursor-progress"],
            }}
          />
        )}
      </div>
      <div className="flex flex-col gap-2.5">
        <h2 className="text-xl font-bold text-[#343A40] dark:text-[#E9ECEF]">
          Privacy & Security
        </h2>
        <div className="flex flex-col gap-[7px]">
          <HelpSupportDrawer />
          <div className="flex h-[60px] items-center rounded-[12px] border border-[#E9ECEF] dark:border-[#343A40] px-3.5">
            <div className="flex items-center gap-1">
              <Image
                src={ConditionsIcon}
                width={18}
                height={18}
                alt="Conditions"
              />
              <h2 className="text-xs font-semibold text-[#343A40] dark:text-[#E9ECEF]">
                Terms Of Service
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SettingsTab);
