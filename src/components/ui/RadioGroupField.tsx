"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "./label";
import { cn } from "@/lib/utils";

export interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupFieldProps {
  name: string;
  label: string;
  options: RadioOption[];
  className?: string;
}

const RadioGroupField = ({
  name,
  label,
  options,
  className,
}: RadioGroupFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = (errors as Record<string, { message?: unknown }>)[name];

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className={cn(error && "text-destructive")}>
        {label}
      </Label>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="group inline-flex items-center gap-2 text-sm cursor-pointer"
          >
            <span className="relative inline-flex items-center justify-center">
              <input
                type="radio"
                value={opt.value}
                {...register(name)}
                className="peer absolute inset-0 size-5 opacity-0 cursor-pointer"
              />
              <span
                className={cn(
                  "inline-flex size-5 items-center justify-center rounded-full border border-input bg-background shadow-sm transition-all duration-200 ease-in-out",
                  "group-hover:border-accent group-hover:ring-2 group-hover:ring-accent/40",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-accent",
                  error && "ring-destructive"
                )}
              >
                <span className="size-2.5 rounded-full bg-accent opacity-0 transition-opacity duration-150 peer-checked:opacity-100" />
              </span>
            </span>
            <span className={cn("leading-none", error && "text-destructive")}>
              {opt.label}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="form-error-text">{error.message?.toString()}</p>}
    </div>
  );
};

export default RadioGroupField;
