import { Drawer, DrawerContent } from "@heroui/react";
import { FC, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import type { LocationValues } from "@/common/schemas/create-event.schema";
import { LocationDrawerBody } from "./location-drawer-body";
import { LocationDrawerHeader } from "./location-drawer-header";

type LocationDrawerProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelect: (location: LocationValues) => void;
};

export const LocationDrawer: FC<LocationDrawerProps> = ({
  isOpen,
  onOpenChange,
  onSelect,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [searching, setSearching] = useState(false);
  const [selectingPlaceId, setSelectingPlaceId] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompleteSuggestion[]
  >([]);

  const handleLocationSelect = async (
    placePrediction: google.maps.places.PlacePrediction | null,
    onClose: () => void,
  ) => {
    try {
      if (!placePrediction) return;

      const place = placePrediction.toPlace();
      setSelectingPlaceId(place?.id);

      const placeName = placePrediction.mainText?.text;
      const placeAddress = placePrediction.secondaryText?.text;

      const { place: placeWithLocation } = await place.fetchFields({
        fields: ["location"],
      });

      onSelect({
        placeId: place?.id,
        name: placeName || "",
        address: placeAddress || "",
        latitude: placeWithLocation?.location?.lat() || 0,
        longitude: placeWithLocation?.location?.lng() || 0,
      });
    } catch (error) {
      console.error("Error fetching place details:", error);
    } finally {
      setSelectingPlaceId(undefined);
      onClose();
    }
  };

  return (
    <Drawer
      placement={isMobile ? "bottom" : "right"}
      hideCloseButton
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        base: "data-[placement=right]:md:m-2 data-[placement=left]:md:m-2 rounded-medium",
      }}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <LocationDrawerHeader
              onClose={onClose}
              onSearching={setSearching}
              onSuggestions={(inputValue, result) => {
                setSuggestions(result);
                setSearchValue(inputValue);
              }}
            />
            <LocationDrawerBody
              searching={searching}
              searchValue={searchValue}
              suggestions={suggestions}
              selectingPlaceId={selectingPlaceId}
              onLocationSelect={(prediction) =>
                handleLocationSelect(prediction, onClose)
              }
            />
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
