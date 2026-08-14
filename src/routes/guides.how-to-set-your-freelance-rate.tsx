import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ALL_TOOLS, type ToolKey } from "@/components/site/ToolShell";

type GuideSection = {
  h: string;
  body: ReactNode;
};

export function GuideShell({
  title,
  deck,
  sections,
  related,
  breadcrumb,
}: {
  title: string;
  deck: string;
  sections: GuideSection[];
  related: ToolKey[];
  breadcrumb: string;
}) {
  const tools = ALL_TOOLS.filter((t) => related.includes(t.to));

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
          <div className="absolute inset-0 grid-bg opacity-40" />

          <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-brand/25 blur-3xl animate-blob" />

          <div
            className="absolute right-0 top-10 h-72 w-72 rounded-full bg-brand-2/30 blur-3xl animate-blob"
            style={{ animationDelay: "-8s" }}
          />

          <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-14 md:px-6 md:pb-20 md:pt-20">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-7 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground animate-fade-up"
            >
              <Link
                to="/"
                className="transition-colors hover:text-foreground"
              >
                Home
              </Link>

              <ChevronRight className="h-3 w-3" />

              <span>Guides</span>

              <ChevronRight className="h-3 w-3" />

              <span className="text-foreground">{breadcrumb}</span>
            </nav>

            <span className="inline-flex rounded-full glass px-3 py-1 text-xs font-medium text-brand animate-fade-up">
              Freelance Guide
            </span>

            <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold tracking-tight animate-fade-up md:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p
              className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground animate-fade-up md:text-lg md:leading-8"
              style={{ animationDelay: "60ms" }}
            >
              {deck}
            </p>
          </div>
        </section>

        {/* ARTICLE */}
        <article className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <section
                key={`${section.h}-${index}`}
                className="scroll-mt-24"
              >
                <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {section.h}
                </h2>

                <div
                  className="
                    mt-5
                    space-y-4
                    text-[15px]
                    leading-7
                    text-muted-foreground
                    md:text-base

                    [&_p]:leading-7
                    [&_strong]:font-semibold
                    [&_strong]:text-foreground

                    [&_a]:font-medium
                    [&_a]:text-brand
                    [&_a]:underline-offset-4
                    hover:[&_a]:underline

                    [&_ul]:my-5
                    [&_ul]:list-disc
                    [&_ul]:space-y-2
                    [&_ul]:pl-6

                    [&_ol]:my-5
                    [&_ol]:list-decimal
                    [&_ol]:space-y-2
                    [&_ol]:pl-6

                    [&_li]:pl-1

                    [&_h3]:mt-7
                    [&_h3]:font-display
                    [&_h3]:text-lg
                    [&_h3]:font-semibold
                    [&_h3]:text-foreground

                    [&_hr]:my-6
                    [&_hr]:border-border

                    [&_table]:w-full
                    [&_table]:overflow-hidden
                    [&_table]:rounded-xl
                    [&_table]:border
                    [&_th]:bg-muted
                    [&_th]:px-4
                    [&_th]:py-3
                    [&_th]:text-left
                    [&_th]:font-semibold
                    [&_td]:border-t
                    [&_td]:px-4
                    [&_td]:py-3
                  "
                >
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </article>

        {/* TOOLS */}
        {tools.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
            <div className="rounded-3xl border bg-card/60 p-6 shadow-soft backdrop-blur md:p-8">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                  Freelance Money Hub
                </span>

                <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                  Tools mentioned in this guide
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
                  Use these calculators to turn the concepts in this guide
                  into practical numbers for your freelance business.
                </p>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {tools.map((tool) => (
                  <Link
                    key={tool.to}
                    to={tool.to}
                    className="
                      group
                      rounded-2xl
                      border
                      bg-background/70
                      p-5
                      shadow-sm
                      transition-all
                      duration-200
                      hover:-translate-y-1
                      hover:shadow-glow
                    "
                  >
                    <h3 className="font-semibold text-foreground">
                      {tool.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {tool.blurb}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                      Open tool
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FINAL CTA */}
        <section className="mx-auto max-w-4xl px-4 pb-20 md:px-6">
          <div className="relative overflow-hidden rounded-3xl border bg-card p-7 shadow-soft md:p-10">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-brand/10 blur-3xl" />

            <div className="relative">
              <CheckCircle2 className="h-7 w-7 text-brand" />

              <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                Make your next freelance payment easier to manage
              </h2>

              <p className="mt-3 max-w-2xl text-muted-foreground">
                Use Freelance Money Hub's calculators and guides to make
                better pricing, invoicing, payment, and money-management
                decisions.
              </p>

              <Link
                to="/"
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-brand
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-brand-foreground
                  transition-transform
                  hover:-translate-y-0.5
                "
              >
                Explore Freelance Money Hub
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
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
      {
        title:
          "How to Set Your Freelance Rate: A Complete Guide | Freelance Money Hub",
      },
      {
        name: "description",
        content:
          "Learn how to calculate and set a freelance rate that covers your costs, taxes, target income, and non-billable time.",
      },
    ],
  }),

  component: () => (
    <GuideShell
      breadcrumb="Setting your rate"
      title="How to Set Your Freelance Rate: A Complete Guide"
      deck="Rate-setting isn't magic. It's arithmetic plus positioning. This guide walks you through both, from your target income to a number you can defend on a discovery call."
      sections={[
        {
          h: "Start with a target, not a rate",
          body: (
            <>
              <p>
                Almost every rate-setting failure starts the same way: opening
                a spreadsheet and typing in a rate. You have no way to know if
                $60 or $160 is right until you know what number, at the end of
                the year, would count as a good year for you.
              </p>

              <p>
                Pick that annual take-home number first. Then work backwards.
                Our{" "}
                <Link to="/tools/freelance-hourly-rate-calculator">
                  Freelance Hourly Rate Calculator
                </Link>{" "}
                does the arithmetic once you have it.
              </p>
            </>
          ),
        },

        {
          h: "Add the things a salary hid from you",
          body: (
            <>
              <p>
                A salary quietly paid for a lot of things: paid time off,
                health insurance, employer-side taxes, laptops, software,
                learning time, and the hours you spent in meetings or
                administrative work.
              </p>

              <p>
                As a freelancer you pay for many of those costs yourself, and
                not every working hour is billable.
              </p>

              <p>
                If you're leaving a salary, use our{" "}
                <Link to="/tools/annual-income-to-hourly-rate-calculator">
                  Salary → Hourly Calculator
                </Link>{" "}
                to help estimate a sustainable starting point.
              </p>
            </>
          ),
        },

        {
          h: "Pick your billable hours honestly",
          body: (
            <>
              <p>
                Don't assume that every hour you spend working can be charged
                to a client. Sales, administration, communication, learning,
                planning, and support can all take time.
              </p>

              <p>
                If your calculated rate feels high, don't automatically solve
                the problem by assuming an unrealistic number of billable
                hours. Instead, review your costs, positioning, target income,
                and the type of clients you want to serve.
              </p>
            </>
          ),
        },

        {
          h: "Layer in taxes and a profit buffer",
          body: (
            <>
              <p>
                Your rate may need to cover income tax, self-employment taxes
                or social contributions, business expenses, and slower periods.
              </p>

              <p>
                Use our{" "}
                <Link to="/tools/self-employment-tax-estimator">
                  Tax Estimator
                </Link>{" "}
                to explore the effect of taxes on your freelance income.
              </p>

              <p>
                A sustainable freelance rate should cover more than your basic
                expenses. It should also leave room for business growth,
                unexpected costs, and profit.
              </p>
            </>
          ),
        },

        {
          h: "Test your rate with real clients",
          body: (
            <>
              <p>
                Your rate is not something you need to announce permanently.
                Test it with new prospects and pay attention to the quality of
                leads, client expectations, project scope, and your ability to
                close suitable projects.
              </p>

              <p>
                If your positioning improves, your rate can evolve with it.
              </p>
            </>
          ),
        },
      ]}
      related={[
        "/tools/freelance-hourly-rate-calculator",
        "/tools/annual-income-to-hourly-rate-calculator",
        "/tools/project-quote-calculator",
      ]}
    />
  ),
});
