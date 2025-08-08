import { z } from "zod";

export const schema = z.object({
  city: z.string().min(1, { message: "City is required" }),
  zip: z
    .string()
    .min(4, { message: "ZIP must be at least 4 characters" })
    .max(10, { message: "ZIP must be at most 10 characters" }),
});
