"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { schema } from "./checkbox-field-schema";

export function CheckboxFieldBasicExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      accept: false,
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
        <label className="flex items-center space-x-2 text-sm">
          <input type="checkbox" {...methods.register("accept")} />
          <span>I agree to the terms and conditions</span>
        </label>
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
