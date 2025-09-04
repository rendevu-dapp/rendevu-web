// react

// heroui
import { Button } from "@heroui/react";
import { FC } from "react";
import { EventDetails } from "./event-details";
// components
import { EventImage } from "./event-image";

// types
type CreateEventTabContentProps = {
  onContinue: () => void;
};

export const CreateEventTabContent: FC<CreateEventTabContentProps> = ({
  onContinue,
}) => {
  return (
    <div className="grid w-full gap-5 md:grid-cols-12">
      {/* banner */}
      <div className="from-primary-400 via-destructive-500 to-destructive-300 w-full overflow-hidden rounded-3xl bg-gradient-to-r md:col-span-12">
        <div className="flex w-full items-center justify-center bg-[#2C2B2B8A] py-8">
          <div className="text-text-primary-inverse flex w-full max-w-[420px] flex-col items-center justify-center gap-1">
            <h4 className="text-[24px] font-bold md:text-[28px]">
              {"Let's"} Create an event
            </h4>
            <p className="text-xs font-medium md:text-sm">
              Just fill in the event details and set it up in no time
            </p>
          </div>
        </div>
      </div>
      {/* event image */}
      <div className="w-full md:col-span-3">
        <EventImage />
      </div>
      {/* event details */}
      <div className="w-full md:col-span-9">
        <EventDetails />
      </div>
      {/* actions */}
      <div className="flex w-full items-center justify-end md:col-span-12">
        <Button
          size="md"
          variant="flat"
          onPress={onContinue}
          className="text-text-primary-inverse rounded-full !bg-[#6B1ACF] px-5 !font-semibold"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
