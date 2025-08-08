"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "./label";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface RichTextEditorFieldProps {
  name: string;
  label: string;
  className?: string;
}

function exec(command: string, value?: string) {
  try {
    document.execCommand(command, false, value);
  } catch {}
}

const Toolbar: React.FC = () => (
  <div className="flex items-center gap-1 border rounded-md p-1 bg-card">
    <Button type="button" variant="ghost" size="sm" onClick={() => exec("bold")}>
      Bold
    </Button>
    <Button type="button" variant="ghost" size="sm" onClick={() => exec("italic")}>
      Italic
    </Button>
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => {
        const url = prompt("Enter URL");
        if (url) exec("createLink", url);
      }}
    >
      Link
    </Button>
  </div>
);

const RichTextEditorField: React.FC<RichTextEditorFieldProps> = ({ name, label, className }) => {
  const { control, formState: { errors } } = useFormContext();
  const error = (errors as Record<string, { message?: unknown }>)[name];
  const editorRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div className={cn("space-y-2", className)}>
      <Label className={cn(error && "text-destructive")}>{label}</Label>
      <Toolbar />
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div
            ref={editorRef}
            className={cn(
              "min-h-32 rounded-md border p-3 text-sm",
              error && "border-destructive"
            )}
            contentEditable
            onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
            dangerouslySetInnerHTML={{ __html: (value as string) ?? "" }}
          />
        )}
      />
      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default RichTextEditorField;
