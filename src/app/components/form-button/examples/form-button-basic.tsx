"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import FormButton from "@/components/ui/FormButton";

export const schema = z.object({
  agree: z.boolean().refine((v) => v === true, { message: "You must agree." }),
});

export function FormButtonBasicExample() {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { agree: false },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Form data:", data);
    alert("Check the console for the form data!");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-80">
        <label className="flex items-center space-x-2 text-sm">
          <input type="checkbox" {...methods.register("agree")} />
          <span>I agree to proceed</span>
        </label>
        <div className="flex gap-2">
          <FormButton type="submit" variant="primary" className="w-full">Submit</FormButton>
          <FormButton type="button" variant="secondary" className="w-full" onClick={() => methods.reset()}>Reset</FormButton>
        </div>
      </form>
    </FormProvider>
  );
}
