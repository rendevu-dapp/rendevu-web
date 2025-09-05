// react

// imports
import { format, fromUnixTime } from "date-fns";
// next
import Link from "next/link";
import { FC } from "react";

// icon components
import {
  ExternalLinkIcon,
  MapPinIcon,
  VideoCameraFilledIcon,
} from "@/components/icons";

// types
import { Location } from "../type";

type DatesAndLinksProps = {
  startDate?: string;
  endDate?: string;
  location?: Location;
  virtualLink?: string;
};

const DatesAndLinks: FC<DatesAndLinksProps> = ({
  startDate,
  endDate,
  location,
  virtualLink,
}) => {
  // derived data
  const start = startDate ? fromUnixTime(Number(startDate)) : new Date();
  const end = endDate ? fromUnixTime(Number(endDate)) : new Date();
  const locationLink = location?.placeId
    ? `https://www.google.com/maps/search/?api=1&query=${location.name}&query_place_id=${location.placeId}`
    : `https://www.google.com/maps/search/?api=1&query=${location?.latitude},${location?.longitude}`;

  return (
    <div className="flex flex-col gap-3">
      {/* dates */}
      <div className="grid grid-cols-[50px_1fr] items-center gap-2">
        {/* calendar day */}
        <div className="w-full flex flex-col items-center justify-center border border-neutral-200 dark:border-[#343A40] rounded-xl">
          <span className="w-full py-[1px] text-center text-[10px] font-medium text-placeholder border-b border-neutral-200 dark:border-b-[#343A40] capitalize">
            {format(start, "MMM")}
          </span>
          <div className="w-full py-1 px-1 flex items-center justify-center">
            <span className="text-sm font-bold">{format(start, "do")}</span>
          </div>
        </div>
        {/* start and end date with time */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold">
            {format(start, "EEEE, MMMM do - h:mm a")}
          </span>
          <span className="text-[11px] font-semibold text-placeholder">
            {format(end, "EEEE, MMMM do - h:mm a")}
          </span>
        </div>
      </div>
      {/* location */}
      {location && (
        <Link
          href={locationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="grid grid-cols-[50px_1fr] items-center gap-2"
        >
          {/* icon */}
          <div className="w-full min-h-11 flex items-center justify-center border border-neutral-200 dark:border-[#343A40] rounded-xl">
            <MapPinIcon variant="filled" className="w-5 h-5 text-placeholder" />
          </div>
          {/* location details - (place name, city - town) */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center gap-1">
              <span className="text-xs font-bold">{location?.name}</span>
              <ExternalLinkIcon size={12} />
            </div>
            <span className="text-[11px] font-semibold text-placeholder">
              {location?.address}
            </span>
          </div>
        </Link>
      )}
      {/* virtual link */}
      {virtualLink && (
        <Link
          href={virtualLink}
          target="_blank"
          rel="noopener noreferrer"
          className="grid grid-cols-[50px_1fr] items-center gap-2"
        >
          {/* icon */}
          <div className="w-full min-h-11 flex items-center justify-center border border-neutral-200 rounded-xl dark:border-[#343A40]">
            <VideoCameraFilledIcon size={20} className="text-placeholder" />
          </div>
          {/* virtual link details - (link text, link url) */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold">Virtual Link</span>
            <span className="text-[11px] font-semibold text-placeholder">
              {virtualLink}
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default DatesAndLinks;
