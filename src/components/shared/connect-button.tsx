// imports
import { base } from "thirdweb/chains";
import {
  ConnectButtonProps,
  defaultTokens,
  SupportedTokens,
  ConnectButton as ThirdWebConnectButton,
} from "thirdweb/react";

// configs
import { thirdwebClient, wallets } from "@/common/configs";
// data
import { supportedTokens } from "@/common/data";
// hooks
import { useTheme } from "@/common/hooks/useTheme";

// types
type CustomConnectButtonProps = Omit<
  ConnectButtonProps,
  "theme" | "client" | "wallets" | "chain" | "chains" | "supportedTokens"
>;

export const ConnectButton = (props: CustomConnectButtonProps) => {
  // hooks
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ThirdWebConnectButton
      theme={isDark ? "dark" : "light"}
      client={thirdwebClient}
      wallets={wallets}
      chain={base}
      chains={[base]}
      supportedTokens={{
        ...defaultTokens,
        ...Object.entries(supportedTokens).reduce((accum, current) => {
          const [chainId, supportedTokensForChain] = current;

          accum[Number(chainId)] = [
            ...supportedTokensForChain.map((token) => ({
              address: token.address,
              name: token.name,
              symbol: token.symbol,
              icon: token.icon,
            })),
            ...defaultTokens[Number(chainId)],
          ];

          return accum;
        }, {} as SupportedTokens),
      }}
      connectModal={{ size: "compact" }}
      detailsButton={{ className: "!max-w-full !w-full" }}
      {...props}
    />
  );
};
