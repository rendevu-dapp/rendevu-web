"use client";

import { Button, Input, Tooltip } from "@heroui/react";
// imports
import { SparkleIcon } from "@phosphor-icons/react";
// react
import { Dispatch, SetStateAction, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
// types
import type { LocationValues } from "@/common/schemas/create-event.schema";
// icon components
import { SearchIcon } from "@/components/icons";
// components
import DateFilter from "./date-filter";
import LocationFilter from "./location-filter";

type SearchAndFiltersProps = {
  query?: string;
  usingNLP?: boolean;
  location?: LocationValues;
  onSearch: Dispatch<SetStateAction<string | undefined>>;
  onNlpToggle: () => void;
  onLocationSelect: (location: LocationValues, useNLP?: boolean) => void;
  onDateChange: (date: { start: string; end?: string }) => void;
  clearLocationFilter: () => void;
};

const SearchAndFilters = ({
  query,
  location,
  usingNLP = false,
  onSearch,
  onNlpToggle,
  onDateChange,
  onLocationSelect,
  clearLocationFilter,
}: SearchAndFiltersProps) => {
  // state
  const [localQuery, setLocalQuery] = useState(query);

  // handlers
  const handleSearch = useDebounceCallback((query: string) => {
    onSearch(query);
  }, 300);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
      <div className="w-full md:max-w-[480px] flex flex-col md:flex-row md:items-center gap-2">
        <Input
          size="lg"
          variant="faded"
          classNames={{
            base: "bg-white dark:bg-transparent",
            inputWrapper: "bg-white dark:bg-transparent",
            input: "text-base font-medium text-black dark:text-white",
          }}
          placeholder={
            usingNLP ? "Search with natural language" : "Search events by title"
          }
          isClearable
          value={localQuery}
          onValueChange={(value) => {
            setLocalQuery(value);
            handleSearch(value);
          }}
          endContent={<SearchIcon className="cursor-pointer" />}
        />
        <Tooltip content="Use NLP for search" placement="top">
          <Button
            isIconOnly
            // variant="faded"
            color={usingNLP ? "primary" : "default"}
            onPress={onNlpToggle}
          >
            <SparkleIcon />
          </Button>
        </Tooltip>
      </div>
      <div className="w-full md:w-auto flex items-center gap-2">
        <LocationFilter
          location={location}
          onLocationSelect={onLocationSelect}
          clearLocationFilter={clearLocationFilter}
        />
        <DateFilter date={{ start: "" }} onChange={onDateChange} />
      </div>
    </div>
  );
};

export default SearchAndFilters;
