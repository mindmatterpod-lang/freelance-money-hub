import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { resolveRelated, ALL_POSTS } from "./RelatedContent";
import { EmailCapture } from "./EmailCapture";

export { ALL_POSTS, type BlogPostMeta } from "./RelatedContent";

export function BlogShell({
  title, deck, category, readMins, sections, related, slug,
}: {
  title: string;
  deck: string;
  category: string;
  readMins: number;
  sections: { h: string; body: ReactNode }[];
  related: string[];
  slug: string;
}) {
  const relatedItems = resolveRelated(related);
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

        {relatedItems.length > 0 && (
          <section className="mx-auto max-w-5xl px-4 pb-4 md:px-6">
            <h2 className="font-display text-2xl font-bold">Related</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {relatedItems.map((item) => (
                <Link key={item.to} to={item.to} className="group rounded-2xl border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow">
                  <span className="inline-block rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">{item.kind}</span>
                  <h3 className="mt-2 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand">
                    {item.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
