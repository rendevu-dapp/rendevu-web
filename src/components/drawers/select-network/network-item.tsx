import { Button } from "@heroui/react";
import { FC } from "react";
import { Chain } from "thirdweb/chains";
import { ChainIcon, ChainName, ChainProvider } from "thirdweb/react";
import { thirdwebClient } from "@/common/configs";
import { classnames } from "@/common/helpers";

interface NetworkItemProps {
  chain: Chain;
  isActive: boolean;
  isSelected?: boolean;
  isComingSoon?: boolean;
  onSelect?: (chain: Chain) => void;
}

export const NetworkItem: FC<NetworkItemProps> = ({
  chain,
  isActive,
  isSelected = false,
  isComingSoon = false,
  onSelect,
}) => (
  <div
    className={classnames(
      "flex h-auto w-full items-center justify-between gap-3 rounded-2xl bg-[#F8F9FA] dark:bg-transparent dark:border dark:border-[#343A40] dark:hover:bg-[#343A40]  px-4 py-5",
      { "cursor-not-allowed": isComingSoon },
    )}
  >
    <div className="flex items-center gap-2">
      <ChainProvider chain={chain}>
        <ChainIcon
          client={thirdwebClient}
          width={22}
          height={22}
          className="rounded-full"
        />
        <ChainName className="text-sm font-semibold text-[#343A40] dark:text-white" />
      </ChainProvider>
    </div>
    {!isActive && (
      <Button
        color="primary"
        variant="solid"
        disabled={isComingSoon}
        onPress={() => {
          if (!isSelected || !isComingSoon) {
            onSelect?.(chain);
          }
        }}
        className={classnames("rounded-full border font-semibold", {
          "border-[#868E96] bg-[#E9ECEF] text-[#868E96]": isComingSoon,
          "border-[#181A1B] bg-[#E9ECEF] text-[#868E96]":
            isSelected && !isComingSoon,
          "border-[#181A1B] bg-transparent text-[#150529]":
            !isSelected && !isComingSoon,
          "cursor-not-allowed": isComingSoon,
        })}
      >
        {isComingSoon ? "Coming Soon" : isSelected ? "Selected" : "Activate"}
      </Button>
    )}
  </div>
);
