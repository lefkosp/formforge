"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import SelectField from "@/components/ui/SelectField";
import { schema } from "./select-field-schema";

export function SelectFieldBasicExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      country: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form data:", data);
    alert("Check the console for the form data!");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-80">
        <SelectField
          name="country"
          label="Country"
          options={[
            { label: "United States", value: "us" },
            { label: "Canada", value: "ca" },
            { label: "Mexico", value: "mx" },
          ]}
          placeholder="Select a country"
        />
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
