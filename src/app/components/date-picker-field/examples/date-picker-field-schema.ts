import { z } from "zod";

export const schema = z.object({
  dob: z.string().min(1, { message: "Please select a date." }),
});
