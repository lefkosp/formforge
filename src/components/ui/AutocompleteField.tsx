"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";

export interface AutocompleteOption {
  label: string;
  value: string;
}

interface AutocompleteFieldProps {
  name: string;
  label: string;
  options?: AutocompleteOption[];
  fetchOptions?: () => Promise<AutocompleteOption[]>;
  placeholder?: string;
  className?: string;
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  name,
  label,
  options: optionsProp,
  fetchOptions,
  placeholder,
  className,
}) => {
  const { control, formState: { errors } } = useFormContext();
  const error = (errors as Record<string, { message?: unknown }>)[name];

  const [options, setOptions] = React.useState<AutocompleteOption[]>(optionsProp ?? []);
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    if (fetchOptions) {
      // Simulate async fetch with slight delay
      fetchOptions().then((data) => {
        if (isMounted) setOptions(data);
      });
    }
    return () => { isMounted = false; };
  }, [fetchOptions]);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q));
  }, [options, query]);

  return (
    <div className={cn("space-y-2", className)} ref={containerRef}>
      <Label htmlFor={`${name}-input`} className={cn(error && "text-destructive")}>{label}</Label>

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur, ref } }) => (
          <div className="relative">
            <Input
              id={`${name}-input`}
              value={value ?? ""}
              placeholder={placeholder}
              onChange={(e) => {
                setQuery(e.target.value);
                onChange(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onBlur={onBlur}
              ref={ref}
              aria-invalid={!!error}
              className={cn(error && "border-destructive focus-visible:ring-destructive")}
            />

            {open && (
              <div className="absolute z-10 mt-1 w-full rounded-md border bg-card shadow">
                <ul className="max-h-48 overflow-auto p-1">
                  {filtered.length === 0 && (
                    <li className="px-3 py-2 text-sm text-muted-foreground">No results</li>
                  )}
                  {filtered.map((opt) => (
                    <li key={opt.value}>
                      <button
                        type="button"
                        className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          onChange(opt.value);
                          setQuery(opt.label);
                          setOpen(false);
                        }}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      />

      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default AutocompleteField;
