// imports
import { useMemo } from "react";
// types
import { Event } from "@/common/types/models/event";
import GuestList from "./guest-list";
// components
import ManagePOAP from "./poap";
import SelfCheckinQR from "./self-checkin-qr";
import InviteOrShare from "./share";

type ManageOptionsProps = {
  event: Event;
};

const ManageOptions = ({ event }: ManageOptionsProps) => {
  // derived data
  const guestCount = useMemo(() => {
    if (event?.requiresApproval) {
      return event?.registrations?.length || 0;
    }

    return event?.tickets?.length || 0;
  }, [event]);

  // TODO: get guests pending approval and show (for approval events)

  return (
    <div className="w-full flex flex-col gap-4">
      {/* guest list */}
      <GuestList eventId={event.id} guestCount={guestCount} />
      {/* self checkin code generation */}
      <SelfCheckinQR eventId={event.id} realEventId={event.eventId} />
      {/* share event */}
      <InviteOrShare
        eventId={event.id}
        title={event.metadata?.title || "Unknown Event"}
        event={event}
      />
      {/* poap */}
      <ManagePOAP eventId={event.id} />
    </div>
  );
};

export default ManageOptions;
