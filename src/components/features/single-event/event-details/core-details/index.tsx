// react
import { FC } from "react";
// imports
import { useActiveAccount } from "thirdweb/react";
// helpers
import { compareAddress } from "@/common/helpers";
import { Event } from "@/common/types/models/event";
// types
import {
  Registration as EventRegistration,
  Location,
  PaymentToken,
  Ticket,
} from "../type";
import EventDescription from "./about";
// components
import DatesAndLinks from "./dates-and-links";
import Manage from "./manage";
import Registration from "./registration";

type EventCoreDetailsProps = {
  eventId: string;
  event: Event;
  title: string;
  realEventId: string;
  host?: string;
  isPaid?: boolean;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: Location;
  virtualLink?: string;
  participants: Ticket[];
  paymentTokens: PaymentToken[];
  registrations: EventRegistration[];
  requiresApproval?: boolean;
  onRefetch: () => void;
};

const EventCoreDetails: FC<EventCoreDetailsProps> = ({
  eventId,
  event,
  title,
  realEventId,
  host,
  isPaid = false,
  description,
  startDate,
  endDate,
  location,
  virtualLink,
  participants = [],
  paymentTokens = [],
  registrations = [],
  onRefetch,
}) => {
  // hooks
  const activeAccount = useActiveAccount();

  // derived data
  const isHost = compareAddress(activeAccount?.address, host);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* dates and links (event location and vitual link) */}
      <DatesAndLinks
        startDate={startDate}
        endDate={endDate}
        location={location}
        virtualLink={virtualLink}
      />
      {/* event description / about */}
      <EventDescription description={description} />
      {/* registration */}
      {!isHost && (
        <Registration
          eventId={eventId}
          event={event}
          realEventId={realEventId}
          isPaid={isPaid}
          title={title}
          startDate={startDate}
          endDate={endDate}
          location={location}
          participants={participants}
          registrations={registrations}
          paymentTokens={paymentTokens}
          onRefetch={onRefetch}
        />
      )}
      {/* manage */}
      {isHost && <Manage eventId={eventId} />}
    </div>
  );
};

export default EventCoreDetails;
