import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FormForge - Beautiful, accessible forms",
  description:
    "Copy-paste form components powered by Tailwind, React Hook Form, and Zod",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-screen overflow-hidden bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
