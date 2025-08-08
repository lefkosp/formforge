"use client";

import { useFormContext } from "react-hook-form";
import { Input, InputProps } from "./input";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import * as React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface InputFieldProps extends InputProps {
  name: string;
  label: string;
  // When provided, forces a specific validation state regardless of RHF
  validationState?: "none" | "valid" | "invalid";
  // Optional error message to display (also sets invalid state)
  error?: string;
  // Optional helper text shown when not invalid
  helperText?: string;
  // Optional custom icons for states
  validIcon?: React.ReactNode;
  invalidIcon?: React.ReactNode;
}

const InputField = ({
  name,
  label,
  type = "text",
  validationState = "none",
  error: errorProp,
  helperText,
  validIcon,
  invalidIcon,
  ...props
}: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const rhfError = (errors as Record<string, { message?: unknown }>)[name];

  const isInvalidExplicit = validationState === "invalid";
  const isValidExplicit = validationState === "valid";
  const isInvalid = isInvalidExplicit || !!rhfError || !!errorProp;
  const isValid = !isInvalid && isValidExplicit;

  const errorMessage = isInvalid
    ? (errorProp ?? rhfError?.message?.toString())
    : undefined;

  const helperId = `${name}-helper`;
  const errorId = `${name}-error`;

  return (
    <div className="relative">
      <Input
        id={name}
        type={type}
        placeholder=" "
        aria-invalid={isInvalid}
        aria-describedby={isInvalid ? errorId : helperText ? helperId : undefined}
        className={cn(
          "peer h-12 w-full rounded-md border border-input bg-background px-3 pt-5 text-sm placeholder:text-muted-foreground placeholder:italic shadow-sm",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent focus-visible:shadow-none transition-all duration-200 ease-in-out",
          "hover:ring-2 hover:ring-accent/50",
          (isInvalid || isValid) && "pr-10",
          isInvalid && "border-destructive animate-shake focus-visible:ring-destructive"
        )}
        {...register(name)}
        {...props}
      />
      <Label
        htmlFor={name}
        className={cn(
          "pointer-events-none absolute left-3 top-3 z-10 origin-[0] transform text-muted-foreground transition-all duration-200 ease-in-out",
          "peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-foreground",
          "peer-[&:not(:placeholder-shown)]:-translate-y-3 peer-[&:not(:placeholder-shown)]:scale-90",
          isInvalid && "text-destructive"
        )}
      >
        {label}
      </Label>

      {(isInvalid || isValid) && (
        <span
          aria-hidden
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center",
            isInvalid ? "text-destructive" : "text-emerald-600"
          )}
        >
          {isInvalid
            ? (invalidIcon ?? <AlertCircle className="size-4" />)
            : (validIcon ?? <CheckCircle2 className="size-4" />)}
        </span>
      )}

      {isInvalid && errorMessage && (
        <p id={errorId} className="form-error-text">
          {errorMessage}
        </p>
      )}
      {!isInvalid && helperText && (
        <p id={helperId} className="text-xs text-muted-foreground mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;
