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

const RadioGroupField = ({ name, label, options, className }: RadioGroupFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = (errors as Record<string, { message?: unknown }>)[name];

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className={cn(error && "text-destructive")}>{label}</Label>
      <div className={cn("space-y-2", error && "[&_*]:data-[state=unchecked]:border-destructive/50")}> 
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center space-x-2 text-sm">
            <input
              type="radio"
              value={opt.value}

              className={cn("h-4 w-4", error && "ring-1 ring-destructive")}
              {...register(name)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default RadioGroupField;
