// react
import { FC, Fragment, useLayoutEffect, useRef } from "react";
// types
import { EventData } from "@/common/types/event-data";
import EmptyState from "./empty-state";
// components
import EventCard from "./item";
import EventCardSkeleton from "./loading-skeleton";

type EventsListProps = {
  events: EventData[];
  loading?: boolean;
  type?: "upcoming" | "past";
  onLoadMore: () => void;
};

const EventsList: FC<EventsListProps> = ({
  events,
  loading,
  type,
  onLoadMore,
}) => {
  // refs
  const observerTarget = useRef<HTMLDivElement | null>(null);

  // effects
  useLayoutEffect(() => {
    const scrollSentinelDiv = observerTarget.current;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Check if the entry is intersecting the viewport
          if (entry.isIntersecting) {
            // Load more content
            onLoadMore();
          }
        }
      },
      { threshold: 0.5 },
    );

    if (scrollSentinelDiv) {
      observer.observe(scrollSentinelDiv);
    }

    return () => {
      if (scrollSentinelDiv) {
        observer.unobserve(scrollSentinelDiv);
      }
    };
  }, [observerTarget, onLoadMore]);

  if (loading && !events.length) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return <EmptyState type={type} />;
  }

  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* events card */}
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {/* loading more cards */}
      <div id="scroll-sentinel" ref={observerTarget} />
    </Fragment>
  );
};

export default EventsList;
