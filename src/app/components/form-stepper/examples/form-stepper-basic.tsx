"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import InputField from "@/components/ui/InputField";
import { schema } from "./form-stepper-schema";

export function FormStepperBasicExample() {
  const [step, setStep] = useState(0);
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      bio: "",
    },
    mode: "onSubmit",
  });

  const next = async () => {
    const valid = await methods.trigger(
      step === 0 ? ["email", "password"] : ["bio"]
    );
    if (valid) setStep((s) => s + 1);
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form data:", data);
    alert("Submitted! Check the console for the form data.");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-4 w-[28rem]"
      >
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Step {step + 1} of 2</span>
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <InputField name="email" label="Email" type="email" />
            <InputField name="password" label="Password" type="password" />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-sm font-medium">Bio</label>
            <textarea
              className="w-full rounded-md border px-3 py-2"
              rows={4}
              {...methods.register("bio")}
            />
          </div>
        )}

        <div className="flex gap-2">
          {step > 0 && (
            <button type="button" onClick={prev} className="form-button">
              Back
            </button>
          )}
          {step < 1 && (
            <button
              type="button"
              onClick={next}
              className="form-button form-button-primary ml-auto"
            >
              Next
            </button>
          )}
          {step === 1 && (
            <button
              type="submit"
              className="form-button form-button-primary ml-auto"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
