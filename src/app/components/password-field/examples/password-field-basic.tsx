"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import PasswordField from "@/components/ui/PasswordField";

export const schema = z.object({
  password: z.string().min(8, { message: "At least 8 characters." }),
});

export function PasswordFieldBasicExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { password: "" },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form data:", data);
    alert("Check the console for the form data!");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-80">
        <PasswordField name="password" label="Password" />
        <button type="submit" className="form-button form-button-primary w-full">Submit</button>
      </form>
    </FormProvider>
  );
}
