import { Input } from "@heroui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { debounce } from "lodash";
import { FC, useCallback } from "react";

type LocationAutocompleteInputProps = {
  onSearching: (loading: boolean) => void;
  onSuggestions: (
    searchValue: string,
    predictions: google.maps.places.AutocompleteSuggestion[],
  ) => void;
};

const LocationAutocompleteInput: FC<LocationAutocompleteInputProps> = ({
  onSearching,
  onSuggestions,
}) => {
  const googleMapsPlaces = useMapsLibrary("places");
  const autocompleteSuggestion = googleMapsPlaces?.AutocompleteSuggestion;

  const fetchPredictionsBase = useCallback(
    (input: string) => {
      if (!input.trim()) {
        onSuggestions(input, []);
        return;
      }

      if (autocompleteSuggestion) {
        onSearching(true);

        const request: google.maps.places.AutocompleteRequest = {
          input,
          language: "en",
        };

        autocompleteSuggestion
          .fetchAutocompleteSuggestions(request)
          .then((response) => {
            onSuggestions(input, response.suggestions || []);
          })
          .catch((error) => {
            console.error("Error fetching autocomplete suggestions:", error);
            onSuggestions(input, []);
          })
          .finally(() => {
            onSearching(false);
          });
      }
    },
    [onSuggestions, onSearching, autocompleteSuggestion],
  );

  const fetchPredictions = debounce(fetchPredictionsBase, 400, {
    trailing: true,
  });

  const handleInputChange = (value: string) => {
    fetchPredictions(value);
  };

  return (
    <Input
      size="lg"
      variant="bordered"
      placeholder="Search for a location"
      onChange={(e) => handleInputChange(e.target.value)}
      startContent={
        <MagnifyingGlass weight="bold" size={20} className="text-[#868E96]" />
      }
      classNames={{
        base: "w-full",
        input: "font-medium placeholder:text-[#868E96] text-sm",
        inputWrapper: "bg-[none] shadow-none border rounded-2xl",
      }}
      style={{
        height: "auto !important",
      }}
    />
  );
};

export default LocationAutocompleteInput;
