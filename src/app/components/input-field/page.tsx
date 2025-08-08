import { promises as fs } from "fs";
import path from "path";
import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { PropsTable } from "@/components/docs/props-table";
import InputLabelOutsideExample from "./examples/input-label-outside";
import InputLabelInsideExample from "./examples/input-label-inside";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const runtime = "nodejs";
export const dynamic = "force-static";

const inputFieldProps = [
  {
    name: "name",
    type: "string",
    description:
      "The name attribute for the input field and form registration.",
    required: true,
  },
  {
    name: "label",
    type: "string",
    description: "The label text for the input field.",
    required: true,
  },
  {
    name: "labelPosition",
    type: '"outside" | "inside"',
    default: '"inside"',
    description: "Controls label placement. 'outside' renders label above the input. 'inside' renders a floating label that moves above on focus or when populated.",
  },
  {
    name: "type",
    type: "string",
    default: '"text"',
    description: "The HTML input type (text, email, password, etc.).",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text shown when the input is empty.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Whether the input field is disabled.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply to the input element.",
  },
  {
    name: "style",
    type: "React.CSSProperties",
    description: "Inline styles applied to the input element.",
  },
];

export default async function InputFieldPage() {
  const baseDir = path.join(process.cwd(), "src", "app", "components", "input-field", "examples");
  const outsideTsxPath = path.join(baseDir, "input-label-outside.tsx");
  const insideTsxPath = path.join(baseDir, "input-label-inside.tsx");
  const exampleSchemaPath = path.join(baseDir, "input-field-schema.ts");

  const [outsideTsxCode, insideTsxCode, zodSchema] = await Promise.all([
    fs.readFile(outsideTsxPath, "utf8"),
    fs.readFile(insideTsxPath, "utf8"),
    fs.readFile(exampleSchemaPath, "utf8"),
  ]);

  return (
    <DocsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">InputField</h1>
          <p className="text-lg text-muted-foreground">
            A form input field component with built-in validation, error
            handling, and accessibility features.
          </p>
        </div>

        {/* Description */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            The <code>InputField</code> component supports two label placements: an external label above the field, and a floating label inside the field that moves on focus or when a value is present.
          </p>
        </div>

        {/* Examples in Tabs */}
        <Tabs defaultValue="outside" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="outside">Label Outside</TabsTrigger>
            <TabsTrigger value="inside">Label Inside</TabsTrigger>
          </TabsList>

          <TabsContent value="outside">
            <CodePreview
              component={<InputLabelOutsideExample />}
              tsxCode={outsideTsxCode}
              zodSchema={zodSchema}
            />
          </TabsContent>

          <TabsContent value="inside">
            <CodePreview
              component={<InputLabelInsideExample />}
              tsxCode={insideTsxCode}
              zodSchema={zodSchema}
            />
          </TabsContent>
        </Tabs>

        {/* Props Table */}
        <PropsTable props={inputFieldProps} />
      </div>
    </DocsLayout>
  );
}
