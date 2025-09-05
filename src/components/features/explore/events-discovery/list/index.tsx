// react
import { Dispatch, FC, SetStateAction } from "react";
// static assets
import eventImage2 from "@/../public/images/placeholders/events/image2.png";
// helpers
import { formatDate, formatTime } from "@/common/helpers";
import type { LocationValues } from "@/common/schemas/create-event.schema";
// types
import type { EventDocument } from "@/common/types/event-data";
// components
import EventCard from "./item";
import Emptystate from "./item-empty-state";
import EventItemSkeleton from "./item-skeleton";

// EventProp type
type EventListProps = {
  events: EventDocument[];
  loading?: boolean;
  searchQuery?: string;
  selectedDate?: { start?: string; end?: string };
  location?: LocationValues;
  onPageChange?: Dispatch<SetStateAction<number>>;
};

const EventsList: FC<EventListProps> = ({
  events,
  loading,
  searchQuery = "",
  selectedDate = { start: "" },
  location,
}) => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {/* loading skeleton */}
      {loading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <EventItemSkeleton key={index} />
        ))
      ) : events.length === 0 ? (
        // empty state
        <div className="col-span-full text-center text-gray-500">
          <Emptystate
            searchQuery={searchQuery}
            selectedDate={selectedDate}
            location={location}
          />
        </div>
      ) : (
        // events
        events.map((eventItem) => (
          <EventCard
            key={eventItem.id}
            id={eventItem.id}
            title={eventItem?.metadata?.title || "Event Title"}
            startDate={formatDate(Number(eventItem.startDate))}
            startTime={formatTime(Number(eventItem.startDate))}
            endTime={formatTime(Number(eventItem.endDate))}
            image={eventItem?.metadata?.image || eventImage2}
            isPaid={eventItem?.isPaid || false}
            paymentTokens={
              eventItem?.paymentTokens?.map((token, index) => ({
                id: `${token.tokenAddress}-${index}`,
                tokenAddress: token.tokenAddress,
                price: token.price.toString(),
              })) || []
            }
          />
        ))
      )}
    </div>
  );
};

export default EventsList;
