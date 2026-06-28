"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { DocsLayout } from "@/components/docs/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputField from "@/components/ui/InputField";
import TextareaField from "@/components/ui/TextareaField";
import SelectField from "@/components/ui/SelectField";
import CheckboxField from "@/components/ui/CheckboxField";
import RadioGroupField from "@/components/ui/RadioGroupField";
import SwitchField from "@/components/ui/SwitchField";
import DatePickerField from "@/components/ui/DatePickerField";
import FileUploadField from "@/components/ui/FileUploadField";
import { useForm, FormProvider } from "react-hook-form";
import { CodePreview } from "@/components/docs/code-preview";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

// Basic types for the builder
export type FieldType =
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "switch"
  | "date"
  | "file";

export type FieldSpec = {
  id: string;
  type: FieldType;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[]; // for select/radio
  floating?: boolean; // floating vs fixed label where applicable
};

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

const palette: {
  type: FieldType;
  label: string;
  preset?: Partial<FieldSpec>;
}[] = [
  { type: "input", label: "Input", preset: { placeholder: "Your text" } },
  {
    type: "textarea",
    label: "Textarea",
    preset: { placeholder: "Write here" },
  },
  {
    type: "select",
    label: "Select",
    preset: {
      options: [
        { label: "One", value: "one" },
        { label: "Two", value: "two" },
      ],
    },
  },
  { type: "checkbox", label: "Checkbox" },
  {
    type: "radio",
    label: "Radio",
    preset: {
      options: [
        { label: "A", value: "a" },
        { label: "B", value: "b" },
      ],
    },
  },
  { type: "switch", label: "Switch" },
  { type: "date", label: "Date" },
  { type: "file", label: "File Upload" },
];

function defaultSpec(type: FieldType): FieldSpec {
  const base: FieldSpec = {
    id: uid(),
    type,
    name: `${type}-${Math.random().toString(36).slice(2, 6)}`,
    label: `${type[0].toUpperCase()}${type.slice(1)} Field`,
    required: false,
    placeholder: undefined,
    options: undefined,
    floating: true,
  };
  const pal = palette.find((p) => p.type === type)?.preset ?? {};
  return { ...base, ...pal } as FieldSpec;
}

