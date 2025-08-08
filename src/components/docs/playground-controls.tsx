"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type ControlSpec =
  | { type: "text"; name: string; label: string; placeholder?: string }
  | { type: "number"; name: string; label: string; min?: number; max?: number; step?: number }
  | { type: "select"; name: string; label: string; options: { label: string; value: string }[] }
  | { type: "boolean"; name: string; label: string };

export interface PlaygroundControlsProps<T extends Record<string, unknown>> {
  title?: string;
  controls: ControlSpec[];
  values: T;
  onChange: (values: T) => void;
  className?: string;
}

export function PlaygroundControls<T extends Record<string, unknown>>({
  title = "Playground Controls",
  controls,
  values,
  onChange,
  className,
}: PlaygroundControlsProps<T>) {
  const [open, setOpen] = React.useState(true);

  const update = (name: string, value: unknown) => {
    onChange({ ...(values as Record<string, unknown>), [name]: value } as T);
  };

  return (
    <div className={cn("relative", className)}>
      <Button type="button" variant="outline" className="w-full justify-between" onClick={() => setOpen((o) => !o)}>
        {title}
        <span className="text-xs text-muted-foreground">{open ? "Hide" : "Show"}</span>
      </Button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="mt-2 rounded-md border bg-card p-3 space-y-3"
          >
            {controls.map((ctrl) => (
              <div key={ctrl.name} className="space-y-1">
                <Label className="text-xs">{ctrl.label}</Label>
                {ctrl.type === "text" && (
                  <Input
                    value={(values as Record<string, unknown>)[ctrl.name] as string ?? ""}
                    placeholder={ctrl.placeholder}
                    onChange={(e) => update(ctrl.name, e.target.value)}
                  />
                )}
                {ctrl.type === "number" && (
                  <Input
                    type="number"
                    value={Number((values as Record<string, unknown>)[ctrl.name] ?? 0)}
                    min={ctrl.min}
                    max={ctrl.max}
                    step={ctrl.step}
                    onChange={(e) => update(ctrl.name, Number(e.target.value))}
                  />
                )}
                {ctrl.type === "select" && (
                  <select
                    className="w-full rounded-md border px-3 py-2"
                    value={(values as Record<string, unknown>)[ctrl.name] as string}
                    onChange={(e) => update(ctrl.name, e.target.value)}
                  >
                    {ctrl.options.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                )}
                {ctrl.type === "boolean" && (
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={Boolean((values as Record<string, unknown>)[ctrl.name])}
                      onChange={(e) => update(ctrl.name, e.target.checked)}
                    />
                    <span>Enabled</span>
                  </label>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
