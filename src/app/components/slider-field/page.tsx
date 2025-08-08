import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { SliderFieldBasicExample } from "./examples/slider-field-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const props = [
  { name: "name", type: "string", required: true, description: "Form field name." },
  { name: "label", type: "string", required: true, description: "Label displayed above the slider." },
  { name: "min", type: "number", default: "0", description: "Minimum value." },
  { name: "max", type: "number", default: "100", description: "Maximum value." },
  { name: "step", type: "number", default: "1", description: "Step value." },
  { name: "className", type: "string", description: "Additional CSS classes." },
];

export default async function SliderFieldPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "slider-field", "examples", "slider-field-basic.tsx");
  const exampleSchemaPath = exampleTsxPath;

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">SliderField</h1>
          <p className="text-lg text-muted-foreground">Range input with live value preview.</p>
        </div>

        <CodePreview component={<SliderFieldBasicExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={props} />
      </div>
    </DocsLayout>
  );
}
