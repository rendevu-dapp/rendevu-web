import { z } from "zod";

export const inviteGuestsSchema = z.object({
  emails: z
    .string()
    .trim()
    .min(1, "At least one email is required")
    .refine(
      (val) => {
        const emails = val.split(",").map((email) => email.trim());
        return emails.every(
          (email) => z.string().email().safeParse(email).success,
        );
      },
      { message: "All entries must be valid email addresses" },
    ),
});