function FieldEditor({
  field,
  onChange,
  onRemove,
  onMove,
  isCollapsed,
  onToggleCollapse,
}: {
  field: FieldSpec;
  onChange: (next: FieldSpec) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}) {
  const update = (patch: Partial<FieldSpec>) =>
    onChange({ ...field, ...patch });
  return (
    <div className="rounded-md border bg-card p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={onToggleCollapse}
            title={isCollapsed ? "Expand editor" : "Collapse editor"}
            className="h-6 w-6 p-0"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          <div className="text-sm font-medium">{field.label}</div>
          <span className="text-[10px] uppercase tracking-wide rounded-full bg-accent/20 text-foreground px-2 py-1 border border-accent/30">
            {field.type}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onMove(-1)}
            title="Move up"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onMove(1)}
            title="Move down"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={onRemove}
            title="Remove field"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {!isCollapsed && (
        <div className="grid grid-cols-2 gap-2">
          <label className="text-xs">
            Name
            <Input
              className="mt-1 h-8"
              value={field.name}
              onChange={(e) => update({ name: e.target.value })}
            />
          </label>
          <label className="text-xs">
            Label
            <Input
              className="mt-1 h-8"
              value={field.label}
              onChange={(e) => update({ label: e.target.value })}
            />
          </label>
          {(field.type === "input" || field.type === "textarea") && (
            <label className="text-xs col-span-2">
              Placeholder
              <Input
                className="mt-1 h-8"
                value={field.placeholder ?? ""}
                onChange={(e) => update({ placeholder: e.target.value })}
              />
            </label>
          )}
          {(field.type === "input" ||
            field.type === "textarea" ||
            field.type === "select") && (
            <label className="text-xs inline-flex items-center gap-2 col-span-2">
              <input
                type="checkbox"
                checked={!!field.floating}
                onChange={(e) =>
                  update({
                    floating: e.target.checked,
                    ...(e.target.checked ? { placeholder: undefined } : {}),
                  })
                }
              />
              Floating label
            </label>
          )}
          {field.type === "select" && (
            <div className="col-span-2 space-y-1">
              <div className="text-xs">Options</div>
              <div className="space-y-1">
                {(field.options ?? []).map((opt, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-2">
                    <Input
                      className="h-8"
                      value={opt.label}
                      placeholder="Label"
                      onChange={(e) => {
                        const next = [...(field.options ?? [])];
                        next[idx] = { ...opt, label: e.target.value };
                        update({ options: next });
                      }}
                    />
                    <Input
                      className="h-8"
                      value={opt.value}
                      placeholder="value"
                      onChange={(e) => {
                        const next = [...(field.options ?? [])];
                        next[idx] = { ...opt, value: e.target.value };
                        update({ options: next });
                      }}
                    />
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    update({
                      options: [
                        ...(field.options ?? []),
                        { label: "Option", value: "option" },
                      ],
                    })
                  }
                >
                  Add option
                </Button>
              </div>
            </div>
          )}
          {field.type === "radio" && (
            <div className="col-span-2 space-y-1">
              <div className="text-xs">Choices</div>
              <div className="space-y-1">
                {(field.options ?? []).map((opt, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-2">
                    <Input
                      className="h-8"
                      value={opt.label}
                      placeholder="Label"
                      onChange={(e) => {
                        const next = [...(field.options ?? [])];
                        next[idx] = { ...opt, label: e.target.value };
                        update({ options: next });
                      }}
                    />
                    <Input
                      className="h-8"
                      value={opt.value}
                      placeholder="value"
                      onChange={(e) => {
                        const next = [...(field.options ?? [])];
                        next[idx] = { ...opt, value: e.target.value };
                        update({ options: next });
                      }}
                    />
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    update({
                      options: [
                        ...(field.options ?? []),
                        { label: "Choice", value: "choice" },
                      ],
                    })
                  }
                >
                  Add choice
                </Button>
              </div>
            </div>
          )}
          <label className="text-xs inline-flex items-center gap-2 col-span-2">
            <input
              type="checkbox"
              checked={!!field.required}
              onChange={(e) => update({ required: e.target.checked })}
            />
            Required
          </label>
        </div>
      )}
    </div>
  );
}

// FormPreview component to render the live form
function FormPreview({ fields }: { fields: FieldSpec[] }) {
  const methods = useForm();
  const onSubmit = methods.handleSubmit((values) => console.log(values));

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="space-y-4 max-w-md mx-auto">
        {fields.map((f) => {
          switch (f.type) {
            case "input":
              return (
                <InputField
                  key={f.id}
                  name={f.name}
                  label={f.label}
                  placeholder={f.floating ? undefined : f.placeholder ?? ""}
                  floating={f.floating}
                />
              );
            case "textarea":
              return (
                <TextareaField
                  key={f.id}
                  name={f.name}
                  label={f.label}
                  placeholder={f.floating ? undefined : f.placeholder ?? ""}
                  floating={f.floating}
                />
              );
            case "select":
              return (
                <SelectField
                  key={f.id}
                  name={f.name}
                  label={f.label}
                  options={f.options ?? []}
                  placeholder={f.floating ? undefined : "Select an option"}
                  floating={f.floating}
                />
              );
            case "checkbox":
              return <CheckboxField key={f.id} name={f.name} label={f.label} />;
            case "radio":
              return (
                <RadioGroupField
                  key={f.id}
                  name={f.name}
                  label={f.label}
                  options={f.options ?? []}
                />
              );
            case "switch":
              return <SwitchField key={f.id} name={f.name} label={f.label} />;
            case "date":
              return (
                <DatePickerField key={f.id} name={f.name} label={f.label} />
              );
            case "file":
              return (
                <FileUploadField key={f.id} name={f.name} label={f.label} />
              );
          }
        })}
        {fields.length > 0 && <Button type="submit">Submit</Button>}
      </form>
    </FormProvider>
  );
}

function generateZodInner(fields: FieldSpec[]): string {
  const lines: string[] = ["const FormSchema = z.object({"];
  for (const f of fields) {
    const name = f.name || "field";
    switch (f.type) {
      case "input":
      case "textarea": {
        let s = "z.string()";
        if (f.required) s += ".min(1, 'Required')";
        else s += ".optional()";
        lines.push(`  ${name}: ${s},`);
        break;
      }
      case "select":
      case "radio": {
        const vals =
          (f.options ?? []).map((o) => `'${o.value}'`).join(" | ") || "string";
        let s = vals.includes("|")
          ? `z.enum([${(f.options ?? [])
              .map((o) => `'${o.value}'`)
              .join(", ")}])`
          : "z.string()";
        if (!f.required) s += ".optional()";
        lines.push(`  ${name}: ${s},`);
        break;
      }
      case "checkbox": {
        let s = "z.boolean()";
        if (f.required) s += ".refine(v => v === true, 'Required')";
        else s += ".optional()";
        lines.push(`  ${name}: ${s},`);
        break;
      }
      case "switch": {
        let s = "z.boolean()";
        if (!f.required) s += ".optional()";
        lines.push(`  ${name}: ${s},`);
        break;
      }
      case "date": {
        let s = "z.string()";
        if (f.required) s += ".min(1, 'Required')";
        else s += ".optional()";
        lines.push(`  ${name}: ${s},`);
        break;
      }
      case "file": {
        let s = "z.any()";
        if (f.required) s += ".refine(v => v && v.length > 0, 'Required')";
        else s += ".optional()";
        lines.push(`  ${name}: ${s},`);
        break;
      }
    }
  }
  lines.push("})");
  return lines.join("\n");
}

function generateZod(fields: FieldSpec[]): string {
  const lines: string[] = [
    "import { z } from 'zod'",
    "",
    "export const FormSchema = z.object({",
  ];
  for (const f of fields) {
    const name = f.name || "field";
    switch (f.type) {
      case "input":
      case "textarea": {
        let s = "z.string()";
        if (f.required) s += ".min(1, 'Required')";
        else s += ".optional()";
        lines.push(`  ${name}: ${s},`);
        break;
      }
      case "select":
      case "radio": {
        const vals =
          (f.options ?? []).map((o) => `'${o.value}'`).join(" | ") || "string";
        let s = vals.includes("|")
          ? `z.enum([${(f.options ?? [])
              .map((o) => `'${o.value}'`)
              .join(", ")}])`
          : "z.string()";
        if (!f.required) s += ".optional()";
        lines.push(`  ${name}: ${s},`);
        break;
      }
      case "checkbox": {
        let s = "z.boolean()";
        if (f.required) s += ".refine(v => v === true, 'Required')";
        else s += ".optional()";
        lines.push(`  ${name}: ${s},`);
        break;
      }
      case "switch": {
        let s = "z.boolean()";
        if (!f.required) s += ".optional()";
        lines.push(`  ${name}: ${s},`);
        break;
      }
      case "date": {
        let s = "z.string()";
        if (f.required) s += ".min(1, 'Required')";
        else s += ".optional()";
        lines.push(`  ${name}: ${s},`);
        break;
      }
      case "file": {
        let s = "z.any()";
        if (f.required) s += ".refine(v => v && v.length > 0, 'Required')";
        else s += ".optional()";
        lines.push(`  ${name}: ${s},`);
        break;
      }
    }
  }
  lines.push("})");
  return lines.join("\n");
}

function generateTsx(fields: FieldSpec[]): string {
  const header = [
    "import { useForm, FormProvider } from 'react-hook-form'",
    "import { zodResolver } from '@hookform/resolvers/zod'",
    "import { z } from 'zod'",
    "import InputField from '@/components/ui/InputField'",
    "import TextareaField from '@/components/ui/TextareaField'",
    "import SelectField from '@/components/ui/SelectField'",
    "import CheckboxField from '@/components/ui/CheckboxField'",
    "import RadioGroupField from '@/components/ui/RadioGroupField'",
    "import SwitchField from '@/components/ui/SwitchField'",
    "import DatePickerField from '@/components/ui/DatePickerField'",
    "import FileUploadField from '@/components/ui/FileUploadField'",
    "import { Button } from '@/components/ui/button'",
    "",
  ].join("\n");

  const schemaInner = generateZodInner(fields);
  const bodyStart = [
    schemaInner,
    "",
    "export default function MyForm() {",
    "  const methods = useForm({ resolver: zodResolver(FormSchema) })",
    "  const onSubmit = methods.handleSubmit((values) => { console.log(values) })",
    "  return (",
    "    <FormProvider {...methods}>",
    '      <form onSubmit={onSubmit} className="space-y-4">',
  ].join("\n");

  const fieldLines: string[] = fields.map((f) => {
    switch (f.type) {
      case "input":
        return `<InputField name=\"${f.name}\" label=\"${f.label}\"${
          f.floating ? " floating" : " floating={false}"
        }${f.floating ? "" : ` placeholder=\"${f.placeholder ?? ""}\"`} />`;
      case "textarea":
        return `<TextareaField name=\"${f.name}\" label=\"${f.label}\"${
          f.floating ? " floating" : " floating={false}"
        }${f.floating ? "" : ` placeholder=\"${f.placeholder ?? ""}\"`} />`;
      case "select":
        return `<SelectField name=\"${f.name}\" label=\"${f.label}\"${
          f.floating ? " floating" : " floating={false}"
        }${
          f.floating ? "" : ` placeholder=\"Select an option\"`
        } options={${JSON.stringify(f.options ?? [])}} />`;
      case "checkbox":
        return `<CheckboxField name=\"${f.name}\" label=\"${f.label}\" />`;
      case "radio":
        return `<RadioGroupField name=\"${f.name}\" label=\"${
          f.label
        }\" options={${JSON.stringify(f.options ?? [])}} />`;
      case "switch":
        return `<SwitchField name=\"${f.name}\" label=\"${f.label}\" />`;
      case "date":
        return `<DatePickerField name=\"${f.name}\" label=\"${f.label}\" />`;
      case "file":
        return `<FileUploadField name=\"${f.name}\" label=\"${f.label}\" />`;
    }
  });

  const bodyEnd = [
    '        <Button type="submit">Submit</Button>',
    "      </form>",
    "    </FormProvider>",
    "  )",
    "}",
  ].join("\n");

  return [
    header,
    bodyStart,
    ...fieldLines.map((l) => "        " + l),
    bodyEnd,
  ].join("\n");
}

