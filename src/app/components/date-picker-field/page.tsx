import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DatePickerFieldBasicExample } from "./examples/date-picker-field-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const props = [
  { name: "name", type: "string", required: true, description: "Form field name." },
  { name: "label", type: "string", required: true, description: "Label displayed above the input." },
  { name: "placeholder", type: "string", description: "Placeholder text." },
  { name: "className", type: "string", description: "Additional CSS classes." },
];

export default async function DatePickerFieldPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "date-picker-field", "examples", "date-picker-field-basic.tsx");
  const exampleSchemaPath = path.join(process.cwd(), "src", "app", "components", "date-picker-field", "examples", "date-picker-field-schema.ts");

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">DatePickerField</h1>
          <p className="text-lg text-muted-foreground">A date input field integrated with React Hook Form.</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            <code>DatePickerField</code> uses the native date input for simplicity and accessibility, matching the design system.
          </p>
        </div>

        <CodePreview component={<DatePickerFieldBasicExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={props} />
      </div>
    </DocsLayout>
  );
}
