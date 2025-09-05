"use client";

// next
import { useParams } from "next/navigation";
// hooks
import { useSuspenseGetEventById } from "@/common/hooks/queries";
import EventCoreDetails from "./core-details";
// components
import Eventheader from "./header";
import EventLightDetails from "./light-details";

export const EventDetails = () => {
  // hooks
  const { eventId } = useParams<{ eventId: string }>();
  const { data, refetch } = useSuspenseGetEventById({
    variables: { id: eventId },
  });

  // derived data
  const rawEvent = data.eventById;

  if (!rawEvent) {
    return <div>Event not found</div>;
  }

  const event = {
    ...rawEvent,
    metadata: rawEvent.metadata
      ? {
          ...rawEvent.metadata,
          image: rawEvent.metadata.image ?? null,
          virtualLink: rawEvent.metadata.virtualLink ?? null,
          location: rawEvent.metadata.location
            ? {
                ...rawEvent.metadata.location,
                id: String(rawEvent.metadata.location.id),
                address: rawEvent.metadata.location.address ?? null,
                placeId: rawEvent.metadata.location.placeId ?? null,
              }
            : null,
        }
      : null,
    // Normalize tickets
    tickets: Array.isArray(rawEvent.tickets)
      ? rawEvent.tickets.map(
          (ticket: {
            id: string | number;
            isUsed: boolean;
            attendee: string | number;
            issuedAt: string | number;
            payment?: {
              amount: string | number;
              payer: string | number;
              token: {
                id: string | number;
                tokenAddress: string;
              };
            } | null;
            registration?: unknown;
          }) => ({
            id: String(ticket.id),
            isUsed: Boolean(ticket.isUsed),
            attendee: String(ticket.attendee),
            issuedAt: String(ticket.issuedAt),
            payment: ticket.payment
              ? {
                  amount: String(ticket.payment.amount),
                  payer: String(ticket.payment.payer),
                  token: {
                    id: String(ticket.payment.token.id),
                    tokenAddress: String(ticket.payment.token.tokenAddress),
                  },
                }
              : null,
            registration:
              ticket.registration &&
              typeof ticket.registration === "object" &&
              "id" in ticket.registration &&
              "attendee" in ticket.registration &&
              "registeredAt" in ticket.registration
                ? (() => {
                    type Registration = {
                      id: string | number;
                      attendee: string | number;
                      approved?: boolean | null | undefined;
                      approvedAt?: string | null | undefined;
                      registeredAt: string | number;
                      ticket?: unknown;
                      [key: string]: unknown;
                    };
                    const reg = ticket.registration as Registration;
                    return {
                      id: String(reg.id),
                      attendee: String(reg.attendee),
                      approved: reg.approved ?? null,
                      approvedAt: reg.approvedAt ?? null,
                      registeredAt: String(reg.registeredAt),
                      ticket: reg.ticket
                        ? {
                            id: String(ticket.id),
                            attendee: String(ticket.attendee),
                            issuedAt: String(ticket.issuedAt),
                            payment: ticket.payment
                              ? {
                                  amount: String(ticket.payment.amount),
                                  payer: String(ticket.payment.payer),
                                  token: {
                                    id: String(ticket.payment.token.id),
                                    tokenAddress: String(
                                      ticket.payment.token.tokenAddress,
                                    ),
                                  },
                                }
                              : null,
                            registration: undefined,
                          }
                        : null,
                    };
                  })()
                : null,
          }),
        )
      : [],
    // Normalize registrations
    registrations: Array.isArray(rawEvent.registrations)
      ? rawEvent.registrations.map(
          (reg: {
            id: string | number;
            attendee: string | number;
            approved?: boolean | null | undefined;
            approvedAt?: string | null | undefined;
            registeredAt: string | number;
            ticket?: {
              id: string | number;
              payment?: {
                amount: string | number;
                payer: string | number;
                token: {
                  id: string | number;
                  tokenAddress: string;
                };
              } | null;
            } | null;
          }) => ({
            id: String(reg.id),
            attendee: String(reg.attendee),
            approved: reg.approved ?? null,
            approvedAt: reg.approvedAt ?? null,
            registeredAt: String(reg.registeredAt),
            ticket: reg.ticket
              ? {
                  id: String(reg.ticket.id),
                  payment: reg.ticket.payment
                    ? {
                        amount: String(reg.ticket.payment.amount),
                        payer: String(reg.ticket.payment.payer),
                        token: {
                          id: String(reg.ticket.payment.token.id),
                          tokenAddress: String(
                            reg.ticket.payment.token.tokenAddress,
                          ),
                        },
                      }
                    : null,
                }
              : null,
          }),
        )
      : [],
  };

  const participants = event.tickets || [];
  const registrations = event.registrations || [];
  const paymentTokens = event.paymentTokens || [];

  // handlers
  const handleRefetch = () => {
    refetch();
  };

  return (
    <div className="flex flex-col gap-9">
      {/* header - title, event type and event payment */}
      <Eventheader
        title={event?.metadata?.title}
        isPaid={Boolean(event?.isPaid)}
        requiresApproval={event?.requiresApproval}
      />
      {/* event details - two column section */}
      <div className="grid grid-cols-1 md:grid-cols-[228px_1fr] lg:grid-cols-[30%_1fr] xl:grid-cols-[25%_1fr] gap-5">
        {/* event light details - image, host, share, participants */}
        <EventLightDetails
          eventId={eventId}
          title={event.metadata?.title || "Untitled Event"}
          host={event.organizer}
          imageUrl={event.metadata?.image ?? null}
          participants={participants}
          event={event}
        />
        {/* event core details - dates, location, link, details, registration, manage */}
        <EventCoreDetails
          eventId={eventId}
          realEventId={event?.eventId}
          host={event?.organizer}
          isPaid={event?.isPaid}
          description={event?.metadata?.description}
          startDate={event?.startDate}
          endDate={event?.endDate}
          location={event?.metadata?.location || undefined}
          virtualLink={event?.metadata?.virtualLink || undefined}
          participants={participants}
          registrations={registrations}
          paymentTokens={paymentTokens}
          onRefetch={handleRefetch}
        />
      </div>
    </div>
  );
};

export default EventDetails;
