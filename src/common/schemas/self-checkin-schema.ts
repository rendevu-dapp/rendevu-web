// imports
import { z } from "zod";

export const selfCheckInSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Code is required")
    .refine((val) => {
      const parts = val.split(":");
      return parts.length === 3;
    }, "Code must be in format: eventId:expiry:signature")
    .refine((val) => {
      const parts = val.split(":");
      return parts[2].startsWith("0x");
    }, "Signature must start with 0x"),
});

export type SelfCheckInValues = z.infer<typeof selfCheckInSchema>;
