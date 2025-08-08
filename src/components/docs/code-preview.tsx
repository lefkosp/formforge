"use client";

import { useState } from "react";
import { PlaygroundControls, ControlSpec } from "./playground-controls";
import { highlightTsx } from "./highlight";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodePreviewProps {
  component: React.ReactNode;
  tsxCode: string;
  zodSchema: string;
  className?: string;
  playground?: {
    controls: ControlSpec[];
    initialValues: Record<string, unknown>;
    renderId: string;
  };
}

export function CodePreview({
  component,
  tsxCode,
  zodSchema,
  className,
  playground,
}: CodePreviewProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [pgValues, setPgValues] = useState<Record<string, unknown>>(
    playground?.initialValues ?? {}
  );

  const renderers: Record<
    string,
    {
      render: (values: Record<string, unknown>) => React.ReactNode;
      generate: (values: Record<string, unknown>, code: string) => string;
    }
  > = {
    "input-field": {
      render: (v) => (
        <div className="w-80">
          <div className="space-y-2">
            <label className="form-label">{String(v.label ?? "Label")}</label>
            <input
              className="form-input"
              placeholder={String(v.placeholder ?? "")}
              type={String(v.type ?? "text")}
            />
          </div>
        </div>
      ),
      generate: (v, code) =>
        code
          .replace(/label=\".*?\"/, `label=\"${v.label ?? "Label"}\"`)
          .replace(
            /placeholder=\".*?\"/,
            `placeholder=\"${v.placeholder ?? ""}\"`
          )
          .replace(/type=\".*?\"/, `type=\"${v.type ?? "text"}\"`),
    },
  };

  const rendered = playground
    ? renderers[playground.renderId]?.render(pgValues) ?? component
    : component;
  const liveTsx = playground
    ? renderers[playground.renderId]?.generate(pgValues, tsxCode) ?? tsxCode
    : tsxCode;
  const highlightedTsx = highlightTsx(liveTsx);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Live Component Preview */}
      <div className="rounded-lg border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Preview</h3>
          {playground && (
            <div className="w-64">
              <PlaygroundControls
                controls={playground.controls}
                values={pgValues}
                onChange={setPgValues}
              />
            </div>
          )}
        </div>
        <div className="flex justify-center">{rendered}</div>
      </div>

      {/* Code Tabs */}
      <div className="rounded-lg border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b px-4 py-3 bg-gradient-to-r from-[var(--accent-soft)]/20 to-transparent">
          <Tabs defaultValue="tsx" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tsx">TSX</TabsTrigger>
              <TabsTrigger value="zod">Zod Schema</TabsTrigger>
            </TabsList>

            <div className="relative">
              <TabsContent value="tsx" className="mt-0">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={() => copyToClipboard(tsxCode, "tsx")}
                  >
                    {copied === "tsx" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="overflow-x-auto p-4 text-sm hover:shadow-[0_0_0_1px_var(--accent-soft),0_0_32px_-10px_var(--accent)] bg-gradient-to-br from-[var(--accent-soft)]/40 via-card to-[var(--accent-soft)]/0 transition-shadow">
                    <code
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: highlightedTsx }}
                    />
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="zod" className="mt-0">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={() => copyToClipboard(zodSchema, "zod")}
                  >
                    {copied === "zod" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="overflow-x-auto p-4 text-sm">
                    <code className="text-muted-foreground">{zodSchema}</code>
                  </pre>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
