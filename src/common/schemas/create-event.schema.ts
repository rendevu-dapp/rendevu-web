// imports

import { CalendarDate, getLocalTimeZone, Time } from "@internationalized/date";
import { Chain } from "thirdweb/chains";
import { z } from "zod";

// Validates Ethereum-like smart contract address (0x followed by 40 hex characters)
const addressRegex = /^0x[a-fA-F0-9]{40}$/;

export const supportedChains = z.object({
  icon: z.string(),
  chainId: z.number(),
});

export const imageSchema = z
  .instanceof(File)
  .refine((file) => {
    if (!file) return true; // allow null
    return ["image/jpeg", "image/png", "image/gif"].includes(file.type);
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
  );

export const locationSchema = z.object({
  placeId: z.string().optional(),
  name: z.string().min(1, "Location name is required"),
  address: z.string().optional(),
  latitude: z.number().min(-90, "Latitude must be between -90 and 90").max(90),
  longitude: z
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180),
});

export const eventDetailsSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    startDate: z.instanceof(CalendarDate, {
      message: "Start date must be a valid date",
    }),
    endDate: z.instanceof(CalendarDate, {
      message: "End date must be a valid date",
    }),
    startTime: z.instanceof(Time, {
      message: "Start time must be a valid time",
    }),
    endTime: z.instanceof(Time, {
      message: "End time must be a valid time",
    }),
    location: locationSchema.optional(),
    virtualLink: z.string().url({ message: "Invalid URL" }).optional(),
    requiresApproval: z.boolean().transform((val) => val ?? false),
    guestLimit: z
      .number()
      .int()
      .min(0, "Guest limit must be a non-negative integer")
      .optional(),
    image: imageSchema.nullable().optional(),
  })
  .refine((data) => data.location || data.virtualLink, {
    message: "At least one of location or virtual link must be provided",
    path: ["location"], // Attach error to location for clarity
  })
  .refine(
    (data) => {
      const startDateTime = new Date(data.startDate.toDate(getLocalTimeZone()));
      startDateTime.setHours(data.startTime.hour, data.startTime.minute);
      return startDateTime >= new Date();
    },
    {
      message: "Start date and time must be in the future",
      path: ["startDate"],
    },
  )
  .refine(
    (data) => {
      const startDateTime = data.startDate.toDate(getLocalTimeZone());
      startDateTime.setHours(data.startTime.hour, data.startTime.minute);

      const endDateTime = data.endDate.toDate(getLocalTimeZone());
      endDateTime.setHours(data.endTime.hour, data.endTime.minute);

      return endDateTime >= startDateTime;
    },
    {
      message: "End date and time must be on or after start date and time",
      path: ["endDate"],
    },
  );

export const ticketingDetailsSchema = z.object({
  price: z.number().min(0, "Ticket price must be a non-negative number"),
  token: z
    .string()
    .regex(addressRegex, "Token must be a valid smart contract address"),
  decimals: z.number().int().min(0, "Decimals must be a non-negative integer"),
});

export const createEventSchema = z.object({
  chain: z
    .custom<
      Chain & {
        rpc: string;
      }
    >((val) => val instanceof Object && "id" in val, {
      message: "Invalid blockchain network; must be a valid Chain object",
    })
    .refine(
      (chain) => {
        // Validate required Chain properties
        return typeof chain.id === "number" && chain.id > 0;
      },
      {
        message: "Chain must have a valid id (positive number)",
        path: ["chain"],
      },
    ),
  details: eventDetailsSchema,
  ticketing: z.array(ticketingDetailsSchema).optional(),
});

export type LocationValues = z.infer<typeof locationSchema>;
export type CreateEventValues = z.infer<typeof createEventSchema>;
