import { createFileRoute, Link } from "@tanstack/react-router";
import { GuideShell } from "./guides.how-to-set-your-freelance-rate";

export const Route = createFileRoute("/guides/freelance-tax-basics-by-country")({
  head: () => ({
    meta: [
      {
        title: "Freelance Tax Rate: How Much Do Freelancers Pay? | FreelanceRate",
      },
      {
        name: "description",
        content:
          "Learn how freelance taxes work, what affects your tax rate, and how self-employed taxes differ across the US, UK, Canada, Australia, India, and Pakistan.",
      },
    ],
  }),

  component: () => (
    <GuideShell
      breadcrumb="Freelance tax basics"
      title="Freelance Tax Rate: How Much Do Freelancers Pay?"
      deck="Freelancers usually deal with more than one type of tax. Learn how income tax, self-employment contributions, business expenses, and local rules affect what you actually keep."
      sections={[
        {
          h: "How much tax do freelancers pay?",
          body: (
            <>
              <p>
                There is no single freelance tax rate that applies to everyone.
                The amount you pay depends on your country, income, deductible
                business expenses, business structure, and the tax year.
              </p>

              <p>
                In many countries, self-employed people may have both an
                income-tax obligation and separate social-insurance or
                self-employment contributions.
              </p>

              <p>
                That means a freelancer should not simply subtract one
                percentage from every invoice. Your effective tax burden can
                change as your income and circumstances change.
              </p>
            </>
          ),
        },

        {
          h: "Start with your freelance profit, not your gross invoices",
          body: (
            <>
              <p>
                Tax calculations often begin with your business profit rather
                than the total amount you invoiced.
              </p>

              <p>
                Your gross freelance income is the money your clients pay you.
                Your business profit is generally what remains after allowable
                business expenses, although the exact rules vary by country.
              </p>

              <p>
                This distinction matters because a freelancer who earns
                $50,000 in revenue may have a very different taxable position
                from another freelancer who earns the same revenue but has
                substantially different allowable expenses.
              </p>
            </>
          ),
        },

        {
          h: "United States: income tax plus self-employment tax",
          body: (
            <>
              <p>
                US freelancers may have federal income-tax obligations as well
                as self-employment tax. State and local taxes can also apply
                depending on where the freelancer lives and operates.
              </p>

              <p>
                The self-employment tax system is separate from ordinary
                federal income-tax brackets, so looking only at an income-tax
                percentage can underestimate the total amount a freelancer
                needs to set aside.
              </p>

              <p>
                Because thresholds and deductions can change, use current IRS
                guidance when preparing an actual return rather than relying
                on a general percentage from an online article.
              </p>
            </>
          ),
        },

        {
          h: "United Kingdom: income tax and National Insurance",
          body: (
            <>
              <p>
                UK self-employed people generally calculate income tax based
                on taxable profits and may also have National Insurance
                obligations.
              </p>

              <p>
                For the 2026–27 tax year, HMRC states that self-employed people
                with profits above £12,570 pay Class 4 National Insurance at 6%
                on profits above that threshold up to £50,270, and 2% above
                £50,270. Class 2 has also changed and is treated as paid for
                eligible people above the relevant profit threshold.
              </p>

              <p>
                Your actual income-tax position depends on your taxable income,
                allowances, and circumstances.
              </p>
            </>
          ),
        },

        {
          h: "Canada: income tax and CPP contributions",
          body: (
            <>
              <p>
                Canadian self-employed workers may owe federal and provincial
                or territorial income tax as well as Canada Pension Plan (CPP)
                contributions.
              </p>

              <p>
                In 2026, the standard CPP contribution rate for self-employed
                people is 11.9% on the applicable earnings range, because a
                self-employed person generally pays both the employee and
                employer portions. Additional CPP2 contributions can apply to
                earnings above the first earnings ceiling.
              </p>

              <p>
                Quebec has a separate pension system, so freelancers there
                should use the applicable provincial rules.
              </p>
            </>
          ),
        },

        {
          h: "Australia: income tax and Medicare",
          body: (
            <>
              <p>
                Australian freelancers generally report business income as
                part of their individual tax position. The amount of income tax
                depends on taxable income and the applicable tax rules.
              </p>

              <p>
                The Medicare levy may also affect the final amount owed.
                Additional obligations can apply depending on the freelancer's
                business structure and circumstances.
              </p>

              <p>
                If you operate as a business rather than simply as an
                individual sole trader, the rules can be different.
              </p>
            </>
          ),
        },

        {
          h: "India: income tax, cess, and GST considerations",
          body: (
            <>
              <p>
                Indian freelancers generally need to consider income tax on
                their taxable income. The applicable calculation depends on
                the tax regime selected and the individual's circumstances.
              </p>

              <p>
                GST can also become relevant when a freelancer's services and
                turnover meet the applicable requirements. Export-of-services
                rules can introduce additional considerations for freelancers
                working with overseas clients.
              </p>

              <p>
                Because Indian tax rules can depend on the nature of the
                service, client location, turnover, and registration status,
                freelancers should check the current rules before filing.
              </p>
            </>
          ),
        },

        {
          h: "Pakistan: understand your income and export-of-services position",
          body: (
            <>
              <p>
                Pakistani freelancers need to consider how their freelance
                income is classified and how payments are received. Tax
                treatment can differ depending on the nature of the work,
                registration status, and whether the income qualifies under
                rules for export of services.
              </p>

              <p>
                If you receive payments from international clients, keep
                records of invoices, payment receipts, bank transactions, and
                business expenses. These records can make tax reporting much
                easier.
              </p>

              <p>
                Do not assume that one percentage applies to every Pakistani
                freelancer. Check the current rules that apply to your specific
                situation before filing.
              </p>
            </>
          ),
        },

        {
          h: "How much should a freelancer set aside for taxes?",
          body: (
            <>
              <p>
                A practical approach is to reserve part of your freelance
                income for taxes as soon as you receive it rather than waiting
                until the filing deadline.
              </p>

              <p>
                The percentage you reserve should be based on your estimated
                taxable profit and local tax rules. It should not be treated as
                a universal freelance tax rate.
              </p>

              <p>
                Our{" "}
                <Link to="/tools/self-employment-tax-estimator">
                  Self-Employment Tax Estimator
                </Link>{" "}
                can help you create a starting estimate using your income and
                expenses.
              </p>
            </>
          ),
        },

        {
          h: "Common freelance tax mistakes",
          body: (
            <>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Treating gross client payments as the same thing as taxable
                  profit.
                </li>
                <li>
                  Forgetting to keep records of business expenses.
                </li>
                <li>
                  Waiting until the tax deadline before setting money aside.
                </li>
                <li>
                  Assuming another freelancer's tax percentage applies to you.
                </li>
                <li>
                  Ignoring tax obligations created by international clients.
                </li>
                <li>
                  Using an old tax rate after thresholds or rules have changed.
                </li>
              </ul>
              <p className="mt-4">
                For the specific categories of business expenses freelancers
                commonly deduct, see our{" "}
                <Link to="/blog/freelance-tax-deductions-checklist">
                  freelance tax deductions checklist
                </Link>
                .
              </p>
            </>
          ),
        },

        {
          h: "When should you speak to an accountant?",
          body: (
            <>
              <p>
                Professional tax advice becomes particularly useful when your
                freelance income grows, you work with clients in multiple
                countries, you register for VAT or GST, you hire other people,
                or you create a company.
              </p>

              <p>
                An accountant who understands your local rules can also help
                determine which expenses are deductible and how your business
                should be structured.
              </p>

              <p>
                This guide is educational information, not individualized tax
                advice.
              </p>
            </>
          ),
        },

        {
          h: "The bottom line",
          body: (
            <>
              <p>
                Freelance taxes are not simply a fixed percentage of every
                invoice. Your actual tax burden depends on where you live,
                taxable profit, expenses, business structure, and the rules for
                the relevant tax year.
              </p>

              <p>
                The safest approach is to track your income and expenses,
                reserve money throughout the year, use current official tax
                guidance, and get professional advice when your situation
                becomes more complicated.
              </p>
            </>
          ),
        },
      ]}
      related={[
        "/tools/self-employment-tax-estimator",
        "/tools/freelance-profit-margin-calculator",
        "/tools/freelance-hourly-rate-calculator",
      ]}
      faqs={[
        {
          q: "What is the tax rate for freelancers?",
          a: "There's no single freelance tax rate — it depends on your country, income level, and business structure. Freelancers typically pay regular income tax on their profit (revenue minus business expenses) plus, in many countries, a separate self-employment or social-insurance contribution on top. Use the Self-Employment Tax Estimator above to see a country-specific ballpark.",
        },
        {
          q: "How much can you earn freelancing before paying tax?",
          a: "Most countries have a tax-free threshold or standard deduction below which no income tax is owed, but it varies widely — for example the UK's personal allowance, Australia's tax-free threshold, and similar bands in the US, Canada, India, and Pakistan. Below that threshold you may still owe self-employment or social-insurance contributions even if income tax is zero, so check your specific country's current rules.",
        },
        {
          q: "Do freelancers pay GST or VAT on top of income tax?",
          a: "In many countries, yes — once your freelance turnover crosses a registration threshold, you may need to charge and remit GST or VAT in addition to paying income tax on your profit. This is separate from income tax and depends on your local turnover rules and whether your clients are domestic or international.",
        },
        {
          q: "Is freelance income taxed differently from a salary?",
          a: "Usually, yes. As a freelancer you're generally taxed on your net profit (what's left after deducting legitimate business expenses) rather than gross pay, and in many countries you're also responsible for a self-employment or social-insurance contribution that an employer would otherwise share or cover for a salaried worker.",
        },
      ]}
    />
  ),
});
