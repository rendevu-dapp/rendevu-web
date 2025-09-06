// react

// imports
import {
  addToast,
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Input,
  InputOtp,
  Textarea,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseDate } from "@internationalized/date";
import { format, fromUnixTime } from "date-fns";
import { FC } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
// hooks
import { useCreatePoapForEvent } from "@/common/hooks/api/mutations";
import { useSuspenseGetEventById } from "@/common/hooks/queries";
// schema
import {
  CreatePoapInput,
  createPoapSchema,
} from "@/common/schemas/create-poap.schema";
// components
import { EventImage } from "./poap-image";

// types
type CreatePoapDrawerProps = {
  eventId: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCreateSuccess: () => void;
};

export const CreatePoapDrawer: FC<CreatePoapDrawerProps> = ({
  eventId,
  isOpen,
  onOpenChange,
  onCreateSuccess,
}) => {
  const { mutateAsync: createPoap } = useCreatePoapForEvent();
  const { data } = useSuspenseGetEventById({
    variables: { id: eventId },
  });

  // derived data
  const event = data.eventById;
  const startDate = fromUnixTime(Number(event?.startDate));
  const endDate = fromUnixTime(Number(event?.endDate));

  const methods = useForm<CreatePoapInput>({
    resolver: zodResolver(createPoapSchema),
    defaultValues: {
      name: event?.metadata?.title ?? "",
      description: event?.metadata?.description,
      email: "",
      city: event?.metadata?.location?.name ?? "",
      country: event?.metadata?.location?.name ?? "",
      notify_issuer: false,
      private_event: false,
      secret_code: "",
      start_date: parseDate(format(startDate, "yyyy-MM-dd")),
      end_date: parseDate(format(endDate, "yyyy-MM-dd")),
      virtual_event: false,
    },
  });

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = methods;

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data: CreatePoapInput) => {
    try {
      let imageDataUri = "";
      if (data.image) {
        imageDataUri = await toBase64(data.image);
      }

      const eventUrl = `${window.location.origin}/e/${eventId}`;

      await createPoap({
        input: {
          event_id: eventId,
          ...data,
          city: data.city ?? "",
          country: data.country ?? "",
          end_date: data.end_date ? data.end_date.toString() : "",
          start_date: data.start_date ? data.start_date.toString() : "",
          expiry_date: data.expiry_date ? data.expiry_date.toString() : "",
          event_url:
            eventUrl &&
            !eventUrl.includes("localhost") &&
            !eventUrl.includes("127.0.0.1")
              ? eventUrl
              : "",
          image: imageDataUri,
          year: new Date().getFullYear(),
        },
      });
      addToast({
        title: "POAP Created",
        color: "success",
      });
      onCreateSuccess();
      reset();
      onOpenChange(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error creating POAP";
      addToast({
        title: "Error Creating POAP",
        color: "danger",
        description: errorMessage,
      });
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="right"
      size="md"
      classNames={{ base: "max-w-md" }}
    >
      <DrawerContent>
        {(onClose) => (
          <FormProvider {...methods}>
            <DrawerHeader className="flex flex-col gap-1 pb-2">
              <h2 className="text-xl font-semibold">Create POAP</h2>
              <p className="text-sm text-placeholder">
                Configure your Proof of Attendance Protocol token
              </p>
            </DrawerHeader>

            <DrawerBody className="px-6 py-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
              >
                {/* image */}
                <div className="flex flex-col gap-2">
                  <label className="text-base font-semibold">POAP Image</label>
                  <EventImage />
                </div>

                {/* poap name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">POAP Name</label>
                  <Input
                    {...register("name")}
                    variant="bordered"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    description="Name of the POAP"
                    classNames={{
                      description: "font-medium",
                      errorMessage: "font-medium",
                    }}
                  />
                </div>

                {/* poap description */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    POAP Description
                  </label>
                  <Textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    variant="bordered"
                    minRows={2}
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                    description="Description of the POAP"
                    classNames={{
                      description: "font-medium",
                      errorMessage: "font-medium",
                    }}
                  />
                </div>

                {/* city */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">City</label>
                  <Input
                    {...register("city")}
                    variant="bordered"
                    isInvalid={!!errors.city}
                    errorMessage={errors.city?.message}
                    description="City where the event is located. Optional for virtual events"
                    classNames={{
                      description: "font-medium",
                      errorMessage: "font-medium",
                    }}
                  />
                </div>

                {/* country */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Country</label>
                  <Input
                    {...register("country", {
                      required: "Country is required",
                    })}
                    variant="bordered"
                    isInvalid={!!errors.country}
                    errorMessage={errors.country?.message}
                    description="Country where the event is located. Optional for virtual events"
                    classNames={{
                      description: "font-medium",
                      errorMessage: "font-medium",
                    }}
                  />
                </div>

                {/* start and end date */}
                <div className="grid grid-cols-2 gap-2">
                  {/* start data */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Controller
                      name="start_date"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          variant="bordered"
                          classNames={{
                            base: "w-full",
                            input: "h-10",
                            // inputWrapper: "rounded-lg border border-gray-300",
                            description: "font-medium",
                            errorMessage: "font-medium",
                          }}
                          isInvalid={!!errors.start_date}
                          errorMessage={errors.start_date?.message}
                          description="Date when the event starts"
                        />
                      )}
                    />
                  </div>

                  {/* end date */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Controller
                      name="end_date"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          variant="bordered"
                          classNames={{
                            base: "w-full",
                            input: "h-10",
                            // inputWrapper: "rounded-lg border border-gray-300",
                            description: "font-medium",
                            errorMessage: "font-medium",
                          }}
                          isInvalid={!!errors.end_date}
                          errorMessage={errors.end_date?.message}
                          description="Date when the event ends"
                        />
                      )}
                    />
                  </div>
                </div>

                {/* expiry date */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Expiry Date</label>
                  <Controller
                    name="expiry_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        variant="bordered"
                        classNames={{
                          base: "w-full",
                          input: "h-10",
                          // inputWrapper: "rounded-lg border border-gray-300",
                          description: "font-medium",
                          errorMessage: "font-medium",
                        }}
                        isInvalid={!!errors.expiry_date}
                        errorMessage={errors.expiry_date?.message}
                        description="Date when the POAP expires"
                      />
                    )}
                  />
                </div>

                {/* issuer email */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Issuer Email</label>
                  <Input
                    {...register("email")}
                    type="email"
                    variant="bordered"
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    description="Your email address. POAP will use this to send you updates about your POAP."
                    classNames={{
                      description: "font-medium",
                      errorMessage: "font-medium",
                    }}
                  />
                </div>

                {/* secret code */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Secret Code</label>
                  <Controller
                    control={control}
                    name="secret_code"
                    render={({ field }) => (
                      <InputOtp
                        id="secret-code"
                        aria-label="Drop Secret Code"
                        radius="lg"
                        variant="bordered"
                        {...field}
                        length={6}
                        isInvalid={!!errors.secret_code}
                        errorMessage={errors.secret_code?.message}
                        description={`This is the code you set to use to modify your poap later on (e.g. change the date). Also known as "Edit Code"`}
                        classNames={{
                          input: "!max-w-sm !w-full",
                          segmentWrapper: "max-w-sm",
                          segment: "max-w-sm",
                          description: "font-medium",
                          errorMessage: "font-medium",
                        }}
                      />
                    )}
                  />
                </div>

                {/* Settings */}
                <div className="space-y-4">
                  <h3 className="text-base font-medium text-gray-900">
                    Settings
                  </h3>

                  <div className="space-y-3">
                    <Controller
                      name="notify_issuer"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          isSelected={field.value}
                          onValueChange={field.onChange}
                        >
                          Notify issuer via email
                        </Checkbox>
                      )}
                    />

                    <Controller
                      name="private_event"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          isSelected={field.value}
                          onValueChange={field.onChange}
                        >
                          Make this a private event
                        </Checkbox>
                      )}
                    />

                    <Controller
                      name="virtual_event"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          isSelected={field.value}
                          onValueChange={field.onChange}
                        >
                          This is a virtual event
                        </Checkbox>
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    color="default"
                    onPress={onClose}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="secondary"
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                  >
                    Create POAP
                  </Button>
                </div>
              </form>
            </DrawerBody>
          </FormProvider>
        )}
      </DrawerContent>
    </Drawer>
  );
};
