// next
import type { Metadata } from "next";
// imports
import { ThirdwebProvider } from "thirdweb/react";
// fonts
import { bricolageGrotesque, inter } from "@/common/fonts";
// helpers
import { classnames } from "@/common/helpers";
// layout components
import { AppRootLayout } from "@/components/layout";
// providers
import {
  ApolloProvider,
  HeroUIProviderWrapper,
  QueryProviderWrapper,
} from "@/components/providers";

// styles
import "@/styles/globals.css";

// metadata
export const metadata: Metadata = {
  title: "Rendevu",
  description: "Pull up on chain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={classnames(
          "antialiased",
          inter.variable,
          bricolageGrotesque.variable,
        )}
      >
        <ThirdwebProvider>
          <QueryProviderWrapper>
            <ApolloProvider>
              <HeroUIProviderWrapper>
                <AppRootLayout>{children}</AppRootLayout>
              </HeroUIProviderWrapper>
            </ApolloProvider>
          </QueryProviderWrapper>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
