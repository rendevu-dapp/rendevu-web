"use client";

// react
import { FC, useMemo } from "react";
// imports
import { base } from "thirdweb/chains";
// data
import { defaultNativeToken, supportedTokens } from "@/common/data";
// helpers
import { compareAddress } from "@/common/helpers";
import { useGetUserProfilesBulk } from "@/common/hooks/api/queries";
// hooks
import { useSuspenseGetEventGuests } from "@/common/hooks/queries";
// types
import { GuestPayment } from "./types";
// components
import { Table01DividerLine } from "./untitled-table";

type GuestListDataTableProps = {
  eventId: string;
};
const GuestListDataTable: FC<GuestListDataTableProps> = ({ eventId }) => {
  // hooks
  const activeChain = base;
  const { data } = useSuspenseGetEventGuests({
    variables: {
      id: eventId,
      registrationsFilter: {
        approved_not_eq: true,
      },
      paymentFilter: {
        registration: {
          approved_not_eq: true,
        },
      },
    },
  });

  const networkSelectedTokens = useMemo(
    () =>
      activeChain
        ? [defaultNativeToken, ...(supportedTokens[activeChain.id] || [])]
        : [],
    [activeChain],
  );

  // derive guest list with status
  const event = data?.eventById;
  const { guestList, isPaid, realEventId } = useMemo(() => {
    const {
      tickets = [],
      registrations = [],
      payments = [],
      isPaid = false,
      eventId,
    } = event || {};

    // approved guests from tickets
    const approvedGuests = tickets.map((ticket) => ({
      address: ticket.attendee,
      status: "accepted" as const,
      registeredAt: ticket.issuedAt,
      payment: ticket.payment,
    }));

    // pending guests from registrations
    const pendingGuests = registrations.map((registration) => ({
      address: registration.attendee,
      status: "pending" as const,
      registeredAt: registration.registeredAt,
      payment: payments.find((p) => p.registration?.id === registration.id),
    }));

    return {
      guestList: [...approvedGuests, ...pendingGuests],
      isPaid,
      realEventId: eventId,
    };
  }, [event]);

  // add user profiles
  const { data: userProfiles } = useGetUserProfilesBulk(
    guestList.map((guest) => guest.address),
  );

  const guestListWithProfiles = useMemo(
    () =>
      guestList.map((guest) => {
        const userProfile = userProfiles?.find((profile) =>
          compareAddress(profile.walletAddress, guest.address),
        );
        const paymentToken = networkSelectedTokens.find((token) =>
          compareAddress(token.address, guest.payment?.token?.tokenAddress),
        );

        return {
          ...guest,
          payment: paymentToken
            ? ({
                ...guest.payment,
                token: {
                  ...paymentToken,
                  price: guest.payment?.token?.price,
                },
              } as GuestPayment)
            : undefined,
          user: userProfile,
        };
      }),
    [guestList, networkSelectedTokens, userProfiles],
  );

  return (
    <div className="flex flex-col gap-3">
      <Table01DividerLine
        eventId={realEventId}
        isPaidEvent={isPaid}
        guestList={guestListWithProfiles}
      />
    </div>
  );
};

export default GuestListDataTable;
