import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { NestedFormSectionBasicExample } from "./examples/nested-form-section-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const props = [
  { name: "title", type: "string", required: true, description: "Section title." },
  { name: "children", type: "React.ReactNode", description: "Section content." },
  { name: "defaultOpen", type: "boolean", default: "true", description: "Whether the section is open by default." },
  { name: "nested", type: "boolean", default: "false", description: "Apply nested styling (indent)." },
  { name: "className", type: "string", description: "Additional CSS classes." },
];

export default async function NestedFormSectionPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "nested-form-section", "examples", "nested-form-section-basic.tsx");
  const exampleSchemaPath = exampleTsxPath;

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">NestedFormSection</h1>
          <p className="text-lg text-muted-foreground">Collapsible sections with support for nested content.</p>
        </div>

        <CodePreview component={<NestedFormSectionBasicExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={props} />
      </div>
    </DocsLayout>
  );
}
