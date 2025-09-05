// imports
import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { useFormContext } from "react-hook-form";
// schemas
import { EditEventValues } from "@/common/schemas/edit-event.schema";
// components
import { MeetingLinkModal } from "@/components/features/create-event/create-tab-content/event-details/time-place-link/meeting-link-disclosure/meeting-link-modal";
// icon components
import { CloseXIcon, VideoCameraFilledIcon } from "@/components/icons";

const VirtualLink = () => {
  // hooks
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<EditEventValues>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // derived state
  const virtualLink = watch("details.virtualLink");

  // handlers
  const handleChangeLink = () => {
    onOpen();
  };

  const handleLinkSelect = (link: string) => {
    setValue("details.virtualLink", link, { shouldValidate: true });
  };

  const handleRemoveLink = () => {
    setValue("details.virtualLink", undefined, { shouldValidate: true });
  };

  if (!virtualLink) {
    return null;
  }

  return (
    <>
      <Card
        shadow="none"
        as={"div"}
        isPressable
        onPress={handleChangeLink}
        className="w-full border border-neutral-200 dark:border-[#343A40]"
      >
        <CardBody className="grid grid-cols-12 items-start gap-2">
          <div className="col-span-1 p-1 flex items-start justify-center">
            <VideoCameraFilledIcon size={20} fill="#868E96" variant="filled" />
          </div>
          <div className="col-span-10 flex flex-col">
            <h6 className="text-sm font-semibold">Virtual Link</h6>
            <p className="text-xs font-medium text-placeholder">
              {virtualLink}
            </p>
            {errors.details?.virtualLink && (
              <p className="text-xs text-danger">
                {errors.details.virtualLink.message}
              </p>
            )}
          </div>
          <div className="col-span-1 p-1 flex items-start justify-center">
            <Button
              isIconOnly
              onPress={handleRemoveLink}
              className="min-w-auto w-auto h-auto p-1 !rounded-full !bg-white hover:!bg-gray-100"
            >
              <CloseXIcon size={16} fill="#868E96" />
            </Button>
          </div>
        </CardBody>
      </Card>
      <MeetingLinkModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSelect={handleLinkSelect}
        virtualLink={virtualLink}
      />
    </>
  );
};

export default VirtualLink;
