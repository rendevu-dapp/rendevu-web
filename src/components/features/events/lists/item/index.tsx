// react

// imports
import { Button, Card, CardBody, CardFooter, User } from "@heroui/react";
import { format, fromUnixTime } from "date-fns";
import Image from "next/image";
// next
import Link from "next/link";
import { FC, memo } from "react";
import { useActiveAccount } from "thirdweb/react";
// static assets
import placeholderImage from "@/../public/images/placeholders/events/image2.png";
import ProfileSmImg from "@/../public/images/profile-sm.png";
// helpers
import { compareAddress, shortenAddress } from "@/common/helpers";
// hooks
import { useGetUserProfile } from "@/common/hooks/api/queries/use-get-user-profile";
// types
import { EventData } from "@/common/types/event-data";
// icon components
import {
  MapPinIcon,
  SettingsGearIcon,
  SettingsGearIconLight,
} from "@/components/icons";
// components
import Line from "./line";

type EventCardProps = {
  event: EventData;
};

const EventCard: FC<EventCardProps> = memo(({ event }) => {
  const account = useActiveAccount();
  const { data: user } = useGetUserProfile(event.organizer);

  const startDate = fromUnixTime(Number(event.startDate));
  const endDate = event.endDate ? fromUnixTime(Number(event.endDate)) : null;
  const isEventOrganizer = compareAddress(
    event.organizer,
    account?.address || "",
  );

  const imageUrl = event.metadata?.image
    ? event.metadata.image.replace(/^http:/, "https:")
    : placeholderImage;

  const avatarUrl = user?.avatar || ProfileSmImg.src;

  const dateAbove = format(startDate, "EEEE, d MMMM");
  const timeInside = format(startDate, "hh:mm a - d MMM");
  const endTimeInside = endDate
    ? `, ${format(endDate, "hh:mm a - d MMM")}`
    : "";

  const locationDisplay =
    event.metadata?.location?.name ||
    event.metadata?.location?.address ||
    event.metadata?.virtualLink ||
    "N/A";

  return (
    <div className="grid grid-cols-[4px_1fr] gap-1.5">
      <Line />
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center font-bold">
          <span className="text-xs">{dateAbove}</span>
        </div>
        <Card
          shadow="none"
          className="py-2 px-2.5 border dark:bg-[#181A1B] border-neutral-200 dark:border-[#343A40] rounded-4xl"
        >
          <CardBody className="flex flex-row items-start justify-between gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <h5 className="text-lg font-bold text-neutral-800 dark:text-gray-200 dark:font-medium">
                  {event.metadata?.title || "Untitled Event"}
                </h5>
                <span className="text-[11px] font-medium text-placeholder">
                  {timeInside}
                  {endTimeInside}
                </span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <User
                  name={`Host: ${shortenAddress(event.organizer)}`}
                  avatarProps={{
                    alt: `Host: ${event.organizer}`,
                    src: avatarUrl,
                    className: "w-6 h-6 rounded-full",
                  }}
                  classNames={{
                    name: "text-xs font-semibold text-placeholder",
                  }}
                />
                <div className="flex items-center gap-2 text-xs font-medium text-placeholder">
                  <div className="bg-neutral-200 dark:bg-gray-200 w-6 h-6 flex items-center justify-center rounded-lg">
                    <MapPinIcon variant="filled" className="w-4 h-4" />
                  </div>
                  <span>{locationDisplay}</span>
                </div>
              </div>
            </div>
            <Image
              alt="Event Image"
              width={68}
              height={68}
              src={imageUrl}
              className="w-16 h-16 rounded-xl object-cover"
            />
          </CardBody>
          <CardFooter className="flex-row justify-end gap-2">
            {isEventOrganizer ? (
              <Button
                as={Link}
                href={`/events/manage/${event.id}`}
                variant="bordered"
                startContent={
                  <div>
                    <SettingsGearIcon
                      size={16}
                      className="text-black dark:hidden"
                    />
                    <SettingsGearIconLight
                      size={16}
                      className="hidden dark:block text-gray-200"
                    />
                  </div>
                }
                className="!border-1 border-black dark:border-gray-300 text-xs font-semibold gap-1 rounded-full dark:font-normal"
              >
                Manage
              </Button>
            ) : (
              <Button
                as={Link}
                href={`/e/${event.id}`}
                className="bg-neutral-860 text-white text-xs font-semibold rounded-full"
              >
                View Event
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
});

EventCard.displayName = "EventCard";

export default EventCard;
