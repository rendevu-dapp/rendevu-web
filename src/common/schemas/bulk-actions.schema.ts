// imports
import { z } from "zod";

// Validates Ethereum-like smart contract address (0x followed by 40 hex characters)
const addressRegex = /^0x[a-fA-F0-9]{40}$/;

export const bulkActionSchema = z.object({
  actionType: z.enum(["approve", "decline", "check-in"], {
    message: "Invalid action type",
  }),
  selectedGuestAddresses: z
    .array(
      z.string().regex(addressRegex, {
        message: "Invalid Ethereum address",
      }),
    )
    .min(1, {
      message: "At least one guest must be selected",
    }),
});

export type BulkActionValues = z.infer<typeof bulkActionSchema>;
