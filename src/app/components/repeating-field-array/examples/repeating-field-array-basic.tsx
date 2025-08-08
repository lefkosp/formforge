"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import RepeatingFieldArray from "@/components/ui/RepeatingFieldArray";

export const schema = z.object({
  contacts: z.array(
    z.object({
      name: z.string().min(1, { message: "Name is required." }),
      email: z.string().email({ message: "Invalid email." }),
    })
  ).min(1, { message: "Add at least one contact." }),
});

export function RepeatingFieldArrayBasicExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { contacts: [{ name: "", email: "" }] },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form data:", data);
    alert("Check the console for the form data!");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-96">
        <RepeatingFieldArray
          name="contacts"
          label="Contacts"
          fieldsConfig={[
            { name: "name", label: "Name" },
            { name: "email", label: "Email", type: "email" },
          ]}
        />
        <button type="submit" className="form-button form-button-primary w-full">Submit</button>
      </form>
    </FormProvider>
  );
}
