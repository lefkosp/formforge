"use client";

import { useState } from "react";
import { PlaygroundControls, ControlSpec } from "./playground-controls";
import { highlightTsxNodes, highlightZodNodes } from "./highlight";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodePreviewProps {
  component: React.ReactNode;
  tsxCode: string;
  zodSchema: string;
  className?: string;
  showPreview?: boolean;
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
  showPreview = true,
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
  const highlightedTsxNodes = highlightTsxNodes(liveTsx);
  const highlightedZodNodes = highlightZodNodes(zodSchema);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      const canUseAsyncClipboard =
        typeof navigator !== "undefined" &&
        typeof navigator.clipboard !== "undefined" &&
        typeof navigator.clipboard.writeText === "function";

      if (canUseAsyncClipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for environments where navigator.clipboard is unavailable
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (!successful) {
          throw new Error("Copy command was unsuccessful");
        }
      }

      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Live Component Preview */}
      {showPreview && (
        <div className="rounded-lg border bg-card p-6">
          <div className="mb-4 flex flex-col items-center justify-between gap-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Preview
            </h3>
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
      )}

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
                    <code className="text-muted-foreground whitespace-pre">
                      {highlightedTsxNodes}
                    </code>
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
                    <code className="text-muted-foreground whitespace-pre">
                      {highlightedZodNodes}
                    </code>
                  </pre>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Snackbar */}
      {copied && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="flex items-center gap-2 rounded-md bg-foreground px-3 py-2 text-background shadow-lg">
            <Check className="h-4 w-4" />
            <span>
              {copied === "tsx"
                ? "Copied TSX code to clipboard"
                : "Copied Zod schema to clipboard"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
