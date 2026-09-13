import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { EmailCapture } from "./EmailCapture";
import { resolveRelated, type ToolKey } from "./RelatedContent";

export { ALL_TOOLS, type ToolKey } from "./RelatedContent";

export interface FaqItem { q: string; a: string }

interface Props {
  toolKey: ToolKey;
  h1: string;
  tagline: string;
  intro: string;
  calculator: ReactNode;
  works: string;
  why: string;
  mistakes: string[];
  faqs: FaqItem[];
  related: string[];
}

export function ToolShell({ toolKey, h1, tagline, intro, calculator, works, why, mistakes, faqs, related }: Props) {
  const relatedItems = resolveRelated(related);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: h1,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: tagline,
  };

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-brand/30 blur-3xl animate-blob" />
          <div className="absolute top-20 -right-10 h-72 w-72 rounded-full bg-brand-2/40 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
          <div className="relative mx-auto max-w-4xl px-4 pt-16 pb-10 md:pt-24 md:pb-14 md:px-6">
            <nav className="mb-6 flex items-center gap-1 text-xs text-muted-foreground animate-fade-up">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">{h1}</span>
            </nav>
            <span className="inline-flex rounded-full glass px-3 py-1 text-xs font-medium text-brand animate-fade-up">Free · No signup · Works worldwide</span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl animate-fade-up">
              {h1}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "60ms" }}>
              {intro}
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="relative -mt-4">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <div className="glass rounded-3xl p-4 shadow-glow md:p-8 animate-fade-up">
              {calculator}
            </div>
          </div>
        </section>

        {/* SEO content */}
        <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
          <div className="prose-lg space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold">How this calculator works</h2>
              <p className="mt-3 text-muted-foreground">{works}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">Why this matters for freelancers</h2>
              <p className="mt-3 text-muted-foreground whitespace-pre-line">{why}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">Common mistakes freelancers make</h2>
              <ul className="mt-3 space-y-2">
                {mistakes.map((m, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
              <div className="mt-4 space-y-3">
                {faqs.map((f) => (
                  <details key={f.q} className="group rounded-2xl border bg-card p-5 transition-colors open:bg-secondary/50">
                    <summary className="cursor-pointer list-none font-medium flex items-center justify-between gap-4">
                      {f.q}
                      <ChevronRight className="h-4 w-4 flex-shrink-0 transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mx-auto max-w-5xl px-4 pb-16 md:px-6">
          <h2 className="font-display text-2xl font-bold">Related</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {relatedItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="absolute inset-0 bg-gradient-brand opacity-0 transition-opacity group-hover:opacity-5" />
                <span className="inline-block rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">{item.kind}</span>
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand">
                  {item.cta} <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
        <EmailCapture />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
    </div>
  );
}

export function formatMoney(n: number, currency = "USD") {
  if (!isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
}

export function Stat({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: "brand" | "warm" }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft animate-count-up">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`mt-2 font-display text-3xl font-bold ${accent === "warm" ? "text-gradient-warm" : "text-gradient-brand"}`}>
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-sm font-medium">
        {label}
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </span>
      {children}
    </label>
  );
}
