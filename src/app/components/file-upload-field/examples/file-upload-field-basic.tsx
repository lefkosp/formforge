"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import FileUploadField from "@/components/ui/FileUploadField";

const fileSchema = z
  .any()
  .refine((file) => {
    if (!file) return false;
    if (typeof FileList !== "undefined" && file instanceof FileList) return file.length > 0;
    if (typeof File !== "undefined" && file instanceof File) return true;
    if (Array.isArray(file)) return file.length > 0;
    return false;
  }, {
    message: "Please upload a file.",
  });

export const schema = z.object({
  resume: fileSchema,
});

export function FileUploadFieldBasicExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { resume: undefined as unknown as File | FileList | null },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form data:", data);
    alert("Check the console for the form data! (File objects are logged)");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-80">
        <FileUploadField name="resume" label="Upload resume" />
        <button type="submit" className="form-button form-button-primary w-full">Submit</button>
      </form>
    </FormProvider>
  );
}
