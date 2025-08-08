"use client";

import * as React from "react";
import { z } from "zod";
import { ExampleWrapper } from "@/components/docs/ExampleWrapper";
import SelectField from "@/components/ui/SelectField";
import { FormProvider, useForm } from "react-hook-form";
import { PlaygroundControls, ControlSpec } from "@/components/docs/playground-controls";

const selectControls: ControlSpec[] = [
  { type: "text", name: "label", label: "Label", placeholder: "Country" },
  { type: "text", name: "placeholder", label: "Placeholder", placeholder: "Select a country" },
];

export interface SelectExampleProps {
  label: string;
  placeholder?: string;
}

export function generateSelectExampleCode(props: SelectExampleProps): string {
  return `import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import SelectField from "@/components/ui/SelectField";

const schema = z.object({
  country: z.string().min(1, { message: "Please select a country." }),
});

export default function Example() {
  const methods = useForm({ defaultValues: { country: "" } });
  return (
    <FormProvider {...methods}>
      <form className=\"space-y-4 w-80\">
        <SelectField
          name=\"country\"
          label=\"${props.label}\"
          placeholder=\"${props.placeholder ?? ""}\"
          options={[{ label: "United States", value: "us" }, { label: "Canada", value: "ca" }, { label: "Mexico", value: "mx" }]}
        />
      </form>
    </FormProvider>
  );
}`;
}

export default function SelectFieldLive() {
  const [props, setProps] = React.useState<SelectExampleProps>({ label: "Country", placeholder: "Select a country" });
  const methods = useForm({ defaultValues: { country: "" } });

  return (
    <ExampleWrapper
      component={(
        <FormProvider {...methods}>
          <div className="w-80">
            <SelectField
              name="country"
              label={props.label}
              placeholder={props.placeholder}
              options={[{ label: "United States", value: "us" }, { label: "Canada", value: "ca" }, { label: "Mexico", value: "mx" }]}
            />
          </div>
        </FormProvider>
      )}
      code={generateSelectExampleCode(props)}
      controls={(
        <PlaygroundControls
          title="Select Props"
          controls={selectControls}
          values={props}
          onChange={(v) => setProps(v)}
        />
      )}
    />
  );
}
