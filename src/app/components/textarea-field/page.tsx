import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { TextareaFieldBasicExample } from "./examples/textarea-field-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const textareaFieldProps = [
  {
    name: "name",
    type: "string",
    description: "The name attribute used for form registration.",
    required: true,
  },
  {
    name: "label",
    type: "string",
    description: "Label displayed above the textarea.",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text for the textarea.",
  },
];

export default async function TextareaFieldPage() {
  const exampleTsxPath = path.join(
    process.cwd(),
    "src",
    "app",
    "components",
    "textarea-field",
    "examples",
    "textarea-field-basic.tsx"
  );
  const exampleSchemaPath = path.join(
    process.cwd(),
    "src",
    "app",
    "components",
    "textarea-field",
    "examples",
    "textarea-field-schema.ts"
  );

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">TextareaField</h1>
          <p className="text-lg text-muted-foreground">
            A multi-line text input with validation.
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            The <code>TextareaField</code> is ideal for longer text input like
            bios or descriptions.
          </p>
        </div>

        <CodePreview
          component={<TextareaFieldBasicExample />}
          tsxCode={tsxCode}
          zodSchema={zodSchema}
        />

        <PropsTable props={textareaFieldProps} />
      </div>
    </DocsLayout>
  );
}
