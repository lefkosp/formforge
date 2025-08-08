import { z } from "zod";

const fileRefinement = (value: unknown) => {
  if (!value) return false;
  if (typeof FileList !== "undefined" && value instanceof FileList) {
    return value.length > 0;
  }
  if (typeof File !== "undefined" && value instanceof File) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return false;
};

export const schema = z.object({
  resume: z.any().refine(fileRefinement, { message: "Please upload a file." }),
});
