"use client";

// imports
import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  useDisclosure,
} from "@heroui/react";
// next
import Image from "next/image";
// react
import { FC } from "react";
import { Blobbie } from "thirdweb/react";
// static assets
import defaultEventImage from "@/../public/images/placeholders/events/image5.png";
// helpers
import { compareAddress, shortenAddress } from "@/common/helpers";
// hooks
import { useGetUserProfilesBulk } from "@/common/hooks/api/queries";
// types
import { Event } from "@/common/types/models/event";
import { EventParticipantDrawer } from "@/components/drawers/event-participants";
// components
import { ChevronRightIcon, ShareForwardIcon } from "@/components/icons";
// modal components
import { ShareEventModal } from "@/components/modals";
import { Ticket } from "../type";

type EventLightDetailsProps = {
  host?: string;
  title: string;
  eventId: string;
  imageUrl?: string | null;
  participants?: Ticket[];
  event?: Event;
};

const EventLightDetails: FC<EventLightDetailsProps> = ({
  host,
  title,
  eventId,
  imageUrl,
  participants = [],
  event,
}) => {
  // hooks
  const {
    isOpen: isParticipantDrawerOpen,
    onOpen: onParticipantDrawerOpen,
    onOpenChange: onParticipantDrawerChange,
  } = useDisclosure();
  const {
    isOpen: isShareModalOpen,
    onOpen: onShareModalOpen,
    onOpenChange: onShareModalChange,
  } = useDisclosure();
  const { data: profiles } = useGetUserProfilesBulk(
    host ? [host].concat(participants.map((p) => p.attendee)) : [],
  );

  // derived data
  const hostProfile = profiles?.find(
    (profile) => profile.walletAddress === host,
  );
  const participantProfiles = participants
    .map((ticket) => {
      const profile = profiles?.find((p) =>
        compareAddress(p.walletAddress, ticket.attendee),
      );
      return profile ? { ...ticket, profile } : ticket;
    })
    .filter(Boolean);

  return (
    <div className="w-full flex flex-col gap-3">
      {/* image */}
      <Image
        src={imageUrl || defaultEventImage}
        alt="Event Image"
        loading="eager"
        width={280}
        height={225}
        placeholder="blur"
        blurDataURL={defaultEventImage.src}
        className="w-full h-[225px] object-cover rounded-5xl"
      />
      {/* host */}
      <Card
        shadow="none"
        className="w-full border border-neutral-200 dark:bg-[#181A1B] dark:border-[#343A40] rounded-2xl"
      >
        <CardBody className="flex flex-col items-start gap-1.5">
          <span className="text-tiny font-bold">Host</span>
          <div className="flex flex-row items-center gap-2">
            {hostProfile?.avatar ? (
              <Avatar
                name={hostProfile?.fullName || shortenAddress(host)}
                size="sm"
                src={hostProfile.avatar}
              />
            ) : (
              <Blobbie address={host!} size={32} className="rounded-full" />
            )}
            <p className="text-sm truncate">
              <span>
                {hostProfile?.fullName
                  ? hostProfile.fullName
                  : shortenAddress(host)}
              </span>
            </p>
          </div>
        </CardBody>
      </Card>
      {/* share */}
      <Card
        isPressable
        shadow="none"
        onPress={() => onShareModalOpen()}
        className="w-full border border-neutral-200 dark:bg-[#181A1B] dark:border-[#343A40] rounded-2xl"
      >
        <CardBody className="flex flex-row items-center gap-2">
          <ShareForwardIcon
            size={20}
            className="text-neutral-500 hover:text-neutral-700 cursor-pointer"
          />
          <span className="text-small text-neutral-800 dark:text-neutral-200 font-semibold">
            Share Event
          </span>
        </CardBody>
      </Card>
      {/* participants */}
      <Card
        isPressable
        shadow="none"
        onPress={() => onParticipantDrawerOpen()}
        className="w-full border border-neutral-200 dark:bg-[#181A1B] dark:border-[#343A40] rounded-2xl"
      >
        <CardBody className="flex flex-col items-start gap-2.5">
          <span className="text-tiny font-bold">Participants</span>
          <div className="w-full flex items-center justify-between gap-2">
            <AvatarGroup
              size="md"
              max={3}
              total={participants.length}
              renderCount={(count) =>
                Boolean(count - 3 > 0) && (
                  <span className="text-tiny text-foreground font-medium ms-1">
                    +{count - 3}
                  </span>
                )
              }
            >
              {participants.map((ticket, index) => {
                const profile = profiles?.find((p) =>
                  compareAddress(p.walletAddress, ticket.attendee),
                );

                return profile?.avatar ? (
                  <Avatar
                    key={index}
                    src={profile.avatar}
                    name={profile?.fullName || shortenAddress(ticket.attendee)}
                    classNames={{ base: "border-2 border-white !rounded-3xl" }}
                  />
                ) : (
                  <Blobbie
                    key={index}
                    address={ticket.attendee}
                    size={36}
                    style={{
                      border: "2px solid white",
                      borderRadius: "var(--scale-400)",
                    }}
                  />
                );
              })}
            </AvatarGroup>
            <span className="bg-neutral-200 dark:bg-transparent dark:border dark:border-[#343A40] p-1 rounded-full">
              <ChevronRightIcon size={14} />
            </span>
          </div>
        </CardBody>
      </Card>
      {/* drawer for participants */}
      <EventParticipantDrawer
        isOpen={isParticipantDrawerOpen}
        onOpenChange={onParticipantDrawerChange}
        title="Event Participants"
        buttonText="View Participants"
        participants={participantProfiles}
      />
      {/* share modal */}
      <ShareEventModal
        isOpen={isShareModalOpen}
        onOpenChange={onShareModalChange}
        details={{ eventId, title }}
        event={event}
      />
    </div>
  );
};

export default EventLightDetails;
