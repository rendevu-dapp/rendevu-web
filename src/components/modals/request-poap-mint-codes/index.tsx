// react

// imports
import {
  addToast,
  Button,
  Input,
  InputOtp,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
// helpers
import { isApiError } from "@/common/helpers";
// hooks
import { useRequestMintCodes } from "@/common/hooks/api/mutations";

// schemas
import {
  RequestMintCodesSchema,
  requestMintCodesSchema,
} from "@/common/schemas/request-mint-codes.schema";

// types
import { Poap } from "@/components/features/manage-event-poaps/poaps-area/types";

type RequestMintCodesModalProps = {
  poap: Poap;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const RequestMintCodesModal: FC<RequestMintCodesModalProps> = ({
  poap,
  isOpen,
  onOpenChange,
}) => {
  // hooks
  const {
    reset,
    watch,
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RequestMintCodesSchema>({
    resolver: zodResolver(requestMintCodesSchema),
    defaultValues: {
      codeType: "qr_code",
      secretCode: "",
      claimName: "",
    },
  });
  const { mutateAsync: requestMintCodes } = useRequestMintCodes();

  // derived data
  const codeType = watch("codeType");
  const showClaimName =
    codeType === "secret_word" || codeType === "secret_website";

  // handlers
  const onSubmit: SubmitHandler<RequestMintCodesSchema> = async (data) => {
    try {
      await requestMintCodes({
        poapId: poap.id,
        input: {
          redeem_type: data.codeType,
          secret_code: data.secretCode,
          requested_codes: 1,
          ...(showClaimName && { claim_name: data.claimName }),
        },
      });

      onOpenChange(false);
      reset();
      addToast({
        title: "Code Requested",
        description: "An email has been sent with the mint codes.",
        color: "success",
      });
    } catch (error) {
      let message = "Unable to request mint codes. Please try again later.";
      if (isApiError(error)) {
        message = error.message;
        if (error.info?.error) {
          message = error.info.error;
        }
      }
      addToast({
        title: "Error",
        description: message,
        color: "danger",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => {
        reset();
      }}
      size="md"
      className="max-w-md overflow-hidden"
    >
      <ModalContent as={"form"} onSubmit={handleSubmit(onSubmit)}>
        {/* header - improved title */}
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-lg font-bold">Request Mint Codes</h2>
        </ModalHeader>

        {/* body content */}
        <ModalBody>
          <div className="flex flex-col gap-6">
            {/* intro text - simplified phrasing */}
            <h4 className="text-sm text-neutral-800 dark:text-neutral-400">
              Requesting mint codes for <strong>{poap.name}</strong>. Please
              confirm the information below to proceed.
            </h4>

            <div className="flex flex-col gap-5">
              {/* code type select */}
              <div className="flex flex-col gap-2">
                <label htmlFor="code-type" className="text-sm font-medium">
                  Mint Code Type
                </label>
                <Controller
                  control={control}
                  name="codeType"
                  render={({ field }) => (
                    <Select
                      id="code-type"
                      aria-label="Mint Code Type"
                      placeholder="Choose a code type"
                      radius="sm"
                      selectedKeys={field.value ? [field.value] : []}
                      onSelectionChange={(keys) =>
                        field.onChange(Array.from(keys)[0] as string)
                      }
                      isInvalid={!!errors.codeType}
                      errorMessage={errors.codeType?.message}
                      description="Whether you want a QR code or a secret word."
                      classNames={{
                        description: "font-medium",
                        errorMessage: "font-medium",
                      }}
                      items={[
                        { key: "qr_code", label: "QR Code" },
                        { key: "secret_word", label: "Secret Word" },
                        { key: "secret_website", label: "Secret Website" },
                      ]}
                    >
                      {(item) => (
                        <SelectItem key={item.key}>{item.label}</SelectItem>
                      )}
                    </Select>
                  )}
                />
              </div>

              {/* claim name input */}
              {showClaimName && (
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="claim-name" className="text-sm font-medium">
                    {codeType
                      ?.split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                  </label>
                  <Input
                    id="claim-name"
                    aria-label="Claim Name"
                    variant="flat"
                    radius="md"
                    placeholder="culture-form-firm"
                    {...register("claimName")}
                    isInvalid={!!errors.claimName}
                    errorMessage={errors.claimName?.message}
                    classNames={{
                      input: "!max-w-sm !w-full",
                    }}
                  />
                </div>
              )}

              {/* requested codes */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="requested-codes"
                  className="text-sm font-medium"
                >
                  Number of Codes
                </label>
                <Input
                  type="number"
                  id="requested-codes"
                  aria-label="Number of Codes"
                  variant="flat"
                  radius="md"
                  placeholder="1"
                  {...register("requestedCodes", { valueAsNumber: true })}
                  isInvalid={!!errors.requestedCodes}
                  errorMessage={errors.requestedCodes?.message}
                  description={
                    codeType === "qr_code"
                      ? "Number of mint links to generate"
                      : "Number times secret code can be used to mint a poap"
                  }
                  classNames={{
                    input: "!max-w-sm !w-full",
                  }}
                />
              </div>

              {/* secret code input */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="secret-code" className="text-sm font-medium">
                  Drop Secret Code
                </label>
                <Controller
                  control={control}
                  name="secretCode"
                  render={({ field }) => (
                    <InputOtp
                      id="secret-code"
                      aria-label="Drop Secret Code"
                      variant="flat"
                      radius="md"
                      {...field}
                      errorMessage={errors.secretCode?.message}
                      isInvalid={!!errors.secretCode}
                      length={6}
                      description="This is the 6 digit code you set while creating the POAP."
                      classNames={{
                        input: "!max-w-sm !w-full",
                        segmentWrapper: "max-w-sm",
                        segment: "max-w-sm",
                        description: "font-medium",
                        helperWrapper: "text-wrap break-words",
                        errorMessage: "font-medium text-wrap break-words",
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </ModalBody>

        {/* footer with actions */}
        <ModalFooter className="flex gap-2 justify-between">
          {/* request action */}
          <Button
            type="submit"
            color="secondary"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            className="text-sm font-semibold flex-1 rounded-xl"
          >
            Request Mint Codes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
