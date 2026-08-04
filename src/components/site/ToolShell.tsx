import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { EmailCapture } from "./EmailCapture";

export const ALL_TOOLS = [
  { to: "/tools/freelance-hourly-rate-calculator", title: "Freelance Hourly Rate Calculator", blurb: "Turn your target income into a rate that actually covers your business." },
  { to: "/tools/project-quote-calculator", title: "Project Quote Calculator", blurb: "Price fixed-bid projects with a built-in risk buffer and deposit." },
  { to: "/tools/invoice-late-fee-calculator", title: "Invoice Late Fee Calculator", blurb: "Calculate fair late fees and generate a reminder email." },
  { to: "/tools/self-employment-tax-estimator", title: "Self-Employment Tax Estimator", blurb: "Rough tax owed and how much to set aside per invoice." },
  { to: "/tools/currency-adjusted-rate-calculator", title: "Currency-Adjusted Rate", blurb: "See your real take-home after FX and payment platform fees." },
  { to: "/tools/annual-income-to-hourly-rate-calculator", title: "Salary → Freelance Hourly", blurb: "The hourly rate that actually matches your old day job salary." },
  { to: "/tools/freelance-profit-margin-calculator", title: "Freelance Profit Margin", blurb: "Gross margin, net margin, and break-even project count." },
  { to: "/tools/days-to-invoice-payment-calculator", title: "Cash Flow / Payment Date", blurb: "When each invoice actually lands, with overlap warnings." },
  { to: "/tools/freelance-day-rate-calculator", title: "Freelance Day Rate Calculator", blurb: "Convert your hourly rate into a defensible day rate." },
  { to: "/tools/retainer-pricing-calculator", title: "Monthly Retainer Calculator", blurb: "Price a retainer with the right hour block and discount." },
  { to: "/tools/rate-increase-calculator", title: "Rate Increase Calculator", blurb: "See the income impact of raising rates — even if clients leave." },
  { to: "/tools/payment-processing-fee-calculator", title: "Payment Fee Calculator", blurb: "What PayPal, Wise, Stripe and Payoneer really cost you." },
  { to: "/tools/vat-gst-invoice-calculator", title: "VAT / GST Invoice Calculator", blurb: "Add or strip VAT/GST and get a clean invoice breakdown." },
  { to: "/tools/scope-creep-cost-calculator", title: "Scope Creep Cost Calculator", blurb: "Price the 'quick extra' before you agree to it." },
  { to: "/tools/freelance-emergency-fund-calculator", title: "Emergency Fund Calculator", blurb: "How much runway you need before slow months hurt." },
  { to: "/tools/client-discount-calculator", title: "Discount Impact Calculator", blurb: "How many extra hours a 'small' discount really costs." },
  { to: "/tools/billable-utilization-rate-calculator", title: "Billable Utilization Calculator", blurb: "What share of your week is actually earning money." },
] as const;


export type ToolKey = (typeof ALL_TOOLS)[number]["to"];

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
  related: ToolKey[];
}

export function ToolShell({ toolKey, h1, tagline, intro, calculator, works, why, mistakes, faqs, related }: Props) {
  const relatedTools = ALL_TOOLS.filter((t) => related.includes(t.to));
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
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {relatedTools.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="absolute inset-0 bg-gradient-brand opacity-0 transition-opacity group-hover:opacity-5" />
                <h3 className="font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand">
                  Open tool <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
