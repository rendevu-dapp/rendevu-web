"use client";

// heroui
import { Button } from "@heroui/react";

// next
import Link from "next/link";
import { usePathname } from "next/navigation";
// react
import { FC } from "react";

// thirdweb
import { useActiveAccount } from "thirdweb/react";

// hooks
import { useGetUserProfile } from "@/common/hooks/api/queries";

// Constant
// const GRADIENT_BORDER_STYLE = {
//   border: "1px solid transparent",
//   background: "linear-gradient(to right, #6C1ACD, #9F188C, #DE173E)",
//   backgroundClip: "border-box",
//   WebkitMask:
//     "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
//   WebkitMaskComposite: "xor",
//   maskComposite: "exclude",
// } as const;

const BUTTON_BASE_STYLE = {
  backgroundClip: "padding-box",
} as const;

// Gradient Button component
const GradientButton: FC<{ children: string; className?: string }> = ({
  children,
  className,
}) => (
  <Button
    as={Link}
    href="/profile"
    prefetch={true}
    className={`relative rounded-2xl border border-transparent bg-[#1A1E22] px-4 py-2 text-[12px] font-semibold text-white md:px-6 md:py-4 md:text-[14px] ${className}`}
    style={BUTTON_BASE_STYLE}
  >
    <span
      className="absolute inset-0 rounded-2xl"
      // style={GRADIENT_BORDER_STYLE}
    />
    {children}
  </Button>
);

// Main component
const ProfileSetupNotification: FC = () => {
  const account = useActiveAccount();
  const { data: userProfile, isPending: loadingUserProfile } =
    useGetUserProfile(account?.address);
  const pathname = usePathname();

  if (
    !account ||
    loadingUserProfile ||
    userProfile ||
    pathname === "/profile"
  ) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-between bg-[#A1A9FE] p-4">
      <span className="font-inter text-[12px] font-bold text-white md:text-[18px]">
        Swing by your profile and finish it up!
      </span>
      <GradientButton>Update Profile</GradientButton>
    </div>
  );
};

export default ProfileSetupNotification;
