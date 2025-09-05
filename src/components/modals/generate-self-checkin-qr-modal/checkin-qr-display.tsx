// react

import { Button, ModalBody, ModalFooter, ModalHeader } from "@heroui/react";
import { format, isToday, isTomorrow } from "date-fns";
// imports
import QRCodeStyling from "qr-code-styling";
import { FC, Fragment, useEffect, useRef } from "react";

type CheckInQRDisplayProps = {
  qrCodeData: string;
  expiryMinutes: string;
  expiryTimestamp: number;
  onBack: () => void;
};

const CheckInQRDisplay: FC<CheckInQRDisplayProps> = ({
  qrCodeData,
  expiryMinutes,
  expiryTimestamp,
  onBack,
}) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  const formatExpiryDate = (timestamp: number): string => {
    const expiryDate = new Date(timestamp * 1000);
    const timeStr = format(expiryDate, "h:mm a");

    if (isToday(expiryDate)) {
      return `Today at ${timeStr}`;
    } else if (isTomorrow(expiryDate)) {
      return `Tomorrow at ${timeStr}`;
    } else {
      return format(expiryDate, "do MMMM yyyy") + ` at ${timeStr}`;
    }
  };

  useEffect(() => {
    if (!qrRef.current) return;

    // Create QR code instance with styling
    qrCodeRef.current = new QRCodeStyling({
      width: 256, // Bigger QR code
      height: 256,
      data: qrCodeData,
      dotsOptions: {
        color: "#0f172a", // slate-900 for better contrast
        type: "extra-rounded",
        gradient: {
          type: "linear",
          rotation: 45,
          colorStops: [
            { offset: 0, color: "#0f172a" },
            { offset: 1, color: "#1e293b" },
          ],
        },
      },
      cornersSquareOptions: {
        color: "#0f172a",
        type: "extra-rounded",
        gradient: {
          type: "linear",
          rotation: 45,
          colorStops: [
            { offset: 0, color: "#0f172a" },
            { offset: 1, color: "#1e293b" },
          ],
        },
      },
      cornersDotOptions: {
        color: "#0f172a",
        type: "dot",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      qrOptions: {
        errorCorrectionLevel: "H", // Higher error correction for better scanning
      },
    });

    // Clear previous QR code and append new one
    qrRef.current.innerHTML = "";
    qrCodeRef.current.append(qrRef.current);
  }, [qrCodeData]);

  const downloadQR = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({
        name: "checkin-qr-code",
        extension: "png",
      });
    }
  };

  return (
    <Fragment>
      <ModalHeader className="flex flex-col gap-1">
        Self Check-in QR Code
      </ModalHeader>
      <ModalBody className="py-8">
        <div className="flex flex-col gap-6 items-center">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div
              ref={qrRef}
              className="w-64 h-64 rounded-lg flex items-center justify-center"
            />
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">
              Expires in{" "}
              <span className="font-medium text-gray-900">
                {expiryMinutes} minutes
              </span>
            </p>
            <p className="text-xs text-gray-400">
              {formatExpiryDate(expiryTimestamp)}
            </p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="gap-2">
        <Button variant="light" onPress={onBack} className="flex-1">
          Back
        </Button>
        <Button
          color="secondary"
          variant="flat"
          onPress={() => {
            navigator.clipboard.writeText(qrCodeData);
            alert("QR code data copied to clipboard!");
          }}
          className="flex-1"
        >
          Copy Data
        </Button>
        <Button color="primary" onPress={downloadQR} className="flex-1">
          Download QR
        </Button>
      </ModalFooter>
    </Fragment>
  );
};

export default CheckInQRDisplay;
