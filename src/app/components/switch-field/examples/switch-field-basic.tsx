"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import SwitchField from "@/components/ui/SwitchField";

export const schema = z.object({
  notifications: z.boolean(),
});

export function SwitchFieldBasicExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { notifications: false },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form data:", data);
    alert("Check the console for the form data!");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-80">
        <SwitchField name="notifications" label="Enable notifications" />
        <button type="submit" className="form-button form-button-primary w-full">Save</button>
      </form>
    </FormProvider>
  );
}
