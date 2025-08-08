"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import NestedFormSection from "@/components/ui/NestedFormSection";
import InputField from "@/components/ui/InputField";

export const schema = z.object({
  profile: z.object({
    firstName: z.string().min(1, { message: "Required" }),
    lastName: z.string().min(1, { message: "Required" }),
    address: z.object({
      city: z.string().min(1, { message: "Required" }),
      country: z.string().min(1, { message: "Required" }),
    }),
  }),
});

export function NestedFormSectionBasicExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { profile: { firstName: "", lastName: "", address: { city: "", country: "" } } },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form data:", data);
    alert("Check the console for the form data!");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-96">
        <NestedFormSection title="Profile" defaultOpen>
          <InputField name="profile.firstName" label="First name" />
          <InputField name="profile.lastName" label="Last name" />
          <NestedFormSection title="Address" nested>
            <InputField name="profile.address.city" label="City" />
            <InputField name="profile.address.country" label="Country" />
          </NestedFormSection>
        </NestedFormSection>
        <button type="submit" className="form-button form-button-primary w-full">Submit</button>
      </form>
    </FormProvider>
  );
}
