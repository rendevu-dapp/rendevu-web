"use client";

// imports
import { Button } from "@heroui/react";
// next
import Link from "next/link";

// icon components
import { ExploreIcon, PlusAddIcon } from "@/components/icons";

const EventsHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <h4 className="text-4xl font-extrabold">All Listed Events</h4>
      <div className="w-full grid grid-cols-2 md:w-auto md:flex md:items-center gap-2">
        <Button
          as={Link}
          href="/explore"
          startContent={
            <ExploreIcon fill="white" className="w-5 h-5 text-white" />
          }
          className="bg-neutral-860 md:pr-5 text-white dark:border dark:border-[#343A40] rounded-xl"
        >
          <span className="text-tiny font-semibold tracking-wide">
            Explore Events
          </span>
        </Button>
        <Button
          as={Link}
          href="/create"
          startContent={
            <PlusAddIcon fill="white" className="w-5 h-5 text-white" />
          }
          className="bg-primary-500 md:pr-5 text-white rounded-xl"
        >
          <span className="text-tiny font-semibold tracking-wide">
            Create Event
          </span>
        </Button>
      </div>
    </div>
  );
};

export default EventsHeader;
