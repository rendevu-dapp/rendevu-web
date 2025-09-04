// react

// imports
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  Tooltip,
} from "@heroui/react";
import { X } from "@phosphor-icons/react";
import React, { FC } from "react";

// types
type MeetingLinkDrawerProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelect: (link: string) => void;
};

export const MeetingLinkDrawer: FC<MeetingLinkDrawerProps> = ({
  isOpen,
  onOpenChange,
  onSelect,
}) => {
  const [link, setLink] = React.useState("");

  return (
    <Drawer
      placement="bottom"
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DrawerContent className="gap-2.5 py-4">
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-row items-start gap-1">
              {/* header */}
              <div className="flex w-full flex-col gap-0.5">
                <h5 className="text-lg font-bold">Add Meeting Link</h5>
                <p className="text-sm font-medium text-[#868E96]">
                  Please enter the virtual event link if you have one
                </p>
              </div>
              <Tooltip content="Close">
                <Button
                  isIconOnly
                  size="sm"
                  variant="faded"
                  onPress={onClose}
                  className="text-default-400 h-7 min-h-7 w-7 min-w-7 rounded-full border"
                >
                  <X size={14} weight="bold" className="text-default-500" />
                </Button>
              </Tooltip>
            </DrawerHeader>
            <DrawerBody className="flex flex-col gap-3">
              {/* content */}
              <div className="flex w-full flex-col gap-1">
                <span className="text-xs font-semibold text-[#868E96]">
                  Join Link
                </span>
                <Input
                  size="lg"
                  placeholder="Enter Link Here..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  classNames={{
                    input: "text-xs text-[#DEE2E6]",
                  }}
                />
              </div>
            </DrawerBody>
            {/* footer */}
            <DrawerFooter>
              <Button
                size="lg"
                className="bg-primary-500 w-full rounded-full px-6 py-4 text-white"
                onPress={() => {
                  onSelect(link);
                  onClose();
                }}
              >
                Confirm
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
