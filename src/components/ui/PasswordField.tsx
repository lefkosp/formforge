"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

function computeStrength(value: string): { label: string; level: number } {
  let level = 0;
  if (value.length >= 8) level++;
  if (/[A-Z]/.test(value)) level++;
  if (/[0-9]/.test(value)) level++;
  if (/[^A-Za-z0-9]/.test(value)) level++;
  const labels = ["Very weak", "Weak", "Medium", "Strong", "Very strong"];
  return { label: labels[level] ?? "Very weak", level };
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  label,
  ...props
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const error = (errors as Record<string, { message?: unknown }>)[name];
  const [visible, setVisible] = React.useState(false);
  const value: string = watch(name) ?? "";
  const strength = computeStrength(value);

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className={cn(error && "text-destructive")}>
        {label}
      </Label>
      <div className="relative">
        <Input
          id={name}
          type={visible ? "text" : "password"}
          aria-invalid={!!error}
          className={cn(
            error && "border-destructive focus-visible:ring-destructive pr-16"
          )}
          {...register(name)}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-2 text-xs"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? "Hide" : "Show"}
        </Button>
      </div>
      <div className="h-2 w-full rounded bg-muted overflow-hidden">
        <div
          className={cn("h-full bg-primary transition-all")}
          style={{ width: `${(strength.level / 4) * 100}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{strength.label}</p>
      {error && (
        <p className="text-sm text-destructive animate-fade-in">
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default PasswordField;
