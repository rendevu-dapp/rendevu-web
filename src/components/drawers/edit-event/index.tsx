"use client";

// heroui
import {
  addToast,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  Textarea,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseDate, parseTime } from "@internationalized/date";
// date-fns
import { fromUnixTime } from "date-fns";
import isEqual from "lodash/isEqual";
// react
import { FC, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
// thirdweb
import { toTokens } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
// imports
import { useMediaQuery } from "usehooks-ts";
import { supportedTokens } from "@/common/data";
// helpers
import { compareAddress } from "@/common/helpers";
// hooks
import { useUpdateEvent } from "@/common/hooks/api/mutations/use-update-event";
// schemas
import {
  EditEventValues,
  editEventSchema,
} from "@/common/schemas/edit-event.schema";
// types
import { Event } from "@/common/types/models/event";
// providers
import { GoogleMapApiProvider } from "@/components/providers";
import ApprovalInput from "./approval-input";
// components
import EventImage from "./event-image";
import GuestLimit from "./guest-limit";
import LocationAndVirtualLink from "./location-and-link";
import PaymentTokens from "./payment-tokens";
import StartEndDate from "./start-end-date";

type EditEventDrawerProps = {
  title?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  event: Event;
  onEventUpdated?: () => void;
};

export const EditEventDrawer: FC<EditEventDrawerProps> = ({
  isOpen,
  title = "Edit Event",
  onOpenChange,
  event,
  onEventUpdated,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent({
    onEventUpdated,
  });

  const [processingState, setProcessingState] = useState<
    "pending" | "completed" | "error"
  >("pending");
  const [processingError, setProcessingError] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const defaultValues = useMemo(
    () => ({
      chain: baseSepolia,
      details: {
        title: event.metadata?.title || "",
        description: event.metadata?.description || "",
        image: event.metadata?.image || "https://picsum.photos/400/300",
        startDate: parseDate(
          fromUnixTime(Number(event.startDate)).toISOString().split("T")[0],
        ),
        startTime: parseTime(
          fromUnixTime(Number(event.startDate))
            .toISOString()
            .split("T")[1]
            .slice(0, 5),
        ),
        endDate: event.endDate
          ? parseDate(
              fromUnixTime(Number(event.endDate)).toISOString().split("T")[0],
            )
          : parseDate(
              fromUnixTime(Number(event.startDate)).toISOString().split("T")[0],
            ),
        endTime: event.endDate
          ? parseTime(
              fromUnixTime(Number(event.endDate))
                .toISOString()
                .split("T")[1]
                .slice(0, 5),
            )
          : parseTime("23:59"),
        location: event.metadata?.location
          ? {
              name: event.metadata.location.name ?? "",
              address: event.metadata.location.address ?? undefined,
              placeId: event.metadata.location.placeId ?? "",
              latitude: Number(event.metadata.location.latitude ?? 0),
              longitude: Number(event.metadata.location.longitude ?? 0),
            }
          : {
              name: "Select a location",
              address: "Please select a location",
              placeId: "placeholder",
              latitude: 0,
              longitude: 0,
            },
        virtualLink:
          event.metadata?.virtualLink || "https://example.com/meeting",
        requiresApproval: event.requiresApproval || false,
        guestLimit:
          typeof event.capacity === "number" ? event.capacity : undefined,
      },
      ticketing:
        event.paymentTokens?.map((token) => {
          const tokenMetadata = supportedTokens[baseSepolia.id]?.find((t) =>
            compareAddress(t.address, token.tokenAddress),
          );
          const decimals = tokenMetadata?.decimals || 18;
          return {
            token: token.tokenAddress,
            price: Number(toTokens(BigInt(token.price), decimals)),
            decimals,
          };
        }) || [],
    }),
    [event],
  );

  const methods = useForm<EditEventValues>({
    resolver: zodResolver(editEventSchema),
    mode: "all",
    defaultValues,
  });

  const formValues = methods.watch();
  const hasChanges = useMemo(() => {
    const normalizedFormValues = {
      ...formValues,
      details: {
        ...formValues.details,
        image:
          formValues.details.image instanceof File
            ? "FILE"
            : formValues.details.image,
        location:
          formValues.details.location?.placeId === "placeholder"
            ? undefined
            : formValues.details.location,
        virtualLink:
          formValues.details.virtualLink === "https://example.com/meeting"
            ? undefined
            : formValues.details.virtualLink,
      },
    };
    return !isEqual(normalizedFormValues, {
      ...defaultValues,
      details: {
        ...defaultValues.details,
        location:
          defaultValues.details.location?.placeId === "placeholder"
            ? undefined
            : defaultValues.details.location,
        virtualLink:
          defaultValues.details.virtualLink === "https://example.com/meeting"
            ? undefined
            : defaultValues.details.virtualLink,
      },
    });
  }, [formValues, defaultValues]);

  useEffect(() => {
    if (hasChanges) {
      addToast({
        title: "Unsaved Changes",
        description:
          'You have unsaved changes. Click "Save Changes" to update the event.',
        color: "warning",
      });
    }
  }, [hasChanges]);

  const handleSaveChanges = async (close: () => void) => {
    if (methods.formState.isSubmitting || isUpdating) {
      return;
    }

    try {
      setProcessingState("pending");
      const formData = methods.getValues();
      const cleanedFormData = {
        ...formData,
        details: {
          ...formData.details,
          location:
            formData.details.location?.placeId === "placeholder"
              ? undefined
              : formData.details.location,
          virtualLink:
            formData.details.virtualLink === "https://example.com/meeting"
              ? undefined
              : formData.details.virtualLink,
        },
      };
      await updateEvent({ event, formData: cleanedFormData });
      setProcessingState("completed");
      close();
    } catch (error) {
      console.error("Error updating event:", error);
      setProcessingError({
        title: "Error updating event",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong updating your event.",
      });
      setProcessingState("error");
    }
  };

  const isProcessing = methods.formState.isSubmitting || isUpdating;

  return (
    <Drawer
      size={isMobile ? "full" : "lg"}
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DrawerContent>
        {(onClose) => (
          <GoogleMapApiProvider>
            <FormProvider {...methods}>
              <DrawerHeader className="flex flex-col gap-1">
                <h5 className="text-large font-extrabold">{title}</h5>
              </DrawerHeader>
              <DrawerBody className="flex flex-col gap-3">
                <EventImage
                  initialImage={
                    event.metadata?.image || "https://picsum.photos/400/300"
                  }
                />
                <Input
                  size="lg"
                  variant="flat"
                  label="Event Title"
                  {...methods.register("details.title")}
                  isInvalid={!!methods.formState.errors.details?.title}
                  errorMessage={
                    methods.formState.errors.details?.title?.message
                  }
                />
                <StartEndDate />
                <LocationAndVirtualLink />
                <ApprovalInput />
                <GuestLimit />
                <Textarea
                  aria-label="Description"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Add a description"
                  {...methods.register("details.description")}
                  classNames={{
                    base: "w-full",
                    label: "text-xs font-medium !text-placeholder ",
                    input: "text-base text-[#868E96] dark:text-gray-200",
                    inputWrapper:
                      "bg-[none] py-4 px-4 border border-[#E9ECEF] dark:border-[#343A40] rounded-3xl shadow-none",
                  }}
                  isInvalid={!!methods.formState.errors.details?.description}
                  errorMessage={
                    methods.formState.errors.details?.description?.message
                  }
                />
                <PaymentTokens />
              </DrawerBody>
              <DrawerFooter className="w-full">
                {methods.formState.errors.details && (
                  <p className="text-xs text-danger">
                    {methods.formState.errors.details.message}
                  </p>
                )}
                {processingError && processingState === "error" && (
                  <p className="text-xs text-danger">
                    {processingError.title}: {processingError.description}
                  </p>
                )}
                <Button
                  color="secondary"
                  className="w-full font-semibold rounded-rounded"
                  onPress={() => handleSaveChanges(onClose)}
                  isLoading={isProcessing}
                  isDisabled={isProcessing || !hasChanges}
                >
                  {processingState === "error"
                    ? "Retry"
                    : isProcessing
                      ? "Updating..."
                      : "Save Changes"}
                </Button>
              </DrawerFooter>
            </FormProvider>
          </GoogleMapApiProvider>
        )}
      </DrawerContent>
    </Drawer>
  );
};
