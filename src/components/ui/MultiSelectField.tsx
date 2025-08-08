"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "./label";
import { X, ChevronDown, Check } from "lucide-react";
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
  <span className="form-chip">
    {children}
    {onRemove && (
      <button type="button" className="ml-0.5 rounded-full p-0.5 hover:bg-accent/80 transition-colors" onClick={onRemove} aria-label="Remove">
        <X className="size-3" />
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
    <div className={cn("relative", className)} ref={containerRef}>
      <Label
        className={cn(
          "pointer-events-none absolute left-3 top-3 z-10 origin-[0] transform text-muted-foreground transition-all duration-200 ease-in-out",
          "peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-foreground",
          "peer-[&:not(:placeholder-shown)]:-translate-y-3 peer-[&:not(:placeholder-shown)]:scale-90",
          error && "text-destructive"
        )}
      >
        {label}
      </Label>

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
                  "peer form-control-base form-multiselect-trigger shadow-sm",
                  error && "is-error animate-shake"
                )}
                onClick={() => setOpen((o) => !o)}
              >
                {selected.length === 0 && (
                  <span className="text-sm text-muted-foreground italic">Select options</span>
                )}
                {selected.map((v) => {
                  const opt = options.find((o) => o.value === v);
                  return (
                    <Chip key={v} onRemove={() => toggle(v)}>{opt?.label ?? v}</Chip>
                  );
                })}
              </div>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              {open && (
                <div className="mt-1 form-multiselect-dropdown overflow-hidden origin-top animate-slide-in">
                  <ul className="max-h-56 overflow-auto p-1">
                    {options.map((opt) => {
                      const isChecked = selected.includes(opt.value);
                      return (
                        <li key={opt.value}>
                          <button
                            type="button"
                            onClick={() => toggle(opt.value)}
                            className="form-multiselect-option"
                          >
                            <span className={"relative inline-flex items-center justify-center"}>
                              <span className={"inline-flex size-4 items-center justify-center rounded-[4px] border border-input bg-background shadow-sm"}>
                                <Check className={cn("size-3", isChecked ? "opacity-100" : "opacity-0")}/>
                              </span>
                            </span>
                            <span>{opt.label}</span>
                          </button>
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
        <p className="form-error-text">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default MultiSelectField;
