// react

// imports
import {
  Alert,
  Button,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { FC, Fragment } from "react";

// types
type CheckInQRTimeInputProps = {
  expiryMinutes: string;
  onExpiryMinutesChange: (value: string) => void;
  onGenerateQR: () => Promise<void>;
  isGenerating: boolean;
};

const CheckInQRTimeInput: FC<CheckInQRTimeInputProps> = ({
  expiryMinutes,
  onExpiryMinutesChange,
  onGenerateQR,
  isGenerating,
}) => (
  <Fragment>
    <ModalHeader className="flex flex-col gap-1">
      <h3 className="text-xl font-semibold">Generate Self Check-in QR Code</h3>
    </ModalHeader>
    <ModalBody className="py-6">
      <div className="flex flex-col gap-y-4">
        <Alert
          color="secondary"
          variant="flat"
          description="Set how long you want the QR code to be valid for attendees to self check-in."
        />

        <Input
          label="Expiry Time (minutes)"
          placeholder="60"
          variant="faded"
          type="number"
          min="1"
          max="1440"
          value={expiryMinutes}
          onValueChange={onExpiryMinutesChange}
          description="QR code will expire after this many minutes"
          isRequired
        />
      </div>
    </ModalBody>
    <ModalFooter>
      <Button
        color="secondary"
        size="lg"
        onPress={onGenerateQR}
        isLoading={isGenerating}
        isDisabled={!expiryMinutes || parseInt(expiryMinutes) < 1}
        className="w-full"
      >
        {isGenerating ? "Generating..." : "Generate QR Code"}
      </Button>
    </ModalFooter>
  </Fragment>
);

export default CheckInQRTimeInput;
