// imports
import { Address } from "viem";

if (!process.env.EVENT_PLATFORM_CONTRACT_ADDRESS) {
  throw "Event plaform contract address not set";
}

export const eventPlatformContractAddress = process.env
  .EVENT_PLATFORM_CONTRACT_ADDRESS as Address;
