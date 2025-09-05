"use client";

// hero-ui
import { Button, Tooltip, useDisclosure } from "@heroui/react";

// next
import Link from "next/link";
// react
import { Fragment, memo } from "react";
// types
import { Event } from "@/common/types/models/event";

// drawer components
import { EditEventDrawer } from "@/components/drawers";
// icon components
import { EditPencilIcon, RocketLaunchIcon } from "@/components/icons";

type HeaderProps = {
  event: Event;
  onEventUpdated?: () => void;
};

const Header = ({ event, onEventUpdated }: HeaderProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Check if the event has not started
  const hasNotStarted = Number(event.startDate) * 1000 > Date.now();

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h4 className="text-4xl font-bold">
          {event.metadata?.title || "Untitled Event"}
        </h4>
        <div className="grid grid-cols-2 md:flex md:flex-row md:items-center gap-2">
          {hasNotStarted && (
            <Tooltip content="Edit Event" placement="top">
              <Button
                onPress={onOpen}
                endContent={<EditPencilIcon fill="white" size={16} />}
                className="bg-black text-white text-xs font-semibold rounded-xl"
              >
                Edit Event
              </Button>
            </Tooltip>
          )}
          <Button
            as={Link}
            href={`/e/${event.id}`}
            endContent={<RocketLaunchIcon size={16} />}
            className="bg-primary-500 text-white text-xs font-semibold rounded-xl"
          >
            Event Page
          </Button>
        </div>
      </div>
      {hasNotStarted && (
        <EditEventDrawer
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          event={event}
          onEventUpdated={onEventUpdated}
        />
      )}
    </Fragment>
  );
};

export default memo(Header);
