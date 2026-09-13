import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { resolveRelated } from "@/components/site/RelatedContent";

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
  faqs = [],
}: {
  title: string;
  deck: string;
  sections: GuideSection[];
  related: string[];
  breadcrumb: string;
  faqs?: { q: string; a: string }[];
}) {
  const relatedItems = resolveRelated(related);
  const faqJsonLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

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

        {/* RELATED */}
        {relatedItems.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
            <div className="rounded-3xl border bg-card/60 p-6 shadow-soft backdrop-blur md:p-8">
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                  Freelance Money Hub
                </span>

                <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                  Related tools and reading
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
                  Use these calculators to turn the concepts in this guide
                  into practical numbers for your freelance business.
                </p>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {relatedItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
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
                    <span className="inline-block rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {item.kind}
                    </span>

                    <h3 className="mt-2 font-semibold text-foreground">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.blurb}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                      {item.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section className="mx-auto max-w-4xl px-4 pb-16 md:px-6">
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
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
    </div>
  );
}

export const Route = createFileRoute(
  "/guides/how-to-set-your-freelance-rate"
)({
  head: () => ({
    meta: [
      {
        title:
          "How to Set Your Freelance Rate: Complete Guide + Calculator | Freelance Money Hub",
      },
      {
        name: "description",
        content:
          "Learn how to set a freelance rate using your target income, expenses, taxes, billable hours, and profit margin. Includes practical examples and calculators.",
      },
    ],
  }),

  component: () => (
    <GuideShell
      breadcrumb="Setting your freelance rate"
      title="How to Set Your Freelance Rate: A Complete Guide"
      deck="Learn how to calculate a freelance rate that covers your income goal, business expenses, taxes, non-billable time, and profit — then turn the number into a rate you can confidently quote."
      sections={[
        {
          h: "How do you calculate a freelance rate?",
          body: (
            <>
              <p>
                A sustainable freelance rate starts with the amount you want
                to earn, not with what another freelancer charges. Your rate
                needs to account for your target income, business expenses,
                taxes, non-billable time, and the number of hours you can
                realistically bill.
              </p>

              <p>
                A simple starting formula is:
              </p>

              <p>
                <strong>
                  Freelance hourly rate = required annual revenue ÷ realistic
                  annual billable hours
                </strong>
              </p>

              <p>
                Your required annual revenue should include the money needed
                for your personal income goal plus taxes, business expenses,
                savings, and a reasonable profit buffer.
              </p>

              <p>
                Use our{" "}
                <Link to="/tools/freelance-hourly-rate-calculator">
                  Freelance Hourly Rate Calculator
                </Link>{" "}
                to work through the numbers.
              </p>
            </>
          ),
        },

        {
          h: "Start with your target income",
          body: (
            <>
              <p>
                Before choosing an hourly, daily, or project rate, decide what
                you want your freelance business to provide financially.
              </p>

              <p>
                Think about the amount you want to take home after business
                costs and taxes. Then work backwards to determine how much
                revenue your freelance business needs to generate.
              </p>

              <p>
                Starting with a target is more reliable than copying a rate
                from another freelancer because your expenses, experience,
                location, taxes, niche, and available working time may all be
                different.
              </p>
            </>
          ),
        },

        {
          h: "Include the costs a salary used to cover",
          body: (
            <>
              <p>
                Freelancers often underestimate their rate because they
                compare freelance revenue directly with an employee salary.
                The two numbers are not equivalent.
              </p>

              <p>
                As a freelancer, you may need to pay for software, equipment,
                internet, professional services, training, marketing,
                accounting, insurance, taxes, and time off.
              </p>

              <p>
                You also spend time on work that cannot always be billed to a
                client, such as proposals, sales calls, administration,
                planning, communication, and business development.
              </p>

              <p>
                If you are moving from employment into freelancing, our{" "}
                <Link to="/tools/annual-income-to-hourly-rate-calculator">
                  Salary → Hourly Calculator
                </Link>{" "}
                can help you estimate a freelance equivalent.
              </p>
            </>
          ),
        },

        {
          h: "Calculate your realistic billable hours",
          body: (
            <>
              <p>
                One of the biggest freelance pricing mistakes is assuming that
                every working hour can be billed.
              </p>

              <p>
                If you work 40 hours in a week, some of that time may go toward
                finding clients, writing proposals, answering emails,
                administration, learning, meetings, and other business tasks.
              </p>

              <p>
                Your rate therefore needs to be based on{" "}
                <strong>billable hours</strong>, not simply total working
                hours.
              </p>

              <p>
                Be realistic when estimating your annual billable capacity.
                Increasing your assumed billable hours just to make your rate
                look cheaper can create an unrealistic workload.
              </p>
            </>
          ),
        },

        {
          h: "Add taxes, expenses, and a profit buffer",
          body: (
            <>
              <p>
                Your freelance rate should not simply cover the amount you
                want to spend personally. It also needs to account for
                business costs and taxes.
              </p>

              <p>
                Depending on where you live and how your business is
                structured, you may have income taxes, self-employment taxes,
                social contributions, or other obligations.
              </p>

              <p>
                Use our{" "}
                <Link to="/tools/self-employment-tax-estimator">
                  Self-Employment Tax Estimator
                </Link>{" "}
                to explore how taxes can affect your freelance income.
              </p>

              <p>
                After covering your expected costs, leave room for profit and
                unexpected expenses. A business that only breaks even is not
                giving you much protection during slow periods.
              </p>
            </>
          ),
        },

        {
          h: "Hourly rate vs project rate",
          body: (
            <>
              <p>
                Freelancers commonly charge either by the hour or by the
                project. Neither model is automatically better.
              </p>

              <p>
                <strong>Hourly pricing</strong> is straightforward when the
                amount of work is difficult to predict. You are paid according
                to the time spent.
              </p>

              <p>
                <strong>Project pricing</strong> can work well when the scope
                and deliverables are clearly defined. The client pays for an
                agreed outcome rather than watching the clock.
              </p>

              <p>
                Even when you quote a fixed project price, calculate your
                internal hourly equivalent. This helps you determine whether
                the project is actually profitable.
              </p>

              <p>
                For project pricing, try our{" "}
                <Link to="/tools/project-quote-calculator">
                  Project Quote Calculator
                </Link>
                .
              </p>
            </>
          ),
        },

        {
          h: "Example: calculating a freelance hourly rate",
          body: (
            <>
              <p>
                Suppose your freelance business needs to generate $60,000 in
                annual revenue and you realistically expect to bill 1,000
                hours during the year.
              </p>

              <p>
                The basic calculation would be:
              </p>

              <p>
                <strong>$60,000 ÷ 1,000 billable hours = $60/hour</strong>
              </p>

              <p>
                That $60/hour figure is only a starting point. You should make
                sure the annual revenue target already accounts for the taxes,
                business expenses, savings, and profit you need.
              </p>

              <p>
                If those costs are not included, your apparently attractive
                hourly rate may leave you earning much less than expected.
              </p>
            </>
          ),
        },

        {
          h: "How to know if your freelance rate is too low",
          body: (
            <>
              <p>
                A rate may be too low if you consistently struggle to cover
                your business costs, work more hours than planned, or discover
                that projects are not profitable after accounting for all the
                time involved.
              </p>

              <p>
                Another warning sign is having plenty of demand but very
                little room for savings, time off, professional development,
                or business growth.
              </p>

              <p>
                Review your effective hourly earnings regularly instead of
                judging your rate only by the number written on an invoice.
              </p>
            </>
          ),
        },

        {
          h: "How to raise your freelance rate",
          body: (
            <>
              <p>
                You do not need to wait until you completely rebuild your
                business before increasing your rate.
              </p>

              <p>
                Start by testing a higher rate with new clients. Track the
                quality of leads, the type of projects you attract, the amount
                of negotiation, and whether clients understand the value you
                provide.
              </p>

              <p>
                Stronger positioning, specialization, testimonials, case
                studies, and a clear portfolio can make higher rates easier to
                justify.
              </p>

              <p>
                For existing clients, consider giving reasonable notice before
                changing your pricing rather than unexpectedly changing an
                agreed project rate.
              </p>
            </>
          ),
        },

        {
          h: "The bottom line",
          body: (
            <>
              <p>
                There is no single freelance rate that is correct for
                everyone. The right rate is the one that makes your business
                financially sustainable while matching the value and type of
                work you provide.
              </p>

              <p>
                Start with your target income, account for expenses and taxes,
                estimate realistic billable hours, and then calculate the
                minimum rate your business needs.
              </p>

              <p>
                From there, use your experience, specialization, demand, and
                positioning to determine what you can confidently charge.
              </p>
            </>
          ),
        },
      ]}
      related={[
        "/tools/freelance-hourly-rate-calculator",
        "/tools/annual-income-to-hourly-rate-calculator",
        "/tools/project-quote-calculator",
        "/blog/how-much-should-a-freelancer-charge-per-hour",
        "/guides/freelance-tax-basics-by-country",
      ]}
    />
  ),
});
