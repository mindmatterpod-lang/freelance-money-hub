import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, TrendingUp, Globe2, Clock, Receipt, Scale, Wallet, Timer, ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FreelanceRate — Free money tools for freelancers worldwide" },
      { name: "description", content: "A free toolkit of calculators to price freelance work, estimate taxes, convert currencies, and manage cash flow. No signup, works worldwide." },
      { property: "og:title", content: "FreelanceRate — Free money tools for freelancers" },
      { property: "og:description", content: "Price your work, estimate taxes, and manage cash flow with 8 free calculators built for freelancers." },
    ],
  }),
  component: Home,
});

const tools = [
  { to: "/tools/freelance-hourly-rate-calculator", title: "Freelance Hourly Rate", blurb: "The rate that actually covers your business — not just your rent.", icon: Calculator },
  { to: "/tools/project-quote-calculator", title: "Project Quote", blurb: "Fixed-bid pricing with a built-in risk buffer and deposit.", icon: Scale },
  { to: "/tools/invoice-late-fee-calculator", title: "Invoice Late Fees", blurb: "Fair late fees, plus a copy-paste reminder email.", icon: Receipt },
  { to: "/tools/self-employment-tax-estimator", title: "Tax Estimator", blurb: "Rough tax owed and how much to stash from each invoice.", icon: TrendingUp },
  { to: "/tools/currency-adjusted-rate-calculator", title: "Currency-Adjusted Rate", blurb: "Real take-home after FX and payment platform fees.", icon: Globe2 },
  { to: "/tools/annual-income-to-hourly-rate-calculator", title: "Salary → Hourly", blurb: "The hourly rate that matches your old salary.", icon: Wallet },
  { to: "/tools/freelance-profit-margin-calculator", title: "Profit Margin", blurb: "Gross, net, and break-even projects per month.", icon: TrendingUp },
  { to: "/tools/days-to-invoice-payment-calculator", title: "Cash Flow / Payment Date", blurb: "When each invoice actually lands. Spot overlaps early.", icon: Timer },
] as const;

function Home() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-brand/30 blur-3xl animate-blob" />
        <div className="absolute top-24 right-0 h-96 w-96 rounded-full bg-brand-2/30 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-brand-3/20 blur-3xl animate-blob" style={{ animationDelay: "-12s" }} />

        <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-24 text-center md:pt-32 md:pb-32 md:px-6">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium animate-fade-up">
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            8 free tools · no signup · works worldwide
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold tracking-tight md:text-7xl animate-fade-up" style={{ animationDelay: "60ms" }}>
            Freelance money,
            <br />
            <span className="text-gradient-brand animate-gradient-pan">figured out.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl animate-fade-up" style={{ animationDelay: "140ms" }}>
            A free toolkit of calculators that help freelancers everywhere price their work, estimate taxes, convert currencies, and manage cash flow.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-up" style={{ animationDelay: "220ms" }}>
            <Link
              to="/tools/freelance-hourly-rate-calculator"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand animate-gradient-pan px-6 py-3 text-sm font-semibold text-white shadow-glow"
            >
              Try the Hourly Rate Calculator
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#tools" className="rounded-full glass px-6 py-3 text-sm font-semibold">
              Browse all 8 tools
            </a>
          </div>

          {/* Floating cards */}
          <div className="mx-auto mt-16 grid max-w-3xl gap-3 md:grid-cols-3">
            {[
              { icon: Zap, k: "Instant", v: "Runs in your browser" },
              { icon: ShieldCheck, k: "Private", v: "No data leaves your device" },
              { icon: Globe2, k: "Worldwide", v: "Every currency, every country" },
            ].map((f, i) => (
              <div
                key={f.k}
                className="glass flex items-center gap-3 rounded-2xl p-4 text-left shadow-soft animate-float-slow"
                style={{ animationDelay: `${i * 0.8}s` }}
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand">
                  <f.icon className="h-5 w-5 text-white" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{f.k}</p>
                  <p className="text-xs text-muted-foreground">{f.v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section id="tools" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-brand">The toolkit</p>
            <h2 className="mt-1 font-display text-4xl font-bold tracking-tight md:text-5xl">Eight calculators. One goal.</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">Each tool answers one very specific question freelancers actually ask.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((t, i) => (
            <Link
              key={t.to}
              to={t.to}
              className="group relative overflow-hidden rounded-3xl border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand shadow-soft">
                <t.icon className="h-6 w-6 text-white" />
              </span>
              <h3 className="relative mt-5 font-display text-xl font-semibold">{t.title}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{t.blurb}</p>
              <span className="relative mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-hero opacity-70" />
        <div className="relative mx-auto max-w-5xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold text-brand">How to use FreelanceRate</p>
            <h2 className="mt-1 font-display text-4xl font-bold tracking-tight md:text-5xl">
              From <span className="text-gradient-warm">guesswork</span> to <span className="text-gradient-brand">confidence</span> in 3 steps.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Pick a tool", d: "Start with your hourly rate, then work up to quotes, taxes and cash flow." },
              { n: "02", t: "Enter your reality", d: "Working days, expenses, target income. It takes about 60 seconds." },
              { n: "03", t: "Use the number", d: "Send it in a quote, an invoice, or a set-aside for taxes. Free forever." },
            ].map((s, i) => (
              <div key={s.n} className="glass rounded-3xl p-6 shadow-soft animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <span className="font-display text-4xl font-bold text-gradient-brand">{s.n}</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDES TEASER */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-brand">Guides</p>
            <h2 className="mt-1 font-display text-4xl font-bold tracking-tight md:text-5xl">Deeper reads.</h2>
          </div>
          <Link to="/guides/how-to-set-your-freelance-rate" className="hidden text-sm font-medium text-brand md:inline-flex items-center gap-1">
            All guides <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { to: "/guides/how-to-set-your-freelance-rate", t: "How to Set Your Freelance Rate", d: "A complete guide from your target income to a defensible number." },
            { to: "/guides/how-to-invoice-international-clients", t: "How to Invoice International Clients", d: "Cut FX and platform fees, get paid on time, everywhere." },
            { to: "/guides/freelance-tax-basics-by-country", t: "Freelance Tax Basics by Country", d: "What you actually owe as a self-employed worker, plainly explained." },
            { to: "/guides/how-to-price-a-fixed-bid-project", t: "How to Price a Fixed-Bid Project", d: "Turn hours + risk into a quote clients will accept." },
          ].map((g, i) => (
            <Link
              key={g.to}
              to={g.to}
              className="group flex items-start justify-between gap-6 rounded-3xl border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div>
                <h3 className="font-display text-lg font-semibold">{g.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{g.d}</p>
              </div>
              <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-brand transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-24 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand animate-gradient-pan p-10 text-center shadow-glow md:p-16">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <Clock className="relative mx-auto h-10 w-10 text-white/80" />
          <h2 className="relative mt-4 font-display text-3xl font-bold text-white md:text-5xl">Stop under-charging today.</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/90">One calculator, sixty seconds, and a rate you can actually defend.</p>
          <Link
            to="/tools/freelance-hourly-rate-calculator"
            className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand shadow-soft"
          >
            Start with your hourly rate <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
