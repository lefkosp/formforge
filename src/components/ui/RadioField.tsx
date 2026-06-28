"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface RadioOption { label: string; value: string }

interface RadioFieldProps {
  name: string;
  label?: string;
  options: RadioOption[];
  className?: string;
}

const RadioField: React.FC<RadioFieldProps> = ({ name, label, options, className }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = (errors as Record<string, { message?: unknown }>)[name];

  return (
    <div className={cn("space-y-2", className)}>
      {label && <div className={cn("text-sm font-medium", error && "text-destructive")}>{label}</div>}
      <div className="flex flex-wrap gap-3">
        {options.map(opt => (
          <label key={opt.value} className="group inline-flex items-center gap-2 text-sm cursor-pointer">
            <span className="relative inline-flex items-center justify-center">
              <input type="radio" value={opt.value} {...register(name)} className="peer absolute inset-0 size-5 opacity-0 cursor-pointer" />
              <span className="inline-flex size-5 items-center justify-center rounded-full border border-input bg-background shadow-sm transition-all duration-200 ease-in-out group-hover:border-accent group-hover:ring-2 group-hover:ring-accent/40 peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                <span className="size-2.5 rounded-full bg-accent opacity-0 transition-opacity duration-150 peer-checked:opacity-100"></span>
              </span>
            </span>
            <span className="leading-none">{opt.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-xs text-destructive animate-fade-in">{error.message?.toString()}</p>
      )}
    </div>
  )
}

export default RadioField;
