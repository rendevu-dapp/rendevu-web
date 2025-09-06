"use client";

// imports
import { useDisclosure } from "@heroui/react";
// next
import { useParams } from "next/navigation";
// react
import { useState } from "react";
// hooks
import { useSuspenseGetEventPoaps } from "@/common/hooks/queries";
// drawer components
import { UpdatePoapDrawer } from "@/components/drawers";
// modal components
import { PoapDetailsModal, RequestMintCodesModal } from "@/components/modals";
// components
import PoapBanner from "./banner";
import PoapsEmptyState from "./empty-state";
import PoapImage from "./poap-image";

// types
import { Poap } from "./types";

const PoapsArea = () => {
  // state
  const [selectedPoap, setSelectedPoap] = useState<Poap>();

  // hooks
  const { eventId } = useParams<{ eventId: string }>();
  const {
    isOpen: isCreatePoapDrawerOpen,
    onOpen: onOpenCreatePoapDrawer,
    onOpenChange: onOpenChangeCreatePoapDrawer,
  } = useDisclosure();
  const {
    isOpen: isUpdatePoapDrawerOpen,
    onOpen: onOpenUpdatePoapDrawer,
    onOpenChange: onOpenChangeUpdatePoapDrawer,
  } = useDisclosure();
  const {
    isOpen: isPoapDetailsModalOpen,
    onOpen: onOpenPoapDetailsModal,
    onOpenChange: onOpenChangePoapDetailsModal,
  } = useDisclosure();
  const {
    isOpen: isRequestMintCodesModalOpen,
    onOpen: onOpenRequestMintCodesModal,
    onOpenChange: onOpenChangeRequestMintCodesModal,
  } = useDisclosure();
  const { data: eventData, refetch } = useSuspenseGetEventPoaps({
    variables: { eventId: eventId },
  });

  // derived data
  const poaps = eventData?.eventById?.poaps || [];
  const showEmptyState = poaps.length === 0;

  // handlers
  const handleShowPoapDetails = (poap: Poap) => {
    setSelectedPoap(poap);
    onOpenPoapDetailsModal();
  };

  return (
    <div className="flex flex-col gap-10">
      {/* fancy banner */}
      <PoapBanner
        eventId={eventId}
        isCreatePoapDrawerOpen={isCreatePoapDrawerOpen}
        onOpenCreatePoapDrawer={onOpenCreatePoapDrawer}
        onOpenChangeCreatePoapDrawer={onOpenChangeCreatePoapDrawer}
        onCreateSuccess={() => {
          refetch();
        }}
      />

      {/* empty state */}
      {showEmptyState && (
        <PoapsEmptyState onOpenCreatePoapDrawer={onOpenCreatePoapDrawer} />
      )}

      {/* poaps grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10">
        {poaps.map((poap, index) => (
          <PoapImage
            key={poap.id}
            poap={poap}
            index={index}
            onShowPoapDetails={handleShowPoapDetails}
          />
        ))}
      </div>

      {/* poap details modal */}
      {selectedPoap && (
        <PoapDetailsModal
          poap={selectedPoap}
          isOpen={isPoapDetailsModalOpen}
          onOpenChange={onOpenChangePoapDetailsModal}
          onRequestMintCodes={onOpenRequestMintCodesModal}
          onUpdatePoap={onOpenUpdatePoapDrawer}
        />
      )}

      {/* request poap mint codes modal */}
      {selectedPoap && (
        <RequestMintCodesModal
          poap={selectedPoap}
          isOpen={isRequestMintCodesModalOpen}
          onOpenChange={onOpenChangeRequestMintCodesModal}
        />
      )}

      {/* update poap drawer */}
      {selectedPoap && (
        <UpdatePoapDrawer
          poap={selectedPoap}
          isOpen={isUpdatePoapDrawerOpen}
          onOpenChange={onOpenChangeUpdatePoapDrawer}
        />
      )}
    </div>
  );
};

export default PoapsArea;
