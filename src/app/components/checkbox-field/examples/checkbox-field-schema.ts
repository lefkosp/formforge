import { z } from "zod";

export const schema = z.object({
  accept: z.literal(true, { message: "You must accept the terms." }),
});
