"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { schema } from "./textarea-field-schema";

export function TextareaFieldBasicExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      bio: "",
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
        <label className="block text-sm font-medium">Bio</label>
        <textarea
          className="w-full rounded-md border px-3 py-2"
          rows={4}
          placeholder="Tell us about yourself..."
          {...methods.register("bio")}
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
