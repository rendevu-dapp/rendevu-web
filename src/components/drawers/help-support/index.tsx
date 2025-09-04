import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import PrivacyIcon from "@/../public/images/privacy.svg";
import UploadBoldIcon from "@/../public/images/upload-bold.svg";

export const HelpSupportDrawer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const bool = useMediaQuery({
    query: "(min-width: 640px)",
  });

  return (
    <>
      <div
        className="flex h-[60px] cursor-pointer items-center rounded-[12px] border border-[#E9ECEF] dark:border-[#343A40] px-3.5"
        onClick={onOpen}
      >
        <div className="flex items-center gap-1">
          <Image src={PrivacyIcon} width={18} height={18} alt="Privacy" />
          <h2 className="text-xs font-semibold text-[#343A40] dark:text-[#E9ECEF]">
            Privacy Policy
          </h2>
        </div>
      </div>

      <Drawer
        isOpen={isOpen}
        hideCloseButton={true}
        placement={bool ? "right" : "bottom"}
        onOpenChange={onOpenChange}
        backdrop="blur"
        className="dark:bg-[#181A1B]"
      >
        <DrawerContent className="flex max-h-[40rem] w-full gap-[21px] rounded-t-[24px] border-l border-l-[#DEE2E6] dark:border-[#343A40]  bg-white px-5 py-[22px] sm:max-h-full sm:w-[430px] sm:rounded-tl-[24px] sm:rounded-b-none">
          {(onClose) => (
            <>
              <DrawerHeader className="flex items-start justify-between p-0">
                <div>
                  <h1 className="text-xl font-bold text-[#343A40] dark:text-[#E9ECEF]">
                    Help & Support
                  </h1>
                </div>
                <Tooltip content="Close">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="faded"
                    onPress={onClose}
                    className="text-default-400 h-7 min-h-7 w-7 min-w-7 rounded-full border"
                  >
                    <X size={14} weight="bold" className="text-default-500" />
                  </Button>
                </Tooltip>
              </DrawerHeader>
              <DrawerBody className="flex flex-col gap-[21px] p-0 no-scrollbar">
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="subject"
                    className="text-xs font-semibold text-[#868E96] dark:text-[#E9ECEF]"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Enter name here..."
                    className="h-14 rounded-[12px] border border-[#B5B5B5] dark:border-[#343A40] px-[29px] placeholder:text-xs placeholder:font-semibold placeholder:text-[#DEE2E6]"
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="body"
                    className="text-xs font-semibold text-[#868E96] dark:text-[#E9ECEF]"
                  >
                    Body
                  </label>
                  <textarea
                    id="body"
                    placeholder="Enter body here..."
                    className="rounded-[12px] border border-[#B5B5B5] dark:border-[#343A40] px-[29px] py-7 placeholder:text-xs placeholder:font-semibold placeholder:text-[#DEE2E6]"
                  />
                </div>
                <div className="border border-[#D9D9D9] dark:border-[#343A40]" />
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-[#868E96] dark:text-[#E9ECEF]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email here..."
                    className="h-14 rounded-[12px] border border-[#B5B5B5] dark:border-[#343A40] px-[29px] placeholder:text-xs placeholder:font-semibold placeholder:text-[#DEE2E6]"
                  />
                </div>
                <div className="border border-[#D9D9D9] dark:border-[#343A40]" />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[#868E96] dark:text-[#E9ECEF]">
                    Add Image
                  </span>
                  <label
                    htmlFor="upload"
                    className="relative h-51 cursor-pointer rounded-[12px] border border-[#E9ECEF] dark:border-[#343A40] bg-[#F8F9FA] dark:text-[#E9ECEF]"
                  >
                    <div className="absolute top-5 right-5 rounded-full bg-[#E9ECEF] p-1.5">
                      <Image
                        src={UploadBoldIcon}
                        width={15}
                        height={15}
                        alt="Upload"
                      />
                    </div>
                  </label>
                  <input id="upload" type="file" className="hidden" />
                </div>
              </DrawerBody>
              <DrawerFooter className="flex p-0">
                <button
                  type="button"
                  className="h-14 w-full rounded-[64px] bg-[#6B1ACF] text-xs font-semibold text-[#F8F9FA]"
                >
                  Send Now
                </button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
