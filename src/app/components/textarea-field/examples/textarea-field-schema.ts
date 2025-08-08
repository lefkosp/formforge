import { z } from "zod";

export const schema = z.object({
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
});
