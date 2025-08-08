import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { FormWizardBasicExample } from "./examples/form-wizard-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const props = [
  { name: "steps", type: "Array<{ id: string; title: string; fields: string[] }>", required: true, description: "Wizard steps configuration." },
  { name: "children", type: "(step, index) => ReactNode", description: "Render function for current step." },
  { name: "className", type: "string", description: "Additional CSS classes." },
];

export default async function FormWizardPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "form-wizard", "examples", "form-wizard-basic.tsx");
  const exampleSchemaPath = exampleTsxPath;

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">FormWizard</h1>
          <p className="text-lg text-muted-foreground">Multi-step form flow with per-step validation.</p>
        </div>

        <CodePreview component={<FormWizardBasicExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={props} />
      </div>
    </DocsLayout>
  );
}
