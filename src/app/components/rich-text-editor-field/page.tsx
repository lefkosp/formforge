import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { RichTextEditorFieldBasicExample } from "./examples/rich-text-editor-field-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const props = [
  { name: "name", type: "string", required: true, description: "Form field name." },
  { name: "label", type: "string", required: true, description: "Label displayed above the editor." },
  { name: "className", type: "string", description: "Additional CSS classes." },
];

export default async function RichTextEditorFieldPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "rich-text-editor-field", "examples", "rich-text-editor-field-basic.tsx");
  const exampleSchemaPath = exampleTsxPath;

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">RichTextEditorField</h1>
          <p className="text-lg text-muted-foreground">Minimal rich text editor with bold, italic, and link.</p>
        </div>

        <CodePreview component={<RichTextEditorFieldBasicExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={props} />
      </div>
    </DocsLayout>
  );
}
