// react

// imports
import {
  Button,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";
// next
import NextImage from "next/image";
import { FC } from "react";

// types
import { Poap } from "@/components/features/manage-event-poaps/poaps-area/types";

type PoapDetailsModalProps = {
  poap: Poap;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestMintCodes: () => void;
  onUpdatePoap: () => void;
};

export const PoapDetailsModal: FC<PoapDetailsModalProps> = ({
  poap,
  isOpen,
  onOpenChange,
  onRequestMintCodes,
  onUpdatePoap,
}) => {
  const handleRequestMintCodes = () => {
    onOpenChange(false);
    onRequestMintCodes();
  };

  const handleUpdatePoap = () => {
    onOpenChange(false);
    onUpdatePoap();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">POAP Details</h2>
        </ModalHeader>

        <ModalBody className="py-4">
          <div className="flex flex-col gap-6">
            {/* image */}
            <div className="flex">
              <div className="p-1 inline-flex border border-gray-300 dark:border-gray-600 rounded-full">
                <Image
                  isZoomed
                  isBlurred
                  as={NextImage}
                  alt={poap.name}
                  src={(poap.animationUrl || poap.imageUrl)!}
                  width={120}
                  height={120}
                  radius="full"
                />
              </div>
            </div>

            {/* name, desc, gallery link */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">{poap.name}</h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed">
                {poap.description}
              </p>
              <Link
                href={`https://poap.gallery/drops/${poap.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium text-secondary"
              >
                View in Gallery
                <ArrowSquareOutIcon size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="flex gap-2 justify-between">
          <Button
            variant="flat"
            onPress={handleUpdatePoap}
            className="text-sm font-semibold flex-1 rounded-xl"
          >
            Edit POAP
          </Button>
          <Button
            color="secondary"
            onPress={handleRequestMintCodes}
            className="text-sm font-semibold flex-1 rounded-xl"
          >
            Request Mint Codes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
