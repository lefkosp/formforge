import { z } from "zod";

export const schema = z.object({
  plan: z.string().min(1, { message: "Please select a plan." }),
});
