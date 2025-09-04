"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FC, memo, useRef } from "react";
// static assets
import threeDPeoplePortrait from "@/../public/images/3d-portrait-people.png";
// icon components
import { BoltIcon, SparklesIcon } from "@/components/icons";

// Animation variants
import {
  childVariants,
  containerVariants,
  logoVariants,
} from "../animationVariants";

// Types
interface CardProps {
  title: string;
  description: string;
  iconBgColor: string;
}

// Constants
const CARD_BASE_CLASSES =
  "bg-[#F8F9FA1A] p-6 flex flex-col gap-2.5 rounded-2xl";
const ICON_WRAPPER_CLASSES =
  "w-11 h-11 rounded-lg flex items-center justify-center";
const TITLE_CLASSES =
  "text-white text-xl md:text-2xl font-bold font-bricolage-grotesque";
const DESCRIPTION_CLASSES = "text-sm text-neutral-300 font-medium";

// Reusable Card component for Organizers/Attendees
const EventCard: FC<CardProps> = memo(({ title, description, iconBgColor }) => (
  <motion.div className={CARD_BASE_CLASSES} variants={childVariants}>
    <div className="flex flex-row items-center gap-2.5">
      <div className={`${ICON_WRAPPER_CLASSES} ${iconBgColor}`}>
        <BoltIcon fill="#DBC144" size={24} />
      </div>
      <h5 className={TITLE_CLASSES}>{title}</h5>
    </div>
    <p className={DESCRIPTION_CLASSES}>{description}</p>
  </motion.div>
));

EventCard.displayName = "EventCard";

// Right Section component
const RightSection: FC = () => (
  <motion.div
    className="relative w-full bg-white pt-10 md:pt-14 pb-8 px-8 md:px-14 text-white flex flex-col gap-3 rounded-3xl overflow-clip"
    style={{
      backgroundImage: `
        radial-gradient(at top left, #B83C35 0%, #A93530 40%, transparent 70%),
        radial-gradient(at center, #B83C35 0%, #A93530 30%, transparent 60%),
        radial-gradient(at bottom right, #9A2E2B 0%, #8B2926 40%, transparent 75%),
        radial-gradient(at center bottom, #4A1587 0%, transparent 50%),
        radial-gradient(at top center, #4A1587 0%, transparent 40%),
        radial-gradient(at top right, #D8D8D8 0%, transparent 25%),
        linear-gradient(135deg, #9A2E2B 0%, #8B2926 70%, #7C2421 100%)
      `,
    }}
    variants={childVariants}
  >
    <div className="flex flex-col items-center gap-7">
      <div className="bg-white/20 py-3 md:py-4 px-4 md:px-6 flex flex-row items-center justify-center gap-1 rounded-rounded">
        <SparklesIcon fill="#F8F9FA" size={24} />
        <span className="text-xs font-semibold">Host. Attend. Collect.</span>
      </div>
    </div>
    <div className="flex flex-col items-center gap-1 text-center">
      <h4 className="text-2xl md:text-[1.75rem] font-semibold font-bricolage-grotesque">
        Rewriting Events for the Web3 World
      </h4>
      <p className="max-w-[420px] font-medium text-sm md:text-sm">
        Create moments that last. Whether hosting a drop party or attending a
        conference, Rendevu secures your events on the blockchain.
      </p>
    </div>
  </motion.div>
);

// Portrait Image component
const PortraitImage: FC = () => (
  <motion.div
    className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:right-[15%] md:translate-x-0"
    variants={logoVariants}
  >
    <Image
      src={threeDPeoplePortrait}
      alt="3D people portrait"
      width={320}
      height={125}
      className="object-cover"
    />
  </motion.div>
);

// Main AboutArea component
const AboutArea: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      className="relative bg-[#181A1B] dark:bg-[#1A1E22] py-11 px-5 md:px-10 overflow-hidden"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="w-full mx-auto p-5 grid md:grid-cols-2 gap-8 border border-[#323537] rounded-3xl">
        <div className="w-full grid grid-rows-2 gap-3">
          <EventCard
            title="For Organizers"
            description="Create, control, and reward by launching events in minutes, storing everything on-chain with no middlemen, and dropping POAP NFTs to celebrate real participation."
            iconBgColor="bg-text-primary"
          />
          <EventCard
            title="For Attendees"
            description="Discover, join, and own by exploring events online or IRL, signing up with your wallet or socials, and claiming POAPs as proof of presence."
            iconBgColor="bg-neutral-500"
          />
        </div>
        <RightSection />
      </div>
      <PortraitImage />
    </motion.section>
  );
};

export default AboutArea;
