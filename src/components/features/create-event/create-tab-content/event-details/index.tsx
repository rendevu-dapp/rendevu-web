// react

import { Divider, Input, NumberInput, Switch, Textarea } from "@heroui/react";
// heroui
import { Users } from "@phosphor-icons/react";
// google maps
import { Map } from "@vis.gl/react-google-maps";
// next
import Image from "next/image";
import { useLayoutEffect, useState } from "react";

// react-hook-form
import { useFormContext } from "react-hook-form";
// static assets
import accessibilitySvg from "@/../public/images/accessibility.svg";
// schemas
import { CreateEventValues } from "@/common/schemas/create-event.schema";
import { GoogleMap } from "@/components/shared";
// components
import { TimePlaceLink } from "./time-place-link";

export const EventDetails = () => {
  const [unlimitedGuests, setUnlimitedGuests] = useState<boolean>();

  // hooks
  const {
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreateEventValues>();

  const location = watch("details.location");
  const guestLimit = watch("details.guestLimit");

  useLayoutEffect(() => {
    if (unlimitedGuests) {
      setValue("details.guestLimit", 0);
    }
  }, [unlimitedGuests, setValue]);

  return (
    <div className="flex w-full flex-col gap-7">
      {/* event basic details */}
      <div className="flex w-full flex-col gap-8">
        {/* title, time, location and virtual link */}
        <div className="flex w-full flex-col">
          {/* event title */}
          <div className="w-full py-5">
            <Input
              aria-label="Event Title"
              placeholder="Event Title"
              {...register("details.title")}
              classNames={{
                base: "w-full",
                input:
                  "font-bricolage-grotesque font-medium text-[28px] md:text-[36px] text-[#868E96] dark:text-white leading-[34px] md:leading-[44px]",
                inputWrapper: "bg-[none] shadow-none",
              }}
              style={{
                height: "auto !important",
              }}
              isInvalid={!!errors.details?.title}
              errorMessage={errors.details?.title?.message}
            />
          </div>
          {/* time, location and virtual link */}
          <TimePlaceLink />
        </div>
        {/* show map if place id is available */}
        {Boolean(location?.placeId) && (
          <div className="h-80 w-full overflow-hidden rounded-3xl">
            <Map
              mapId={"f524ded6b30acec43bad2b6e"}
              reuseMaps={true}
              style={{ width: "100%", height: "100%" }}
              defaultZoom={15}
              defaultCenter={{ lat: 0, lng: 0 }}
              gestureHandling={"cooperative"}
              clickableIcons={false}
              disableDefaultUI={true}
              disableDoubleClickZoom={true}
            >
              <GoogleMap placeId={location!.placeId!} />
            </Map>
          </div>
        )}
        {/* requires approval, guest limit and description */}
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-row items-center justify-between gap-1 rounded-3xl border border-[#E9ECEF] dark:border-[#343A40] px-6 py-7">
            {/* icon, title  and description */}
            <div className="flex flex-row items-start gap-2.5">
              <Image
                src={accessibilitySvg}
                alt="accessibility icon"
                width={18}
                height={18}
              />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-[#343A40] dark:text-gray-300">
                  Participant Approval
                </span>
                <span className="text-[12px] md:text-sm font-semibold text-[#868E96]">
                  Confirm attendee registration before they join the event!
                </span>
              </div>
            </div>
            {/* toggle */}
            <Switch
              color="secondary"
              onValueChange={(value) =>
                setValue("details.requiresApproval", value)
              }
            >
              <span className="sr-only">Requires Approval</span>
            </Switch>
          </div>
          <div className="flex w-full flex-col gap-1">
            <label className="pb-2 text-sm font-semibold !text-[#868E96]">
              Guest Limit
            </label>
            <NumberInput
              // label="Guest Limit"
              // labelPlacement="outside"
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
                  <Users weight="fill" size={24} className="text-[#6B1ACF]" />
                  <Divider orientation="vertical" className="h-6" />
                </div>
              }
              hideStepper
              classNames={{
                base: "w-full",
                // label: "pb-2 text-sm font-semibold !text-[#868E96]",
                input: "font-semibold text-[28px] text-[#868E96]",
                inputWrapper:
                  "bg-[none] py-7 px-6 border border-[#E9ECEF] dark:border-[#343A40] rounded-3xl shadow-none",
              }}
              isInvalid={!!errors.details?.guestLimit}
              errorMessage={errors.details?.guestLimit?.message}
            />
            <div className="flex flex-row items-center justify-between px-2 pt-1">
              <span className="text-xs font-semibold text-[#6B1ACF]">
                Enable unlimited guests attendance
              </span>
              <Switch
                size="sm"
                color="secondary"
                onValueChange={setUnlimitedGuests}
              >
                <span className="sr-only"></span>
              </Switch>
            </div>
          </div>
          <Textarea
            aria-label="Description"
            label="Description"
            labelPlacement="outside"
            placeholder="Add a description"
            {...register("details.description")}
            classNames={{
              base: "w-full",
              label: "pb-2 text-sm font-semibold !text-[#868E96]",
              input: "text-[#868E96]",
              inputWrapper:
                "bg-[none] py-7 px-6 border border-[#E9ECEF] dark:border-[#343A40] rounded-3xl shadow-none",
            }}
            isInvalid={!!errors.details?.description}
            errorMessage={errors.details?.description?.message}
          />
        </div>
      </div>
    </div>
  );
};
