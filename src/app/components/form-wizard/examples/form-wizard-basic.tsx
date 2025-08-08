"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import FormWizard from "@/components/ui/FormWizard";
import InputField from "@/components/ui/InputField";

export const schema = z.object({
  firstName: z.string().min(1, { message: "Required" }),
  lastName: z.string().min(1, { message: "Required" }),
  email: z.string().email({ message: "Invalid email" }),
});

export function FormWizardBasicExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", lastName: "", email: "" },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form data:", data);
    alert("Check the console for the form data!");
  };

  const steps = [
    { id: "s1", title: "Name", fields: ["firstName", "lastName"] },
    { id: "s2", title: "Contact", fields: ["email"] },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-96">
        <FormWizard steps={steps}>
          {(current) => (
            <div className="space-y-3">
              {current.id === "s1" && (
                <>
                  <InputField name="firstName" label="First name" />
                  <InputField name="lastName" label="Last name" />
                </>
              )}
              {current.id === "s2" && <InputField name="email" label="Email" type="email" />}
            </div>
          )}
        </FormWizard>
      </form>
    </FormProvider>
  );
}
