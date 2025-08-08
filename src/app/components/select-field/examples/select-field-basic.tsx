"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

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
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-4 w-80"
      >
        <label className="block text-sm font-medium">Country</label>
        <select
          className="w-full rounded-md border px-3 py-2"
          {...methods.register("country")}
        >
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="mx">Mexico</option>
        </select>
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
