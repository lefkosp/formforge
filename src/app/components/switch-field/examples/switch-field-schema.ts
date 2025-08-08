import { z } from "zod";

export const schema = z.object({
  notifications: z.boolean(),
});
