import { Button, DrawerBody, Spinner } from "@heroui/react";
import { MapPin } from "@phosphor-icons/react";
import { FC } from "react";
import { classnames } from "@/common/helpers";

type LocationDrawerBodyProps = {
  searching: boolean;
  searchValue: string;
  suggestions: google.maps.places.AutocompleteSuggestion[];
  selectingPlaceId?: string;
  onLocationSelect: (
    prediction: google.maps.places.PlacePrediction | null,
  ) => void;
};

export const LocationDrawerBody: FC<LocationDrawerBodyProps> = ({
  searching,
  searchValue,
  suggestions,
  selectingPlaceId,
  onLocationSelect,
}) => {
  const showEmptyState = !searching && !searchValue;
  const hasNoPredictions =
    suggestions.length === 0 && !searching && searchValue;

  return (
    <DrawerBody className="no-scrollbar p-3">
      <div className="flex flex-col gap-6">
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-sm font-semibold text-[#868E96]">Places</span>
          {searching && (
            <div className="flex h-16 w-full items-center justify-center">
              <Spinner
                size="md"
                className="text-[#868E96]"
                aria-label="Loading"
              />
            </div>
          )}
          {Boolean(suggestions.length) && (
            <div className="flex flex-col gap-2">
              {suggestions.map((suggestion, index) => {
                const placeName = suggestion.placePrediction?.mainText?.text;
                const placeAddress =
                  suggestion.placePrediction?.secondaryText?.text;
                const selecting =
                  selectingPlaceId === suggestion.placePrediction?.placeId;

                return (
                  <Button
                    key={index}
                    variant="bordered"
                    isDisabled={Boolean(selectingPlaceId)}
                    isLoading={selecting}
                    onPress={() => onLocationSelect(suggestion.placePrediction)}
                    className="h-auto border bg-white dark:bg-transparent px-4 py-2 dark:hover:bg-[#343A40]"
                  >
                    <div className="grid h-auto w-full grid-cols-[20px_1fr] items-start justify-start gap-3 ">
                      <div className={classnames({ "py-2": !selecting })}>
                        {!selecting && (
                          <MapPin
                            size={18}
                            weight="fill"
                            color="#868E96"
                            className="h-5 w-5"
                          />
                        )}
                      </div>
                      <div className="flex flex-col gap-0.5 text-left ">
                        <span className="text-sm font-bold text-wrap text-[#868E96] dark:text-gray-300">
                          {placeName}
                        </span>
                        <span className="text-xs text-wrap text-[#868E96]">
                          {placeAddress}
                        </span>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
        {hasNoPredictions && (
          <div className="flex min-h-52 w-full flex-1 flex-col items-center justify-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E9ECEF]">
              <MapPin size={24} color="#343A40" weight="duotone" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-bold text-[#343A40]">
                No location found!
              </span>
              <span className="text-xs text-[#868E96]">Try another place</span>
            </div>
          </div>
        )}
        {showEmptyState && (
          <div className="flex min-h-52 w-full flex-1 flex-col items-center justify-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E9ECEF]">
              <MapPin size={24} color="#343A40" weight="duotone" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-bold text-[#343A40]">
                Search for a location
              </span>
              <span className="text-xs text-[#868E96]">
                Start typing to find a place
              </span>
            </div>
          </div>
        )}
      </div>
    </DrawerBody>
  );
};
