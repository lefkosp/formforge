import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { RepeatingFieldArrayBasicExample } from "./examples/repeating-field-array-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const props = [
  { name: "name", type: "string", required: true, description: "Array field name." },
  { name: "label", type: "string", required: true, description: "Section label." },
  { name: "fieldsConfig", type: "Array<{ name: string; label: string; type?: string; placeholder?: string }>", description: "Config for each group field." },
  { name: "className", type: "string", description: "Additional CSS classes." },
];

export default async function RepeatingFieldArrayPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "repeating-field-array", "examples", "repeating-field-array-basic.tsx");
  const exampleSchemaPath = exampleTsxPath;

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">RepeatingFieldArray</h1>
          <p className="text-lg text-muted-foreground">Add and remove sets of fields dynamically.</p>
        </div>

        <CodePreview component={<RepeatingFieldArrayBasicExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={props} />
      </div>
    </DocsLayout>
  );
}
