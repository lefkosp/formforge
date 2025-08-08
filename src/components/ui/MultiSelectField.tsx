"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "./label";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectFieldProps {
  name: string;
  label: string;
  options: MultiSelectOption[];
  placeholder?: string;
  className?: string;
}

const Chip: React.FC<{ children: React.ReactNode; onRemove?: () => void }>
  = ({ children, onRemove }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-secondary text-secondary-foreground px-2 py-1 text-xs">
    {children}
    {onRemove && (
      <button type="button" className="ml-1 hover:opacity-75" onClick={onRemove} aria-label="Remove">
        ×
      </button>
    )}
  </span>
);

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  name,
  label,
  options,
  className,
}) => {
  const { control, formState: { errors } } = useFormContext();
  const error = (errors as Record<string, { message?: unknown }>)[name];

  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className={cn("space-y-2", className)} ref={containerRef}>
      <Label className={cn(error && "text-destructive")}>{label}</Label>

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => {
          const selected: string[] = Array.isArray(value) ? value : [];
          const toggle = (v: string) => {
            if (selected.includes(v)) onChange(selected.filter((x) => x !== v));
            else onChange([...selected, v]);
          };
          return (
            <div>
              <div
                className={cn(
                  "min-h-10 w-full rounded-md border px-3 py-2 flex flex-wrap gap-2 cursor-text",
                  error && "border-destructive"
                )}
                onClick={() => setOpen((o) => !o)}
              >
                {selected.length === 0 && (
                  <span className="text-sm text-muted-foreground">Select options</span>
                )}
                {selected.map((v) => {
                  const opt = options.find((o) => o.value === v);
                  return (
                    <Chip key={v} onRemove={() => toggle(v)}>{opt?.label ?? v}</Chip>
                  );
                })}
              </div>
              {open && (
                <div className="mt-1 rounded-md border bg-card shadow">
                  <ul className="max-h-48 overflow-auto p-1">
                    {options.map((opt) => {
                      const isChecked = selected.includes(opt.value);
                      return (
                        <li key={opt.value}>
                          <label className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggle(opt.value)}
                            />
                            <span>{opt.label}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        }}
      />

      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default MultiSelectField;
