// imports
import { z } from "zod";

const addressRegex = /^0x[a-fA-F0-9]{40}$/;

export const eventRegistrationSchema = z
  .object({
    eventId: z.string().min(1, "Event ID is required"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    isPaid: z.boolean(),
    payment: z
      .object({
        price: z.string().min(0, "Ticket price must be a non-negative number"),
        token: z
          .string()
          .regex(addressRegex, "Token must be a valid smart contract address"),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isPaid && !data.payment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Payment details are required for paid events",
        path: ["payment"],
      });
    }
  });

export type EventRegistrationValues = z.infer<typeof eventRegistrationSchema>;
