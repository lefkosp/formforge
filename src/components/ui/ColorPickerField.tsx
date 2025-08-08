"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";

interface ColorPickerFieldProps {
  name: string;
  label: string;
  swatches?: string[];
  className?: string;
}

const defaultSwatches = ["#000000", "#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#00ffff", "#ffff00", "#ffffff"];

const ColorPickerField: React.FC<ColorPickerFieldProps> = ({ name, label, swatches = defaultSwatches, className }) => {
  const { control, formState: { errors } } = useFormContext();
  const error = (errors as Record<string, { message?: unknown }>)[name];

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={`${name}-color`} className={cn(error && "text-destructive")}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Input id={`${name}-color`} type="color" value={(value as string) ?? "#000000"} onChange={(e) => onChange(e.target.value)} />
              <Input type="text" value={(value as string) ?? "#000000"} onChange={(e) => onChange(e.target.value)} className="w-28" />
              <div className="h-8 w-8 rounded border" style={{ backgroundColor: (value as string) ?? "#000000" }} />
            </div>
            <div className="flex flex-wrap gap-2">
              {swatches.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="h-6 w-6 rounded border"
                  style={{ backgroundColor: c }}
                  onClick={() => onChange(c)}
                  aria-label={`Choose ${c}`}
                />
              ))}
            </div>
          </div>
        )}
      />
      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default ColorPickerField;
