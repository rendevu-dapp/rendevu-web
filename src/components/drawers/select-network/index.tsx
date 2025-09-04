"use client";

import { Button, Drawer, DrawerContent, DrawerFooter } from "@heroui/react";
import { FC, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Chain } from "thirdweb/chains";
import { useMediaQuery } from "usehooks-ts";
import { supportedChains } from "@/common/data";
import { CreateEventValues } from "@/common/schemas/create-event.schema";
import { SelectNetworkBody } from "./select-network-body";
import { SelectNetworkHeader } from "./select-network-header";

interface SelectNetworkDrawerProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const SelectNetworkDrawer: FC<SelectNetworkDrawerProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { watch, setValue } = useFormContext<CreateEventValues>();
  const selectedChain = watch("chain");

  const filteredChains = useMemo(
    () =>
      (supportedChains ?? []).filter(
        (chain) =>
          selectedChain?.id !== chain.id &&
          chain?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()),
      ),
    [searchTerm, selectedChain],
  );

  const handleSelectChain = (chain: Chain) => {
    setValue("chain", chain);
  };

  const handleSave = () => {
    onOpenChange(false);
  };

  const drawerClassNames = useMemo(
    () => ({
      base: isMobile
        ? "m-0 w-full h-full max-w-full max-h-full rounded-none"
        : "data-[placement=right]:md:m-2 data-[placement=left]:md:m-2 rounded-medium",
    }),
    [isMobile],
  );

  return (
    <Drawer
      placement={isMobile ? "bottom" : "right"}
      hideCloseButton
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={drawerClassNames}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <SelectNetworkHeader
              onClose={onClose}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedChain={selectedChain}
            />
            <SelectNetworkBody
              searchTerm={searchTerm}
              filteredChains={filteredChains}
              selectedChain={selectedChain}
              onSelectChain={handleSelectChain}
              setSearchTerm={setSearchTerm}
            />
            <DrawerFooter className="border-default-200/50 flex flex-col gap-3 border-t p-3">
              <Button
                color="primary"
                onPress={handleSave}
                className="w-full rounded-full bg-[#6B1ACF] p-6 text-white"
              >
                Save
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
