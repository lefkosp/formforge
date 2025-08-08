"use client";

import { useFormContext } from "react-hook-form";
import { Input, InputProps } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";

interface InputFieldProps extends InputProps {
  name: string;
  label: string;
}

const InputField = ({
  name,
  label,
  type = "text",
  ...props
}: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className={cn(error && "text-destructive")}>
        {label}
      </Label>
      <Input
        id={name}
        type={type}
        aria-invalid={!!error}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive"
        )}
        {...register(name)}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive animate-fade-in">
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default InputField;
