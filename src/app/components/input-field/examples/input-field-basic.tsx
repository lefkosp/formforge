"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/ui/InputField";

export const schema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export function InputFieldBasicExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
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
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
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
