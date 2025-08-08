import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { InputFieldBasicExample } from "./examples/input-field-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const inputFieldProps = [
  {
    name: "name",
    type: "string",
    description:
      "The name attribute for the input field and form registration.",
    required: true,
  },
  {
    name: "label",
    type: "string",
    description: "The label text displayed above the input field.",
    required: true,
  },
  {
    name: "type",
    type: "string",
    default: '"text"',
    description: "The HTML input type (text, email, password, etc.).",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text shown when the input is empty.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Whether the input field is disabled.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply to the input field.",
  },
];

export default async function InputFieldPage() {
  const exampleTsxPath = path.join(
    process.cwd(),
    "src",
    "app",
    "components",
    "input-field",
    "examples",
    "input-field-basic.tsx"
  );
  const exampleSchemaPath = path.join(
    process.cwd(),
    "src",
    "app",
    "components",
    "input-field",
    "examples",
    "input-field-schema.ts"
  );

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">InputField</h1>
          <p className="text-lg text-muted-foreground">
            A form input field component with built-in validation, error
            handling, and accessibility features.
          </p>
        </div>

        {/* Description */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            The <code>InputField</code> component provides a complete input
            field solution with label, validation, error display, and proper
            accessibility attributes. It integrates seamlessly with React Hook
            Form and Zod for type-safe form validation.
          </p>
        </div>

        {/* Code Preview */}
        <CodePreview
          component={<InputFieldBasicExample />}
          tsxCode={tsxCode}
          zodSchema={zodSchema}
          playground={{
            controls: [
              { type: "text", name: "label", label: "Label" },
              { type: "text", name: "placeholder", label: "Placeholder" },
              { type: "select", name: "type", label: "Type", options: [
                { label: "Text", value: "text" },
                { label: "Email", value: "email" },
                { label: "Password", value: "password" },
              ] },
            ],
            initialValues: { label: "Email", placeholder: "you@example.com", type: "email" },
            renderId: "input-field",
          }}
        />

        {/* Props Table */}
        <PropsTable props={inputFieldProps} />
      </div>
    </DocsLayout>
  );
}
