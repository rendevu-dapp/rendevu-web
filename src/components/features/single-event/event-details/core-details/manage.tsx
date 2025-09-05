"use client";

// imports
import { Button, Card, CardBody } from "@heroui/react";
// next
import Link from "next/link";
// react
import { FC } from "react";

// types
type ManageProps = {
  eventId: string;
};

const Manage: FC<ManageProps> = ({ eventId }) => {
  return (
    <Card
      shadow="none"
      className="w-full bg-neutral-900 dark:bg-white rounded-5xl"
    >
      <CardBody className="p-8 flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-white dark:text-[#181A1B]">
            Manage Event
          </span>
          <p className="text-[11px] font-medium text-gray-300 dark:text-[#343A40]">
            Manage your event settings, view guest list, registrations etc.
          </p>
        </div>
        <Button
          as={Link}
          href={`/events/manage/${eventId}`}
          className="bg-primary-500 text-white text-xs font-semibold rounded-full"
        >
          Manage
        </Button>
      </CardBody>
    </Card>
  );
};

export default Manage;
