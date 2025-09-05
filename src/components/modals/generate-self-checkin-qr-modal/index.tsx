// react

import { Modal, ModalContent } from "@heroui/react";
import { FC, useMemo, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { encodePacked, keccak256 } from "thirdweb/utils";
// imports
import { useMediaQuery } from "usehooks-ts";

// components
import CheckInQRDisplay from "./checkin-qr-display";
import CheckInQRTimeInput from "./checkin-qr-time-input";

// types
type GenerateSelfCheckInQRModalProps = {
  eventId: string;
  realEventId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

enum ModalPhase {
  TIME_INPUT = "TIME_INPUT",
  QR_DISPLAY = "QR_DISPLAY",
}

export const GenerateSelfCheckInQRModal: FC<
  GenerateSelfCheckInQRModalProps
> = ({ eventId, realEventId, isOpen, onOpenChange }) => {
  // hooks
  const activeAccount = useActiveAccount();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // state
  const [phase, setPhase] = useState<ModalPhase>(ModalPhase.TIME_INPUT);
  const [expiryMinutes, setExpiryMinutes] = useState<string>("60");
  const [signature, setSignature] = useState<string>("");
  const [expiry, setExpiry] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Reset modal state when it opens/closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setPhase(ModalPhase.TIME_INPUT);
      setExpiryMinutes("60");
      setSignature("");
      setExpiry(0);
      setIsGenerating(false);
    }
    onOpenChange(open);
  };

  // Generate QR code data
  const qrCodeData = useMemo(() => {
    if (!signature || !expiry) return "";

    // Create checkin code by combining realEventId, expiry, and signature
    const checkinCode = `${realEventId}:${expiry}:${signature}`;

    // Return a URL that follows the requested format
    return `${
      window.location.origin
    }/e/${eventId}?checkin-code=${encodeURIComponent(checkinCode)}`;
  }, [eventId, realEventId, expiry, signature]);

  // Handle generating the signed message
  const handleGenerateQR = async () => {
    if (!activeAccount) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      setIsGenerating(true);

      // Calculate expiry timestamp (current time + minutes in seconds)
      const expiryTimestamp =
        Math.floor(Date.now() / 1000) + parseInt(expiryMinutes) * 60;

      // Create message hash using realEventId instead of eventId
      const messageHash = keccak256(
        encodePacked(
          ["string", "uint256", "uint256"],
          [
            "EventPlatform.SelfCheckIn",
            BigInt(realEventId),
            BigInt(expiryTimestamp),
          ],
        ),
      );

      // Sign the message hash
      const sig = await activeAccount.signMessage({
        message: { raw: messageHash },
      });

      setExpiry(expiryTimestamp);
      setSignature(sig);
      setPhase(ModalPhase.QR_DISPLAY);
    } catch (error) {
      console.error("Error generating signature:", error);
      alert("Failed to generate QR code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    setPhase(ModalPhase.TIME_INPUT);
    setSignature("");
    setExpiry(0);
  };

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      onOpenChange={handleOpenChange}
      placement={isMobile ? "bottom" : "center"}
      className="dark:border dark:border-[#343A40]"
    >
      <ModalContent className="max-w-lg">
        {() =>
          phase === ModalPhase.TIME_INPUT ? (
            <CheckInQRTimeInput
              expiryMinutes={expiryMinutes}
              onExpiryMinutesChange={setExpiryMinutes}
              onGenerateQR={handleGenerateQR}
              isGenerating={isGenerating}
            />
          ) : (
            <CheckInQRDisplay
              qrCodeData={qrCodeData}
              expiryMinutes={expiryMinutes}
              expiryTimestamp={expiry}
              onBack={handleBack}
            />
          )
        }
      </ModalContent>
    </Modal>
  );
};
