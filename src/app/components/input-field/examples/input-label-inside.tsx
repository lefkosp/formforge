"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/ui/InputField";

const schema = z.object({
  city: z.string().min(1, { message: "City is required" }),
});

export default function InputLabelInsideExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { city: "" },
  });

  return (
    <FormProvider {...methods}>
      <form className="space-y-4 w-80">
        <InputField
          name="city"
          label="City"
          type="text"
          placeholder=""
          labelPosition="inside"
        />
      </form>
    </FormProvider>
  );
}