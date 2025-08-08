"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/ui/InputField";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export default function InputLabelOutsideExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  return (
    <FormProvider {...methods}>
      <form className="space-y-4 w-80">
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          labelPosition="outside"
        />
      </form>
    </FormProvider>
  );
}