// react

// imports
import {
  Avatar,
  AvatarGroup,
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, Fragment, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  getContract,
  PreparedTransaction,
  prepareContractCall,
} from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import {
  Blobbie,
  useActiveAccount,
  useSendAndConfirmTransaction,
} from "thirdweb/react";
import { useMediaQuery } from "usehooks-ts";

// abis
import { eventPlatformAbi } from "@/common/abis/event-platform.abi";
// config
import { thirdwebClient } from "@/common/configs";
// constants
import { eventPlatformContractAddress } from "@/common/constants";
// helpers
import { compareAddress, shortenAddress } from "@/common/helpers";
// hooks
import { useGetUserProfilesBulk } from "@/common/hooks/api/queries";

// schemas
import {
  BulkActionValues,
  bulkActionSchema,
} from "@/common/schemas/bulk-actions.schema";

// types
import { BulkActionType } from "@/common/types/bulk-actions";

type BulkActionsModalsProps = {
  isOpen: boolean;
  eventId: string;
  actionType?: BulkActionType;
  selectedGuestAddresses?: string[];
  onOpenChange: (isOpen: boolean) => void;
};

export const BulkActionsModal: FC<BulkActionsModalsProps> = ({
  isOpen,
  eventId,
  actionType,
  selectedGuestAddresses = [],
  onOpenChange,
}) => {
  // derived data
  const modalOpen =
    isOpen && Boolean(actionType) && selectedGuestAddresses.length > 0;

  // hooks
  const account = useActiveAccount();
  const { mutateAsync: sendAndConfirmTx } = useSendAndConfirmTransaction();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BulkActionValues>({
    resolver: zodResolver(bulkActionSchema),
    defaultValues: {
      actionType: actionType,
      selectedGuestAddresses,
    },
  });
  // only fetch profiles for the first 6 selected guests to improve performance
  const { data: profiles } = useGetUserProfilesBulk(
    selectedGuestAddresses.slice(0, 6),
  );

  // derived data
  const participants = useMemo(() => {
    return selectedGuestAddresses.map((address) => ({
      attendee: address,
      profile: profiles?.find((p) => p.walletAddress === address),
    }));
  }, [profiles, selectedGuestAddresses]);

  // form submission handler
  const onSubmit: SubmitHandler<BulkActionValues> = async (data, e) => {
    e?.preventDefault();

    const contract = getContract({
      client: thirdwebClient,
      chain: baseSepolia,
      abi: eventPlatformAbi,
      address: eventPlatformContractAddress,
    });

    try {
      if (!account) {
        addToast({
          title: "Please connect your wallet",
          description:
            "You need to connect your wallet to perform bulk actions.",
          color: "danger",
        });
        return;
      }

      let preparedTx: PreparedTransaction;

      switch (data.actionType) {
        case "approve":
          // handle approve action
          preparedTx = prepareContractCall({
            contract,
            method: "bulkApproveRegistrations",
            params: [
              BigInt(eventId),
              data.selectedGuestAddresses,
              Array(data.selectedGuestAddresses.length).fill(true),
            ],
          }) as PreparedTransaction;
          break;
        case "decline":
          preparedTx = prepareContractCall({
            contract,
            method: "bulkApproveRegistrations",
            params: [
              BigInt(eventId),
              data.selectedGuestAddresses,
              Array(data.selectedGuestAddresses.length).fill(false),
            ],
          }) as PreparedTransaction;
          break;
        case "check-in":
          preparedTx = prepareContractCall({
            contract,
            method: "bulkCheckIn",
            params: [BigInt(eventId), data.selectedGuestAddresses],
          }) as PreparedTransaction;
          break;
        default:
          throw new Error("Invalid action type");
      }

      if (!preparedTx) {
        throw new Error("Failed to prepare transaction");
      }

      // send transaction
      await sendAndConfirmTx(preparedTx);

      // show success toast
      addToast({
        title: "Success",
        description: `Successfully ${data.actionType}ed ${data.selectedGuestAddresses.length} guests.`,
        color: "success",
      });

      // close modal
      onOpenChange(false);
    } catch (error) {
      if (error instanceof Error) {
        addToast({
          title: "Error",
          description: error.message,
          color: "danger",
        });
      }
    }
  };

  // trigger form submission
  const triggerSubmit = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={modalOpen}
      hideCloseButton
      isDismissable={false}
      isKeyboardDismissDisabled
      onOpenChange={onOpenChange}
      placement={isMobile ? "bottom" : "center"}
      className="dark:border dark:border-[#343A40]"
    >
      <ModalContent>
        {(onClose) => (
          <Fragment>
            <ModalHeader className="flex flex-col gap-1">
              <h5 className="text-xl font-bold text-neutral-900 capitalize">
                {`${actionType} Guests`}
              </h5>
              <p className="text-sm font-medium text-placeholder">
                Proceed to {actionType} {selectedGuestAddresses.length} selected{" "}
                {selectedGuestAddresses.length === 1 ? " guest" : " guests"}.
              </p>
            </ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* avatars of selected users here */}
                <AvatarGroup
                  size="lg"
                  max={6}
                  total={selectedGuestAddresses.length}
                  renderCount={(count) =>
                    Boolean(count - 6 > 0) && (
                      <span className="text-tiny text-placeholder font-medium ms-1">
                        +{count}
                      </span>
                    )
                  }
                  className=""
                >
                  {participants.map((ticket, index) => {
                    const profile = profiles?.find((p) =>
                      compareAddress(p.walletAddress, ticket.attendee),
                    );

                    return profile?.avatar ? (
                      <Avatar
                        key={index}
                        src={profile.avatar}
                        name={
                          profile?.fullName || shortenAddress(ticket.attendee)
                        }
                        classNames={{
                          base: "border-2 border-white hover:!translate-none focus:!translate-none",
                        }}
                      />
                    ) : (
                      <Blobbie
                        key={index}
                        address={ticket.attendee}
                        size={52}
                        style={{
                          border: "2px solid white",
                          borderRadius: "100%",
                        }}
                      />
                    );
                  })}
                </AvatarGroup>
                {/* errors here */}
                {Boolean(
                  errors.selectedGuestAddresses || errors.actionType,
                ) && (
                  <div className="flex flex-col gap-1">
                    {errors?.selectedGuestAddresses?.message && (
                      <small className="text-danger text-tiny">
                        {errors?.selectedGuestAddresses?.message}
                      </small>
                    )}
                    {Array.isArray(errors.selectedGuestAddresses) &&
                      errors.selectedGuestAddresses.map((error, index) => (
                        <small key={index} className="text-danger text-tiny">
                          {error?.message}
                        </small>
                      ))}
                    {errors?.actionType && (
                      <small className="text-danger text-tiny">
                        {errors.actionType.message}
                      </small>
                    )}
                  </div>
                )}
              </form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                disabled={isSubmitting}
                onPress={onClose}
                className="w-full font-semibold rounded-full"
              >
                Cancel
              </Button>
              <Button
                color="secondary"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                onPress={triggerSubmit}
                className="w-full font-semibold rounded-full capitalize"
              >
                {isSubmitting ? "Applying Updates..." : `${actionType}`}
              </Button>
            </ModalFooter>
          </Fragment>
        )}
      </ModalContent>
    </Modal>
  );
};