export default function FormBuilderPage() {
  const [fields, setFields] = useState<FieldSpec[]>([]);
  const [newType, setNewType] = useState<FieldType>("input");
  const [collapsedEditors, setCollapsedEditors] = useState<Set<string>>(
    new Set()
  );

  const addField = (type: FieldType) =>
    setFields((f) => [...f, defaultSpec(type)]);
  const updateField = (id: string, next: FieldSpec) =>
    setFields((fs) => fs.map((f) => (f.id === id ? next : f)));
  const removeField = (id: string) =>
    setFields((fs) => fs.filter((f) => f.id !== id));
  const moveField = (id: string, dir: -1 | 1) =>
    setFields((fs) => {
      const i = fs.findIndex((x) => x.id === id);
      if (i < 0) return fs;
      const j = Math.max(0, Math.min(fs.length - 1, i + dir));
      const next = [...fs];
      const [item] = next.splice(i, 1);
      next.splice(j, 0, item);
      return next;
    });

  const toggleCollapsed = (id: string) =>
    setCollapsedEditors((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const tsxCode = useMemo(() => generateTsx(fields), [fields]);
  const zodSchema = useMemo(() => generateZod(fields), [fields]);

  return (
    <DocsLayout>
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Form Builder</h1>
            <p className="text-muted-foreground">
              Compose a form and export the code + Zod schema.
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <label className="text-xs">
              Field type
              <select
                className="mt-1 block h-9 w-56 rounded-md border border-input bg-background px-2 text-sm shadow-sm focus:ring-2 focus:ring-accent"
                value={newType}
                onChange={(e) => setNewType(e.target.value as FieldType)}
              >
                {palette.map((p) => (
                  <option key={p.type} value={p.type}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
            <Button onClick={() => addField(newType)}>
              <Plus className="h-4 w-4 mr-1" /> Add field
            </Button>
            <Button variant="outline" onClick={() => setFields([])}>
              Clear all
            </Button>
          </div>
        </div>

        {/* Builder rows: editors + preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fields list */}
          <section className="rounded-md border bg-card h-fit">
            <header className="border-b px-4 py-3">
              <h2 className="text-sm font-medium">
                <span className="bg-gradient-to-r from-[var(--accent-soft)] to-transparent bg-[length:100%_2px] bg-left-bottom bg-no-repeat pb-1">
                  Fields
                </span>
              </h2>
            </header>
            <div className="p-4 space-y-3">
              {fields.length === 0 ? (
                <div className="rounded-md border bg-background p-6 text-sm text-muted-foreground text-center">
                  Choose a field type and click Add field.
                </div>
              ) : (
                fields.map((f) => (
                  <FieldEditor
                    key={f.id}
                    field={f}
                    onChange={(next) => updateField(f.id, next)}
                    onRemove={() => removeField(f.id)}
                    onMove={(dir) => moveField(f.id, dir)}
                    isCollapsed={collapsedEditors.has(f.id)}
                    onToggleCollapse={() => toggleCollapsed(f.id)}
                  />
                ))
              )}
            </div>
          </section>

          {/* Live preview */}
          <section className="rounded-md border bg-card h-fit">
            <header className="border-b px-4 py-3">
              <h2 className="text-sm font-medium">
                <span className="bg-gradient-to-r from-[var(--accent-soft)] to-transparent bg-[length:100%_2px] bg-left-bottom bg-no-repeat pb-1">
                  Preview
                </span>
              </h2>
            </header>
            <div className="p-4">
              <FormPreview fields={fields} />
            </div>
          </section>
        </div>

        {/* Generated Code with CodePreview */}
        <CodePreview
          component={<FormPreview fields={fields} />}
          tsxCode={tsxCode}
          zodSchema={zodSchema}
          showPreview={false}
        />
      </div>
    </DocsLayout>
  );
}
