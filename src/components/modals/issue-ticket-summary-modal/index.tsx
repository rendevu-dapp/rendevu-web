import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { CaretLeft } from "@phosphor-icons/react";
import Image from "next/image";
import { useCallback } from "react";
import RoundCloseIcon from "@/../public/images/round-close.svg";

interface IssueTicketSummaryModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  email: string;
  totalTickets: number;
  onBack: () => void;
  onSave: (ticketData: { email: string; count: number }) => void;
}

export const IssueTicketSummaryModal = ({
  isOpen,
  onOpenChange,
  email,
  totalTickets,
  onBack,
  onSave,
}: IssueTicketSummaryModalProps) => {
  const handleBack = useCallback(() => {
    onOpenChange(false);
    onBack();
  }, [onOpenChange, onBack]);

  const handleSave = useCallback(() => {
    onSave({ email, count: totalTickets });
    onOpenChange(false);
  }, [email, totalTickets, onSave, onOpenChange]);

  const renderField = (label: string, value: string | number, id: string) => (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={id} className="text-[14px] font-semibold text-[#343A40]">
        {label}
      </label>
      <div className="flex h-14 w-full items-center rounded-xl border border-[#B5B5B5] px-7 py-4 text-sm text-[#343A40]">
        {value}
      </div>
    </div>
  );

  return (
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
              <div className="flex items-center gap-4">
                <button
                  className="cursor-pointer font-bold"
                  onClick={handleBack}
                >
                  <CaretLeft size={20} color="#343A40" />
                </button>
                <h1 className="text-left text-[20px] font-bold text-[#343A40]">
                  Summary
                </h1>
              </div>
              <button
                className="cursor-pointer rounded-full border border-[#868E96] p-2"
                onClick={() => onOpenChange(false)}
              >
                <Image
                  src={RoundCloseIcon}
                  width={16}
                  height={16}
                  alt="Close"
                />
              </button>
            </ModalHeader>
            <ModalBody className="flex w-full flex-col gap-5 p-0">
              <p className="text-[14px] font-medium text-[#868E96]">
                Make sure the details below are correct. Issuing tickets is an
                irreversible action.
              </p>
              <div className="flex flex-col gap-2.5">
                {renderField("Email", email, "email")}
                {renderField("Total Tickets", totalTickets, "totalTickets")}
              </div>
            </ModalBody>
            <ModalFooter className="flex p-0">
              <Button
                type="button"
                className="h-14 w-full rounded-[64px] bg-[#6B1ACF] text-xs text-[#F8F9FA]"
                onPress={handleSave}
              >
                Issue Ticket
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
