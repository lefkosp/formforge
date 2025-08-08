import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { SignatureFieldBasicExample } from "./examples/signature-field-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const props = [
  { name: "name", type: "string", required: true, description: "Form field name." },
  { name: "label", type: "string", required: true, description: "Label displayed above the canvas." },
  { name: "width", type: "number", default: "320", description: "Canvas width." },
  { name: "height", type: "number", default: "160", description: "Canvas height." },
  { name: "className", type: "string", description: "Additional CSS classes." },
];

export default async function SignatureFieldPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "signature-field", "examples", "signature-field-basic.tsx");
  const exampleSchemaPath = exampleTsxPath;

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">SignatureField</h1>
          <p className="text-lg text-muted-foreground">Canvas-based signature capture with image export.</p>
        </div>

        <CodePreview component={<SignatureFieldBasicExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={props} />
      </div>
    </DocsLayout>
  );
}
