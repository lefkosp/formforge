"use client";

import * as React from "react";
import { z } from "zod";
import { ExampleWrapper } from "@/components/docs/ExampleWrapper";
import InputField from "@/components/ui/InputField";
import { FormProvider, useForm } from "react-hook-form";
import { PlaygroundControls, ControlSpec } from "@/components/docs/playground-controls";

const inputControls: ControlSpec[] = [
  { type: "text", name: "label", label: "Label", placeholder: "Label" },
  { type: "text", name: "placeholder", label: "Placeholder", placeholder: "you@example.com" },
  { type: "select", name: "type", label: "Type", options: [
    { label: "text", value: "text" },
    { label: "email", value: "email" },
    { label: "password", value: "password" },
  ] },
];

export interface InputExampleProps {
  label: string;
  placeholder?: string;
  type: string;
}

export function generateInputExampleCode(props: InputExampleProps): string {
  return `import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@/components/ui/InputField";

const schema = z.object({
  value: z.string().min(1, { message: "Required" }),
});

export default function Example() {
  const methods = useForm({ defaultValues: { value: "" } });
  return (
    <FormProvider {...methods}>
      <form className="space-y-4 w-80">
        <InputField name="value" label="${props.label}" type="${props.type}" placeholder="${props.placeholder ?? ""}" />
      </form>
    </FormProvider>
  );
}`;
}

export default function InputFieldLive() {
  const [props, setProps] = React.useState<InputExampleProps>({ label: "Email", type: "email", placeholder: "you@example.com" });
  const methods = useForm({ defaultValues: { value: "" } });

  return (
    <ExampleWrapper
      component={(
        <FormProvider {...methods}>
          <div className="w-80">
            <InputField name="value" label={props.label} type={props.type} placeholder={props.placeholder} />
          </div>
        </FormProvider>
      )}
      code={generateInputExampleCode(props)}
      controls={(
        <PlaygroundControls
          title="Input Props"
          controls={inputControls}
          values={props}
          onChange={(v) => setProps(v)}
        />
      )}
    />
  );
}
