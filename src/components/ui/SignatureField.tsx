"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "./label";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface SignatureFieldProps {
  name: string;
  label: string;
  width?: number;
  height?: number;
  className?: string;
}

const SignatureField: React.FC<SignatureFieldProps> = ({ name, label, width = 320, height = 160, className }) => {
  const { control, formState: { errors } } = useFormContext();
  const error = (errors as Record<string, { message?: unknown }>)[name];
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const drawing = React.useRef(false);
  const last = React.useRef<{ x: number; y: number } | null>(null);

  const start = (x: number, y: number) => {
    drawing.current = true;
    last.current = { x, y };
  };
  const move = (x: number, y: number) => {
    if (!drawing.current || !canvasRef.current || !last.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--color-foreground") || "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    last.current = { x, y };
  };
  const end = () => {
    drawing.current = false;
    last.current = null;
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label className={cn(error && "text-destructive")}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="space-y-2">
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              className={cn("rounded-md border bg-card touch-none", error && "border-destructive")}
              onMouseDown={(e) => start(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
              onMouseMove={(e) => move(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
              onMouseUp={end}
              onMouseLeave={end}
              onTouchStart={(e) => {
                const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
                const t = e.touches[0];
                start(t.clientX - rect.left, t.clientY - rect.top);
              }}
              onTouchMove={(e) => {
                const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
                const t = e.touches[0];
                move(t.clientX - rect.left, t.clientY - rect.top);
              }}
              onTouchEnd={end}
            />
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => {
                const c = canvasRef.current; if (!c) return; const ctx = c.getContext("2d"); if (!ctx) return; ctx.clearRect(0,0,c.width,c.height); onChange("");
              }}>Clear</Button>
              <Button type="button" onClick={() => {
                const c = canvasRef.current; if (!c) return; onChange(c.toDataURL("image/png"));
              }}>Save</Button>
            </div>
            {value && (
              <div className="text-xs text-muted-foreground">Signature captured.</div>
            )}
          </div>
        )}
      />
      {error && (
        <p className="text-sm text-destructive animate-fade-in">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default SignatureField;
