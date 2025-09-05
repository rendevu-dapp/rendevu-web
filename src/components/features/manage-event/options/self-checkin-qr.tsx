"use client";

// imports
import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
// react
import { FC, Fragment } from "react";

// icon components
import { QRCodeIcon } from "@/components/icons";
// modal component
import { GenerateSelfCheckInQRModal } from "@/components/modals";

// types
type SelfCheckinQRProps = {
  eventId: string;
  realEventId: string;
};

const SelfCheckinQR: FC<SelfCheckinQRProps> = ({ eventId, realEventId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Fragment>
      <Card
        shadow="none"
        className="w-full py-3 px-3.5 border border-neutral-200 dark:border-[#343A40] dark:bg-[#181A1B] rounded-2xl"
      >
        <CardBody className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex flex-row items-center gap-1.5">
            <QRCodeIcon size={22} />
            <span className="text-sm font-semibold">
              Generate Self Checkin QR Code
            </span>
          </div>
          <Button
            size="sm"
            onPress={onOpen}
            className="bg-black text-white text-xs font-semibold rounded-xl dark:bg-[#1A1E22]"
          >
            Generate Code
          </Button>
        </CardBody>
      </Card>
      <GenerateSelfCheckInQRModal
        eventId={eventId}
        realEventId={realEventId}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </Fragment>
  );
};

export default SelfCheckinQR;
