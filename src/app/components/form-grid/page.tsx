import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { FormGridBasicExample } from "./examples/form-grid-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const formGridProps = [
  {
    name: "columns",
    type: "number",
    description: "Number of columns for the grid layout.",
  },
  {
    name: "gap",
    type: "string",
    description: "Tailwind gap classes for spacing.",
  },
];

export default async function FormGridPage() {
  const exampleTsxPath = path.join(
    process.cwd(),
    "src",
    "app",
    "components",
    "form-grid",
    "examples",
    "form-grid-basic.tsx"
  );
  const exampleSchemaPath = path.join(
    process.cwd(),
    "src",
    "app",
    "components",
    "form-grid",
    "examples",
    "form-grid-schema.ts"
  );

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">FormGrid</h1>
          <p className="text-lg text-muted-foreground">
            A responsive grid layout for arranging form fields.
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>Use grid layouts to align inputs for better scannability.</p>
        </div>

        <CodePreview
          component={<FormGridBasicExample />}
          tsxCode={tsxCode}
          zodSchema={zodSchema}
        />

        <PropsTable props={formGridProps} />
      </div>
    </DocsLayout>
  );
}
