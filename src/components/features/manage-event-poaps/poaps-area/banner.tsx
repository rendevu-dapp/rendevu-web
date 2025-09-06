// react

// imports
import { Button } from "@heroui/react";
// next
import Image from "next/image";
import { FC } from "react";
// static assets
import PoapLogo from "@/../public/images/logos/poap.svg";
// drawer components
import { CreatePoapDrawer } from "@/components/drawers/create-poap";
// icon components
import { PlusAddIcon } from "@/components/icons";

// types
type PoapBannerProps = {
  eventId: string;
  isCreatePoapDrawerOpen: boolean;
  onCreateSuccess: () => void;
  onOpenCreatePoapDrawer: () => void;
  onOpenChangeCreatePoapDrawer: (open: boolean) => void;
};

const PoapBanner: FC<PoapBannerProps> = ({
  eventId,
  isCreatePoapDrawerOpen,
  onOpenCreatePoapDrawer,
  onOpenChangeCreatePoapDrawer,
  onCreateSuccess,
}) => {
  return (
    <div className="relative">
      <div className="relative bg-surfaces-bg-primary backdrop-blur-sm border border-neutral-300 dark:border-[#343a40] rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <Image src={PoapLogo} alt="POAP" width={55} height={55} />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                POAPs
              </h2>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Manage proof of attendance tokens for your event
              </p>
            </div>
          </div>
          <Button
            color="secondary"
            startContent={<PlusAddIcon size={16} />}
            onPress={() => onOpenCreatePoapDrawer()}
            className="rounded-xl"
          >
            Create POAP
          </Button>
          <CreatePoapDrawer
            eventId={eventId}
            isOpen={isCreatePoapDrawerOpen}
            onOpenChange={onOpenChangeCreatePoapDrawer}
            onCreateSuccess={onCreateSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default PoapBanner;
