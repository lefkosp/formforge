import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { FormGroupExample } from "./examples/form-group-basic";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-static";

const formGroupProps = [
  { name: "title", type: "ReactNode", description: "Optional group title." },
  { name: "description", type: "ReactNode", description: "Optional group description." },
  { name: "spacing", type: '"none" | "sm" | "md" | "lg"', description: "Vertical spacing between children." },
  { name: "variant", type: '"plain" | "card" | "bordered"', description: "Visual variant for the group container." },
  { name: "className", type: "string", description: "Root container class override." },
  { name: "headerClassName", type: "string", description: "Header class override." },
  { name: "contentClassName", type: "string", description: "Content area class override." },
];

export default async function FormGroupPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "form-group", "examples", "form-group-basic.tsx");
  const exampleSchemaPath = path.join(process.cwd(), "src", "app", "components", "form-group", "examples", "form-group-schema.ts");
  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">FormGroup</h1>
          <p className="text-lg text-muted-foreground">Group related fields with consistent spacing and optional header.</p>
        </div>

        <CodePreview component={<FormGroupExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={formGroupProps} />
      </div>
    </DocsLayout>
  );
}