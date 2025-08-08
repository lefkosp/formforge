"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormRow from "@/components/ui/FormRow";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";

export function FormRowInlineExample() {
  const methods = useForm({ defaultValues: { firstName: "", lastName: "", role: "" } });

  return (
    <FormProvider {...methods}>
      <form className="space-y-4">
        <FormRow label="First name" htmlFor="firstName" required layout="inline">
          <InputField name="firstName" label="First name" placeholder="Jane" />
        </FormRow>

        <FormRow label="Last name" htmlFor="lastName" layout="inline" align="center">
          <InputField name="lastName" label="Last name" placeholder="Doe" />
        </FormRow>

        <FormRow label="Role" htmlFor="role" description="Choose your role" layout="stack">
          <SelectField
            name="role"
            label="Role"
            options={[
              { label: "Designer", value: "designer" },
              { label: "Developer", value: "developer" },
              { label: "Manager", value: "manager" },
            ]}
            placeholder="Select a role"
          />
        </FormRow>
      </form>
    </FormProvider>
  );
}