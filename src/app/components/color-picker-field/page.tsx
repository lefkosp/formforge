import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { ColorPickerFieldBasicExample } from "./examples/color-picker-field-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const props = [
  { name: "name", type: "string", required: true, description: "Form field name." },
  { name: "label", type: "string", required: true, description: "Label displayed above the input." },
  { name: "swatches", type: "string[]", description: "Predefined color swatches." },
  { name: "className", type: "string", description: "Additional CSS classes." },
];

export default async function ColorPickerFieldPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "color-picker-field", "examples", "color-picker-field-basic.tsx");
  const exampleSchemaPath = exampleTsxPath;

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">ColorPickerField</h1>
          <p className="text-lg text-muted-foreground">Pick a color via swatches or manual input.</p>
        </div>

        <CodePreview component={<ColorPickerFieldBasicExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={props} />
      </div>
    </DocsLayout>
  );
}
