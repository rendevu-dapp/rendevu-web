"use client";

// imports
import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
// react
import { FC, Fragment } from "react";
import { Event } from "@/common/types/models/event";
// icon components
import { ShareForwardIcon } from "@/components/icons";
// modal components
import { ShareEventModal } from "@/components/modals";

// types
type InviteOrShareProps = {
  eventId: string;
  title: string;
  event: Event;
};

const InviteOrShare: FC<InviteOrShareProps> = ({ eventId, title, event }) => {
  // hooks
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Fragment>
      {/* share card */}
      <Card
        shadow="none"
        className="w-full py-3 px-3.5 border border-neutral-200 dark:border-[#343A40] dark:bg-[#181A1B] rounded-2xl"
      >
        <CardBody className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex flex-row items-center gap-1.5">
            <ShareForwardIcon size={22} />
            <span className="text-sm font-semibold">
              Invite Attendees Or Share Link
            </span>
          </div>
          <Button
            size="sm"
            onPress={() => onOpen()}
            className="bg-black text-white text-xs font-semibold rounded-xl dark:bg-[#1A1E22]"
          >
            Share Event
          </Button>
        </CardBody>
      </Card>
      {/* share modal */}
      <ShareEventModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        details={{ eventId, title }}
        event={event}
      />
    </Fragment>
  );
};

export default InviteOrShare;
