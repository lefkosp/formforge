"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type FormButtonVariant = "primary" | "secondary";

export interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: FormButtonVariant;
}

const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const variantClass =
      variant === "primary" ? "form-button-primary" : "form-button-secondary";

    return (
      <button
        ref={ref}
        className={cn("form-button", variantClass, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

FormButton.displayName = "FormButton";

export default FormButton;
