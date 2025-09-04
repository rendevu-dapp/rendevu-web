// imports

import { NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

// data
export const fallbackIcons = {
  eth: "/icons/fallback/ethereum-eth-logo.png",
  dai: "/icons/fallback/multi-collateral-dai-dai-logo.png",
  usdc: "/icons/fallback/usdc-logo.svg",
  eurc: "/icons/fallback/eurc-logo.svg",
  weth: "/icons/fallback/ethereum-eth-logo.png",
};

// helpers
import { normalizeAddress } from "@/common/helpers";

// tokens
export const supportedTokens = {
  [baseSepolia.id]: [
    {
      address: normalizeAddress("0x036CbD53842c5426634e7929541eC2318f3dCF7e"),
      name: "USD Coin",
      symbol: "USDC",
      icon: fallbackIcons.usdc,
      decimals: 6,
    },
    {
      address: normalizeAddress("0x808456652fdb597867f38412077A9182bf77359F"),
      name: "EURO Coin",
      symbol: "EURC",
      icon: fallbackIcons.eurc,
      decimals: 18,
    },
  ],
};

export const defaultNativeToken = {
  name: "Ethereum",
  symbol: "ETH",
  decimals: 18,
  address: normalizeAddress(NATIVE_TOKEN_ADDRESS),
  icon: fallbackIcons.eth,
};
