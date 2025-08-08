import { z } from "zod";

export const schema = z.object({
  agree: z.boolean().refine((v) => v === true, { message: "You must agree." }),
});
