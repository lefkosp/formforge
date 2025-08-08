"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";

interface DatePickerFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const DatePickerField = ({ name, label, ...props }: DatePickerFieldProps) => {
  const { register, formState: { errors } } = useFormContext();
  const error = (errors as Record<string, { message?: unknown }>)[name];

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className={cn(error && "text-destructive")}>{label}</Label>
      <Input
        id={name}
        type="date"
        aria-invalid={!!error}
        className={cn(error && "border-destructive focus-visible:ring-destructive")}
        {...register(name)}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default DatePickerField;
