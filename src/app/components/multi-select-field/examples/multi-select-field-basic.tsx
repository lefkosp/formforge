"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import MultiSelectField from "@/components/ui/MultiSelectField";

export const schema = z.object({
  tags: z.array(z.string()).min(1, { message: "Select at least one tag." }),
});

export function MultiSelectFieldBasicExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { tags: [] },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form data:", data);
    alert("Check the console for the form data!");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-80">
        <MultiSelectField
          name="tags"
          label="Tags"
          options={[
            { label: "React", value: "react" },
            { label: "TypeScript", value: "ts" },
            { label: "Zod", value: "zod" },
            { label: "Next.js", value: "next" },
          ]}
        />
        <button type="submit" className="form-button form-button-primary w-full">Submit</button>
      </form>
    </FormProvider>
  );
}
