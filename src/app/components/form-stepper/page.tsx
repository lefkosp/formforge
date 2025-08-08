import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { FormStepperBasicExample } from "./examples/form-stepper-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const formStepperProps = [
  {
    name: "steps",
    type: "Array<string>",
    description: "Labels for each step.",
  },
  {
    name: "onComplete",
    type: "() => void",
    description: "Callback fired when the final step is submitted.",
  },
];

export default async function FormStepperPage() {
  const exampleTsxPath = path.join(
    process.cwd(),
    "src",
    "app",
    "components",
    "form-stepper",
    "examples",
    "form-stepper-basic.tsx"
  );
  const exampleSchemaPath = path.join(
    process.cwd(),
    "src",
    "app",
    "components",
    "form-stepper",
    "examples",
    "form-stepper-schema.ts"
  );

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">FormStepper</h1>
          <p className="text-lg text-muted-foreground">
            A simple multi-step form pattern using React Hook Form and Zod.
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            Break long forms into multiple steps to improve completion rates.
          </p>
        </div>

        <CodePreview
          component={<FormStepperBasicExample />}
          tsxCode={tsxCode}
          zodSchema={zodSchema}
        />

        <PropsTable props={formStepperProps} />
      </div>
    </DocsLayout>
  );
}
