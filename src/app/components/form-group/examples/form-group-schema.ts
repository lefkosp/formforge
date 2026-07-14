import { z } from "zod";

export const formGroupSchema = z.object({
  city: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  zip: z.string().min(3, "Invalid"),
  line1: z.string().optional(),
});