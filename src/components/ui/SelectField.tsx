"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  floating?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  placeholder = "Select an option",
  className,
  floating = true,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const error = (errors as Record<string, { message?: unknown }>)[name];

  if (floating) {
    return (
      <div className={cn("relative", className)}>
        <div className="relative">
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <>
                <select
                  id={name}
                  {...field}
                  className={cn(
                    "peer h-12 w-full appearance-none rounded-md border border-input bg-background px-3 pt-5 text-sm shadow-sm transition-all duration-200 ease-in-out",
                    "focus:ring-2 focus:ring-accent focus:border-transparent hover:border-accent hover:ring-2 hover:ring-accent/40",
                    error &&
                      "border-destructive animate-shake focus:ring-destructive"
                  )}
                  aria-invalid={!!error}
                  {...props}
                >
                  <option value="" disabled hidden></option>
                  {placeholder && <option value="">{placeholder}</option>}
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-transform duration-200 ease-in-out" />
              </>
            )}
          />
        </div>
        <Label
          htmlFor={name}
          className={cn(
            "pointer-events-none absolute left-3 top-2.5 z-10 origin-[0] transform text-muted-foreground transition-all duration-200 ease-in-out",
            "peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-muted-foreground peer-focus:font-normal",
            typeof control._formValues?.[
              name as keyof typeof control._formValues
            ] !== "undefined" &&
              control._formValues?.[name as keyof typeof control._formValues]
              ? "-translate-y-3 scale-90 font-normal"
              : undefined,
            error && "text-destructive"
          )}
        >
          {label}
        </Label>
        {error && (
          <p className="form-error-text">{error.message?.toString()}</p>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={name} className={cn(error && "text-destructive")}>
        {label}
      </Label>
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <select
                id={name}
                {...field}
                className={cn(
                  "h-12 w-full appearance-none rounded-md border border-input bg-background px-3 text-sm shadow-sm transition-all duration-200 ease-in-out",
                  "focus:ring-2 focus:ring-accent focus:border-transparent hover:border-accent hover:ring-2 hover:ring-accent/40",
                  error &&
                    "border-destructive animate-shake focus:ring-destructive"
                )}
                aria-invalid={!!error}
                {...props}
              >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-transform duration-200 ease-in-out" />
            </>
          )}
        />
      </div>
      {error && <p className="form-error-text">{error.message?.toString()}</p>}
    </div>
  );
};

export default SelectField;
