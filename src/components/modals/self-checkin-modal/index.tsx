// react

// imports
import {
  Alert,
  addToast,
  Button,
  Form,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkSimpleIcon } from "@phosphor-icons/react";
// next
import Link from "next/link";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// thirdweb
import { getContract, prepareContractCall } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { useActiveAccount, useSendAndConfirmTransaction } from "thirdweb/react";
import { useMediaQuery } from "usehooks-ts";

// abis
// abis
import { eventPlatformAbi } from "@/common/abis/event-platform.abi";
// config
import { thirdwebClient } from "@/common/configs";
// constants
import { eventPlatformContractAddress } from "@/common/constants";

// schemas
import {
  SelfCheckInValues,
  selfCheckInSchema,
} from "@/common/schemas/self-checkin-schema";

// types
type SelfCheckInModalProps = {
  checkInCode?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRefetchEvent: () => void;
};

export const SelfCheckInModal: FC<SelfCheckInModalProps> = ({
  checkInCode,
  isOpen,
  onOpenChange,
  onRefetchEvent,
}) => {
  // hooks
  const activeAccount = useActiveAccount();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SelfCheckInValues>({
    resolver: zodResolver(selfCheckInSchema),
    defaultValues: {
      code: checkInCode || "",
    },
  });
  const { mutateAsync: sendAndConfirmTx } = useSendAndConfirmTransaction();

  // handlers
  const onSubmit: SubmitHandler<SelfCheckInValues> = async (data, e) => {
    e?.preventDefault();

    // check if user is connected
    if (!activeAccount) {
      addToast({
        color: "danger",
        title: "Please connect your wallet to check in",
      });
      return;
    }

    try {
      const [eventId, expiry, signature] = data.code.split(":");

      if (!eventId || !expiry || !signature) {
        addToast({
          color: "danger",
          title: "Invalid check-in code",
        });
        return;
      }

      // get the contract instance
      const contract = getContract({
        client: thirdwebClient,
        chain: baseSepolia,
        abi: eventPlatformAbi,
        address: eventPlatformContractAddress,
      });

      // prepare the transaction
      const preparedTx = prepareContractCall({
        contract,
        method: "selfCheckIn",
        params: [BigInt(eventId), BigInt(expiry), signature as `0x${string}`],
      });

      // send the transaction
      const txReceipt = await sendAndConfirmTx(preparedTx);

      addToast({
        title: "Registration successful",
        description: (
          <div className="flex flex-col gap-1">
            <span>You have successfully registered for the event!</span>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`https://sepolia.basescan.org/tx/${txReceipt.transactionHash}`}
              className="text-secondary text-sm font-medium inline-flex items-center gap-1"
            >
              <span>View Transaction</span>
              <LinkSimpleIcon size={16} className="text-secondary" />
            </Link>
          </div>
        ),
        color: "success",
      });

      // refetch event details
      onRefetchEvent();
      // close modal
      onOpenChange(false);
    } catch (error) {
      console.error("Error checking in:", error);
      addToast({
        color: "danger",
        title: "Failed to check in. Please try again.",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      onOpenChange={onOpenChange}
      placement={isMobile ? "bottom" : "center"}
    >
      <ModalContent className="max-w-lg">
        <Form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            {/* <h3 className="text-xl font-semibold">Self Check-in</h3> */}
          </ModalHeader>
          <ModalBody className="py-2">
            <div className="space-y-4">
              <Alert
                color="secondary"
                variant="flat"
                title={<h3 className="text-lg font-semibold">Self Check-in</h3>}
                description="Ask the host for a check-in code or scan their QR code."
              />

              <Textarea
                placeholder="Enter code here"
                variant="faded"
                {...register("code")}
                className="w-full"
                isInvalid={!!errors.code}
                errorMessage={errors.code ? errors.code.message : ""}
              />
            </div>
          </ModalBody>
          <ModalFooter className="w-full">
            <Button
              color="secondary"
              isLoading={isSubmitting}
              isDisabled={!activeAccount?.address}
              type="submit"
              className="w-full font-semibold"
            >
              Check In
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};
