// imports

import { NATIVE_TOKEN_ADDRESS } from "thirdweb";
import { base } from "thirdweb/chains";

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
  [base.id]: [
    {
      address: normalizeAddress("0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"),
      name: "USD Coin",
      symbol: "USDC",
      icon: fallbackIcons.usdc,
      decimals: 6,
    },
    {
      address: normalizeAddress("0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42"),
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
