"use client";

import * as React from "react";
import { DocsLayout } from "@/components/docs/layout";

export default function FormPlaygroundPage() {
  const [labelMode, setLabelMode] = React.useState<"floating" | "stacked">("floating");

  const Toggle = () => (
    <div className="inline-flex rounded-md border bg-card p-1 text-sm" role="tablist" aria-label="Label mode">
      <button
        type="button"
        className={`px-3 py-1.5 rounded ${labelMode === "floating" ? "bg-accent text-accent-foreground shadow" : "text-muted-foreground hover:bg-accent/40"}`}
        onClick={() => setLabelMode("floating")}
        role="tab"
        aria-selected={labelMode === "floating"}
      >
        Floating
      </button>
      <button
        type="button"
        className={`px-3 py-1.5 rounded ${labelMode === "stacked" ? "bg-accent text-accent-foreground shadow" : "text-muted-foreground hover:bg-accent/40"}`}
        onClick={() => setLabelMode("stacked")}
        role="tab"
        aria-selected={labelMode === "stacked"}
      >
        Stacked
      </button>
    </div>
  );

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="space-y-3">
      <h3 className="text-base font-semibold text-muted-foreground">{title}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {children}
      </div>
    </section>
  );

  const Panel: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="rounded-lg border bg-card p-4">
      <div className="mb-3 text-xs font-medium text-muted-foreground">{title}</div>
      <div className="space-y-3">{children}</div>
    </div>
  );

  const FloatingLabel = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => (
    <div className="relative">
      {children}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-3 z-10 origin-[0] transform text-muted-foreground transition-all duration-200 ease-in-out peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-foreground peer-[&:not(:placeholder-shown)]:-translate-y-3 peer-[&:not(:placeholder-shown)]:scale-90"
      >
        {label}
      </label>
    </div>
  );

  const StackedLabel = ({ id, label }: { id: string; label: string }) => (
    <label htmlFor={id} className="form-label">{label}</label>
  );

  const InputStyled = ({ id, type = "text", placeholder = " ", className = "" }: { id: string; type?: string; placeholder?: string; className?: string }) => (
    <input id={id} type={type} placeholder={placeholder} className={`peer form-input ${className}`} />
  );

  const TextareaStyled = ({ id, placeholder = " ", className = "" }: { id: string; placeholder?: string; className?: string }) => (
    <textarea id={id} placeholder={placeholder} rows={4} className={`peer w-full rounded-md border border-input bg-background px-3 pt-5 pb-2 text-sm shadow-sm placeholder:text-muted-foreground placeholder:italic focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent transition-all duration-200 ease-in-out hover:ring-2 hover:ring-accent/50 ${className}`} />
  );

  const SelectStyled = ({ id }: { id: string }) => (
    <div className="relative">
      <select id={id} className="peer h-12 w-full appearance-none rounded-md border border-input bg-background px-3 pt-5 text-sm shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-accent focus:border-transparent hover:ring-2 hover:ring-accent/50">
        <option value="" disabled hidden></option>
        <option value="">Select an option</option>
        <option>Option A</option>
        <option>Option B</option>
        <option>Option C</option>
      </select>
      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </div>
  );

  return (
    <DocsLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight">Form Playground</h1>
            <p className="text-muted-foreground">Compare default browser controls with FormForge-styled controls. Toggle label mode to preview floating vs stacked labels.</p>
          </div>
          <Toggle />
        </div>

        {/* Text inputs */}
        <Section title="Text input">
          <Panel title="Default">
            <label htmlFor="d-text" className="text-sm font-medium">Text</label>
            <input id="d-text" type="text" placeholder="Your name" className="block w-full rounded-md border px-3 py-2 text-sm" />
          </Panel>
          <Panel title="Custom styled">
            {labelMode === "stacked" ? (
              <>
                <StackedLabel id="c-text" label="Text" />
                <InputStyled id="c-text" type="text" placeholder="Your name" />
              </>
            ) : (
              <FloatingLabel id="c-text" label="Text">
                <InputStyled id="c-text" type="text" />
              </FloatingLabel>
            )}
          </Panel>
        </Section>

        {/* Password */}
        <Section title="Password">
          <Panel title="Default">
            <label htmlFor="d-pass" className="text-sm font-medium">Password</label>
            <input id="d-pass" type="password" placeholder="••••••••" className="block w-full rounded-md border px-3 py-2 text-sm" />
          </Panel>
          <Panel title="Custom styled">
            {labelMode === "stacked" ? (
              <>
                <StackedLabel id="c-pass" label="Password" />
                <InputStyled id="c-pass" type="password" placeholder="••••••••" />
              </>
            ) : (
              <FloatingLabel id="c-pass" label="Password">
                <InputStyled id="c-pass" type="password" />
              </FloatingLabel>
            )}
          </Panel>
        </Section>

        {/* Textarea */}
        <Section title="Textarea">
          <Panel title="Default">
            <label htmlFor="d-textarea" className="text-sm font-medium">Message</label>
            <textarea id="d-textarea" rows={4} placeholder="Write something…" className="block w-full rounded-md border px-3 py-2 text-sm" />
          </Panel>
          <Panel title="Custom styled">
            {labelMode === "stacked" ? (
              <>
                <StackedLabel id="c-textarea" label="Message" />
                <TextareaStyled id="c-textarea" placeholder="Write something…" />
              </>
            ) : (
              <FloatingLabel id="c-textarea" label="Message">
                <TextareaStyled id="c-textarea" />
              </FloatingLabel>
            )}
          </Panel>
        </Section>

        {/* Select */}
        <Section title="Select">
          <Panel title="Default">
            <label htmlFor="d-select" className="text-sm font-medium">Choice</label>
            <select id="d-select" className="block w-full rounded-md border px-3 py-2 text-sm">
              <option>Option A</option>
              <option>Option B</option>
              <option>Option C</option>
            </select>
          </Panel>
          <Panel title="Custom styled">
            {labelMode === "stacked" ? (
              <>
                <StackedLabel id="c-select" label="Choice" />
                <SelectStyled id="c-select" />
              </>
            ) : (
              <FloatingLabel id="c-select" label="Choice">
                <SelectStyled id="c-select" />
              </FloatingLabel>
            )}
          </Panel>
        </Section>

        {/* Checkbox */}
        <Section title="Checkbox">
          <Panel title="Default">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              <span>Accept terms</span>
            </label>
          </Panel>
          <Panel title="Custom styled">
            <label className="group flex items-center gap-3 text-sm cursor-pointer select-none">
              <span className="relative inline-flex items-center justify-center">
                <input type="checkbox" className="peer absolute inset-0 size-5 cursor-pointer opacity-0" />
                <span className="inline-flex size-5 items-center justify-center rounded-md border border-input bg-background shadow-sm transition-all duration-200 ease-in-out group-hover:ring-2 group-hover:ring-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-checked:bg-accent peer-checked:text-accent-foreground peer-checked:border-accent peer-checked:shadow peer-checked:shadow-accent/40">
                  <svg className="size-3 opacity-0 transition-opacity duration-150 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
              </span>
              <span className="leading-none">Accept terms</span>
            </label>
          </Panel>
        </Section>

        {/* Toggle */}
        <Section title="Toggle">
          <Panel title="Default">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" role="switch" />
              <span>Enable feature</span>
            </label>
          </Panel>
          <Panel title="Custom styled">
            <div className="flex items-center gap-3">
              <button type="button" aria-pressed="false" className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input" onClick={(e) => {
                const el = e.currentTarget;
                const isOn = el.getAttribute("data-state") === "checked";
                el.setAttribute("data-state", isOn ? "unchecked" : "checked");
              }} data-state="unchecked">
                <span className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"></span>
              </button>
              <span className="text-sm">Enable feature</span>
            </div>
          </Panel>
        </Section>

        {/* Date picker */}
        <Section title="Date picker">
          <Panel title="Default">
            <label htmlFor="d-date" className="text-sm font-medium">Date</label>
            <input id="d-date" type="date" className="block w-full rounded-md border px-3 py-2 text-sm" />
          </Panel>
          <Panel title="Custom styled">
            <StackedLabel id="c-date" label="Date" />
            <InputStyled id="c-date" type="date" placeholder="" />
          </Panel>
        </Section>

        {/* Radio group */}
        <Section title="Radio group">
          <Panel title="Default">
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">Choose one</legend>
              <label className="flex items-center gap-2 text-sm"><input name="d-radio" type="radio" /> Alpha</label>
              <label className="flex items-center gap-2 text-sm"><input name="d-radio" type="radio" /> Beta</label>
              <label className="flex items-center gap-2 text-sm"><input name="d-radio" type="radio" /> Gamma</label>
            </fieldset>
          </Panel>
          <Panel title="Custom styled">
            <div className="space-y-2">
              <div className="form-label">Choose one</div>
              <div className="flex flex-wrap gap-3">
                {["Alpha","Beta","Gamma"].map((opt) => (
                  <label key={opt} className="group inline-flex items-center gap-2 text-sm cursor-pointer">
                    <span className="relative inline-flex items-center justify-center">
                      <input type="radio" name="c-radio" className="peer absolute inset-0 size-5 opacity-0 cursor-pointer" />
                      <span className="inline-flex size-5 items-center justify-center rounded-full border border-input bg-background shadow-sm transition-all duration-200 ease-in-out group-hover:ring-2 group-hover:ring-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                        <span className="size-2.5 rounded-full bg-accent opacity-0 transition-opacity duration-150 peer-checked:opacity-100" />
                      </span>
                    </span>
                    <span className="leading-none">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </Panel>
        </Section>

        {/* Range slider */}
        <Section title="Range slider">
          <Panel title="Default">
            <label htmlFor="d-range" className="text-sm font-medium">Volume</label>
            <input id="d-range" type="range" className="block w-full" />
          </Panel>
          <Panel title="Custom styled">
            <label htmlFor="c-range" className="form-label">Volume</label>
            <input id="c-range" type="range" className="block w-full" />
            <div className="text-xs text-muted-foreground">Native range input is used; style track/thumb via CSS if needed.</div>
          </Panel>
        </Section>

        {/* Color picker */}
        <Section title="Color picker">
          <Panel title="Default">
            <label htmlFor="d-color" className="text-sm font-medium">Favorite color</label>
            <input id="d-color" type="color" className="h-10 w-16 rounded border" />
          </Panel>
          <Panel title="Custom styled">
            <label htmlFor="c-color" className="form-label">Favorite color</label>
            <div className="flex items-center gap-2">
              <input id="c-color" type="color" className="h-10 w-16 rounded border" />
              <input type="text" defaultValue="#000000" className="form-input w-28" />
              <div className="h-8 w-8 rounded border" />
            </div>
          </Panel>
        </Section>

        {/* File upload */}
        <Section title="File upload">
          <Panel title="Default">
            <label htmlFor="d-file" className="text-sm font-medium">Attachment</label>
            <input id="d-file" type="file" className="block w-full text-sm" />
          </Panel>
          <Panel title="Custom styled">
            <label htmlFor="c-file" className="form-label">Attachment</label>
            <input id="c-file" type="file" className="block w-full text-sm file:mr-4 file:rounded-md file:border file:border-input file:bg-background file:px-3 file:py-2 file:text-sm hover:file:bg-accent hover:file:text-accent-foreground" />
          </Panel>
        </Section>
      </div>
    </DocsLayout>
  );
}