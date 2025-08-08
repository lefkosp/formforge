"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/ui/InputField";
import { schema } from "./form-section-schema";

export function FormSectionBasicExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form data:", data);
    alert("Check the console for the form data!");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-4 w-96"
      >
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium">Personal Information</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Provide your basic details.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <InputField name="firstName" label="First name" />
            <InputField name="lastName" label="Last name" />
          </div>
        </div>
        <button
          type="submit"
          className="form-button form-button-primary w-full"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
