"use client";

import { DocsLayout } from "@/components/docs/layout";
import { CodePreview } from "@/components/docs/code-preview";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/ui/InputField";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export default function Home() {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form data:", data);
  };

  const exampleComponent = (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-4 w-80"
      >
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
        />
        <button
          type="submit"
          className="form-button form-button-primary w-full"
        >
          Submit
        </button>
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
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
        />
        <button type="submit" className="form-button form-button-primary">
          Submit
        </button>
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
    <DocsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">FormForge</h1>
          <p className="text-lg text-muted-foreground">
            Beautiful, accessible forms for modern web apps
          </p>
        </div>

        {/* Description */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            FormForge is a comprehensive form library built for React
            applications that combines the power of React Hook Form with Zod
            validation to create type-safe, accessible, and beautiful forms with
            minimal boilerplate.
          </p>

          <h2>Key Features</h2>
          <ul>
            <li>
              <strong>Type Safety:</strong> Full TypeScript support with Zod
              schema validation
            </li>
            <li>
              <strong>Accessibility:</strong> Built-in ARIA attributes and
              keyboard navigation
            </li>
            <li>
              <strong>Customizable:</strong> Flexible theming with Tailwind CSS
            </li>
            <li>
              <strong>Developer Experience:</strong> Minimal setup, maximum
              productivity
            </li>
            <li>
              <strong>Performance:</strong> Optimized rendering with React Hook
              Form
            </li>
          </ul>

          <h2>Quick Start</h2>
          <p>Here's a simple example of how to create a form with FormForge:</p>
        </div>

        {/* Code Preview */}
        <CodePreview
          component={exampleComponent}
          tsxCode={tsxCode}
          zodSchema={zodSchema}
        />

        {/* Getting Started */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>Installation</h2>
          <pre className="bg-muted p-4 rounded-lg">
            <code>
              npm install formforge react-hook-form @hookform/resolvers zod
            </code>
          </pre>

          <h2>Next Steps</h2>
          <p>
            Explore the components in the sidebar to see all available form
            fields and their configurations. Each component includes live
            examples, code snippets, and detailed documentation.
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}
