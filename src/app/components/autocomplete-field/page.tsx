import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import { AutocompleteFieldBasicExample } from "./examples/autocomplete-field-basic";

export const runtime = "nodejs";
export const dynamic = "force-static";

const props = [
  { name: "name", type: "string", required: true, description: "Form field name." },
  { name: "label", type: "string", required: true, description: "Label displayed above the input." },
  { name: "options", type: "Array<{ label: string; value: string }>", description: "Static options to search." },
  { name: "fetchOptions", type: "() => Promise<{ label: string; value: string }[]>", description: "Async options loader." },
  { name: "placeholder", type: "string", description: "Placeholder text." },
  { name: "className", type: "string", description: "Additional CSS classes." },
];

export default async function AutocompleteFieldPage() {
  const exampleTsxPath = path.join(process.cwd(), "src", "app", "components", "autocomplete-field", "examples", "autocomplete-field-basic.tsx");
  const exampleSchemaPath = exampleTsxPath;

  const [tsxCode, zodSchema] = await Promise.all([
    fs.readFile(exampleTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">AutocompleteField</h1>
          <p className="text-lg text-muted-foreground">Text input with async search and option list.</p>
        </div>

        <CodePreview component={<AutocompleteFieldBasicExample />} tsxCode={tsxCode} zodSchema={zodSchema} />

        <PropsTable props={props} />
      </div>
    </DocsLayout>
  );
}
