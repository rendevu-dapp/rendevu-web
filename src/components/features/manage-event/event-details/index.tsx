"use client";

// next
import Image from "next/image";
// react
import { memo, useMemo } from "react";
// types
import { Event } from "@/common/types/models/event";
// components
import DatesAndLinks from "./dates-and-links";
import TypeGuestsAndInvites from "./type-guests-and-invites";

type EventDetailsProps = {
  event: Event;
};

// Helper function to transform image URL or IPFS CID
const getImageUrl = (image: string | undefined): string => {
  if (!image) return "/images/placeholders/events/image5.png";
  if (/^Qm[1-9A-Za-z]{44}$/.test(image)) {
    return `https://ipfs.io/ipfs/${image}`;
  }
  try {
    new URL(image);
    return image.replace(/^http:/, "https:");
  } catch {
    return "/images/placeholders/events/image5.png";
  }
};

const EventDetails = ({ event }: EventDetailsProps) => {
  const eventImage = useMemo(
    () => getImageUrl(event.metadata?.image ?? undefined),
    [event.metadata?.image],
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="w-full md:col-span-3">
        <Image
          src={eventImage}
          alt={event.metadata?.title || "Event Image"}
          width={226}
          height={226}
          className="w-full h-full object-cover rounded-5xl"
        />
      </div>
      <div className="w-full md:col-span-9 md:content-center">
        <div className="grid grid-cols-1 md:grid-cols-2 md:content-center gap-4">
          <DatesAndLinks event={event} />
          <TypeGuestsAndInvites event={event} />
        </div>
      </div>
    </div>
  );
};

export default memo(EventDetails);
