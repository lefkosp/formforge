"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import AutocompleteField from "@/components/ui/AutocompleteField";

export const schema = z.object({
  city: z.string().min(1, { message: "Please choose a city." }),
});

function simulateFetch() {
  return new Promise<{ label: string; value: string }[]>((resolve) => {
    setTimeout(() => resolve([
      { label: "New York", value: "new-york" },
      { label: "Los Angeles", value: "los-angeles" },
      { label: "Chicago", value: "chicago" },
      { label: "Houston", value: "houston" },
      { label: "Phoenix", value: "phoenix" },
    ]), 400);
  });
}

export function AutocompleteFieldBasicExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { city: "" },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form data:", data);
    alert("Check the console for the form data!");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-80">
        <AutocompleteField
          name="city"
          label="City"
          fetchOptions={simulateFetch}
          placeholder="Start typing to search..."
        />
        <button type="submit" className="form-button form-button-primary w-full">Submit</button>
      </form>
    </FormProvider>
  );
}
