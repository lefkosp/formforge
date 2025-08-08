import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { FormRowInlineExample } from "./examples/form-row-inline";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-static";

const formRowProps = [
  { name: "label", type: "ReactNode", description: "Optional label content." },
  { name: "htmlFor", type: "string", description: "Associates label with input id." },
  { name: "description", type: "ReactNode", description: "Help text under the control." },
  { name: "required", type: "boolean", description: "Show a required asterisk." },
  { name: "layout", type: '"stack" | "inline"', description: "Layout mode; inline stacks on small screens.", },
  { name: "align", type: '"start" | "center"', description: "Vertical alignment in inline layout." },
  { name: "className", type: "string", description: "Container class override." },
  { name: "labelClassName", type: "string", description: "Label wrapper class override." },
  { name: "controlClassName", type: "string", description: "Control wrapper class override." },
];

export default async function FormRowPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "form-row", "examples", "form-row-inline.tsx");
  const exampleSchemaPath = path.join(process.cwd(), "src", "app", "components", "form-row", "examples", "form-row-schema.ts");
  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">FormRow</h1>
          <p className="text-lg text-muted-foreground">Optional inline label layout for compact forms; stacks on small screens.</p>
        </div>

        <CodePreview component={<FormRowInlineExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={formRowProps} />
      </div>
    </DocsLayout>
  );
}