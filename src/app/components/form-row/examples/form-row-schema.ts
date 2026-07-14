import { z } from "zod";

export const formRowSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  role: z.string().optional(),
});