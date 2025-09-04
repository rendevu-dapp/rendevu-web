import { DrawerHeader, Image, Tooltip } from "@heroui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { FC } from "react";
import { Chain } from "thirdweb/chains";
import { NetworkItem } from "./network-item";

interface SelectNetworkHeaderProps {
  onClose: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedChain: Chain | undefined;
}

export const SelectNetworkHeader: FC<SelectNetworkHeaderProps> = ({
  onClose,
  searchTerm,
  setSearchTerm,
  selectedChain,
}) => (
  <DrawerHeader className="border-default-200/50 flex flex-col gap-5 border-b">
    <div className="flex w-full flex-row items-center justify-between gap-1">
      <Tooltip content="Close">
        <div className="cursor-pointer" onClick={onClose}>
          <Image
            src="/images/round-close.svg"
            width={32}
            height={32}
            alt="Close"
          />
        </div>
      </Tooltip>
      <h5 className="font-bricolage-grotesque text-[20px] font-bold text-[#343A40] dark:text-gray-200">
        Select Network
      </h5>
      <span />
    </div>
    <div className="flex h-14 w-full items-center rounded-2xl border border-[#868E96] px-4 py-6">
      <MagnifyingGlass size={18} className="text-default-500 mr-3" />
      <input
        placeholder="Search Network"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 bg-transparent text-[14px] text-[#343A40] outline-none placeholder:text-xs placeholder:font-semibold placeholder:text-[#868E96] dark:placeholder:text-gray-400 dark:text-gray-200"
      />
    </div>
    {selectedChain && (
      <div className="flex flex-col">
        <span className="text-[20px] font-bold text-[#343A40] dark:text-gray-200">
          Active Network
        </span>
        <span className="mb-3 text-[13px] font-medium text-[#868E96] dark:text-gray-200">
          Wallet you can receive payment on.
        </span>
        <NetworkItem chain={selectedChain} isActive={true} />
      </div>
    )}
  </DrawerHeader>
);
