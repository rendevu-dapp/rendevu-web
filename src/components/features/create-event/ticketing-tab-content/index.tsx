// react

import { Avatar, Button, Card, CardBody, Divider } from "@heroui/react";
import { getLocalTimeZone } from "@internationalized/date";
import { PencilSimpleLineIcon } from "@phosphor-icons/react";
import { FC } from "react";
// imports
import { useFormContext } from "react-hook-form";
// schemas
import { CreateEventValues } from "@/common/schemas/create-event.schema";
import { PaymentTickets } from "./payment-tickets";
// components
import { SelectNetwork } from "./select-network";

// types
type TicketingTabContentProps = {
  onContinue: () => void;
  onBack: () => void;
  saving: boolean;
};

export const TicketingTabContent: FC<TicketingTabContentProps> = ({
  onBack,
  onContinue,
  saving,
}) => {
  // hooks
  const { watch } = useFormContext<CreateEventValues>();

  // derived state
  const eventDetails = watch("details");
  const eventImageSrc = eventDetails?.image
    ? URL.createObjectURL(eventDetails.image)
    : "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0";

  return (
    <div className="grid w-full gap-6 md:grid-cols-12">
      {/* banner / header */}
      <div className="w-full md:col-span-9 md:col-start-4">
        <div className="flex w-full flex-col gap-1">
          <h4 className="text-3xl font-bold text-[#181A1B] dark:text-gray-300">
            Tickets & Payments
          </h4>
          <p className="text-base font-medium text-[#181A1B] dark:text-gray-300">
            Set up your event tickets with debit/credit card & crypto payment
            options
          </p>
        </div>
      </div>
      <div className="w-full md:col-span-3">
        <div className="flex w-full flex-col gap-2 ">
          {/* event summary */}
          <Card
            shadow="none"
            className="w-full rounded-2xl border border-[#E9ECEF] dark:border-[#343A40] dark:bg-[#181A1B]"
          >
            <CardBody className="p-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <Avatar
                    src={eventImageSrc}
                    alt="Event Image"
                    radius="lg"
                    className="h-16 w-16"
                  />
                  <Button
                    isIconOnly
                    size="sm"
                    variant="bordered"
                    className="rounded-full border"
                  >
                    <PencilSimpleLineIcon
                      weight="fill"
                      color="#343A40"
                      size={15}
                    />
                  </Button>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-bold text-[#343A40] dark:text-gray-300">
                    {eventDetails?.title || "NFT Specs Events"}
                  </h4>
                  <p className="text-xs font-medium text-[#868E96]">
                    {eventDetails?.startDate && eventDetails?.endDate
                      ? `${eventDetails.startDate
                          .toDate(getLocalTimeZone())
                          .toLocaleDateString("en-US", {
                            weekday: "long",
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })} - ${eventDetails.endDate
                          .toDate(getLocalTimeZone())
                          .toLocaleDateString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })} GMT-10`
                      : "Saturday, 12 April 09:00 AM - 10:00 AM GMT-10"}
                  </p>
                </div>
                <Divider className="w-full border-[#E9ECEF]" />
                <div>
                  <span className="text-xs text-[#868E96]">
                    {eventDetails?.description ||
                      "Some event description goes here possibly truncated with some more text"}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="w-full md:col-span-9">
        <div className="flex w-full flex-col gap-6">
          <SelectNetwork />
          <PaymentTickets />
        </div>
      </div>
      {/* actions */}
      <div className="flex w-full items-center justify-end gap-2 md:col-span-12">
        <Button
          size="md"
          variant="flat"
          onPress={onBack}
          className="text-text-primary-inverse rounded-full !bg-[#6B1ACF] px-5 !font-semibold"
        >
          Back
        </Button>
        <Button
          size="md"
          variant="flat"
          onPress={onContinue}
          className="text-text-primary-inverse rounded-full !bg-[#6B1ACF] px-5 !font-semibold"
          isLoading={saving}
        >
          Create
        </Button>
      </div>
    </div>
  );
};
