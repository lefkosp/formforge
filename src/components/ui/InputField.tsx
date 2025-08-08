"use client";

import { useFormContext } from "react-hook-form";
import { Input, InputProps } from "./input";
import { cn } from "@/lib/utils";
import { Label } from "./label";

interface InputFieldProps extends InputProps {
  name: string;
  label: string;
  labelPosition?: "outside" | "inside"; // default: "inside"
}

const InputField = ({
  name,
  label,
  type = "text",
  labelPosition = "inside",
  placeholder,
  className,
  style,
  id,
  ...props
}: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = (errors as Record<string, { message?: unknown }>)[name];
  const inputId = id ?? name;

  if (labelPosition === "outside") {
    return (
      <div className="space-y-1.5">
        <Label htmlFor={inputId} className={cn(error && "text-destructive")}>{label}</Label>
        <Input
          id={inputId}
          type={type}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            "h-12 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground placeholder:italic shadow-sm",
            "focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent focus-visible:shadow-none transition-all duration-200 ease-in-out",
            "hover:ring-2 hover:ring-accent/50",
            error && "border-destructive animate-shake focus-visible:ring-destructive",
            className
          )}
          style={style}
          {...register(name)}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="form-error-text">
            {error.message?.toString()}
          </p>
        )}
      </div>
    );
  }

  // Floating label (inside)
  return (
    <div className="relative">
      {/* Suggestion: In the docs site, a small toggle could live near the example tabs to switch between "inside" and "outside" labelPosition for live preview. */}
      <Input
        id={inputId}
        type={type}
        placeholder=" "
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn(
          "peer h-12 w-full rounded-md border border-input bg-background px-3 pt-5 text-sm placeholder:text-muted-foreground placeholder:italic shadow-sm",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent focus-visible:shadow-none transition-all duration-200 ease-in-out",
          "hover:ring-2 hover:ring-accent/50",
          error && "border-destructive animate-shake focus-visible:ring-destructive",
          className
        )}
        style={style}
        {...register(name)}
        {...props}
      />
      <Label
        htmlFor={inputId}
        className={cn(
          "pointer-events-none absolute left-3 top-3 z-10 origin-[0] transform text-muted-foreground transition-all duration-200 ease-in-out",
          "peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-foreground",
          "peer-[&:not(:placeholder-shown)]:-translate-y-3 peer-[&:not(:placeholder-shown)]:scale-90",
          error && "text-destructive"
        )}
      >
        {label}
      </Label>
      {error && (
        <p id={`${inputId}-error`} className="form-error-text">
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default InputField;
