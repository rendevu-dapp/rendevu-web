// imports
import { z } from "zod";

export const requestMintCodesSchema = z
  .object({
    codeType: z.enum(["qr_code", "secret_word", "secret_website"], {
      message: "Select a code type",
    }),
    secretCode: z
      .string()
      .max(6)
      .refine((val) => /^\d{6}$/.test(val), {
        message: "Secret code must be a 6-digit number",
      }),
    claimName: z.string().optional(),
    requestedCodes: z.number().min(1, {
      message: "Requested codes must be at least 1",
    }),
  })
  .refine(
    (data) => {
      // If code type is secret_word or secret_website, claimName must be provided
      if (
        data.codeType === "secret_word" ||
        data.codeType === "secret_website"
      ) {
        return !!data.claimName;
      }
      return true;
    },
    {
      message:
        "Claim name is required for secret word or secret website code types",
      path: ["claimName"],
    },
  );

export type RequestMintCodesSchema = z.infer<typeof requestMintCodesSchema>;
export type CodeType = RequestMintCodesSchema["codeType"];
