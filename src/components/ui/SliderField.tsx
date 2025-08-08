"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "./label";
import { cn } from "@/lib/utils";

interface SliderFieldProps {
  name: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

const SliderField: React.FC<SliderFieldProps> = ({ name, label, min = 0, max = 100, step = 1, className }) => {
  const { control, formState: { errors }, watch } = useFormContext();
  const error = (errors as Record<string, { message?: unknown }>)[name];
  const value = watch(name);

  return (
    <div className={cn("space-y-2", className)}>
      <Label className={cn(error && "text-destructive")}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur, ref } }) => (
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={typeof value === "number" ? value : (value ? Number(value) : min)}
            onChange={(e) => onChange(Number(e.target.value))}
            onBlur={onBlur}
            ref={ref}
            className={cn("w-full", error && "accent-destructive")}
          />
        )}
      />
      <div className="text-sm text-muted-foreground">Value: <span className="font-medium text-foreground">{value ?? min}</span></div>
      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default SliderField;
