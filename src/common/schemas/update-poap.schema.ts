// imports

import { CalendarDate } from "@internationalized/date";
import { z } from "zod";

export const updatePoapSchema = z.object({
  eventId: z.string().uuid(),
  name: z.string().trim().min(1, { message: "Name is required" }),
  description: z.string().trim().min(1, { message: "Description is required" }),
  start_date: z.instanceof(CalendarDate, {
    message: "Start date must be a valid date",
  }),
  end_date: z.instanceof(CalendarDate, {
    message: "End date must be a valid date",
  }),
  expiry_date: z.instanceof(CalendarDate, {
    message: "Expiry date must be a valid date",
  }),
  secret_code: z
    .string()
    .min(6, { message: "Secret code must be at least 6 characters long" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  event_url: z.string().url().optional(),
  event_template_id: z.number().min(0).optional(),
  virtual_event: z.boolean().optional(),
  private_event: z.boolean().optional(),
});

export type UpdatePoapInput = z.infer<typeof updatePoapSchema>;
