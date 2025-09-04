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
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LinkSimpleIcon } from "@phosphor-icons/react";
// next
import Link from "next/link";
import { FC, Fragment, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { TransactionReceipt } from "viem";

// components
import EventSummary from "./event-summary";

// types
type ProcessingState = "pending" | "completed" | "error";
type CreateEventPreviewProps = {
  isOpen: boolean;
  isProcessing?: boolean;
  isUploadingImage?: boolean;
  isUploadingMetadata?: boolean;
  isSendingTransaction?: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onProceed: () => Promise<TransactionReceipt>;
};

export const CreateEventPreview: FC<CreateEventPreviewProps> = ({
  isOpen,
  isProcessing = false,
  isUploadingImage = false,
  isUploadingMetadata = false,
  isSendingTransaction = false,
  onProceed,
  onOpenChange,
}) => {
  // state
  const [processingState, setProcessingState] =
    useState<ProcessingState>("pending");
  const [txReceipt, setTxReceipt] = useState<TransactionReceipt>();
  const [processingError, setProcessingError] = useState<{
    title: string;
    description: string;
  }>();

  // hooks
  const isMobile = useMediaQuery("(max-width: 768px)");

  // derived data
  const showSummary = !isProcessing && processingState === "pending";
  const showProcessing = isProcessing || processingState !== "pending";

  // handlers
  const handleProcess = async () => {
    if (isProcessing) return;
    try {
      setProcessingState("pending");
      const receipt = await onProceed();
      setTxReceipt(receipt);
      setProcessingState("completed");
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case "Network is required":
            setProcessingError({
              title: "Network required",
              description: "Please select a network for the event",
            });
            break;
          case "Image upload error":
            setProcessingError({
              title: "Image upload failed",
              description: "Please try uploading the image again",
            });
            break;
          case "Metadata upload error":
            setProcessingError({
              title: "Metadata upload failed",
              description: "Please try again later",
            });
            break;
          case "Transaction error":
            setProcessingError({
              title: "Transaction failed",
              description: "Please check your wallet and try again",
            });
            break;
          default:
            setProcessingError({
              title: "Error creating event",
              description: error.message,
            });
            break;
        }
      } else {
        setProcessingError({
          title: "Error creating event",
          description: "An unexpected error occurred. Please try again.",
        });
      }
      setProcessingState("error");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
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
            <ModalHeader className="flex flex-col">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-gray-300">
                Preview
              </h3>
              <p className="text-sm font-medium text-placeholder dark:text-gray-300">
                Review your event details before publishing
              </p>
            </ModalHeader>
            <ModalBody className="px-4">
              {showSummary && <EventSummary />}
              {showProcessing && (
                <div className="py-1 px-6 flex flex-col gap-4">
                  {isProcessing && (
                    <Fragment>
                      <DotLottieReact
                        src={"/lotties/block-loader.lottie"}
                        autoplay
                        loop
                        width={400}
                        height={300}
                      />
                      <div className="text-center">
                        <p className="text-lg text-black dark:text-gray-200 font-semibold font-bricolage-grotesque">
                          {isUploadingImage && <>Uploading event image...</>}
                          {isUploadingMetadata && <>Uploading metadata...</>}
                          {isSendingTransaction && <>Sending transaction...</>}
                        </p>
                      </div>
                    </Fragment>
                  )}
                  {processingState === "completed" && (
                    <Fragment>
                      <DotLottieReact
                        src={"/lotties/done.lottie"}
                        autoplay
                        loop={false}
                        width={200}
                        height={150}
                      />
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-base text-black dark:text-gray-200 font-semibold font-bricolage-grotesque">
                          Event created successfully!
                        </p>
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://sepolia.basescan.org/tx/${txReceipt?.transactionHash}`}
                          className="text-secondary text-sm font-medium inline-flex items-center gap-1"
                        >
                          <span>View Transaction</span>
                          <LinkSimpleIcon
                            size={16}
                            className="text-secondary"
                          />
                        </Link>
                      </div>
                    </Fragment>
                  )}
                  {processingState === "error" && (
                    <Fragment>
                      <DotLottieReact
                        src={"/lotties/error.lottie"}
                        autoplay
                        loop={false}
                        width={200}
                        height={200}
                      />
                      <div className="flex flex-col items-center">
                        <p className="text-base text-danger font-semibold font-bricolage-grotesque">
                          {processingError?.title || "An error occurred"}
                        </p>
                        <p className="text-sm text-placeholder text-center">
                          {processingError?.description ||
                            "Please try again later."}
                        </p>
                      </div>
                    </Fragment>
                  )}
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              {(!showProcessing || processingState === "error") && (
                <Button
                  color="default"
                  onPress={onClose}
                  className="w-full font-semibold rounded-full"
                >
                  Cancel
                </Button>
              )}
              {processingState === "completed" ? (
                <Button
                  as={Link}
                  href="/events"
                  color="secondary"
                  className="w-full font-semibold rounded-full"
                >
                  Go to Events
                </Button>
              ) : (
                <Button
                  color="secondary"
                  onPress={handleProcess}
                  isLoading={isProcessing}
                  isDisabled={isProcessing}
                  className="w-full font-semibold rounded-full"
                >
                  {processingState === "error"
                    ? "Retry"
                    : isProcessing
                      ? "Processing..."
                      : "Proceed"}
                </Button>
              )}
            </ModalFooter>
          </Fragment>
        )}
      </ModalContent>
    </Modal>
  );
};
