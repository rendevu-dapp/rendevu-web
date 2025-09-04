// imports
import { z } from "zod";

// schemas
export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
  username: z.string().trim().min(1, "Username is required"),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
