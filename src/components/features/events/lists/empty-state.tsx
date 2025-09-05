// react

// imports
import { Button } from "@heroui/react";
// next
import Link from "next/link";
import { FC } from "react";

// icon components
import { ExploreIcon, PlusAddIcon } from "@/components/icons";

// types
type EmptyStateProps = {
  type?: "upcoming" | "past";
};

const EmptyState: FC<EmptyStateProps> = ({ type = "upcoming" }) => {
  return (
    <div className="max-w-[420px] mx-auto py-20 px-5 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h5 className="text-xl font-extrabold text-placeholder capitalize dark:text-gray-200">
          No {type} Events
        </h5>
        <p className="text-placeholder text-sm font-medium dark:text-gray-200">
          You have no {type} events. Discover exciting events or create one!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Button
          as={Link}
          href="/explore"
          startContent={
            <ExploreIcon fill="white" className="w-5 h-5 text-white" />
          }
          className="bg-neutral-860 md:pr-5 text-white rounded-xl dark:border dark:border-[#343A40]"
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

export default EmptyState;
