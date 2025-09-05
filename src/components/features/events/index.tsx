"use client";

// imports
import { getUnixTime } from "date-fns";

// next
import { useRouter, useSearchParams } from "next/navigation";
// react
import { FC, useMemo, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
// @ts-expect-error err
import { EventOrderByInput } from "@/common/graphql/generated/graphql";
// hooks
import {
  useGetUserEvents,
  useGetUserEventsStats,
} from "@/common/hooks/queries";
// types
import { EventData } from "@/common/types/event-data";
import EventsHeader from "./header";
// components
import EventsList from "./lists";
import EventStats from "./stats";
import EventListTabs from "./tabs";

export const EventsPage: FC = () => {
  // state
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  // hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const account = useActiveAccount();

  // derived data
  const tabParam = searchParams.get("tab");
  const activeTabValue: "upcoming" | "past" =
    tabParam === "upcoming" || tabParam === "past" ? tabParam : "upcoming";

  // Fetch organized events for stats
  const { data: organizedEvents } = useGetUserEventsStats({
    skip: !account,
    variables: {
      where: {
        organizer_containsInsensitive: account?.address,
      },
      orderBy: [EventOrderByInput.StartDateDescNullsLast],
    },
  });
  // Fetch attended events for stats
  const { data: attendedEvents } = useGetUserEventsStats({
    skip: !account,
    variables: {
      where: {
        OR: [
          {
            tickets_some: {
              attendee_containsInsensitive: account?.address,
            },
          },
          {
            registrations_some: {
              attendee_containsInsensitive: account?.address,
            },
          },
        ],
      },
      orderBy: [EventOrderByInput.StartDateDescNullsLast],
    },
  });

  // Fetch events based on active tab with ordering
  const {
    data: userEvents,
    loading,
    fetchMore,
  } = useGetUserEvents({
    skip: !account,
    variables: {
      first: 12,
      orderBy: [EventOrderByInput.StartDateDescNullsLast],
      where: {
        AND: [
          {
            ...(activeTabValue === "upcoming"
              ? { endDate_gte: getUnixTime(new Date()) }
              : { endDate_lt: getUnixTime(new Date()) }),
          },
          {
            OR: [
              {
                organizer_containsInsensitive: account?.address,
              },
              {
                tickets_some: {
                  attendee_containsInsensitive: account?.address,
                },
              },
              {
                registrations_some: {
                  attendee_containsInsensitive: account?.address,
                },
              },
            ],
          },
        ],
      },
    },
  });

  // Map fetched events to EventData type
  const events: EventData[] = useMemo(
    () =>
      userEvents?.eventsConnection?.edges?.map(({ node: event }) => {
        return {
          id: event.id,
          eventId: event.eventId,
          metadataHash: event.metadataHash,
          metadata: event.metadata
            ? {
                title: event.metadata.title || "",
                description: event.metadata.description || "",
                image: event.metadata.image ?? null,
                virtualLink: event.metadata.virtualLink ?? null,
                location: event.metadata.location
                  ? {
                      id: event.metadata.location.id,
                      name: event.metadata.location.name || "",
                      address: event.metadata.location.address ?? null,
                      placeId: event.metadata.location.placeId ?? null,
                      latitude: event.metadata.location.latitude || "0",
                      longitude: event.metadata.location.longitude || "0",
                    }
                  : null,
              }
            : {
                title: "",
                description: "",
                image: null,
                virtualLink: null,
                location: null,
              },
          isPaid: event.isPaid,
          isActive:
            event.startDate && event.endDate
              ? getUnixTime(new Date()) >= Number(event.startDate) &&
                getUnixTime(new Date()) <= Number(event.endDate)
              : false,
          organizer: event.organizer,
          startDate: event.startDate,
          endDate: event.endDate,
          tickets: event.tickets.map((ticket) => ({
            tokenAddress: ticket.payment?.token?.tokenAddress ?? "",
            price: ticket.payment?.amount ?? "0",
          })),
        };
      }) ?? [],
    [userEvents],
  );

  // Compute stats with memoization
  const totalOrganized = useMemo(
    () => organizedEvents?.eventsConnection?.totalCount ?? 0,
    [organizedEvents],
  );
  const totalAttended = useMemo(
    () => attendedEvents?.eventsConnection?.totalCount ?? 0,
    [attendedEvents],
  );

  // handlers
  const handleTabChange = (value: "upcoming" | "past") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`/events?${params.toString()}`);
  };

  const handleFetchMore = () => {
    // check if it already loading or at the end of list
    if (loadingMore || !userEvents?.eventsConnection?.pageInfo?.hasNextPage)
      return;

    // set loading state
    setLoadingMore(true);

    // fetch more events
    fetchMore({
      variables: {
        // cursor
        after: userEvents.eventsConnection.pageInfo.endCursor,
        // vars
        first: 12,
        orderBy: [EventOrderByInput.StartDateDescNullsLast],
        where: {
          AND: [
            {
              ...(activeTabValue === "upcoming"
                ? { endDate_gte: getUnixTime(new Date()) }
                : { endDate_lt: getUnixTime(new Date()) }),
            },
            {
              OR: [
                {
                  organizer_containsInsensitive: account?.address,
                },
                {
                  tickets_some: {
                    attendee_containsInsensitive: account?.address,
                  },
                },
                {
                  registrations_some: {
                    attendee_containsInsensitive: account?.address,
                  },
                },
              ],
            },
          ],
        },
      },
      updateQuery(previousQueryResult, { fetchMoreResult }) {
        if (!fetchMoreResult?.eventsConnection) return previousQueryResult;

        const prevList = previousQueryResult.eventsConnection || [];
        const moreList = fetchMoreResult.eventsConnection || [];

        return {
          eventsConnection: {
            ...moreList,
            //  combine old list and new list
            edges: [...prevList.edges, ...moreList.edges],
          },
        };
      },
    }).finally(() => {
      // reset loading state
      setLoadingMore(false);
    });
  };

  return (
    <main className="min-h-screen dark:bg-[#181A1B]">
      <div className="container max-w-6xl mx-auto pt-14 pb-20 px-4">
        <div className="flex flex-col gap-10">
          {/* header */}
          <EventsHeader />
          {/* events list tabs - upcoming / past */}
          <EventListTabs
            activeTab={activeTabValue}
            onTabChange={handleTabChange}
          />
          {/* event stats - total events created / attended */}
          <EventStats
            totalOrganized={totalOrganized}
            totalAttended={totalAttended}
          />
          {/* events list - based on upcoming or past */}
          <EventsList
            type={activeTabValue}
            events={events}
            loading={loading || loadingMore}
            onLoadMore={handleFetchMore}
          />
        </div>
      </div>
    </main>
  );
};

export default EventsPage;
