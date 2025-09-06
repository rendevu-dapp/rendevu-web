"use client";

import { Button, Card, CardBody, User, useDisclosure } from "@heroui/react";
// imports
import { fromUnixTime } from "date-fns";
// next
import { useSearchParams } from "next/navigation";
// react
import { FC, Fragment, useMemo } from "react";
import { Blobbie, useActiveAccount } from "thirdweb/react";
// helpers
import { compareAddress, shortenAddress } from "@/common/helpers";
// hooks
import { useGetUserProfile } from "@/common/hooks/api/queries";
import { Event } from "@/common/types/models/event";
// components
import {
  EventRegistrationModal,
  SelfCheckInModal,
  ViewTicketModal,
} from "@/components/modals";
// types
import {
  Registration as EventRegistration,
  Location,
  PaymentToken,
  Ticket,
} from "../type";

type RegistrationProps = {
  eventId: string;
  event: Event;
  realEventId: string;
  title: string;
  isPaid?: boolean;
  startDate?: string;
  endDate?: string;
  location?: Location;
  participants: Ticket[];
  paymentTokens: PaymentToken[];
  registrations: EventRegistration[];
  onRefetch: () => void;
};

const Registration: FC<RegistrationProps> = ({
  eventId,
  event,
  realEventId,
  title,
  isPaid = false,
  startDate,
  endDate,
  location,
  participants,
  registrations,
  paymentTokens,
  onRefetch,
}) => {
  // hooks
  const searchParams = useSearchParams();
  const activeAccount = useActiveAccount();
  const {
    isOpen: registrationModalOpen,
    onOpen: onRegistrationModalOpen,
    onOpenChange: onRegistrationModalChange,
  } = useDisclosure();
  const {
    isOpen: selfCheckInModalOpen,
    onOpen: onSelfCheckInModalOpen,
    onOpenChange: onSelfCheckInModalChange,
  } = useDisclosure();
  const { data: userProfile } = useGetUserProfile(activeAccount?.address);

  // derived data
  const checkInCode = useMemo(() => {
    const code = searchParams.get("checkin-code");
    return code ? decodeURIComponent(code) : "";
  }, [searchParams]);
  const eventStartTime = startDate
    ? fromUnixTime(Number(startDate))
    : new Date();
  const eventEndTime = endDate ? fromUnixTime(Number(endDate)) : new Date();
  const isAttendee = participants.some((participant) =>
    compareAddress(participant.attendee, activeAccount?.address),
  );
  const isAwaitingApproval = registrations.some(
    (registration) =>
      compareAddress(registration.attendee, activeAccount?.address) &&
      !registration.approved,
  );
  const isNotRegistered = !isAttendee && !isAwaitingApproval;

  return (
    <Fragment>
      <Card
        shadow="none"
        className="w-full bg-surfaces-bg-secondary rounded-5xl"
      >
        <CardBody className="p-8 flex-col md:flex-row md:justify-between gap-3">
          <div className="flex flex-col items-start gap-2.5">
            {Boolean(isAttendee || isAwaitingApproval) && (
              <Fragment>
                {userProfile?.avatar ? (
                  <User
                    name={
                      userProfile?.fullName ||
                      shortenAddress(activeAccount?.address)
                    }
                    avatarProps={{
                      src: userProfile.avatar,
                      className: "w-7 h-7",
                    }}
                    classNames={{
                      name: "text-sm font-semibold dark:text-black",
                    }}
                  />
                ) : activeAccount?.address ? (
                  <Blobbie
                    address={activeAccount.address}
                    size={32}
                    className="w-8 h-8 rounded-full"
                  />
                ) : null}
              </Fragment>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-semibold text-[#181A1B]">
                {isAttendee
                  ? "You're in"
                  : isAwaitingApproval
                    ? "Awaiting Approval"
                    : "Register"}
              </span>
              <span className="text-[11px] font-semibold text-placeholder">
                {isAttendee
                  ? "You're confirmed for this event"
                  : isAwaitingApproval
                    ? "We're reviewing your registration"
                    : "Secure your spot at this event"}
              </span>
            </div>
          </div>
          {isAttendee &&
            (() => {
              const now = new Date();
              const ticket = participants.find((participant) =>
                compareAddress(participant.attendee, activeAccount?.address),
              );

              const eventStarted = new Date(eventStartTime) <= now;
              const eventNotEnded = new Date(eventEndTime) > now;
              const canCheckIn = // true;
                ticket && !ticket.isUsed && eventStarted && eventNotEnded;

              if (canCheckIn) {
                return (
                  <Button
                    className="bg-neutral-860 text-white text-xs font-semibold rounded-full"
                    onPress={() => onSelfCheckInModalOpen()}
                  >
                    Check In
                  </Button>
                );
              }

              return (
                <ViewTicketModal
                  eventId={eventId}
                  event={event}
                  title={title}
                  startDate={startDate}
                  endDate={endDate}
                  location={location}
                />
              );
            })()}

          {isNotRegistered && (
            <Button
              color="secondary"
              onPress={onRegistrationModalOpen}
              className="!rounded-full !text-xs font-semibold"
            >
              Register
            </Button>
          )}
        </CardBody>
      </Card>
      <EventRegistrationModal
        isOpen={registrationModalOpen}
        details={{
          eventId: realEventId,
          isPaid: isPaid,
          email: userProfile?.email || "",
          name: userProfile?.fullName || "",
          paymentTokens,
        }}
        onOpenChange={onRegistrationModalChange}
        onRefetchEvent={onRefetch}
      />
      {selfCheckInModalOpen && (
        <SelfCheckInModal
          checkInCode={checkInCode}
          isOpen={selfCheckInModalOpen}
          onOpenChange={onSelfCheckInModalChange}
          onRefetchEvent={onRefetch}
        />
      )}
    </Fragment>
  );
};

export default Registration;
