"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodePreviewProps {
  component: React.ReactNode;
  tsxCode: string;
  zodSchema: string;
  className?: string;
}

export function CodePreview({
  component,
  tsxCode,
  zodSchema,
  className,
}: CodePreviewProps) {
  const [copied, setCopied] = useState<string | null>(null);

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
        <div className="mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Preview</h3>
        </div>
        <div className="flex justify-center">{component}</div>
      </div>

      {/* Code Tabs */}
      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between border-b px-4 py-3">
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
                  <pre className="overflow-x-auto p-4 text-sm">
                    <code className="text-muted-foreground">{tsxCode}</code>
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
