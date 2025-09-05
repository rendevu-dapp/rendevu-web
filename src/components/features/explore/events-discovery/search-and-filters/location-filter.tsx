"use client";

// Imports
import { Button, useDisclosure } from "@heroui/react";
import { MapPinIcon, XIcon } from "@phosphor-icons/react";
// React
import { Fragment } from "react";
// Types
import type { LocationValues } from "@/common/schemas/create-event.schema";

// Drawer components
import { LocationDrawer } from "@/components/drawers";
// Icon components
import { ChevronDownIcon } from "@/components/icons";

interface LocationFilterProps {
  location?: LocationValues;
  onLocationSelect: (location: LocationValues) => void;
  clearLocationFilter: () => void;
}

const LocationFilter = ({
  location: selectedLocation,
  onLocationSelect,
  clearLocationFilter,
}: LocationFilterProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleLocationSelect = (location: LocationValues) => {
    console.log("Location selected:", location);
    onLocationSelect(location);
  };

  return (
    <Fragment>
      <Button
        as={"div"}
        size="lg"
        variant="faded"
        onPress={onOpen}
        className="flex-1 md:flex-none bg-white text-sm font-medium justify-between dark:bg-transparent"
        endContent={
          <ChevronDownIcon
            size={16}
            className="text-gray-500 dark:text-white"
          />
        }
      >
        <div className="flex items-center gap-2">
          <MapPinIcon
            size={18}
            weight="fill"
            color="#868E96"
            className="h-5 w-5"
          />
          {selectedLocation ? (
            <span className="text-sm font-bold text-[#343A40]">
              {selectedLocation.name}
            </span>
          ) : (
            <span className="text-sm font-medium text-[#868E96]">Location</span>
          )}
        </div>
        {selectedLocation && (
          <Button
            isIconOnly
            onPress={clearLocationFilter}
            className="min-w-5 w-5 h-5 bg-white hover:bg-neutral-200 text-[#868E96] rounded-lg"
          >
            <XIcon weight="bold" size={16} className="text-[#868E96]" />
          </Button>
        )}
      </Button>
      <LocationDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSelect={handleLocationSelect}
      />
    </Fragment>
  );
};

export default LocationFilter;
