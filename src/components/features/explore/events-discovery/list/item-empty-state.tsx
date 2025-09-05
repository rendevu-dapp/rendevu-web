// react

// heroui
import { Button } from "@heroui/react";

// next
import Link from "next/link";
import { FC } from "react";
// types
import type { LocationValues } from "@/common/schemas/create-event.schema";
// icon components
import { PlusAddIcon } from "@/components/icons";

type EmptyStateProps = {
  type?: "upcoming" | "past";
  searchQuery?: string;
  selectedDate?: { start?: string; end?: string };
  location?: LocationValues;
};

const EmptyState: FC<EmptyStateProps> = ({
  searchQuery = "",
  selectedDate = { start: "" },
  location,
}) => {
  const isSearchQuery = searchQuery.length > 0;
  const isDateSelected = selectedDate!.start!.length > 0;
  const isRangeSelected = isDateSelected && !!selectedDate.end;
  const isLocationSelected = !!location?.name;
  const formattedStartDate = isDateSelected
    ? new Date(selectedDate!.start!).toLocaleDateString()
    : "";
  const formattedEndDate = selectedDate.end
    ? new Date(selectedDate.end).toLocaleDateString()
    : "";

  const getMessage = () => {
    if (isSearchQuery && isDateSelected && isLocationSelected) {
      return isRangeSelected
        ? `No events found for "${searchQuery}" at "${location.name}" from ${formattedStartDate} to ${formattedEndDate}`
        : `No events found for "${searchQuery}" at "${location.name}" on ${formattedStartDate}`;
    }
    if (isSearchQuery && isLocationSelected) {
      return `No events found for "${searchQuery}" at "${location.name}"`;
    }
    if (isDateSelected && isLocationSelected) {
      return isRangeSelected
        ? `No events found at "${location.name}" from ${formattedStartDate} to ${formattedEndDate}`
        : `No events found at "${location.name}" on ${formattedStartDate}`;
    }
    if (isSearchQuery && isDateSelected) {
      return isRangeSelected
        ? `No events found for "${searchQuery}" from ${formattedStartDate} to ${formattedEndDate}`
        : `No events found for "${searchQuery}" on ${formattedStartDate}`;
    }
    if (isLocationSelected) {
      return `No upcoming events found at "${location.name}"`;
    }
    if (isSearchQuery) {
      return `No upcoming events found for "${searchQuery}"`;
    }
    if (isDateSelected) {
      return isRangeSelected
        ? `No upcoming events found from ${formattedStartDate} to ${formattedEndDate}`
        : `No upcoming events found on ${formattedStartDate}`;
    }
    return "All events are in the past. Stay tuned for more!";
  };

  return (
    <div className="max-w-[420px] mx-auto py-20 px-5 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h5 className="text-xl font-extrabold text-placeholder capitalize dark:text-gray-200">
          {getMessage()}
        </h5>
        <p className="text-placeholder text-sm font-medium dark:text-gray-200">
          {isSearchQuery || isDateSelected || isLocationSelected
            ? "Try adjusting your search, date, or location, or check back later for new events!"
            : "No upcoming events yet—be the trendsetter and host the next big thing!"}
        </p>
      </div>
      <div className="flex justify-center items-center">
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
