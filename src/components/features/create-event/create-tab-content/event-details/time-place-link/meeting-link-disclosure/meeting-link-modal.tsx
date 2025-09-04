// react

// imports
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from "@heroui/react";
import { X } from "@phosphor-icons/react";
import React, { FC } from "react";

// types
type MeetingLinkModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelect: (link: string) => void;
  virtualLink?: string;
};

export const MeetingLinkModal: FC<MeetingLinkModalProps> = ({
  isOpen,
  onOpenChange,
  onSelect,
  virtualLink,
}) => {
  const [link, setLink] = React.useState(virtualLink || "");

  // Update link state when virtualLink prop changes
  React.useEffect(() => {
    setLink(virtualLink || "");
  }, [virtualLink]);

  return (
    <Modal
      placement="center"
      hideCloseButton
      isOpen={isOpen}
      size="lg"
      onOpenChange={onOpenChange}
      className="dark:border  dark:border-[#343A40]"
    >
      <ModalContent className="rounded-5xl gap-2.5 py-4">
        {(onClose) => (
          <>
            <ModalHeader className="flex w-full flex-row items-start gap-1">
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
            </ModalHeader>
            <ModalBody>
              <div className="flex w-full flex-col gap-1">
                <span className="text-xs font-semibold text-[#868E96]">
                  Join Link
                </span>
                <Input
                  variant="flat"
                  size="lg"
                  placeholder="Enter Link Here..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  classNames={{
                    input: "text-xs text-[#DEE2E6]",
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
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
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
