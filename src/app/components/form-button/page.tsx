import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { FormButtonBasicExample } from "./examples/form-button-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const props = [
  { name: "variant", type: '"primary" | "secondary"', default: '"primary"', description: "Visual style of the button." },
  { name: "className", type: "string", description: "Additional CSS classes." },
  { name: "disabled", type: "boolean", default: "false", description: "Disable the button." },
];

export default async function FormButtonPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "form-button", "examples", "form-button-basic.tsx");
  const exampleSchemaPath = path.join(process.cwd(), "src", "app", "components", "form-button", "examples", "form-button-schema.ts");

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">FormButton</h1>
          <p className="text-lg text-muted-foreground">Buttons styled consistently for forms.</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            <code>FormButton</code> provides primary and secondary variants matching the docs design system.
          </p>
        </div>

        <CodePreview component={<FormButtonBasicExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={props} />
      </div>
    </DocsLayout>
  );
}
