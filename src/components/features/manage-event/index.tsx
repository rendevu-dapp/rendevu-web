"use client";

// imports
import { addToast } from "@heroui/react";
// next
import { useRouter } from "next/navigation";
// react
import { useLayoutEffect, useMemo, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
// helpers
import { compareAddress } from "@/common/helpers";
// hooks
import { useGetEventById } from "@/common/hooks/queries";
// types
import { Event } from "@/common/types/models/event";
// components
import About from "./about";
import EventDetails from "./event-details";
import Header from "./header";
import ManageEventLoadingSkeleton from "./loading-skeleton";
import { transformTickets } from "./transform-tickets";

type ManageEventPageProps = {
  eventId: string;
  onEventUpdated?: () => void;
};

export const ManageEventPage = ({
  eventId,
  onEventUpdated,
}: ManageEventPageProps) => {
  // hooks
  const router = useRouter();
  const account = useActiveAccount();
  const { data, loading, error, refetch } = useGetEventById({ id: eventId });
  const event = data?.eventById;
  const [isReloading, setIsReloading] = useState(false);

  const handleEventUpdated = async () => {
    setIsReloading(true);
    const initialMetadataHash = event?.metadataHash;
    let attempts = 0;
    const maxAttempts = 3;
    const pollInterval = 1000;

    const pollForUpdate = async (): Promise<boolean> => {
      attempts += 1;
      await refetch();
      const currentEvent = data?.eventById;

      if (currentEvent?.metadataHash !== initialMetadataHash) {
        return true;
      }

      if (attempts >= maxAttempts) {
        return false;
      }

      await new Promise((resolve) => setTimeout(resolve, pollInterval));
      return pollForUpdate();
    };

    try {
      const updated = await pollForUpdate();
      if (updated && onEventUpdated) {
        onEventUpdated();
      }
    } catch (err) {
      console.error("Error during polling:", err);
    } finally {
      setIsReloading(false);
    }
  };

  const validatedEvent = useMemo<Event | null>(() => {
    if (!event || !event.metadata) {
      return null;
    }

    return {
      id: String(event.id),
      eventId: String(event.eventId),
      metadataHash: event.metadataHash,
      isPaid: event.isPaid,
      isActive: event.isActive,
      capacity: event.capacity ? String(event.capacity) : null,
      organizer: String(event.organizer),
      startDate: String(event.startDate),
      endDate: String(event.endDate),
      venueType: event.venueType,
      requiresApproval: event.requiresApproval,
      metadata: {
        title: event.metadata.title,
        description: event.metadata.description,
        image: event.metadata.image || "/images/placeholders/events/image1.png",
        location: event.metadata.location
          ? {
              id: String(event.metadata.location.id),
              name: event.metadata.location.name,
              address: event.metadata.location.address || "N/A",
              placeId: event.metadata.location.placeId || "N/A",
              latitude: event.metadata.location.latitude,
              longitude: event.metadata.location.longitude,
            }
          : null,
        virtualLink: event.metadata.virtualLink ?? null,
      },
      tickets: transformTickets(event.tickets || []),
      paymentTokens: event.paymentTokens.map((pt) => ({
        tokenAddress: String(pt.tokenAddress),
        price: String(pt.price),
      })),
      payments: event.payments.map((p) => ({
        amount: String(p.amount),
      })),
      registrations: event.registrations.map((reg) => ({
        id: String(reg.id),
        attendee: String(reg.attendee),
        approved: reg.approved ?? null,
        approvedAt: reg.approvedAt ? String(reg.approvedAt) : null,
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
      })),
    };
  }, [event]);

  // effects
  useLayoutEffect(() => {
    if (!loading && event && account) {
      const isOrganizer = compareAddress(event.organizer, account.address);
      if (!isOrganizer) {
        addToast({
          title: "Access Denied",
          description: "Only organizers can manage this event.",
          color: "warning",
        });
        router.replace("/");
      }
    } else if (!loading && event && !account) {
      addToast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to manage this event.",
        color: "warning",
      });
      router.replace("/");
    }
  }, [loading, event, account, router]);

  if (loading || error || !validatedEvent || isReloading) {
    return <ManageEventLoadingSkeleton />;
  }

  return (
    <main className="min-h-screen dark:bg-[#181A1B]">
      <div className="container max-w-6xl mx-auto pt-14 pb-20 px-4">
        <div className="flex flex-col gap-10">
          <Header event={validatedEvent} onEventUpdated={handleEventUpdated} />
          <EventDetails event={validatedEvent} />
          <About event={validatedEvent} />
        </div>
      </div>
    </main>
  );
};
