import { z } from "zod";

export const schema = z.object({
  country: z.string().min(1, { message: "Please select a country." }),
});
