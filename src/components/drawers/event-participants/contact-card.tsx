// type

import { Avatar, Card, CardBody } from "@heroui/react";
// next
import Link from "next/link";
import { FC } from "react";
// imports
import { Blobbie } from "thirdweb/react";

// helpers
import { shortenAddress } from "@/common/helpers";

// types
import type { User } from "@/common/types/models/user";
import type { Ticket } from "@/components/features/single-event/event-details/type";
import { ChevronRightIcon } from "@/components/icons";

type Participant = Ticket & {
  profile?: User;
};
type ContactCardProps = {
  participant: Participant;
};

const ContactCard: FC<ContactCardProps> = ({ participant }) => (
  console.log(participant),
  (
    <Card
      as={Link}
      shadow="none"
      isPressable
      href={"#!"}
      className="w-full border border-neutral-200 dark:border-[#343A40] mb-4"
    >
      <CardBody className="w-full flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          {participant?.profile?.avatar ? (
            <Avatar
              src={participant?.profile.avatar}
              name={
                participant?.profile?.fullName ||
                shortenAddress(participant.attendee)
              }
              classNames={{ base: "rounded-full" }}
            />
          ) : (
            <Blobbie
              address={participant.attendee}
              size={36}
              className="rounded-full"
            />
          )}
          <div className="flex flex-col">
            <p className="font-medium text-sm text-gray-900 dark:text-gray-200">
              {participant?.profile?.fullName ||
                shortenAddress(participant.attendee)}
            </p>
            {participant?.profile?.email && (
              <p className="text-xs text-gray-600">
                {participant.profile.email}
              </p>
            )}
          </div>
        </div>
        <span className="bg-neutral-200 p-1 rounded-full dark:bg-transparent dark:border dark:border-[#343A40]">
          <ChevronRightIcon size={14} />
        </span>
      </CardBody>
    </Card>
  )
);

export default ContactCard;
