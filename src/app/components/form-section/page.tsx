import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { FormSectionBasicExample } from "./examples/form-section-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const formSectionProps = [
  {
    name: "title",
    type: "string",
    description: "Section title displayed at the top.",
  },
  {
    name: "description",
    type: "string",
    description: "Section helper text.",
  },
];

export default async function FormSectionPage() {
  const exampleTsxPath = path.join(
    process.cwd(),
    "src",
    "app",
    "components",
    "form-section",
    "examples",
    "form-section-basic.tsx"
  );
  const exampleSchemaPath = path.join(
    process.cwd(),
    "src",
    "app",
    "components",
    "form-section",
    "examples",
    "form-section-schema.ts"
  );

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">FormSection</h1>
          <p className="text-lg text-muted-foreground">
            A container to group related fields with a title and description.
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>Use sections to split complex forms into meaningful parts.</p>
        </div>

        <CodePreview
          component={<FormSectionBasicExample />}
          tsxCode={tsxCode}
          zodSchema={zodSchema}
        />

        <PropsTable props={formSectionProps} />
      </div>
    </DocsLayout>
  );
}
