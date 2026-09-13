import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { EmailCapture } from "@/components/site/EmailCapture";
import { ALL_POSTS } from "@/components/site/BlogShell";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Freelance Money Blog — Pricing, Tax & Cash Flow | FreelanceRate" },
      { name: "description", content: "Practical guides on freelance pricing, rate negotiation, taxes, international payments and cash flow — written to be used, not skimmed." },
      { property: "og:title", content: "Freelance Money Blog — Pricing, Tax & Cash Flow" },
      { property: "og:description", content: "Ten in-depth guides on freelance rates, negotiation, taxes, payments and cash flow." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-brand/25 blur-3xl animate-blob" />
          <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-12 md:pt-24 md:px-6">
            <span className="inline-flex rounded-full glass px-3 py-1 text-xs font-medium text-brand animate-fade-up">Blog</span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl animate-fade-up">
              Freelance money, explained properly
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground animate-fade-up">
              Pricing, negotiation, taxes, payments and cash flow — each guide pairs with a calculator so you can act on it the same day.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 md:px-6">
          <div className="grid gap-4 md:grid-cols-2">
            {ALL_POSTS.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="absolute inset-0 bg-gradient-brand opacity-0 transition-opacity group-hover:opacity-5" />
                <span className="text-xs font-medium text-brand">{p.category} · {p.readMins} min read</span>
                <h2 className="mt-2 font-display text-xl font-bold">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                  Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
        <EmailCapture source="/blog" />
      </main>
      <Footer />
    </div>
  );
}
