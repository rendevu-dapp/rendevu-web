"use client";

// imports
import { Card, CardBody } from "@heroui/react";
// react
import { FC, memo } from "react";

type EventStatsProps = {
  totalOrganized: number;
  totalAttended: number;
};

const EventStats: FC<EventStatsProps> = memo(
  ({ totalOrganized, totalAttended }) => {
    return (
      <div className="flex flex-row gap-3.5">
        {/* total listed */}
        <Card
          shadow="none"
          className="border border-neutral-600 dark:border-[#343A40] dark:bg-[#181A1B] rounded-2xl"
        >
          <CardBody className="py-2 md:py-4 px-4 md:px-6 flex flex-col gap-0.5">
            <h5 className="text-xl font-bold">{totalOrganized}</h5>
            <span className="text-sm text-placeholder dark:text-gray-200">
              Total Events Listed
            </span>
          </CardBody>
        </Card>
        {/* total attended */}
        <Card
          shadow="none"
          className="border border-neutral-600 dark:border-[#343A40] dark:bg-[#181A1B] rounded-2xl"
        >
          <CardBody className="py-2 md:py-4 px-4 md:px-6 flex flex-col gap-0.5">
            <h5 className="text-xl font-bold">{totalAttended}</h5>
            <span className="text-sm text-placeholder dark:text-gray-200">
              Total Events Attended
            </span>
          </CardBody>
        </Card>
      </div>
    );
  },
);

EventStats.displayName = "EventStats";

export default EventStats;
