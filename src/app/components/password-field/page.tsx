import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { PasswordFieldBasicExample } from "./examples/password-field-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const props = [
  { name: "name", type: "string", required: true, description: "Form field name." },
  { name: "label", type: "string", required: true, description: "Label displayed above the input." },
  { name: "className", type: "string", description: "Additional CSS classes." },
];

export default async function PasswordFieldPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "password-field", "examples", "password-field-basic.tsx");
  const exampleSchemaPath = exampleTsxPath;

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">PasswordField</h1>
          <p className="text-lg text-muted-foreground">Password input with show/hide and strength indicator.</p>
        </div>

        <CodePreview component={<PasswordFieldBasicExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={props} />
      </div>
    </DocsLayout>
  );
}
