import { Button, useDisclosure } from "@heroui/react";
import {
  MapPinIcon,
  PlusIcon,
  VideoCameraIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useFormContext } from "react-hook-form";
import { classnames } from "@/common/helpers";
import {
  CreateEventValues,
  LocationValues,
} from "@/common/schemas/create-event.schema";

import { LocationDrawer } from "@/components/drawers";
import { MeetingLinkDisclosure } from "./meeting-link-disclosure";

interface LocationAndVirtualLinkProps {
  onLocationSelect: (location: LocationValues) => void;
  onVirtualLinkSelect: (link: string) => void;
}

export const LocationAndVirtualLink = ({
  onLocationSelect,
  onVirtualLinkSelect,
}: LocationAndVirtualLinkProps) => {
  const {
    isOpen: locationDrawerOpen,
    onOpen: openLocationDrawer,
    onOpenChange: locationDrawerOpenChange,
  } = useDisclosure();
  const {
    isOpen: meetingLinkDisclosureOpen,
    onOpen: openMeetingLinkDisclosure,
    onOpenChange: meetingLinkDisclosureOpenChange,
  } = useDisclosure();
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateEventValues>();

  const eventDetails = watch("details");

  return (
    <div className="grid w-full grid-cols-12 gap-3">
      {/* location */}
      <div className="col-span-6 flex flex-col gap-2.5">
        <Button
          as={"div"}
          onPress={openLocationDrawer}
          className={classnames(
            "flex h-auto w-full flex-row justify-between gap-3 bg-white dark:bg-[#181A1B] dark:border-[#343A40] rounded-4xl border border-[#E9ECEF] p-5 md:p-7",
            {
              "bg-danger-50 hover:bg-danger-100 border-danger-100":
                !!errors.details?.location,
            },
          )}
        >
          <div className="flex gap-2 ml-[-12px] md:ml-0">
            <MapPinIcon weight="fill" size={24} className="text-[#868E96]" />
            <div className="flex flex-col items-start gap-1">
              {eventDetails?.location ? (
                <>
                  <span className="text-[13px] md:text-sm font-bold text-[#343A40] dark:text-gray-300">
                    {eventDetails.location.name}
                  </span>
                  <span className="text-[12px] md:text-sm font-semibold text-[#868E96]">
                    {eventDetails.location.address || "Selected location"}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[12px] md:text-sm font-bold text-[#343A40] dark:text-gray-300">
                    Add Location
                  </span>
                  <span className="text-[12px] md:text-sm font-semibold text-[#868E96]">
                    for offline events
                  </span>
                </>
              )}
            </div>
          </div>
          {eventDetails?.location ? (
            <Button
              isIconOnly
              onPress={() => setValue("details.location", undefined)}
              className="min-w-5 w-5 h-5 bg-white hover:bg-neutral-200 text-[#868E96] rounded-lg"
            >
              <XIcon weight="bold" size={16} className="text-[#868E96]" />
            </Button>
          ) : (
            <PlusIcon weight="bold" size={16} className="text-[#868E96]" />
          )}
        </Button>
        {errors.details?.location && (
          <div data-slot="error-message" className="text-tiny text-danger">
            {errors.details.location.message}
          </div>
        )}
      </div>
      <LocationDrawer
        isOpen={locationDrawerOpen}
        onOpenChange={locationDrawerOpenChange}
        onSelect={onLocationSelect}
      />
      {/* virtual link */}
      <div className="col-span-6 flex flex-col gap-1">
        <Button
          as={"div"}
          onPress={openMeetingLinkDisclosure}
          className={classnames(
            "flex h-auto w-full flex-row justify-between gap-3 rounded-4xl border border-[#E9ECEF] bg-white dark:bg-[#181A1B] dark:border-[#343A40] p-5 md:p-7",
            {
              "bg-danger-50 hover:bg-danger-100 border-danger-100":
                !!errors.details?.virtualLink ||
                (!!errors.details?.location &&
                  ["manual", "custom"].includes(
                    errors.details?.location?.type || "",
                  )),
            },
          )}
        >
          <div className="flex gap-2 ml-[-10px] md:ml-0">
            <VideoCameraIcon
              weight="fill"
              size={24}
              className="text-[#868E96]"
            />
            <div className="flex flex-col items-start gap-1">
              {eventDetails?.virtualLink ? (
                <>
                  <span className="text-[13px] md:text-sm font-bold text-[#343A40] dark:text-gray-300">
                    {eventDetails.virtualLink}
                  </span>
                  <span className="text-[12px] md:text-sm font-semibold text-[#868E96]">
                    Selected virtual link
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[12px] md:text-sm font-bold text-[#343A40] dark:text-gray-300">
                    Virtual Link
                  </span>
                  <span className="text-[12px] md:text-sm font-semibold text-[#868E96]">
                    add a meeting link
                  </span>
                </>
              )}
            </div>
          </div>
          {eventDetails?.virtualLink ? (
            <Button
              isIconOnly
              onPress={() => setValue("details.virtualLink", undefined)}
              className="min-w-5 w-5 h-5 bg-white hover:bg-neutral-200 text-[#868E96] rounded-lg"
            >
              <XIcon weight="bold" size={16} className="text-[#868E96]" />
            </Button>
          ) : (
            <PlusIcon weight="bold" size={16} className="text-[#868E96]" />
          )}
        </Button>
        {errors.details?.virtualLink && (
          <div data-slot="error-message" className="text-tiny text-danger">
            {errors.details.virtualLink.message}
          </div>
        )}
      </div>
      <MeetingLinkDisclosure
        isOpen={meetingLinkDisclosureOpen}
        onOpenChange={meetingLinkDisclosureOpenChange}
        onSelect={onVirtualLinkSelect}
      />
    </div>
  );
};
