"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  className?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ name, label, className, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = (errors as Record<string, { message?: unknown }>)[name];

  return (
    <label className={cn("group flex items-center gap-3 text-sm cursor-pointer select-none", className)}>
      <span className="relative inline-flex items-center justify-center">
        <input
          type="checkbox"
          className="peer absolute inset-0 size-5 cursor-pointer opacity-0"
          aria-invalid={!!error}
          {...register(name)}
          {...props}
        />
        <span
          aria-hidden
          className={cn(
            "inline-flex size-5 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-all duration-200 ease-in-out",
            "group-hover:ring-2 group-hover:ring-accent",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-accent",
            "peer-checked:bg-accent peer-checked:text-accent-foreground peer-checked:border-accent peer-checked:shadow peer-checked:shadow-accent/40"
          )}
        >
          <Check className="size-3 opacity-0 transition-opacity duration-150 peer-checked:opacity-100 animate-check-pop" />
        </span>
      </span>
      <span className={cn("leading-none", error && "text-destructive")}>{label}</span>
    </label>
  );
};

export default CheckboxField;
