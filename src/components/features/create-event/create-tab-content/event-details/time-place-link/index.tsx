import { DatePicker, TimeInput, Select, SelectItem } from "@heroui/react";
import { Globe } from "@phosphor-icons/react";
import { useFormContext } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";
import {
  CreateEventValues,
  LocationValues,
} from "@/common/schemas/create-event.schema";
import { LocationAndVirtualLink } from "./location-virtual-link";

const timeZones = [
  { id: "1", name: "UTC", offset: "UTC±00:00" },
  { id: "2", name: "America/New_York", offset: "UTC-05:00" },
  { id: "3", name: "America/Chicago", offset: "UTC-06:00" },
  { id: "4", name: "America/Los_Angeles", offset: "UTC-08:00" },
  { id: "5", name: "Europe/London", offset: "UTC+00:00" },
  { id: "6", name: "Europe/Paris", offset: "UTC+01:00" },
  { id: "7", name: "Asia/Tokyo", offset: "UTC+09:00" },
  { id: "8", name: "Australia/Sydney", offset: "UTC+10:00" },
];

export const TimePlaceLink = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateEventValues>();

  const eventDetails = watch("details");

  const handleLocationSelect = (location: LocationValues) => {
    setValue("details.location", location, {
      shouldValidate: true,
    });
  };

  const handleVirtualLinkSelect = (link: string) => {
    setValue("details.virtualLink", link, {
      shouldValidate: true,
    });
  };

  return (
    <div className="flex w-full flex-col gap-6">
      {/* time */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* start and end datetime */}
        <div className="flex w-full flex-col gap-3 rounded-4xl border border-[#E9ECEF] dark:border-[#343A40] px-4 py-3 md:col-span-9 md:px-6 md:py-4 col-span-12">
          {/* start date */}
          <div className="grid w-full grid-cols-12 items-center justify-between gap-3">
            <div className="col-span-2 flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F8F9FA] dark:bg-[#1A1E25] md:h-6 md:w-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B0EFC9] dark:bg-[#0F4826] md:h-2.5 md:w-2.5" />
              </span>
              <span className="text-sm font-medium text-[#868E96]">Start</span>
            </div>
            <DatePicker
              aria-label="Start Date"
              size={isMobile ? "sm" : "md"}
              value={eventDetails?.startDate}
              onChange={(date) => {
                if (date) {
                  setValue("details.startDate", date, {
                    shouldValidate: true,
                  });
                }
              }}
              classNames={{
                base: "col-span-6 md:col-span-8 w-full",
                input: "h-12 font-bold",
                inputWrapper:
                  "bg-[none] border border-[#E9ECEF] dark:border-[#343A40] rounded-3xl",
              }}
              isInvalid={!!errors.details?.startDate}
            />
            <TimeInput
              aria-label="Start Time"
              size={isMobile ? "sm" : "md"}
              value={eventDetails?.startTime}
              onChange={(time) => {
                if (time) {
                  setValue("details.startTime", time, {
                    shouldValidate: true,
                  });
                }
              }}
              classNames={{
                base: "col-span-4 md:col-span-2 w-full",
                input: "h-12 font-bold",
                inputWrapper: "bg-[#F8F9FA] dark:bg-[#1A1E22] rounded-xl",
              }}
              isInvalid={!!errors.details?.startTime}
            />
          </div>
          {/* end date */}
          <div className="grid w-full grid-cols-12 items-center justify-between gap-3">
            <div className="col-span-2 flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F8F9FA] dark:bg-[#1A1E25] md:h-6 md:w-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F0AEAE] dark:bg-[#3F0B0B] md:h-2.5 md:w-2.5" />
              </span>
              <span className="text-sm font-medium text-[#868E96]">End</span>
            </div>
            <DatePicker
              aria-label="End Date"
              size={isMobile ? "sm" : "md"}
              value={eventDetails?.endDate}
              onChange={(date) => {
                if (date) {
                  setValue("details.endDate", date, {
                    shouldValidate: true,
                  });
                }
              }}
              classNames={{
                base: "col-span-6 md:col-span-8 w-full",
                input: "h-12 font-bold",
                inputWrapper:
                  "bg-[none] border border-[#E9ECEF] dark:border-[#343A40] rounded-3xl",
              }}
              isInvalid={!!errors.details?.endDate}
            />
            <TimeInput
              aria-label="End Time"
              size={isMobile ? "sm" : "md"}
              value={eventDetails?.endTime}
              onChange={(time) => {
                if (time) {
                  setValue("details.endTime", time, {
                    shouldValidate: true,
                  });
                }
              }}
              classNames={{
                base: "col-span-4 md:col-span-2 w-full",
                input: "h-12 font-bold",
                inputWrapper: "bg-[#F8F9FA] dark:bg-[#1A1E22] rounded-xl",
              }}
              isInvalid={!!errors.details?.endTime}
            />
          </div>
        </div>
        {/* time zone */}
        <div className="h-full w-full col-span-12 md:col-span-3">
          <Select
            aria-label="Timezone"
            defaultSelectedKeys={["1"]}
            classNames={{
              base: "w-full h-full",
              trigger: "h-full",
              selectorIcon: "text-[#868E96]",
              value: "font-bold text-[#868E96]",
              mainWrapper: "h-full",
            }}
            selectorIcon={<div />}
            variant="flat"
            items={timeZones}
            labelPlacement="outside"
            placeholder="Select timezone"
            disallowEmptySelection
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.key} className="flex flex-col gap-2 px-6 py-4">
                  <Globe weight="bold" size={24} className="text-[#868E96]" />
                  <span className="text-xs font-semibold text-wrap text-[#868E96]">
                    ({item.data?.offset}) {item.data?.name}
                  </span>
                </div>
              ));
            }}
          >
            {(timeZone) => (
              <SelectItem key={timeZone.id} textValue={timeZone.name}>
                <div className="flex flex-col">
                  <span className="text-small">{timeZone.name}</span>
                  <span className="text-tiny text-[#868E96]">
                    {timeZone.offset}
                  </span>
                </div>
              </SelectItem>
            )}
          </Select>
        </div>
        {/* error messages */}
        <div className="col-span-12 flex w-full flex-col gap-0.5">
          {errors.details?.startDate && (
            <div data-slot="error-message" className="text-tiny text-danger">
              {errors.details.startDate.message}
            </div>
          )}
          {errors.details?.endDate && (
            <div data-slot="error-message" className="text-tiny text-danger">
              {errors.details.endDate.message}
            </div>
          )}
          {errors.details?.startTime && (
            <div data-slot="error-message" className="text-tiny text-danger">
              {errors.details.startTime.message}
            </div>
          )}
          {errors.details?.endTime && (
            <div data-slot="error-message" className="text-tiny text-danger">
              {errors.details.endTime.message}
            </div>
          )}
        </div>
      </div>
      {/* location and virtual link */}
      <LocationAndVirtualLink
        onLocationSelect={handleLocationSelect}
        onVirtualLinkSelect={handleVirtualLinkSelect}
      />
    </div>
  );
};
