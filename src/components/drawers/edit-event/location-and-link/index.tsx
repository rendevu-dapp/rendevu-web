"use client";

import { Map } from "@vis.gl/react-google-maps";
// imports
import { useFormContext } from "react-hook-form";
// schemas
import { EditEventValues } from "@/common/schemas/edit-event.schema";
import { GoogleMap } from "@/components/shared";
// components
import Location from "./location";
import VirtualLink from "./virtual-link";

export const LocationAndVirtualLink = () => {
  const { watch } = useFormContext<EditEventValues>();
  const location = watch("details.location");

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="grid w-full grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-12">
          <Location />
          {location &&
            Boolean(location.placeId) &&
            location.placeId !== "placeholder" && (
              <div className="h-80 w-full overflow-hidden rounded-3xl mt-3">
                <Map
                  mapId={"f524ded6b30acec43bad2b6e"}
                  reuseMaps={true}
                  style={{ width: "100%", height: "100%" }}
                  defaultZoom={15}
                  defaultCenter={{
                    lat: location.latitude ?? 0,
                    lng: location.longitude ?? 0,
                  }}
                  gestureHandling={"cooperative"}
                  clickableIcons={false}
                  disableDefaultUI={true}
                  disableDoubleClickZoom={true}
                >
                  <GoogleMap placeId={location.placeId!} />
                </Map>
              </div>
            )}
        </div>
        <div className="col-span-12 md:col-span-12">
          <VirtualLink />
        </div>
      </div>
    </div>
  );
};

export default LocationAndVirtualLink;
