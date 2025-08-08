"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import RichTextEditorField from "@/components/ui/RichTextEditorField";

export const schema = z.object({
  content: z.string().min(1, { message: "Content required." }),
});

export function RichTextEditorFieldBasicExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { content: "" },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form data:", data);
    alert("Check the console for the form data!");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-[28rem]">
        <RichTextEditorField name="content" label="Content" />
        <button type="submit" className="form-button form-button-primary w-full">Submit</button>
      </form>
    </FormProvider>
  );
}
