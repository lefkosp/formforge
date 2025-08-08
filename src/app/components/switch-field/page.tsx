import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { SwitchFieldBasicExample } from "./examples/switch-field-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const props = [
  { name: "name", type: "string", required: true, description: "Form field name." },
  { name: "label", type: "string", required: true, description: "Label displayed next to the switch." },
  { name: "className", type: "string", description: "Additional CSS classes." },
];

export default async function SwitchFieldPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "switch-field", "examples", "switch-field-basic.tsx");
  const exampleSchemaPath = path.join(process.cwd(), "src", "app", "components", "switch-field", "examples", "switch-field-schema.ts");

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">SwitchField</h1>
          <p className="text-lg text-muted-foreground">A toggle switch integrated with React Hook Form.</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            <code>SwitchField</code> wraps a Radix switch and handles value binding and error display.
          </p>
        </div>

        <CodePreview component={<SwitchFieldBasicExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={props} />
      </div>
    </DocsLayout>
  );
}
