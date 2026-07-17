import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ALL_TOOLS, type ToolKey } from "@/components/site/ToolShell";

export function GuideShell({
  title, deck, sections, related, breadcrumb,
}: {
  title: string;
  deck: string;
  sections: { h: string; body: ReactNode }[];
  related: ToolKey[];
  breadcrumb: string;
}) {
  const tools = ALL_TOOLS.filter((t) => related.includes(t.to));
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
              <span>Guides</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">{breadcrumb}</span>
            </nav>
            <span className="inline-flex rounded-full glass px-3 py-1 text-xs font-medium text-brand animate-fade-up">Guide</span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl animate-fade-up">{title}</h1>
            <p className="mt-4 text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "60ms" }}>{deck}</p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-display text-2xl font-bold">{s.h}</h2>
                <div className="mt-3 space-y-3 text-muted-foreground [&_a]:text-brand [&_a]:font-medium hover:[&_a]:underline">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </article>

        <section className="mx-auto max-w-5xl px-4 pb-16 md:px-6">
          <h2 className="font-display text-2xl font-bold">Tools mentioned</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {tools.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className="group rounded-2xl border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow"
              >
                <h3 className="font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand">
                  Open tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/guides/how-to-set-your-freelance-rate")({
  head: () => ({
    meta: [
      { title: "How to Set Your Freelance Rate: A Complete Guide | FreelanceRate" },
      { name: "description", content: "A step-by-step guide to setting a freelance rate that covers your business, your taxes, and your life — with three calculators to do the math." },
    ],
  }),
  component: () => (
    <GuideShell
      breadcrumb="Setting your rate"
      title="How to Set Your Freelance Rate: A Complete Guide"
      deck="Rate-setting isn't magic. It's arithmetic plus positioning. This guide walks you through both, from your target income to a number you can defend on a discovery call."
      sections={[
        { h: "Start with a target, not a rate", body: (
          <>
            <p>Almost every rate-setting failure starts the same way: opening a spreadsheet and typing in a rate. You have no way to know if $60 or $160 is right until you know what number, at the end of the year, would count as a good year for you.</p>
            <p>Pick that annual take-home number first. Then work backwards. Our <Link to="/tools/freelance-hourly-rate-calculator">Freelance Hourly Rate Calculator</Link> does the arithmetic once you have it.</p>
          </>
        )},
        { h: "Add the things a salary hid from you", body: (
          <>
            <p>A salary quietly paid for a lot of things: paid time off, health insurance, employer-side taxes, laptops, software, learning time, and — biggest of all — the hours you spent in meetings, on Slack, or eating lunch.</p>
            <p>As a freelancer you pay for all of that yourself, and you can only bill for hands-on-keyboard time. Roughly half of your working day disappears into admin, sales, and support work no client will ever pay for.</p>
            <p>If you're leaving a salary, use our <Link to="/tools/annual-income-to-hourly-rate-calculator">Salary → Hourly calculator</Link> — it bakes those back in so you don't accidentally take a pay cut.</p>
          </>
        )},
        { h: "Pick your billable hours honestly", body: (
          <>
            <p>Aim for 4–6 billable hours per day, 44–46 weeks per year. If your calculator suggests a rate that feels ‘too high,’ don't fix it by inflating billable hours. That's how burnout starts.</p>
            <p>Instead, either lower your target income (temporarily) or improve your positioning — niches, testimonials, and case studies raise the ceiling faster than working more hours.</p>
          </>
        )},
        { h: "Layer in taxes and a profit buffer", body: (
          <>
            <p>Your rate needs to cover income tax, self-employment tax or social insurance, and a buffer for slow months. Run our <Link to="/tools/self-employment-tax-estimator">Tax Estimator</Link> to see what percentage of every invoice you should stash the day it clears.</p>
            <p>Add a 15–25% profit margin on top of the ‘just covers everything’ rate. That's what turns freelancing from a job into a business.</p>
          </>
        )},
        { h: "Test it, don't announce it", body: (
          <>
            <p>Quote your new rate to the next new client, not your existing ones. If they say yes without flinching, raise it 10% for the one after. Repeat until you get your first thoughtful ‘hmm, that's a bit high’ — that's usually your ceiling for that segment.</p>
          </>
        )},
      ]}
      related={[
        "/tools/freelance-hourly-rate-calculator",
        "/tools/annual-income-to-hourly-rate-calculator",
        "/tools/project-quote-calculator",
      ]}
    />
  ),
});
