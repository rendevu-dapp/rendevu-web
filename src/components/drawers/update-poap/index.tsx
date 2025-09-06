// react

// ui
import {
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
import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

// schema
import {
  UpdatePoapInput,
  updatePoapSchema,
} from "@/common/schemas/update-poap.schema";

// types
import { Poap } from "@/components/features/manage-event-poaps/poaps-area/types";

type UpdatePoapDrawerProps = {
  poap: Poap;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export const UpdatePoapDrawer: FC<UpdatePoapDrawerProps> = ({
  poap,
  isOpen,
  onOpenChange,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePoapInput>({
    resolver: zodResolver(updatePoapSchema),
    defaultValues: {
      name: poap.name,
      description: poap.description,
    },
  });

  const onSubmit: SubmitHandler<UpdatePoapInput> = (data: UpdatePoapInput) => {
    console.log(data);
    // handle update poap
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
        {(onClose: () => void) => (
          <>
            <DrawerHeader className="flex flex-col gap-1 pb-2">
              <h2 className="text-xl font-semibold">Update POAP</h2>
              <p className="text-sm text-placeholder">
                Modify your Proof of Attendance Protocol token
              </p>
            </DrawerHeader>
            <DrawerBody className="px-6 py-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
              >
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
                    {...register("description")}
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
                    {...register("country")}
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
                  {/* start date */}
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

                {/* event url */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Event URL</label>
                  <Input
                    {...register("event_url")}
                    variant="bordered"
                    isInvalid={!!errors.event_url}
                    errorMessage={errors.event_url?.message}
                    description="URL link to the event page"
                    classNames={{
                      description: "font-medium",
                      errorMessage: "font-medium",
                    }}
                  />
                </div>

                {/* event template id */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    Event Template ID
                  </label>
                  <Input
                    {...register("event_template_id", { valueAsNumber: true })}
                    type="number"
                    variant="bordered"
                    isInvalid={!!errors.event_template_id}
                    errorMessage={errors.event_template_id?.message}
                    description="Template ID for the event design"
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
                    Save Changes
                  </Button>
                </div>
              </form>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
