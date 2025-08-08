"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormGroup from "@/components/ui/FormGroup";
import FormRow from "@/components/ui/FormRow";
import InputField from "@/components/ui/InputField";

export function FormGroupExample() {
  const methods = useForm({ defaultValues: { city: "", state: "", zip: "" } });

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <FormGroup title="Address" description="Your current mailing address" variant="bordered" spacing="md">
          <FormRow label="City" htmlFor="city" layout="inline">
            <InputField name="city" label="City" placeholder="San Francisco" />
          </FormRow>
          <FormRow label="State" htmlFor="state" layout="inline">
            <InputField name="state" label="State" placeholder="CA" />
          </FormRow>
          <FormRow label="ZIP" htmlFor="zip" layout="inline" align="center">
            <InputField name="zip" label="ZIP" placeholder="94107" />
          </FormRow>
        </FormGroup>

        <FormGroup title="Notes" variant="card" spacing="lg">
          <FormRow label="Line 1" htmlFor="line1" layout="stack">
            <InputField name="line1" label="Line 1" placeholder="Additional info" />
          </FormRow>
        </FormGroup>
      </div>
    </FormProvider>
  );
}