import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { CheckboxFieldBasicExample } from "./examples/checkbox-field-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const checkboxFieldProps = [
  {
    name: "name",
    type: "string",
    description: "The name attribute used for form registration.",
    required: true,
  },
  {
    name: "label",
    type: "string",
    description: "Label displayed next to the checkbox.",
  },
];

export default async function CheckboxFieldPage() {
  const exampleTsxPath = path.join(
    process.cwd(),
    "src",
    "app",
    "components",
    "checkbox-field",
    "examples",
    "checkbox-field-basic.tsx"
  );
  const exampleSchemaPath = path.join(
    process.cwd(),
    "src",
    "app",
    "components",
    "checkbox-field",
    "examples",
    "checkbox-field-schema.ts"
  );

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">CheckboxField</h1>
          <p className="text-lg text-muted-foreground">
            A checkbox input with validation.
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            The <code>CheckboxField</code> is useful for boolean inputs such as
            agreeing to terms.
          </p>
        </div>

        <CodePreview
          component={<CheckboxFieldBasicExample />}
          tsxCode={tsxCode}
          zodSchema={zodSchema}
        />

        <PropsTable props={checkboxFieldProps} />
      </div>
    </DocsLayout>
  );
}
