"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FC, memo } from "react";
import group2 from "@/../public/images/Group2.svg";
import group3 from "@/../public/images/Group3.svg";
import mobileVector from "@/../public/images/mobile-vector.png";
import rendEvu from "@/../public/images/rend.evu.svg";
// Static assets
import rendEvuMobile from "@/../public/images/rend.evu-mobile.svg";

// Animation variants
import {
  childVariants,
  containerVariants,
  logoVariants,
} from "../animationVariants";

// Constants for reused values
const GRADIENT_BORDER_STYLE = {
  border: "1px solid transparent",
  background: "linear-gradient(to right, #6C1ACD, #9F188C, #DE173E)",
  backgroundClip: "border-box",
  WebkitMask:
    "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor",
  maskComposite: "exclude",
} as const;

const BUTTON_BASE_STYLE = {
  backgroundClip: "padding-box",
} as const;

// Type for Image component props
interface HeroImageProps {
  src: StaticImageData | string;
  alt: string;
  width: number;
  height: number;
  className: string;
  priority?: boolean;
}

// Reusable Image component with memoization
const HeroImage: FC<HeroImageProps> = memo(
  ({ src, alt, width, height, className, priority }) => (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={priority ? undefined : "lazy"}
    />
  ),
);

HeroImage.displayName = "HeroImage";

// Reusable Gradient Button component
const GradientButton: FC<{ children: string; className?: string }> = ({
  children,
  className,
}) => (
  <Button
    as={Link}
    href="/create"
    prefetch={true}
    className={`relative rounded-full border border-transparent bg-transparent px-12 py-8 font-bold text-[#150529] dark:text-white ${className}`}
    style={BUTTON_BASE_STYLE}
  >
    <span
      className="absolute inset-0 rounded-full"
      style={GRADIENT_BORDER_STYLE}
    />
    {children}
  </Button>
);

// Background Images component
const BackgroundImages: FC = () => (
  <motion.div
    className="absolute top-20 left-0 z-10 w-full overflow-x-hidden md:top-30"
    variants={childVariants}
  >
    <HeroImage
      src={rendEvuMobile}
      alt="rend.evu mobile logo"
      width={50}
      height={50}
      className="ml-4 w-[20%] max-w-[70px] opacity-50 md:hidden dark:opacity-50"
      priority
    />
    <HeroImage
      src={rendEvu}
      alt="rend.evu logo"
      width={1200}
      height={300}
      className="mx-auto hidden w-[95%] max-w-full p-7 opacity-50 md:block dark:opacity-50"
      priority
    />
  </motion.div>
);

// Centered Logo component
const CenteredLogo: FC = () => (
  <motion.div
    className="relative z-20 flex items-center justify-center"
    variants={logoVariants}
  >
    <HeroImage
      src={group3}
      alt="Group3 logo"
      width={460}
      height={460}
      className="mt-20 w-[380px] max-w-[90%] md:w-[460px] md:max-w-[80%]"
      priority
    />
  </motion.div>
);

// Bottom Left Section component
const BottomLeftSection: FC = () => (
  <motion.div
    className="mb-4 flex flex-col text-left text-[#343A40] md:mb-0 dark:text-white"
    variants={childVariants}
  >
    <h1 className="text-[32px] leading-8 font-extrabold md:text-[57px] md:leading-16">
      Reimagining <br /> Events
    </h1>
    <p className="text-[14px] font-semibold text-[#868E96] md:text-[17px] dark:text-white">
      For the On-Chain Era
    </p>
    <div className="mt-4 md:hidden">
      <GradientButton>Create event 🚀</GradientButton>
    </div>
  </motion.div>
);

// Bottom Right Section component (Desktop only)
const BottomRightSection: FC = () => (
  <motion.div className="hidden items-end md:flex" variants={childVariants}>
    <GradientButton>Create event 🚀</GradientButton>
  </motion.div>
);

// Bottom Middle Image component (Desktop only)
const BottomMiddleImage: FC = () => (
  <motion.div
    className="hidden items-end justify-center md:flex"
    variants={childVariants}
  >
    <HeroImage
      src={group2}
      alt="Vector logo"
      width={400}
      height={400}
      className="w-[550px]"
    />
  </motion.div>
);

// Mobile Vector Image component
const MobileVectorImage: FC = () => (
  <motion.div
    className="flex items-end justify-end md:hidden"
    variants={childVariants}
  >
    <HeroImage
      src={mobileVector}
      alt="Mobile vector"
      width={600}
      height={600}
      className="h-[160px] w-[300px] max-w-[90%]"
    />
  </motion.div>
);

// Main Hero component
const HeroArea: FC = () => (
  <motion.section
    className="relative mx-auto flex flex-col items-center justify-between overflow-hidden bg-surfaces-bg-primary dark:bg-[#181A1B]"
    aria-label="Hero section"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <BackgroundImages />
    <CenteredLogo />
    <div className="relative z-20 flex w-full mb-8 flex-row items-end justify-between px-3 md:px-8">
      <BottomLeftSection />
      <MobileVectorImage />
      <BottomMiddleImage />
      <BottomRightSection />
    </div>
  </motion.section>
);

export default HeroArea;
