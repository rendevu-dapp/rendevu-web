// react
import { FC, useState } from "react";
// helpers
import { classnames } from "@/common/helpers";
// types
import { User } from "@/common/types/models/user";
import EditProfileTab from "./edit-profile-tab";
// components
import SettingsTab from "./settings-tab";

type AccountTabsProps = {
  loading?: boolean;
  user?: User;
};

const AccountTabs: FC<AccountTabsProps> = ({ loading, user }) => {
  // state
  const [currentTab, setCurrentTab] = useState<"profile" | "settings">(
    "profile",
  );

  return (
    <div className="flex flex-col gap-2.5 lg:w-8/12">
      <div className="mr-auto flex gap-1.5 rounded-[12px] bg-[#F8F9FA] dark:bg-[#1A1E22] p-1">
        <button
          type="button"
          className={classnames(
            "] h-12 rounded-[12px] px-6 text-xs font-semibold ",
            currentTab === "profile"
              ? "bg-white text-[#181A1B] dark:bg-[#181A1B] dark:text-[#FFFFFF]"
              : "bg-[#F8F9FA] text-[#868E96] dark:bg-[#1A1E22] dark:text-[#ADB5BD]",
          )}
          onClick={() => setCurrentTab("profile")}
        >
          Edit Profile Details
        </button>
        <button
          type="button"
          className={classnames(
            "] h-12 rounded-[12px] px-6 text-xs font-semibold",
            currentTab === "settings"
              ? "bg-white text-[#181A1B] dark:bg-[#181A1B] dark:text-[#FFFFFF]"
              : "bg-[#F8F9FA] text-[#868E96] dark:bg-[#1A1E22] dark:text-[#ADB5BD]",
          )}
          onClick={() => setCurrentTab("settings")}
        >
          Account Settings
        </button>
      </div>
      {currentTab === "profile" ? (
        <EditProfileTab loading={loading} user={user} />
      ) : (
        <SettingsTab loading={loading} user={user} />
      )}
    </div>
  );
};

export default AccountTabs;
