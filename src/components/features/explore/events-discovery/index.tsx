"use client";

// react
import { Fragment, useCallback, useMemo, useState } from "react";
// imports
import type { SearchParams } from "typesense-types";
// hooks
import { useTypesenseSearch } from "@/common/hooks/typesense";
// schemas
import type { LocationValues } from "@/common/schemas/create-event.schema";
// types
import { EventDocument } from "@/common/types/event-data";
// components
import EventsList from "./list";
import SearchAndFiltersArea from "./search-and-filters";

const EventsDiscoveryArea = () => {
  // state
  const [page, setPage] = useState(1);
  const [nlp, setNlp] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<{
    start?: string;
    end?: string;
  }>();
  const [location, setLocation] = useState<LocationValues>();

  // derived data
  const searchParams = useMemo<SearchParams<EventDocument>>(() => {
    // prepare filters
    const filters: string[] = [];
    if (selectedDate?.start) {
      filters.push(
        `startDate:>=${Math.floor(
          new Date(selectedDate.start).getTime() / 1000,
        )}`,
      );
    } else {
      filters.push(`startDate:>=${Math.floor(Date.now() / 1000)}`);
    }

    if (selectedDate?.end) {
      filters.push(
        `endDate:<=${Math.floor(new Date(selectedDate.end).getTime() / 1000)}`,
      );
    }
    if (location?.placeId) {
      filters.push(`metadata.location.placeId:[${location.placeId}]`);
    }

    // prepare searches
    const preparedSearches: SearchParams<EventDocument> = {
      q: searchQuery || "*",
      query_by:
        "metadata.title,metadata.description,metadata.location.name,metadata.location.address",
      filter_by: filters.length ? filters.join(" && ") : undefined,
      nl_query: nlp,
      nl_model_id: "gpt-4.1-mini",
      per_page: 9,
      page,
      // sort_by: "startDate:desc,_text_match:desc",
    };

    return preparedSearches;
  }, [searchQuery, page, nlp, location, selectedDate]);

  // hooks
  const {
    loading: searching,
    data: searchResponse,
    // error: searchError,
  } = useTypesenseSearch<EventDocument>({
    collection: "events",
    params: searchParams,
  });

  const events = searchResponse?.hits?.map((hit) => hit.document) || [];
  const totalPages = useMemo(() => {
    const found = searchResponse?.found ?? 0;
    const perPage = searchResponse?.request_params?.per_page || 9;
    return found > 0 && perPage > 0 ? Math.ceil(found / perPage) : 0;
  }, [searchResponse]);

  // handlers
  const onLocationSelect = (location: LocationValues) => {
    if (!location.placeId) {
      return;
    }
    setLocation(location);
  };

  const handleNlpToggle = useCallback(() => {
    setNlp((prev) => !prev);
  }, []);

  const onDateChange = async (date: { start: string; end?: string }) => {
    setSelectedDate(date);
  };

  const clearFilters = () => {
    setLocation(undefined);
    setSelectedDate({
      start: "",
    });
  };

  return (
    <Fragment>
      <div className="flex flex-col gap-6">
        {/* search and filters */}
        <SearchAndFiltersArea
          query={searchQuery}
          location={location}
          usingNLP={nlp}
          onSearch={setSearchQuery}
          onNlpToggle={handleNlpToggle}
          onLocationSelect={onLocationSelect}
          onDateChange={onDateChange}
          clearLocationFilter={clearFilters}
        />
        {/* event list /cards */}
        <EventsList
          searchQuery={searchQuery}
          loading={searching}
          events={events}
          location={location}
          selectedDate={selectedDate}
          onPageChange={setPage}
        />
      </div>
      {/* pagination */}
      {events.length !== 0 && totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="rounded-full bg-gray-300 p-3 hover:bg-gray-100 dark:text-gray-700 disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setPage(index + 1)}
              className={`h-12 w-12 rounded-full text-base ${
                page === index + 1
                  ? "bg-gradient-to-br from-purple-800 to-red-400 text-white"
                  : "bg-gray-300"
              }`}
              disabled={page === index + 1}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="rounded-full bg-gray-300 p-3 hover:bg-gray-100 dark:text-gray-700 disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default EventsDiscoveryArea;
