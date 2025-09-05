"use client";

import { format, fromUnixTime } from "date-fns";
// react
import { memo, useMemo } from "react";

// types
import { Event } from "@/common/types/models/event";
// icon components
import {
  ExternalLinkIcon,
  MapPinIcon,
  VideoCameraFilledIcon,
} from "@/components/icons";

type DatesAndLinksProps = {
  event: Event;
};

const DatesAndLinks = ({ event }: DatesAndLinksProps) => {
  const { month, day, startDateTime, endDateTime } = useMemo(() => {
    const startDate = fromUnixTime(Number(event.startDate));
    const endDate = event.endDate ? fromUnixTime(Number(event.endDate)) : null;
    return {
      month: format(startDate, "MMMM"),
      day: format(startDate, "d"),
      startDateTime: format(startDate, "EEEE, MMMM d - hh:mm a"),
      endDateTime: endDate ? format(endDate, "EEEE, MMMM d - hh:mm a") : "",
    };
  }, [event.startDate, event.endDate]);

  const locationName = event.metadata?.location?.name || "N/A";
  const locationAddress = event.metadata?.location?.address || "N/A";
  const virtualLink = event.metadata?.virtualLink || "N/A";

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[50px_1fr] items-center gap-2">
        <div className="w-full flex flex-col items-center justify-center border border-neutral-200 rounded-xl dark:border-[#343A40]">
          <span className="w-full py-[1px] text-center text-[10px] font-medium text-placeholder border-b border-neutral-200 dark:border-b-[#343A40]">
            {month}
          </span>
          <div className="w-full py-1 px-1 flex items-center justify-center">
            <span className="text-sm font-bold">{day}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold">{startDateTime}</span>
          {endDateTime && (
            <span className="text-[11px] font-semibold text-placeholder">
              {endDateTime}
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[50px_1fr] items-center gap-2">
        <div className="w-full min-h-11 flex items-center justify-center border border-neutral-200 rounded-xl dark:border-[#343A40]">
          <MapPinIcon variant="filled" className="w-5 h-5 text-placeholder" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-1">
            <span className="text-xs font-bold">{locationName}</span>
            {event.metadata?.location && <ExternalLinkIcon size={12} />}
          </div>
          <span className="text-[11px] font-semibold text-placeholder">
            {locationAddress}
          </span>
        </div>
      </div>
      {event.metadata?.virtualLink && (
        <div className="grid grid-cols-[50px_1fr] items-center gap-2">
          <div className="w-full min-h-11 flex items-center justify-center border border-neutral-200 rounded-xl dark:border-[#343A40]">
            <VideoCameraFilledIcon size={20} className="text-placeholder" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold">Virtual Link</span>
            <span className="text-[11px] font-semibold text-placeholder">
              {virtualLink}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(DatesAndLinks);
