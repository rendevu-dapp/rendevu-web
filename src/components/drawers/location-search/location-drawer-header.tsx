import { Button, DrawerHeader, Tooltip } from "@heroui/react";
import { X } from "@phosphor-icons/react";
import { FC } from "react";
import LocationAutocompleteInput from "./location-autocomplete-input";

type LocationDrawerHeaderProps = {
  onClose: () => void;
  onSearching: (searching: boolean) => void;
  onSuggestions: (
    inputValue: string,
    suggestions: google.maps.places.AutocompleteSuggestion[],
  ) => void;
};

export const LocationDrawerHeader: FC<LocationDrawerHeaderProps> = ({
  onClose,
  onSearching,
  onSuggestions,
}) => (
  <DrawerHeader className="border-default-200/50 flex flex-col gap-5 border-b">
    <div className="flex w-full flex-row items-center justify-between gap-1">
      <Tooltip content="Close">
        <Button
          isIconOnly
          size="sm"
          variant="faded"
          onPress={onClose}
          className="text-default-400 h-7 min-h-7 w-7 min-w-7 rounded-full border"
        >
          <X size={14} weight="bold" className="text-default-500" />
        </Button>
      </Tooltip>
      <h5 className="text-lg font-bold">Select Location</h5>
      <span />
    </div>
    <LocationAutocompleteInput
      onSearching={onSearching}
      onSuggestions={onSuggestions}
    />
  </DrawerHeader>
);
