import { Event } from "@/common/types/models/event";

// type for raw tickets
export interface RawTicket {
  __typename?: "Ticket";
  id: string;
  attendee?: string | null;
  issuedAt: string;
  payment?: {
    __typename?: "Payment";
    amount: string;
    payer: string;
    token: {
      __typename?: "EventToken";
      id: string;
      tokenAddress: string;
    };
  } | null;
  registration?: {
    __typename?: "Registration";
    id: string;
    attendee: string;
    approved?: boolean | null;
    approvedAt?: string | null;
    registeredAt: string;
  } | null;
}

// Utility function to filter and transform tickets
export const transformTickets = (tickets: RawTicket[]): Event["tickets"] =>
  tickets
    .filter((ticket) => {
      return (
        ticket.id !== undefined &&
        ticket.issuedAt !== undefined &&
        (!ticket.payment ||
          (ticket.payment.amount !== undefined &&
            ticket.payment.payer !== undefined &&
            ticket.payment.token &&
            ticket.payment.token.id !== undefined &&
            ticket.payment.token.tokenAddress !== undefined)) &&
        (!ticket.registration ||
          (ticket.registration.id !== undefined &&
            ticket.registration.attendee !== undefined &&
            ticket.registration.registeredAt !== undefined))
      );
    })
    .map((ticket) => ({
      id: String(ticket.id),
      attendee: ticket.attendee ? String(ticket.attendee) : "",
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
      registration: ticket.registration
        ? {
            id: String(ticket.registration.id),
            attendee: String(ticket.registration.attendee),
            approved: ticket.registration.approved ?? null,
            approvedAt: ticket.registration.approvedAt
              ? String(ticket.registration.approvedAt)
              : null,
            registeredAt: String(ticket.registration.registeredAt),
            ticket: null,
          }
        : null,
    }));
