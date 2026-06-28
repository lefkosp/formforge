"use client";

import { DocsLayout } from "@/components/docs/layout";

export default function GettingStartedPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Getting Started</h1>
          <p className="text-lg text-muted-foreground">
            Learn how to install and set up FormForge in your React project.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>Installation</h2>
          <p>
            FormForge is a copy-paste component library (like shadcn/ui), not an
            npm package yet. Clone the repo, install the docs app dependencies,
            then copy the components you need into your project.
          </p>

          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`git clone https://github.com/lefkosp/formforge.git
cd formforge
npm install`}</code>
          </pre>

          <p>
            In your own React app, install the peer dependencies FormForge
            components expect:
          </p>

          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>
              npm install react-hook-form @hookform/resolvers zod class-variance-authority clsx tailwind-merge
            </code>
          </pre>

          <p>
            Copy field components from{" "}
            <code>src/components/ui/</code> into your project, along with any
            Radix primitives they import. Each docs page includes a live preview
            and copyable example.
          </p>

          <h2>Basic Setup</h2>
          <p>Import and use FormForge components in your React application:</p>

          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/ui/InputField";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export default function MyForm() {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <FormProvider {...methods}>
      <form>
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
        />
      </form>
    </FormProvider>
  );
}`}</code>
          </pre>

          <h2>Styling</h2>
          <p>
            FormForge uses Tailwind CSS for styling. Make sure you have Tailwind
            CSS configured in your project. The components are designed to work
            with the default Tailwind theme but can be customized to match your
            design system.
          </p>

          <h2>TypeScript</h2>
          <p>
            FormForge is built with TypeScript and provides full type safety.
            All components include proper TypeScript definitions, and the
            integration with Zod ensures that your form data is fully typed.
          </p>

          <h2>Next Steps</h2>
          <p>
            Browse the components in the sidebar, try the visual form builder,
            and copy the examples into your app.
          </p>
        </div>
      </div>
    </DocsLayout>
  );
}
