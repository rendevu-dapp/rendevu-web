"use client";

// imports
import { Card, CardBody, CardHeader } from "@heroui/react";
// react
import { FC, Fragment, PropsWithChildren } from "react";
import {
  useActiveAccount,
  useConnect,
  useIsAutoConnecting,
} from "thirdweb/react";

// shared components
import { ConnectButton } from "@/components/shared";

export const AppAuthLayout: FC<PropsWithChildren> = ({ children }) => {
  // hooks
  const { isConnecting } = useConnect();
  const activeAccount = useActiveAccount();
  const isAutoConnecting = useIsAutoConnecting();

  // dervied data
  const connecting = isConnecting || isAutoConnecting;
  const shouldAuth = !activeAccount;

  // conditionally render the auth layout
  if (shouldAuth) {
    return (
      <div className="inset-0 z-40 flex h-[calc(100vh-100px)] w-screen items-center justify-center bg-white dark:bg-[#181A1B] relative">
        <Card className="w-full max-w-sm rounded-2xl border border-gray-200 dark:border-[#343A40] dark:bg-[#181A1B] py-5 shadow-lg">
          <CardHeader className="flex-col items-center px-6 py-4 text-center">
            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-200">
              Authentication Required
            </h4>
            <p className="mt-1 text-xs text-gray-500 uppercase dark:text-gray-400">
              {connecting ? "Connecting wallet..." : "Sign in to continue"}
            </p>
          </CardHeader>
          <CardBody className="px-6 py-4">
            <ConnectButton />
          </CardBody>
        </Card>

        {connecting && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-10">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return <Fragment>{children}</Fragment>;
};
