import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { MultiSelectFieldBasicExample } from "./examples/multi-select-field-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const props = [
  { name: "name", type: "string", required: true, description: "Form field name." },
  { name: "label", type: "string", required: true, description: "Label displayed above the input." },
  { name: "options", type: "Array<{ label: string; value: string }>", description: "Options to select from." },
  { name: "className", type: "string", description: "Additional CSS classes." },
];

export default async function MultiSelectFieldPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "multi-select-field", "examples", "multi-select-field-basic.tsx");
  const exampleSchemaPath = exampleTsxPath;

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">MultiSelectField</h1>
          <p className="text-lg text-muted-foreground">Select multiple options with chip display.</p>
        </div>

        <CodePreview component={<MultiSelectFieldBasicExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={props} />
      </div>
    </DocsLayout>
  );
}
