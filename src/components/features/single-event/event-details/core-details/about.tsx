"use client";

// imports
import { Card, CardBody } from "@heroui/react";
// react
import { FC } from "react";

// types
type EventDescriptionProps = {
  description?: string;
};

const EventDescription: FC<EventDescriptionProps> = ({ description }) => {
  return (
    <Card
      shadow="none"
      className="w-full border border-neutral-200 dark:bg-[#1A1E22] dark:border-[#343A40] rounded-4xl"
    >
      <CardBody className="p-7 flex-col gap-3">
        <span className="text-sm font-semibold">About Event</span>
        <p className="text-xs text-placeholder font-medium leading-5 tracking-wide">
          {description || "No description provided for this event."}
        </p>
      </CardBody>
    </Card>
  );
};

export default EventDescription;
