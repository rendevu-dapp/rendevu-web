"use client";

// imports
import { Button, Card, CardBody } from "@heroui/react";
// next
import Link from "next/link";

type GuestListProps = {
  eventId: string;
  guestCount: number;
};

const GuestList = ({ eventId, guestCount }: GuestListProps) => {
  return (
    <Card
      shadow="none"
      className="w-full py-3 px-3.5 border border-neutral-200 dark:border-[#343A40] dark:bg-[#181A1B] rounded-2xl"
    >
      <CardBody className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold">Guest List</span>
          <span className="text-tiny font-medium text-placeholder">
            {guestCount} Guest{guestCount === 1 ? "" : "s"}
          </span>
        </div>
        <Button
          as={Link}
          size="sm"
          href={`/events/manage/${eventId}/guest-list`}
          className="bg-black text-white text-xs font-semibold rounded-xl dark:bg-[#1A1E22]"
        >
          View List
        </Button>
      </CardBody>
    </Card>
  );
};

export default GuestList;
