"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import {
  DiscordLogoIcon,
  FacebookLogoIcon,
  RedditLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
// react
import { FC, useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
// imports
import { useMediaQuery } from "usehooks-ts";
// helpers
import { classnames } from "@/common/helpers";
// hooks
import { useGetUserProfile } from "@/common/hooks/api/queries";
// types
import { Event } from "@/common/types/models/event";
// components
import CopyLink from "./copy-link";
import InviteGuests from "./invite-guests";

const shareOps = [
  {
    id: "facebook",
    name: "Facebook",
    icon: FacebookLogoIcon,
    url: (shareUrl: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl,
      )}`,
    color:
      "bg-[#1877F2] text-white hover:bg-[#166FE5] dark:bg-[#1877F2] dark:hover:bg-[#166FE5]",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: XLogoIcon,
    url: (shareUrl: string, title?: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl,
      )}&text=${encodeURIComponent(title || "")}`,
    color:
      "bg-black text-white hover:bg-gray-900 dark:bg-black dark:hover:bg-gray-900",
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: RedditLogoIcon,
    url: (shareUrl: string, title?: string, description?: string) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(
        shareUrl,
      )}&title=${encodeURIComponent(title || "")}&text=${encodeURIComponent(
        description || "",
      )}`,
    color:
      "bg-[#FF4500] text-white hover:bg-[#FF3700] dark:bg-[#FF4500] dark:hover:bg-[#FF3700]",
  },
  {
    id: "discord",
    name: "Discord",
    icon: DiscordLogoIcon,
    url: (shareUrl: string, title?: string, description?: string) =>
      `https://discord.com/share?url=${encodeURIComponent(
        shareUrl,
      )}&title=${encodeURIComponent(
        title || "",
      )}&description=${encodeURIComponent(description || "")}`,
    color:
      "bg-[#0A66C2] text-white hover:bg-[#004182] dark:bg-[#0A66C2] dark:hover:bg-[#004182]",
  },
] as const;

type ShareEventModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  details: {
    eventId: string;
    title: string;
  };
  event?: Event;
};

export const ShareEventModal: FC<ShareEventModalProps> = ({
  isOpen,
  onOpenChange,
  details,
  event,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const account = useActiveAccount();
  const { data: userProfile } = useGetUserProfile(account?.address);
  const isOrganizer =
    event?.organizer && account?.address
      ? event.organizer.toLowerCase() === account.address.toLowerCase()
      : false;

  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/events/${details.eventId}`);
    }
  }, [details.eventId]);

  const handleShare = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      onOpenChange={onOpenChange}
      placement={isMobile ? "bottom" : "center"}
      className="dark:border dark:border-[#343A40]"
    >
      <ModalContent className="max-w-lg">
        <ModalHeader className="flex flex-col gap-1">
          <h4 className="text-2xl font-bold">Share Event</h4>
        </ModalHeader>
        <ModalBody className="pb-6 flex flex-col gap-6">
          <p className="text-base text-muted-foreground">
            Share <b>{`"${details.title}"`}</b> with your friends and followers
            to increase visibility and participation.
          </p>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-muted-foreground">
              Share on social media
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {shareOps.map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <Button
                    key={platform.id}
                    startContent={
                      <IconComponent weight="fill" className="h-5 w-5" />
                    }
                    onPress={() => handleShare(platform.url(shareUrl))}
                    className={classnames(
                      "justify-start gap-3 h-auto py-3 px-4 text-left transition-colors",
                      platform.color,
                    )}
                    aria-label={`Share on ${platform.name}`}
                    disabled={!shareUrl}
                  >
                    {platform.name}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-muted-foreground">
              Or copy link
            </h4>
            <CopyLink shareUrl={shareUrl} />
          </div>
          {isOrganizer && (
            <InviteGuests eventId={details.eventId} user={userProfile} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
