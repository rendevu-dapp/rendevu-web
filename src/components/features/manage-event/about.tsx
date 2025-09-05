"use client";

// hero-ui
import { Card, CardBody } from "@heroui/react";
// react
import { memo } from "react";

// types
import { Event } from "@/common/types/models/event";

type EventDescriptionProps = {
  event: Event;
};

const EventDescription = ({ event }: EventDescriptionProps) => {
  return (
    <Card
      shadow="none"
      className="w-full border border-neutral-200 dark:border-[#343A40] dark:bg-[#181A1B] rounded-4xl"
    >
      <CardBody className="p-7 flex-col gap-3">
        <span className="text-sm font-semibold">About Event</span>
        <p className="text-xs text-placeholder font-medium leading-5 tracking-wide">
          {event.metadata?.description || "No description available."}
        </p>
      </CardBody>
    </Card>
  );
};

export default memo(EventDescription);
