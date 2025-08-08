"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Label } from "./label";
import { Switch } from "./switch";
import { cn } from "@/lib/utils";

interface SwitchFieldProps {
  name: string;
  label: string;
  className?: string;
}

const SwitchField = ({ name, label, className }: SwitchFieldProps) => {
  const { control, formState: { errors } } = useFormContext();
  const error = (errors as Record<string, { message?: unknown }>)[name];

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className={cn(error && "text-destructive")}>{label}</Label>
      <div className="flex items-center space-x-3">
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange, onBlur, ref } }) => (
            <Switch
              id={name}
              checked={!!value}
              onCheckedChange={onChange}
              onBlur={onBlur}
              ref={ref}
              aria-invalid={!!error}
            />
          )}
        />
      </div>
      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default SwitchField;
