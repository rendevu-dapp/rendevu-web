// react
import { FC } from "react";
// imports
import { useMediaQuery } from "usehooks-ts";
import { MeetingLinkDrawer } from "./meeting-link-drawer";
// components
import { MeetingLinkModal } from "./meeting-link-modal";

// types
type MeetingLinkDisclosureProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSelect: (link: string) => void;
};

export const MeetingLinkDisclosure: FC<MeetingLinkDisclosureProps> = ({
  isOpen,
  onOpenChange,
  onSelect,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <MeetingLinkDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSelect={onSelect}
      />
    );
  }

  return (
    <MeetingLinkModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
    />
  );
};
