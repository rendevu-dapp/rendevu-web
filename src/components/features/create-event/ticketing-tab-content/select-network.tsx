// react

import { Card, CardBody, Image } from "@heroui/react";
import { PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
// imports
import { useFormContext } from "react-hook-form";
import { ChainIcon, ChainName, ChainProvider } from "thirdweb/react";

// configs
import { thirdwebClient } from "@/common/configs";

// helpers
import { classnames } from "@/common/helpers";

// schemas
import { CreateEventValues } from "@/common/schemas/create-event.schema";

// components
import { SelectNetworkDrawer } from "@/components/drawers";

export const SelectNetwork = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    watch,
    formState: { errors },
  } = useFormContext<CreateEventValues>();
  const selectedChain = watch("chain");

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-bold text-[#868E96]">Select Network</span>
      <Card
        shadow="none"
        isPressable
        onPress={() => setIsDrawerOpen(true)}
        className={classnames(
          "w-full rounded-4xl border border-[#E9ECEF] dark:border-[#343A40] dark:bg-[#181A1B]",
          {
            "bg-danger-50 hover:bg-danger-100 border-danger-100": Boolean(
              errors.chain,
            ),
          },
        )}
      >
        <CardBody className="p-6">
          <div className="flex w-full flex-row items-center justify-between gap-3">
            <div className="flex flex-row items-start gap-4">
              <Image
                src="/images/wallet.svg"
                alt="wallet icon"
                width={20}
                height={20}
                className="min-w-[20px] min-h-[20px]"
              />
              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-[#343A40] dark:text-gray-300">
                  Network
                </span>
                {selectedChain ? (
                  <ChainProvider chain={selectedChain}>
                    <div className="flex items-center gap-2">
                      <ChainIcon
                        client={thirdwebClient}
                        className="text-tiny h-5 w-5"
                      />
                      <ChainName className="text-default-500 text-sm font-medium" />
                    </div>
                  </ChainProvider>
                ) : (
                  <span className="text-[13px] md:text-sm font-medium text-[#868E96]">
                    Select the blockchain chain (network) you want to host event
                    or accept crypto payments on.
                  </span>
                )}
              </div>
            </div>
            <div className="min-w-[15px] min-h-[15px]">
              <PlusIcon weight="bold" size={15} color="#868E96" />
            </div>
          </div>
        </CardBody>
      </Card>
      {errors.chain && (
        <div data-slot="error-message" className="text-tiny text-danger">
          {errors.chain.message}
        </div>
      )}
      <SelectNetworkDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </div>
  );
};
