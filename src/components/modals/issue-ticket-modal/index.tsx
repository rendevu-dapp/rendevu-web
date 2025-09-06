// react

// imports
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
// next
import Image from "next/image";
import { useCallback, useState } from "react";
import { z } from "zod";
// static assets
import RoundCloseIcon from "@/../public/images/round-close.svg";

// helpers
import { classnames } from "@/common/helpers";
// components
import { IssueTicketSummaryModal } from "../issue-ticket-summary-modal";

// Define Zod schema for form validation
const formSchema = z.object({
  isSingle: z.boolean(),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  quantity: z.number().min(1, "Quantity must be at least 1").optional(),
});

// types
interface IssueTicketModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (ticketData: { email: string; count: number }) => void;
}
type FormState = z.infer<typeof formSchema>;

export const IssueTicketModal = ({
  isOpen,
  onOpenChange,
  onSave,
}: IssueTicketModalProps) => {
  const [formState, setFormState] = useState<FormState>({
    isSingle: true,
    email: "",
    quantity: 1,
  });
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; quantity?: string }>(
    {},
  );

  const updateFormState = useCallback((updates: Partial<FormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  }, []);

  const validateForm = useCallback(() => {
    const validationData = {
      email: formState.email,
      ...(formState.isSingle ? {} : { quantity: formState.quantity }),
    };
    const result = formSchema.safeParse(validationData);
    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: formattedErrors.email?.[0],
        quantity: formattedErrors.quantity?.[0],
      });
      return false;
    }
    setErrors({});
    return true;
  }, [formState]);

  const handleProceedToSummary = useCallback(() => {
    if (validateForm()) {
      setIsSummaryOpen(true);
      onOpenChange(false);
    }
  }, [validateForm, onOpenChange]);

  const handleBackFromSummary = useCallback(() => {
    setIsSummaryOpen(false);
    onOpenChange(true);
  }, [onOpenChange]);

  const renderToggleButton = (
    label: string,
    isActive: boolean,
    onClick: () => void,
  ) => (
    <button
      type="button"
      className={classnames(
        "h-12 cursor-pointer rounded-xl px-6 py-2.5 text-xs font-semibold",
        isActive
          ? "bg-[#1A1E22] text-[#868E96]"
          : "bg-[#F8F9FA] text-[#181A1B]",
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );

  const renderInputField = (
    id: string,
    label: string,
    type: string,
    value: string | number,
    onChange: (value: string | number) => void,
    placeholder: string,
    className?: string,
  ) => (
    <div className={classnames("flex w-full flex-col gap-1", className)}>
      <label htmlFor={id} className="text-[14px] font-semibold text-[#343A40]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={classnames(
          "flex h-14 w-full rounded-xl border px-7 py-7 placeholder:text-xs placeholder:font-semibold placeholder:text-[#868E96]",
          errors[id as keyof typeof errors]
            ? "border-red-500"
            : "border-[#B5B5B5]",
        )}
        value={value}
        onChange={(e) =>
          onChange(type === "number" ? Number(e.target.value) : e.target.value)
        }
      />
      {errors[id as keyof typeof errors] && (
        <p className="text-xs text-red-500">
          {errors[id as keyof typeof errors]}
        </p>
      )}
    </div>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        hideCloseButton
        onOpenChange={onOpenChange}
        backdrop="opaque"
        placement="bottom"
        classNames={{
          backdrop: "bg-[#D9D9D966]",
          wrapper: "sm:flex sm:items-center sm:justify-center",
          base: "w-full sm:w-[430px] sm:max-w-[430px] rounded-t-3xl sm:rounded-3xl bg-white",
        }}
      >
        <ModalContent className="w-full gap-5 px-5 py-[22px]">
          {() => (
            <>
              <ModalHeader className="flex items-start justify-between p-0">
                <div>
                  <h1 className="text-xl font-bold text-[#343A40]">
                    Issue Ticket
                  </h1>
                  <p className="text-[14px] font-medium text-[#868E96]">
                    Grant event access for free!
                  </p>
                </div>
                <div
                  className="cursor-pointer rounded-full border border-[#868E96] p-2.5"
                  onClick={() => onOpenChange(false)}
                >
                  <Image
                    src={RoundCloseIcon}
                    width={16}
                    height={16}
                    alt="Close"
                  />
                </div>
              </ModalHeader>
              <ModalBody className="flex w-full flex-col gap-5 p-0">
                <div className="flex items-center gap-1">
                  {renderToggleButton("Single", formState.isSingle, () =>
                    updateFormState({ isSingle: true }),
                  )}
                  {renderToggleButton("Bulk", !formState.isSingle, () =>
                    updateFormState({ isSingle: false }),
                  )}
                </div>
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  {renderInputField(
                    "email",
                    "Email",
                    "email",
                    formState.email,
                    (value) => updateFormState({ email: value as string }),
                    "Enter email here...",
                  )}
                  {!formState.isSingle &&
                    renderInputField(
                      "quantity",
                      "Quantity",
                      "number",
                      formState.quantity!,
                      (value) => updateFormState({ quantity: value as number }),
                      "1",
                      "sm:w-1/3",
                    )}
                </div>
              </ModalBody>
              <ModalFooter className="flex p-0">
                <Button
                  type="button"
                  className="h-14 w-full rounded-[64px] bg-[#6B1ACF] text-xs text-[#F8F9FA]"
                  onPress={handleProceedToSummary}
                >
                  Proceed to Summary
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <IssueTicketSummaryModal
        isOpen={isSummaryOpen}
        onOpenChange={setIsSummaryOpen}
        email={formState.email}
        totalTickets={formState.isSingle ? 1 : formState.quantity!}
        onBack={handleBackFromSummary}
        onSave={onSave}
      />
    </>
  );
};
