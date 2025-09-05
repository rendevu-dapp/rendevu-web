"use client";

// react
import { memo, useMemo } from "react";
// types
import { Event } from "@/common/types/models/event";
// icon components
import {
  EyeViewIcon,
  TaskCompletedIcon,
  UsersGroupIcon,
} from "@/components/icons";

type TypeGuestsAndInvitesProps = {
  event: Event;
};

const TypeGuestsAndInvites = ({ event }: TypeGuestsAndInvitesProps) => {
  const { eventType, guestLimit, invitesSent } = useMemo(() => {
    const eventType = event.isPaid ? "Paid" : "Free";
    const requiresApproval = event.requiresApproval ? ", Approval" : "";
    const guestLimit =
      event.capacity && Number(event.capacity) > 0
        ? `${event.capacity} Guests`
        : "Unlimited Guests";
    const invitesSent = event.registrations?.length || 0;

    return {
      eventType: eventType + requiresApproval,
      guestLimit,
      invitesSent,
    };
  }, [
    event.isPaid,
    event.requiresApproval,
    event.capacity,
    event.registrations,
  ]);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-[50px_1fr] items-center gap-2">
        <div className="w-full min-h-11 flex items-center justify-center border border-neutral-200 rounded-xl dark:border-[#343A40]">
          <EyeViewIcon variant="filled" className="w-5 h-5 text-placeholder" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold">Event Type</span>
          <span className="text-[11px] font-semibold text-placeholder">
            {eventType}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-[50px_1fr] items-center gap-2">
        <div className="w-full min-h-11 flex items-center justify-center border border-neutral-200 rounded-xl dark:border-[#343A40]">
          <UsersGroupIcon
            variant="filled"
            className="w-5 h-5 text-placeholder"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-1">
            <span className="text-xs font-bold">Guest Limit</span>
          </div>
          <span className="text-[11px] font-semibold text-placeholder">
            {guestLimit}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-[50px_1fr] items-center gap-2">
        <div className="w-full min-h-11 flex items-center justify-center border border-neutral-200 rounded-xl dark:border-[#343A40]">
          <TaskCompletedIcon size={20} className="text-placeholder" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold">Invites Sent</span>
          <span className="text-[11px] font-semibold text-placeholder">
            {invitesSent}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(TypeGuestsAndInvites);
