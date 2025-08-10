"use client";

import { useFormContext } from "react-hook-form";
import { Input, InputProps } from "./input";
import { cn } from "@/lib/utils";
import { Label } from "./label";

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
    <div className="relative">
      <Input
        id={name}
        type={type}
        placeholder=" "
        aria-invalid={!!error}
        className={cn(
          "peer h-12 w-full rounded-md border border-input bg-background px-3 pt-5 text-sm placeholder:text-muted-foreground placeholder:italic shadow-sm",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent focus-visible:shadow-none transition-all duration-200 ease-in-out",
          "hover:ring-2 hover:ring-accent/50",
          error &&
            "border-destructive animate-shake focus-visible:ring-destructive"
        )}
        {...register(name)}
        {...props}
      />
      <Label
        htmlFor={name}
        className={cn(
          "pointer-events-none absolute left-3 top-4 z-10 origin-[0] transform text-muted-foreground transition-all duration-200 ease-in-out",
          "peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-muted-foreground peer-focus:font-normal",
          "peer-[&:not(:placeholder-shown)]:-translate-y-3 peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:font-normal",
          error && "text-destructive"
        )}
      >
        {label}
      </Label>
      {error && <p className="form-error-text">{error.message?.toString()}</p>}
    </div>
  );
};

export default InputField;
