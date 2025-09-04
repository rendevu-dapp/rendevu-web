import { Button, DrawerBody } from "@heroui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { FC } from "react";
import { Chain } from "thirdweb/chains";
import { NetworkItem } from "./network-item";

interface SelectNetworkBodyProps {
  searchTerm: string;
  filteredChains: Chain[];
  selectedChain: Chain | undefined;
  onSelectChain: (chain: Chain) => void;
  setSearchTerm: (value: string) => void;
}

export const SelectNetworkBody: FC<SelectNetworkBodyProps> = ({
  searchTerm,
  filteredChains,
  selectedChain,
  onSelectChain,
  setSearchTerm,
}) => (
  <DrawerBody className="no-scrollbar p-3">
    {searchTerm && filteredChains.length === 0 ? (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-[#F8F9FA] p-6 text-center dark:border dark:border-[#343A40] dark:bg-transparent ">
        <MagnifyingGlass size={48} className="text-[#868E96]" />
        <span className="text-lg font-semibold text-[#343A40] dark:text-gray-200">
          No Results Found
        </span>
        <span className="max-w-xs text-sm text-[#868E96] dark:text-gray-400">
          No networks match your search term {`"${searchTerm}"`}. Try a
          different term or clear the search.
        </span>
        <Button
          color="primary"
          variant="light"
          onPress={() => setSearchTerm("")}
          className="mt-2 font-semibold text-[#6B1ACF]"
        >
          Clear Search
        </Button>
      </div>
    ) : (
      <div className="flex flex-col gap-2">
        {filteredChains.map((supportedChain) => (
          <NetworkItem
            key={supportedChain.id}
            chain={supportedChain}
            isActive={false}
            isSelected={Boolean(
              selectedChain && selectedChain.id === supportedChain.id,
            )}
            onSelect={onSelectChain}
          />
        ))}
      </div>
    )}
  </DrawerBody>
);
