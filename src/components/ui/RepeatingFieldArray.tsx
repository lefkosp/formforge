"use client";

import * as React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

interface RepeatingFieldArrayProps {
  name: string; // array field name
  label: string;
  fieldsConfig: FieldConfig[];
  className?: string;
}

const RepeatingFieldArray: React.FC<RepeatingFieldArrayProps> = ({
  name,
  label,
  fieldsConfig,
  className,
}) => {
  const { control, register, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });

  const arrayError = (errors as Record<string, unknown> | undefined)?.[name] as { message?: unknown } | undefined;

  return (
    <div className={cn("space-y-3", className)}>
      <Label className={cn(arrayError && "text-destructive")}>{label}</Label>

      <div className="space-y-3">
        {fields.map((item, index) => (
          <div key={item.id} className="rounded-md border p-3 space-y-2">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {fieldsConfig.map((fc) => {
                const fieldError = ((errors as Record<string, unknown> | undefined)?.[name] as Array<Record<string, { message?: unknown }>> | undefined)?.[index]?.[fc.name as keyof Record<string, { message?: unknown }>] as { message?: unknown } | undefined;
                return (
                  <div key={fc.name} className="space-y-2">
                    <Label className={cn(fieldError && "text-destructive")}>{fc.label}</Label>
                    <Input
                      type={fc.type ?? "text"}
                      placeholder={fc.placeholder}
                      className={cn(fieldError && "border-destructive focus-visible:ring-destructive")}
                      {...register(`${name}.${index}.${fc.name}` as const)}
                    />
                    {fieldError && (
                      <p className="text-sm text-destructive animate-fade-in">{fieldError.message?.toString()}</p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end">
              <Button type="button" variant="outline" onClick={() => remove(index)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button type="button" onClick={() => append({} as unknown as Record<string, unknown>)}>
        Add Item
      </Button>
    </div>
  );
};

export default RepeatingFieldArray;
