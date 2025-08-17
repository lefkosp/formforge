"use client";

import Link from "next/link";
import { CodePreview } from "@/components/docs/code-preview";
import { ThemeProvider } from "@/components/docs/theme-provider";
import { ThemeToggle } from "@/components/docs/theme-toggle";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "@/components/ui/InputField";
import { CheckCircle2, Sparkles, Gauge, ShieldCheck, PlugZap, Palette } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export default function LandingPage() {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form data:", data);
  };

  const exampleComponent = (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 w-80">
        <InputField name="email" label="Email" type="email" placeholder="you@example.com" />
        <InputField name="password" label="Password" type="password" placeholder="••••••••" />
        <button type="submit" className="form-button form-button-primary w-full">Submit</button>
      </form>
    </FormProvider>
  );

  const tsxCode = `import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/ui/InputField";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export default function ExampleForm() {
  const methods = useForm<z.infer<typeof formSchema>>({ resolver: zodResolver(formSchema) });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <InputField name="email" label="Email" type="email" placeholder="you@example.com" />
        <InputField name="password" label="Password" type="password" placeholder="••••••••" />
        <button type="submit" className="form-button form-button-primary">Submit</button>
      </form>
    </FormProvider>
  );
}`;

  const zodSchema = `import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type FormData = z.infer<typeof formSchema>;`;

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20" /></svg>
              <span className="font-semibold">FormForge</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/getting-started" className="text-muted-foreground hover:text-foreground">Getting started</Link>
              <Link href="/components" className="text-muted-foreground hover:text-foreground">Components</Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>

        {/* Hero */}
        <main className="flex-1">
          <section className="relative border-b">
            <div className="mx-auto max-w-6xl px-6 py-20 text-center">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground mb-4">
                <span className="mr-2 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                New: Fully typed React + Zod form components
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-[var(--accent)] via-primary to-[var(--accent)] bg-clip-text text-transparent">
                  Beautiful, accessible forms
                </span>
                <span className="block mt-2">for modern web apps</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                FormForge gives you production-ready form primitives powered by React Hook Form and Zod. Copy, paste, and ship faster.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Link href="/getting-started" className="form-button form-button-primary">Get started</Link>
                <Link href="/components" className="form-button">Explore components</Link>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mx-auto max-w-6xl px-6 py-14">
            <div className="grid gap-6 md:grid-cols-3">
              <Feature icon={<CheckCircle2 className="h-5 w-5" />} title="Type-safe" desc="End-to-end typings via Zod schemas and TS generics." />
              <Feature icon={<ShieldCheck className="h-5 w-5" />} title="Accessible" desc="ARIA-compliant with keyboard navigation." />
              <Feature icon={<Gauge className="h-5 w-5" />} title="Fast" desc="Optimized with React Hook Form for minimal re-renders." />
              <Feature icon={<PlugZap className="h-5 w-5" />} title="Integrations" desc="Works with your favorite UI and validation tools." />
              <Feature icon={<Palette className="h-5 w-5" />} title="Theming" desc="Tailwind-first styling with accent controls." />
              <Feature icon={<Sparkles className="h-5 w-5" />} title="DX focused" desc="Copy-paste snippets and live previews built-in." />
            </div>
          </section>

          {/* Live Preview */}
          <section className="border-t bg-card/30">
            <div className="mx-auto max-w-6xl px-6 py-14">
              <h2 className="text-2xl font-semibold tracking-tight mb-4">See it in action</h2>
              <CodePreview component={exampleComponent} tsxCode={tsxCode} zodSchema={zodSchema} />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t">
          <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted-foreground flex items-center justify-between">
            <span>© {new Date().getFullYear()} FormForge</span>
            <div className="flex gap-4">
              <Link href="/getting-started" className="hover:text-foreground">Docs</Link>
              <Link href="/components" className="hover:text-foreground">Components</Link>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="flex items-center gap-2 text-sm font-medium">
        <span className="text-primary">{icon}</span>
        {title}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
