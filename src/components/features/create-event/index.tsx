"use client";

import { Chip, Tab, Tabs } from "@heroui/react";
// react
import { FormProvider } from "react-hook-form";
// imports
import { useMediaQuery } from "usehooks-ts";

// helpers
import { classnames } from "@/common/helpers";
// hooks
import { useCreateEvent } from "@/common/hooks/create-event/use-create-event";
import { useTabNavigation } from "@/common/hooks/create-event/use-tab-navigation";
// modal components
import { CreateEventPreview } from "@/components/modals";

// providers
import { GoogleMapApiProvider } from "@/components/providers/google-map-api-provider";
// components
import { CreateEventTabContent } from "./create-tab-content";
import { TicketingTabContent } from "./ticketing-tab-content";

export const CreateEventPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    methods,
    isCreating,
    isModalOpen,
    isUploadingImage,
    isUploadingMetadata,
    isSendingTransaction,
    previewEvent,
    handleSubmit,
    onModalOpenChange,
  } = useCreateEvent();
  const {
    selectedTab,
    handleTabSelection,
    handleTabMoveNext,
    handleTabMoveBack,
  } = useTabNavigation({ methods });

  return (
    <GoogleMapApiProvider>
      <FormProvider {...methods}>
        <div className="flex min-h-screen flex-col items-center bg-white  pt-20 pb-10 text-black dark:bg-[#181A1B] dark:text-white">
          <div className="w-full max-w-7xl p-4">
            <div className="flex w-full flex-col">
              <Tabs
                aria-label="Options"
                placement="bottom"
                selectedKey={selectedTab}
                onSelectionChange={handleTabSelection}
                classNames={{
                  base: "w-full grid grid-cols-12 gap-4 mt-4",
                  tab: "max-w-fit md:px-4 h-auto",
                  cursor: "w-full shadow-none",
                  tabList:
                    "col-span-12 md:col-span-9 md:col-start-4 bg-[none] gap-2 md:gap-6 w-full relative rounded-none p-0",
                  tabContent: "shadow-none",
                  tabWrapper: "gap-6",
                }}
              >
                <Tab
                  key="create"
                  title={
                    <div className="flex items-center space-x-2">
                      <Chip
                        size={isMobile ? "sm" : "lg"}
                        variant="flat"
                        className={classnames(
                          "h-6 min-h-6 w-6 min-w-6 items-center justify-center text-sm text-[#868E96] md:h-9 md:min-h-9 md:w-9 md:min-w-9",
                          {
                            "bg-gradient-to-b from-[#741AC4] to-[#DC1742] p-2.5 text-white":
                              selectedTab === "create",
                          },
                        )}
                      >
                        <span className="font-bold">1</span>
                      </Chip>
                      <span className="text-sm font-semibold text-[#868E96]">
                        Create
                      </span>
                    </div>
                  }
                >
                  <CreateEventTabContent onContinue={handleTabMoveNext} />
                </Tab>
                <Tab
                  key="ticket"
                  title={
                    <div className="flex items-center space-x-2">
                      <Chip
                        size={isMobile ? "sm" : "lg"}
                        variant="flat"
                        className={classnames(
                          "h-6 min-h-6 w-6 min-w-6 items-center justify-center text-sm text-[#868E96] md:h-9 md:min-h-9 md:w-9 md:min-w-9",
                          {
                            "bg-gradient-to-b from-[#741AC4] to-[#DC1742] p-2.5 text-white":
                              selectedTab === "ticket",
                          },
                        )}
                      >
                        <span className="font-bold">2</span>
                      </Chip>
                      <span className="text-sm font-semibold text-[#868E96]">
                        Add Ticket
                      </span>
                    </div>
                  }
                >
                  <TicketingTabContent
                    onContinue={previewEvent}
                    onBack={handleTabMoveBack}
                    saving={isCreating}
                  />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        {/* event preview modal */}
        <CreateEventPreview
          isOpen={isModalOpen}
          isUploadingImage={isUploadingImage}
          isUploadingMetadata={isUploadingMetadata}
          isSendingTransaction={isSendingTransaction}
          isProcessing={isCreating}
          onProceed={handleSubmit}
          onOpenChange={onModalOpenChange}
        />
      </FormProvider>
    </GoogleMapApiProvider>
  );
};
