"use client";

import * as React from "react";
// Wrapper for live examples with controls and code
import { cn } from "@/lib/utils";

interface ExampleWrapperProps {
  component: React.ReactNode;
  code: string;
  controls: React.ReactNode;
  className?: string;
}

export function ExampleWrapper({ component, code, controls, className }: ExampleWrapperProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-lg border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">Preview</h3>
          <div className="w-64">{controls}</div>
        </div>
        <div className="flex justify-center">{component}</div>
      </div>
      <div className="rounded-lg border bg-card shadow-sm">
        <pre className="overflow-x-auto p-4 text-sm"><code className="text-muted-foreground">{code}</code></pre>
      </div>
    </div>
  );
}
