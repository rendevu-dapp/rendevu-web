import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { format, fromUnixTime } from "date-fns";
import Image from "next/image";
import { FC } from "react";
import AddIcon from "@/../public/images/add-dark.svg";
import EditIcon from "@/../public/images/edit-solid.svg";
import QrCodeImg from "@/../public/images/qr-code.png";
import RoundCloseIcon from "@/../public/images/round-close.svg";
import TicketAltIconSvg from "@/../public/images/ticket-alt.svg";
import { Event } from "@/common/types/models/event";
import { Location } from "@/components/features/single-event/event-details/type";
import { TicketAltIcon } from "@/components/icons";
import { ShareEventModal } from "../share-event-modal";

type ViewTicketModalProps = {
  eventId: string;
  title: string;
  startDate?: string;
  endDate?: string;
  location?: Location;
  event?: Event;
};

export const ViewTicketModal: FC<ViewTicketModalProps> = ({
  eventId,
  title,
  startDate,
  endDate,
  location,
  event,
}) => {
  const start = startDate ? fromUnixTime(Number(startDate)) : new Date();
  const end = endDate ? fromUnixTime(Number(endDate)) : new Date();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isShareModalOpen,
    onOpen: onShareModalOpen,
    onOpenChange: onShareModalChange,
  } = useDisclosure();
  return (
    <>
      <Button
        variant="bordered"
        startContent={<TicketAltIcon size={16} className="text-black" />}
        className="dark:text-black !border-1 border-black text-xs font-semibold rounded-full"
        onClick={onOpen}
      >
        View Ticket
      </Button>
      <Modal
        isOpen={isOpen}
        hideCloseButton={true}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        classNames={{
          backdrop: "bg-[#D9D9D966]",
        }}
      >
        <ModalContent className="w-[430px] gap-5 rounded-3xl bg-white px-5 py-[22px]">
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-between p-0">
                <h1 className="text-xl font-bold text-[#343A40]">My Tickets</h1>
                <button
                  type="button"
                  className="cursor-pointer rounded-full border border-[#868E96] p-2.5"
                  onClick={onClose}
                >
                  <Image
                    src={RoundCloseIcon}
                    width={16}
                    height={16}
                    alt="Close"
                  />
                </button>
              </ModalHeader>
              <ModalBody className="flex w-full p-0">
                <div className="flex flex-col gap-3.5 rounded-3xl bg-[#F8F9FA] px-5 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-[0.76px] border-[#868E96]">
                        <Image
                          src={TicketAltIconSvg}
                          width={12}
                          height={12}
                          alt="Ticket"
                        />
                      </div>
                      <div>
                        <h2 className="text-xs font-bold text-[#343A40]">
                          Ticket
                        </h2>
                        <span className="text-xs text-[#868E96]">{title}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <Image src={EditIcon} width={24} height={24} alt="Edit" />
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E9ECEF]">
                        <Image
                          src={QrCodeImg}
                          width={24}
                          height={24}
                          alt="Qr Code"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border-2 border-dashed border-[#868E96]" />
                  <div className="flex items-center gap-7">
                    <div className="flex flex-col">
                      <span className="text-xs text-[#868E96]">Date</span>
                      <span className="text-xs font-bold text-[#343A40]">
                        {format(start, "dd/MM/yyyy")} -{" "}
                        {format(end, "dd/MM/yyyy")}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-[#868E96]">Time</span>
                      <span className="text-xs font-bold text-[#343A40]">
                        {format(start, "HH:mm")}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-[#868E96]">Location</span>
                      <span className="text-xs font-bold text-[#343A40]">
                        {location?.name}
                      </span>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex p-0">
                <div className="mr-auto flex flex-col items-center gap-0.5">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-[#868E96] bg-[#F8F9FA]"
                    onClick={() => onShareModalOpen()}
                  >
                    <Image src={AddIcon} width={18} height={18} alt="Close" />
                  </div>
                  <span className="text-xs text-[#868E96]">Invite</span>
                </div>
                <ShareEventModal
                  isOpen={isShareModalOpen}
                  onOpenChange={onShareModalChange}
                  details={{ eventId, title }}
                  event={event}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
