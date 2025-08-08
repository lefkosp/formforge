import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { FileUploadFieldBasicExample } from "./examples/file-upload-field-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const props = [
  { name: "name", type: "string", required: true, description: "Form field name." },
  { name: "label", type: "string", required: true, description: "Label displayed above the file input." },
  { name: "accept", type: "string", description: "Accepted file types." },
  { name: "multiple", type: "boolean", description: "Allow selecting multiple files." },
  { name: "className", type: "string", description: "Additional CSS classes." },
];

export default async function FileUploadFieldPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "file-upload-field", "examples", "file-upload-field-basic.tsx");
  const exampleSchemaPath = path.join(process.cwd(), "src", "app", "components", "file-upload-field", "examples", "file-upload-field-schema.ts");

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">FileUploadField</h1>
          <p className="text-lg text-muted-foreground">A file input field integrated with React Hook Form.</p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            <code>FileUploadField</code> provides a styled, accessible file input and displays validation errors.
          </p>
        </div>

        <CodePreview component={<FileUploadFieldBasicExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={props} />
      </div>
    </DocsLayout>
  );
}
