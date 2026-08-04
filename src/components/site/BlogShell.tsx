import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ALL_TOOLS, type ToolKey } from "./ToolShell";
import { EmailCapture } from "./EmailCapture";

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  readMins: number;
  category: string;
}

export const ALL_POSTS: BlogPostMeta[] = [
  { slug: "how-much-should-a-freelancer-charge-per-hour", title: "How Much Should a Freelancer Charge Per Hour in 2026?", excerpt: "Benchmark ranges by discipline, and the arithmetic that turns a target income into an hourly number you can defend.", readMins: 8, category: "Pricing" },
  { slug: "freelance-rate-negotiation-scripts", title: "12 Freelance Rate Negotiation Scripts That Actually Work", excerpt: "Word-for-word replies for 'that's out of budget', 'can you do it cheaper', and the silent client.", readMins: 9, category: "Negotiation" },
  { slug: "how-to-raise-your-rates-with-existing-clients", title: "How to Raise Your Rates With Existing Clients (Without Losing Them)", excerpt: "The timing, the email, and the maths that prove a rate rise wins even when some clients walk.", readMins: 7, category: "Pricing" },
  { slug: "hourly-vs-fixed-price-vs-value-based-pricing", title: "Hourly vs Fixed Price vs Value-Based Pricing: Which Is Right for You?", excerpt: "A practical comparison of the three pricing models, with the risk each one shifts onto you.", readMins: 8, category: "Pricing" },
  { slug: "how-to-get-clients-to-pay-on-time", title: "How to Get Clients to Pay On Time: A Freelancer's System", excerpt: "Deposits, terms, reminders and late fees — the boring system that fixes most cash-flow pain.", readMins: 7, category: "Cash flow" },
  { slug: "freelance-tax-deductions-checklist", title: "The Freelance Tax Deductions Checklist Most People Miss", excerpt: "Home office, software, equipment, travel, training — what typically qualifies and how to keep records.", readMins: 9, category: "Tax" },
  { slug: "how-to-avoid-scope-creep", title: "How to Avoid Scope Creep (And What to Say When It Happens)", excerpt: "Why scope creep is a pricing failure, not a client failure — and the change-order language that stops it.", readMins: 7, category: "Client work" },
  { slug: "best-payment-methods-for-international-freelancers", title: "Best Payment Methods for International Freelancers", excerpt: "Wise, Payoneer, PayPal, Stripe and bank wires compared on real cost, speed and coverage.", readMins: 8, category: "Payments" },
  { slug: "freelance-emergency-fund-how-much", title: "How Big Should a Freelancer's Emergency Fund Be?", excerpt: "Runway maths for irregular income, and where to keep the money so you actually leave it alone.", readMins: 6, category: "Money" },
  { slug: "freelance-retainers-explained", title: "Freelance Retainers Explained: Pricing, Scope and Contracts", excerpt: "How to structure a retainer so it's predictable income for you and obvious value for the client.", readMins: 8, category: "Pricing" },
];

export function BlogShell({
  title, deck, category, readMins, sections, related, slug,
}: {
  title: string;
  deck: string;
  category: string;
  readMins: number;
  sections: { h: string; body: ReactNode }[];
  related: ToolKey[];
  slug: string;
}) {
  const tools = ALL_TOOLS.filter((t) => related.includes(t.to));
  const more = ALL_POSTS.filter((p) => p.slug !== slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: deck,
    articleSection: category,
    author: { "@type": "Organization", name: "FreelanceRate" },
    publisher: { "@type": "Organization", name: "FreelanceRate" },
  };

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-brand/25 blur-3xl animate-blob" />
          <div className="absolute top-10 right-0 h-72 w-72 rounded-full bg-brand-2/30 blur-3xl animate-blob" style={{ animationDelay: "-8s" }} />
          <div className="relative mx-auto max-w-3xl px-4 pt-16 pb-12 md:pt-24 md:px-6">
            <nav className="mb-6 flex items-center gap-1 text-xs text-muted-foreground animate-fade-up">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/blog" className="hover:text-foreground">Blog</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">{category}</span>
            </nav>
            <span className="inline-flex rounded-full glass px-3 py-1 text-xs font-medium text-brand animate-fade-up">
              {category} · {readMins} min read
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl animate-fade-up">{title}</h1>
            <p className="mt-4 text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "60ms" }}>{deck}</p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-display text-2xl font-bold">{s.h}</h2>
                <div className="mt-3 space-y-3 text-muted-foreground [&_a]:text-brand [&_a]:font-medium hover:[&_a]:underline [&_li]:ml-5 [&_li]:list-disc">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </article>

        {tools.length > 0 && (
          <section className="mx-auto max-w-5xl px-4 pb-4 md:px-6">
            <h2 className="font-display text-2xl font-bold">Tools mentioned</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {tools.map((t) => (
                <Link key={t.to} to={t.to} className="group rounded-2xl border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow">
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand">
                    Open tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
          <h2 className="font-display text-2xl font-bold">Keep reading</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group rounded-2xl border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow">
                <span className="text-xs font-medium text-brand">{p.category}</span>
                <h3 className="mt-1 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        <EmailCapture source={`/blog/${slug}`} />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
