"use client";

// react
import { FormProvider, useForm } from "react-hook-form";
// types
import type { LocationValues } from "@/common/schemas/create-event.schema";
// providers
import { GoogleMapApiProvider } from "@/components/providers/google-map-api-provider";
// components
import EventsDiscoveryArea from "./events-discovery";

export const ExplorePage = () => {
  const methods = useForm<{
    location?: LocationValues;
  }>();

  return (
    <GoogleMapApiProvider>
      <FormProvider {...methods}>
        <main className="min-h-screen dark:bg-[#181A1B]">
          <div className="container max-w-6xl mx-auto pt-14 pb-20 px-4">
            <div className="flex flex-col gap-7">
              {/* header */}
              <div className="flex flex-col gap-1.5">
                <h4 className="text-[24px] md:text-4xl font-extrabold">
                  Explore All Events
                </h4>
                <p className="text-sm md:text-base text-placeholder font-medium">
                  Explore popular events near you, browse by category, or check
                  out some of the great community hubs.
                </p>
              </div>
              {/* events discovery */}
              <EventsDiscoveryArea />
            </div>
          </div>
        </main>
      </FormProvider>
    </GoogleMapApiProvider>
  );
};
