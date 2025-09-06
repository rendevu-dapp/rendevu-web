// imports

import { CalendarDate } from "@internationalized/date";
import { z } from "zod";

// helpers
import { getImageDimensions } from "@/common/helpers";

export const imageSchema = z
  .instanceof(File)
  .refine((file) => {
    if (!file) return true; // allow null
    return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
  }, "Image must be JPEG, PNG, or GIF")
  .refine(
    (file) => {
      if (!file) return true; // allow
      const mb = 1024 * 1024;
      // Check if file size is less than or equal to 4MB
      return file.size <= 4 * mb;
    },
    {
      message: "Image size must be 4MB or less",
    },
  )
  .refine(
    async (file) => {
      if (!file) return true; // Allow null/undefined
      try {
        const { width, height } = await getImageDimensions(file);
        return width === 500 && height === 500;
      } catch {
        return false;
      }
    },
    {
      message: "Image dimensions must be exactly 500x500 pixels",
    },
  );

export const createPoapSchema = z.object({
  city: z.string().optional(),
  country: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  email: z.string().email("Invalid email address"),
  end_date: z.instanceof(CalendarDate, {
    message: "End date must be a valid date",
  }),
  event_url: z.string().url("Invalid URL").optional(),
  expiry_date: z.instanceof(CalendarDate, {
    message: "Expiry date must be a valid date",
  }),
  image: imageSchema.nullable().optional(),
  name: z.string().min(1, "Name is required"),
  notify_issuer: z.boolean().transform((val) => val ?? false),
  private_event: z.boolean().transform((val) => val ?? false),
  secret_code: z.string().min(1, "Secret code is required"),
  start_date: z.instanceof(CalendarDate, {
    message: "Start date must be a valid date",
  }),
  virtual_event: z.boolean().transform((val) => val ?? false),
});

export type CreatePoapInput = z.infer<typeof createPoapSchema>;
