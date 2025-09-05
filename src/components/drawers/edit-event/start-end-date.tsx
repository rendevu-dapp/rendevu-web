// imports

import { DatePicker, TimeInput } from "@heroui/react";
import { useFormContext } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";

// schemas
import { EditEventValues } from "@/common/schemas/edit-event.schema";

const StartEndDate = () => {
  // hooks
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<EditEventValues>();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // derived state
  const { startDate, startTime, endDate, endTime } = watch("details");

  return (
    <div className="flex w-full flex-col gap-4 md:gap-3 rounded-4xl border border-[#E9ECEF] dark:border-[#343A40] px-4 sm:px-6 py-4 md:col-span-9">
      {/* start date */}
      <div className="grid w-full grid-cols-12 items-center justify-between gap-3">
        <div className="col-span-12 md:col-span-2 flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F8F9FA] dark:bg-[#1A1E25]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B0EFC9] dark:bg-[#0F4826]" />
          </span>
          <span className="text-sm font-medium text-[#868E96] dark:text-gray-200">
            Start
          </span>
        </div>
        <DatePicker
          aria-label="Start Date"
          size={isMobile ? "md" : "sm"}
          value={startDate}
          onChange={(date) => {
            if (date) {
              setValue("details.startDate", date, {
                shouldValidate: true,
              });
            }
          }}
          classNames={{
            base: "col-span-8 md:col-span-7 w-full",
            input: "h-12 text-base md:text-sm font-medium md:font-semibold",
            inputWrapper:
              "bg-[none] border border-[#E9ECEF] dark:border-[#343A40] rounded-3xl",
          }}
          isInvalid={!!errors.details?.startDate}
        />
        <TimeInput
          aria-label="Start Time"
          size={isMobile ? "md" : "sm"}
          value={startTime}
          onChange={(time) => {
            if (time) {
              setValue("details.startTime", time, {
                shouldValidate: true,
              });
            }
          }}
          classNames={{
            base: "col-span-4 md:col-span-3 w-full",
            input: "h-12 text-base md:text-sm font-medium md:font-semibold",
            inputWrapper:
              "bg-[#F8F9FA] dark:bg-transparent dark:bg-[#1A1E22] rounded-xl",
          }}
          isInvalid={!!errors.details?.startTime}
        />
      </div>
      {/* end date */}
      <div className="grid w-full grid-cols-12 items-center justify-between gap-3">
        <div className="col-span-12 md:col-span-2 flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F8F9FA] dark:bg-[#1A1E25]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F0AEAE] dark:bg-[#3F0B0B]" />
          </span>
          <span className="text-sm font-medium text-[#868E96] dark:text-gray-200">
            End
          </span>
        </div>
        <DatePicker
          aria-label="End Date"
          size={isMobile ? "md" : "sm"}
          value={endDate}
          onChange={(date) => {
            if (date) {
              setValue("details.endDate", date, {
                shouldValidate: true,
              });
            }
          }}
          classNames={{
            base: "col-span-8 md:col-span-7 w-full",
            input: "h-12 text-base md:text-sm font-medium md:font-semibold",
            inputWrapper:
              "bg-[none] border border-[#E9ECEF] dark:border-[#343A40] rounded-3xl",
          }}
          isInvalid={!!errors.details?.endDate}
        />
        <TimeInput
          aria-label="End Time"
          size={isMobile ? "md" : "sm"}
          value={endTime}
          onChange={(time) => {
            if (time) {
              setValue("details.endTime", time, {
                shouldValidate: true,
              });
            }
          }}
          classNames={{
            base: "col-span-4 md:col-span-3 w-full",
            input: "h-12 text-base md:text-sm font-medium md:font-semibold",
            inputWrapper:
              "bg-[#F8F9FA] dark:bg-transparent dark:bg-[#1A1E22] rounded-xl",
          }}
          isInvalid={!!errors.details?.endTime}
        />
      </div>
    </div>
  );
};

export default StartEndDate;
