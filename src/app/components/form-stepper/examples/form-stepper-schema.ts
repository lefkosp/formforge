import { z } from "zod";

export const schema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  bio: z.string().min(10, { message: "Bio must be at least 10 characters." }),
});
