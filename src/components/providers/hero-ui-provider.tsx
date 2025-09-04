"use client";

// imports
import { HeroUIProvider, ToastProvider } from "@heroui/react";

export const HeroUIProviderWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-right" toastOffset={20} />
      {children}
    </HeroUIProvider>
  );
};
