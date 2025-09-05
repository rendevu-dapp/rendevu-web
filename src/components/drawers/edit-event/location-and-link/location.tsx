// imports
import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { useFormContext } from "react-hook-form";
// types
import { LocationValues } from "@/common/schemas/create-event.schema";

// schemas
import { EditEventValues } from "@/common/schemas/edit-event.schema";

// components
import { LocationDrawer } from "@/components/drawers/location-search";
// icon components
import { CloseXIcon, MapPinIcon } from "@/components/icons";

const Location = () => {
  // hooks
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<EditEventValues>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // derived state
  const location = watch("details.location");

  // handlers
  const handleChangeLocation = () => {
    onOpen();
  };

  const handleLocationSelect = (location: LocationValues) => {
    setValue("details.location", location, { shouldValidate: true });
  };

  const handleRemoveLocation = () => {
    setValue("details.location", undefined, { shouldValidate: true });
  };

  if (!location) {
    return null;
  }

  return (
    <>
      <Card
        shadow="none"
        as={"div"}
        isPressable
        onPress={handleChangeLocation}
        className="w-full border border-neutral-200 dark:border-[#343A40]"
      >
        <CardBody className="grid grid-cols-12 items-start gap-2">
          <div className="col-span-1 p-1 flex items-start justify-center">
            <MapPinIcon size={20} fill="#868E96" variant="filled" />
          </div>
          <div className="col-span-10 flex flex-col">
            <h6 className="text-sm font-semibold">{location.name}</h6>
            <p className="text-xs font-medium text-placeholder">
              {location.address || "No address provided"}
            </p>
            {errors.details?.location && (
              <p className="text-xs text-danger">
                {errors.details.location.message}
              </p>
            )}
          </div>
          <div className="col-span-1 p-1 flex items-start justify-center">
            <Button
              isIconOnly
              onPress={handleRemoveLocation}
              className="min-w-auto w-auto h-auto p-1 !rounded-full !bg-white hover:!bg-gray-100"
            >
              <CloseXIcon size={16} fill="#868E96" />
            </Button>
          </div>
        </CardBody>
      </Card>
      <LocationDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSelect={handleLocationSelect}
      />
    </>
  );
};

export default Location;
