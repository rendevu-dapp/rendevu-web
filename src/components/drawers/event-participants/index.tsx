"use client";

// imports
import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";
// react
import { FC, Fragment } from "react";
// hooks
import { useMediaQuery } from "usehooks-ts";
// types
import type { User } from "@/common/types/models/user";
import type { Ticket } from "@/components/features/single-event/event-details/type";
// icon components
import { UsersGroupIcon } from "@/components/icons";
// components
import ContactCard from "./contact-card";

type Participant = Ticket & {
  profile?: User;
};
type EventParticipantDrawerProps = {
  title?: string;
  buttonText?: string;
  isOpen: boolean;
  participants?: Participant[];
  onOpenChange: (isOpen: boolean) => void;
};

export const EventParticipantDrawer: FC<EventParticipantDrawerProps> = ({
  isOpen,
  title = "Event ",
  participants = [],
  onOpenChange,
}) => {
  // hooks
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Drawer
      size="sm"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement={isMobile ? "bottom" : "right"}
    >
      <DrawerContent className="overflow-y-auto">
        <Fragment>
          <DrawerHeader className="flex gap-22 my-2 justify-items-start items-center">
            <h5 className="text-large font-extrabold">{title}</h5>
          </DrawerHeader>
          <DrawerBody className="items-center">
            {/* empty state */}
            {!participants.length && (
              <div className="w-full flex flex-col items-center justify-center gap-2">
                <UsersGroupIcon size={48} />
                <p className="text-base text-muted-foreground text-center">
                  No participants are registered at the moment.
                </p>
              </div>
            )}
            {/* participant list  */}
            {Boolean(participants.length) && (
              <div className="w-full flex flex-col">
                {participants.map((participant, index) => (
                  <ContactCard key={index} participant={participant} />
                ))}
              </div>
            )}
          </DrawerBody>
        </Fragment>
      </DrawerContent>
    </Drawer>
  );
};
