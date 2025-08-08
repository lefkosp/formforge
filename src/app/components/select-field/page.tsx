import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { SelectFieldBasicExample } from "./examples/select-field-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const selectFieldProps = [
  {
    name: "name",
    type: "string",
    description: "The name attribute used for form registration.",
    required: true,
  },
  {
    name: "label",
    type: "string",
    description: "Label displayed above the select input.",
  },
  {
    name: "options",
    type: "Array<{ label: string; value: string }>",
    description: "Options to render inside the select element.",
  },
];

export default async function SelectFieldPage() {
  const exampleTsxPath = path.join(
    process.cwd(),
    "src",
    "app",
    "components",
    "select-field",
    "examples",
    "select-field-basic.tsx"
  );
  const exampleSchemaPath = path.join(
    process.cwd(),
    "src",
    "app",
    "components",
    "select-field",
    "examples",
    "select-field-schema.ts"
  );

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">SelectField</h1>
          <p className="text-lg text-muted-foreground">
            A select dropdown component with basic validation.
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            The <code>SelectField</code> provides a styled, theme-aware select with a custom arrow, focus ring, and seamless integration with React Hook Form and Zod.
          </p>
        </div>

        <CodePreview
          component={<SelectFieldBasicExample />}
          tsxCode={tsxCode}
          zodSchema={zodSchema}
          playground={{
            controls: [
              { type: "text", name: "label", label: "Label" },
              { type: "text", name: "placeholder", label: "Placeholder" },
            ],
            initialValues: { label: "Country", placeholder: "Select a country" },
            renderId: "select-field",
          }}
        />

        <PropsTable props={selectFieldProps} />
      </div>
    </DocsLayout>
  );
}
