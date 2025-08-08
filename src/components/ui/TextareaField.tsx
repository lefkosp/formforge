"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "./label";
import { cn } from "@/lib/utils";

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  className?: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({ name, label, className, rows = 4, ...props }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = (errors as Record<string, { message?: unknown }>)[name];

  return (
    <div className={cn("relative", className)}>
      <Label
        htmlFor={name}
        className={cn(
          "pointer-events-none absolute left-3 top-3 z-10 origin-[0] transform text-muted-foreground transition-all duration-200 ease-in-out",
          "peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-foreground",
          "peer-[&:not(:placeholder-shown)]:-translate-y-3 peer-[&:not(:placeholder-shown)]:scale-90",
          error && "text-destructive"
        )}
      >
        {label}
      </Label>
      <textarea
        id={name}
        placeholder=" "
        rows={rows}
        aria-invalid={!!error}
        className={cn(
          "peer w-full rounded-md border border-input bg-background px-3 pt-5 pb-2 text-sm shadow-sm placeholder:text-muted-foreground placeholder:italic",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent transition-all duration-200 ease-in-out",
          "hover:ring-2 hover:ring-accent/50",
          error && "border-destructive animate-shake focus-visible:ring-destructive"
        )}
        {...register(name)}
        {...props}
      />
      {error && (
        <p className="form-error-text">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default TextareaField;
