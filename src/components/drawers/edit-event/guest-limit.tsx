// react

import { Divider, NumberInput, Switch } from "@heroui/react";
import { useState } from "react";
// imports
import { useFormContext } from "react-hook-form";
// schemas
import { EditEventValues } from "@/common/schemas/edit-event.schema";
// icons components
import { UsersGroupIcon } from "@/components/icons";

const GuestLimit = () => {
  // state
  const [unlimitedGuests, setUnlimitedGuests] = useState<boolean>();

  // hooks
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<EditEventValues>();

  // derived state
  const guestLimit = watch("details.guestLimit");

  return (
    <div className="flex w-full flex-col gap-0.5">
      <label className="text-xs font-semibold !text-[#868E96] !dark:text-gray-200">
        Guest Limit
      </label>
      <NumberInput
        aria-label="Guest Limit"
        placeholder="0"
        isDisabled={unlimitedGuests}
        value={unlimitedGuests ? undefined : guestLimit}
        onChange={(value) => {
          const guestLimit =
            typeof value === "number"
              ? value
              : parseInt(value.target.value, 10);
          setValue("details.guestLimit", guestLimit);
        }}
        startContent={
          <div className="flex items-center gap-2">
            <UsersGroupIcon size={24} fill="#6B1ACF" />
            <Divider orientation="vertical" className="h-6" />
          </div>
        }
        hideStepper
        classNames={{
          base: "w-full",
          input: "font-semibold text-[24px] text-[#868E96]",
          inputWrapper:
            "bg-[none] py-4 px-4 border border-[#E9ECEF] dark:border-[#343A40] rounded-3xl shadow-none",
        }}
        isInvalid={!!errors.details?.guestLimit}
        errorMessage={errors.details?.guestLimit?.message}
      />
      <div className="flex flex-row items-center justify-between px-2 pt-1">
        <span className="text-xs font-medium text-[#6B1ACF]">
          Enable unlimited guests attendance
        </span>
        <Switch size="sm" color="secondary" onValueChange={setUnlimitedGuests}>
          <span className="sr-only"></span>
        </Switch>
      </div>
    </div>
  );
};

export default GuestLimit;
