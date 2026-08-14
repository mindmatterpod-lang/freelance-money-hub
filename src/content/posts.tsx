import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ALL_POSTS, type BlogPostMeta } from "@/components/site/BlogShell";
import type { ToolKey } from "@/components/site/ToolShell";

export interface PostContent extends BlogPostMeta {
  deck: string;
  metaDescription: string;
  sections: { h: string; body: ReactNode }[];
  related: ToolKey[];
}

const bySlug = Object.fromEntries(ALL_POSTS.map((p) => [p.slug, p]));

function base(slug: string) {
  return bySlug[slug];
}

export const POSTS: Record<string, PostContent> = {
  "how-much-should-a-freelancer-charge-per-hour": {
    ...base("how-much-should-a-freelancer-charge-per-hour"),
    deck: "There is no universal freelance hourly rate — but there is a universal method. Here's the arithmetic, plus rough market bands by discipline.",
    metaDescription: "How much should a freelancer charge per hour? Use the target-income method, add taxes and unbillable time, and compare to market bands by discipline.",
    sections: [
      { h: "Start from income, not from the market", body: (
        <>
          <p>Market rates tell you what's possible. They don't tell you what's sustainable for your costs, your tax bill and your billable capacity. Start by writing down the annual take-home you want, then add business expenses, tax, and a profit buffer.</p>
          <p>Divide that total by the hours you can realistically bill — usually 4 to 6 per working day, 44 to 46 weeks per year. Our <Link to="/tools/freelance-hourly-rate-calculator">Freelance Hourly Rate Calculator</Link> does this in one screen.</p>
        </>
      )},
      { h: "Why the 2,080-hour myth ruins rates", body: (
        <>
          <p>A full-time year is often quoted as 2,080 hours. Freelancers almost never bill that. Sales calls, proposals, invoicing, bookkeeping, marketing, learning and admin are all real work that no client pays for directly.</p>
          <p>If you bill 1,100 hours instead of 2,080, your rate must be roughly double a naive salary-divided-by-hours number just to break even.</p>
        </>
      )},
      { h: "Rough market bands (self-reported, 2026)", body: (
        <>
          <ul>
            <li>Entry-level generalist design or writing: $25–50/hr</li>
            <li>Experienced specialist design, copy, or marketing: $60–120/hr</li>
            <li>Web and app development: $50–150/hr, higher for niche stacks</li>
            <li>Consulting, fractional and strategy work: $120–300/hr</li>
          </ul>
          <p>Bands vary enormously by client location and industry. Treat them as sanity checks, not targets — a positioning change moves you between bands faster than more hours ever will.</p>
        </>
      )},
      { h: "Adjust for taxes and payment costs", body: (
        <>
          <p>Your invoice total is not your income. Self-employment or social contributions, income tax, and payment platform fees all take a slice. Run the <Link to="/tools/self-employment-tax-estimator">tax estimator</Link> and the <Link to="/tools/payment-processing-fee-calculator">payment fee calculator</Link> before you commit to a number.</p>
        </>
      )},
      { h: "Test the rate, then move it", body: (
        <>
          <p>Quote your new number to the next new lead. If nobody hesitates, raise it 10% on the following one. The first thoughtful pushback is usually your current ceiling for that client segment — and the signal to change segments if you want more.</p>
        </>
      )},
    ],
    related: ["/tools/freelance-hourly-rate-calculator", "/tools/self-employment-tax-estimator", "/tools/billable-utilization-rate-calculator"],
  },

  "freelance-rate-negotiation-scripts": {
    ...base("freelance-rate-negotiation-scripts"),
    deck: "Negotiation is mostly preparation plus a few sentences you've said before. Here are the sentences.",
    metaDescription: "Twelve freelance rate negotiation scripts for budget pushback, discount requests, scope changes and silence — with the reasoning behind each one.",
    sections: [
      { h: "Rule one: never negotiate against yourself", body: (
        <>
          <p>The most common mistake is dropping your price before the client has actually objected. Quote the number, then stop typing. Silence is not rejection.</p>
        </>
      )},
      { h: "When they say 'that's out of our budget'", body: (
        <>
          <p><em>"Totally understandable. What budget did you have in mind? I can usually shape the scope to fit a number — I just can't shape the rate."</em></p>
          <p>This keeps your rate intact and moves the conversation to scope, where flexibility is legitimate.</p>
        </>
      )},
      { h: "When they ask for a discount", body: (
        <>
          <p><em>"I can offer 10% off if you pay 100% upfront, or if you commit to three months. Otherwise the price is the price."</em></p>
          <p>Always trade a discount for something. Before agreeing, check the real cost with the <Link to="/tools/client-discount-calculator">discount impact calculator</Link> — a 15% cut often means working an extra day for free.</p>
        </>
      )},
      { h: "When they compare you to a cheaper freelancer", body: (
        <>
          <p><em>"They may well be the right fit. What I'd be bringing is [specific outcome]. If cost is the deciding factor, I'd rather you go with them than have us both regret it."</em></p>
        </>
      )},
      { h: "When they want 'a quick extra thing'", body: (
        <>
          <p><em>"Happy to do it — it's about X hours, so it'd be $Y added to the next invoice. Want me to go ahead?"</em></p>
          <p>Price it before you agree with the <Link to="/tools/scope-creep-cost-calculator">scope creep calculator</Link>.</p>
        </>
      )},
      { h: "When you're raising a rate", body: (
        <>
          <p><em>"From 1 March my rate moves to $X. I've held the current rate for two years and costs have moved; everything else about how we work stays the same."</em></p>
          <p>Give 30–60 days' notice, no apology, and no long justification.</p>
        </>
      )},
      { h: "When they go quiet", body: (
        <>
          <p><em>"Checking in on the proposal — should I hold the slot for next month, or park it for now?"</em></p>
          <p>A closing question beats a nudge, because either answer moves you forward.</p>
        </>
      )},
    ],
    related: ["/tools/client-discount-calculator", "/tools/rate-increase-calculator", "/tools/scope-creep-cost-calculator"],
  },

  "how-to-raise-your-rates-with-existing-clients": {
    ...base("how-to-raise-your-rates-with-existing-clients"),
    deck: "A rate rise usually wins even when a client or two leaves. Here's the timing, the email, and the maths.",
    metaDescription: "How to raise freelance rates with existing clients: when to do it, what to say, and the break-even maths showing how much churn you can absorb.",
    sections: [
      { h: "The maths first", body: (
        <>
          <p>If you raise rates 20%, you can lose about 17% of your billable volume and still earn the same. Most freelancers overestimate churn dramatically — in practice, most clients accept.</p>
          <p>Model your own numbers with the <Link to="/tools/rate-increase-calculator">rate increase calculator</Link> before you decide it's too risky.</p>
        </>
      )},
      { h: "Pick the right moment", body: (
        <>
          <ul>
            <li>At the start of a calendar or fiscal year</li>
            <li>At a contract or retainer renewal</li>
            <li>After you deliver something measurably valuable</li>
            <li>When you're at or near full capacity</li>
          </ul>
        </>
      )},
      { h: "The email", body: (
        <>
          <p><em>"Hi [name] — a quick heads up that my rate moves from $X to $Y on [date, 45+ days away]. Work in flight at the old rate is unaffected. Everything else stays the same, and I'm glad to keep working together."</em></p>
          <p>Short, dated, no apology, no essay about inflation.</p>
        </>
      )},
      { h: "Handle the pushback you can predict", body: (
        <>
          <p>Some clients will ask for a phased increase. That's fine — half now, half in six months. Others will ask you to hold rates for one more project. Also fine, once, with an end date attached.</p>
          <p>What you shouldn't do is withdraw the increase entirely. That teaches every client that your prices are negotiable by asking.</p>
        </>
      )},
      { h: "Replace the ones who leave", body: (
        <>
          <p>Plan the increase when you have pipeline, not when you're empty. Then a departure is a slot for a better-fitting client at the new rate — which is usually the real point of the exercise.</p>
        </>
      )},
    ],
    related: ["/tools/rate-increase-calculator", "/tools/freelance-hourly-rate-calculator", "/tools/retainer-pricing-calculator"],
  },

  "hourly-vs-fixed-price-vs-value-based-pricing": {
    ...base("hourly-vs-fixed-price-vs-value-based-pricing"),
    deck: "Each pricing model shifts risk somewhere. Choose based on how well you can estimate the work.",
    metaDescription: "Hourly vs fixed price vs value-based pricing for freelancers: how each model shifts risk, when to use it, and how to price it correctly.",
    sections: [
      { h: "Hourly: the client carries the risk", body: (
        <>
          <p>Time and materials is the safest model when scope is fuzzy or the client is exploratory. You're paid for every hour, so overruns cost the client, not you.</p>
          <p>The downside: your income is capped by hours, and efficiency is punished. Start with a defensible hourly number from the <Link to="/tools/freelance-hourly-rate-calculator">hourly rate calculator</Link>.</p>
        </>
      )},
      { h: "Fixed price: you carry the risk", body: (
        <>
          <p>Fixed bids are attractive to clients because the number is certain. That certainty is something you're selling — price a buffer of 15–30% into the quote, and define revisions explicitly.</p>
          <p>Use the <Link to="/tools/project-quote-calculator">project quote calculator</Link> to add complexity multipliers and a deposit rather than guessing.</p>
        </>
      )},
      { h: "Value-based: the outcome sets the price", body: (
        <>
          <p>Value pricing works when you can point to a number the work moves — revenue, conversion, hours saved, risk avoided. If a landing page rebuild reliably adds $200k of annual revenue, $20k is a bargain and $150/hr is a discount you're giving away.</p>
          <p>It requires discovery, evidence, and a client willing to talk about business numbers. It fails badly on undefined creative work.</p>
        </>
      )},
      { h: "Retainers sit across all three", body: (
        <>
          <p>A retainer converts any of the models into predictable monthly income. Price the hour block, discount it modestly for the commitment, and cap rollover. The <Link to="/tools/retainer-pricing-calculator">retainer calculator</Link> handles the maths.</p>
        </>
      )},
      { h: "A simple decision rule", body: (
        <>
          <ul>
            <li>Scope unclear → hourly</li>
            <li>Scope clear and repeatable → fixed price with a buffer</li>
            <li>Outcome measurable in money → value-based</li>
            <li>Ongoing need → retainer</li>
          </ul>
        </>
      )},
    ],
    related: ["/tools/project-quote-calculator", "/tools/retainer-pricing-calculator", "/tools/freelance-hourly-rate-calculator"],
  },

  "how-to-get-clients-to-pay-on-time": {
    ...base("how-to-get-clients-to-pay-on-time"),
    deck: "Late payment is rarely about goodwill. It's about which invoice is easiest to pay and hardest to ignore.",
    metaDescription: "A freelancer's system for getting paid on time: deposits, short terms, clean invoices, scheduled reminders and enforceable late fees.",
    sections: [
      { h: "Take a deposit", body: (
        <>
          <p>25–50% upfront on any project longer than two weeks. It filters out clients who were never going to pay, and it funds the work you're doing before the final invoice clears.</p>
        </>
      )},
      { h: "Use shorter terms than you think you can", body: (
        <>
          <p>Net 14 is normal for solo freelancers. Net 30 is a concession; Net 60 should come with a deposit or a price premium. Model the real cash gap with the <Link to="/tools/days-to-invoice-payment-calculator">days-to-payment calculator</Link>.</p>
        </>
      )},
      { h: "Make the invoice impossible to bounce", body: (
        <>
          <ul>
            <li>Correct legal entity name and address</li>
            <li>PO or reference number if their system needs one</li>
            <li>Clear line items matching the agreed scope</li>
            <li>Due date as a date, not "Net 30"</li>
            <li>Payment options with no friction</li>
          </ul>
        </>
      )},
      { h: "Automate reminders", body: (
        <>
          <p>Send at day −3, day 0, day +7, day +14. Polite, short, unemotional. Most late payments are just an invoice stuck in someone's queue.</p>
        </>
      )},
      { h: "Charge late fees, and mean it", body: (
        <>
          <p>Put a late fee clause in every contract and apply it. Calculate a fair figure with the <Link to="/tools/invoice-late-fee-calculator">late fee calculator</Link>, which also drafts the reminder email.</p>
        </>
      )},
      { h: "Escalate on a schedule", body: (
        <>
          <p>Day 30: pause work and say so. Day 45: contact someone above your usual contact. Day 60: formal demand letter. Having a schedule removes the emotional cost of chasing.</p>
        </>
      )},
    ],
    related: ["/tools/invoice-late-fee-calculator", "/tools/days-to-invoice-payment-calculator", "/tools/payment-processing-fee-calculator"],
  },

  "freelance-tax-deductions-checklist": {
    ...base("freelance-tax-deductions-checklist"),
    deck: "Deductions vary by country, but the categories rarely do. Here's the checklist to take to your accountant.",
    metaDescription: "A freelance tax deductions checklist: home office, software, equipment, travel, training, fees and insurance — plus record-keeping that survives an audit.",
    sections: [
      { h: "A caveat worth reading", body: (
        <>
          <p>Rules differ by country and change often. This is a checklist to discuss with a qualified accountant in your jurisdiction, not tax advice. Official tax authority guidance always wins over anything you read online.</p>
        </>
      )},
      { h: "Commonly deductible categories", body: (
        <>
          <ul>
            <li>Home office — often a proportion of rent, utilities and internet based on space or use</li>
            <li>Equipment — laptop, monitor, camera, phone, sometimes depreciated over years</li>
            <li>Software and subscriptions used for work</li>
            <li>Professional services — accountant, lawyer, bookkeeping</li>
            <li>Business insurance and professional indemnity</li>
            <li>Training, courses and industry books</li>
            <li>Business travel and client meeting costs</li>
            <li>Marketing, hosting, domains and portfolio costs</li>
            <li>Bank charges, payment platform fees and FX costs</li>
            <li>Subcontractor payments</li>
          </ul>
        </>
      )},
      { h: "The ones people forget", body: (
        <>
          <p>Payment processing and currency conversion fees are a real, recurring business expense — see how much they add up to with the <Link to="/tools/payment-processing-fee-calculator">payment fee calculator</Link>. So are the portion of phone bills used for work, and the software you cancelled mid-year.</p>
        </>
      )},
      { h: "Keep records that survive scrutiny", body: (
        <>
          <p>A separate business bank account, receipts attached to transactions, and a monthly 30-minute bookkeeping habit will cover 90% of what any tax authority asks for.</p>
        </>
      )},
      { h: "Set money aside as you earn", body: (
        <>
          <p>Deductions reduce the bill; they don't remove it. Estimate the percentage of every invoice to move into a tax account with the <Link to="/tools/self-employment-tax-estimator">tax estimator</Link>, and do it the day the money lands.</p>
        </>
      )},
    ],
    related: ["/tools/self-employment-tax-estimator", "/tools/vat-gst-invoice-calculator", "/tools/freelance-profit-margin-calculator"],
  },

  "how-to-avoid-scope-creep": {
  ...base("how-to-avoid-scope-creep"),
  deck: "Freelance scope creep happens when a project quietly grows beyond the original agreement. Here are real-world scope creep examples and practical ways to prevent, price, and handle extra work.",
  metaDescription:
    "See real freelance scope creep examples and learn how to prevent extra work, set revision limits, handle client requests, and charge for changes.",

  sections: [
    {
      h: "What is scope creep in freelancing?",
      body: (
        <>
          <p>
            Freelance scope creep is when a client asks for work that was not
            included in the original project agreement. The request may seem
            small, but several small additions can turn a profitable project
            into an unpaid second project.
          </p>

          <p>
            Scope creep is not necessarily caused by a difficult client. It
            often happens because the original scope was too vague, revisions
            were not limited, or there was no clear process for approving
            additional work.
          </p>
        </>
      ),
    },

    {
      h: "10 freelance scope creep examples",
      body: (
        <>
          <p>
            These are common examples of scope creep that freelancers
            encounter during real projects:
          </p>

          <ol className="list-decimal space-y-2 pl-6">
            <li>
              <strong>Extra pages:</strong> A client asks for three additional
              website pages that were not included in the original proposal.
            </li>

            <li>
              <strong>Additional revisions:</strong> The agreed two revision
              rounds become five or six rounds of changes.
            </li>

            <li>
              <strong>New features:</strong> A client asks for a dashboard,
              payment system, booking feature, or another function after the
              project has started.
            </li>

            <li>
              <strong>More content:</strong> The client asks you to write,
              rewrite, upload, or format additional content.
            </li>

            <li>
              <strong>Extra meetings:</strong> Regular meetings become longer
              or more frequent than originally planned.
            </li>

            <li>
              <strong>Design changes:</strong> The client changes the approved
              design direction and asks you to redesign completed work.
            </li>

            <li>
              <strong>Extra platforms:</strong> A project originally planned
              for one platform suddenly needs versions for additional
              platforms or devices.
            </li>

            <li>
              <strong>Unplanned research:</strong> You are asked to perform
              additional research, competitor analysis, or strategy work.
            </li>

            <li>
              <strong>Post-delivery support:</strong> A client continues
              requesting fixes and changes after the agreed support period.
            </li>

            <li>
              <strong>"One small thing":</strong> A supposedly tiny request
              takes another hour or two and becomes a pattern throughout the
              project.
            </li>
          </ol>
        </>
      ),
    },

    {
      h: "Example: how a small request becomes scope creep",
      body: (
        <>
          <p>
            Imagine you agree to build a five-page website for $1,000 with two
            rounds of revisions.
          </p>

          <p>
            During the project, the client asks for a sixth page. Then they
            request a new contact form, another design revision, and several
            additional sections.
          </p>

          <p>
            Each request might sound reasonable by itself. Together, however,
            they have increased the amount of work far beyond the original
            agreement.
          </p>

          <p>
            This is why freelancers should evaluate the <strong>total project
            impact</strong>, rather than deciding whether each individual
            request sounds small.
          </p>
        </>
      ),
    },

    {
      h: "Define deliverables before the project starts",
      body: (
        <>
          <p>
            The easiest way to prevent scope creep is to make the original
            scope specific.
          </p>

          <p>
            "Build a website" is an intention. "Five responsive page templates,
            two revision rounds, delivered in Figma and implemented in
            React" is a much clearer deliverable.
          </p>

          <p>
            Your proposal should explain what you are delivering, what is not
            included, how many revisions are included, and what happens when
            the client requests something outside the agreement.
          </p>
        </>
      ),
    },

    {
      h: "Limit revisions explicitly",
      body: (
        <>
          <p>
            Revision limits are one of the simplest ways to control scope.
            State exactly how many rounds are included and what counts as a
            revision.
          </p>

          <p>
            For example: "The project includes two rounds of revisions.
            Additional revision rounds are billed at the agreed hourly rate."
          </p>

          <p>
            Put this information in the proposal before the client approves
            the project. Do not rely on an informal conversation or assume
            that the client knows what is included.
          </p>
        </>
      ),
    },

    {
      h: "How to respond when a client asks for extra work",
      body: (
        <>
          <p>
            You do not have to say no to every additional request. Instead,
            separate the request from the original scope and price it
            separately.
          </p>

          <p>
            A simple response can be:
          </p>

          <blockquote className="border-l-2 pl-4 italic">
            "That isn't included in the current project scope. I can add it
            as an additional item for $[amount], and it would move the
            delivery date to [date]. If you'd like to proceed, reply with
            approval and I'll add it to the project."
          </blockquote>

          <p>
            This keeps the conversation professional and makes the cost and
            schedule impact clear before you begin the extra work.
          </p>
        </>
      ),
    },

    {
      h: "Calculate what scope creep is actually costing you",
      body: (
        <>
          <p>
            Extra work is not free just because it takes only an hour or two.
            If you repeatedly absorb unpaid work, your effective hourly rate
            can fall significantly.
          </p>

          <p>
            Use our{" "}
            <Link to="/tools/scope-creep-cost-calculator">
              Scope Creep Cost Calculator
            </Link>{" "}
            to estimate the value of additional hours and see how unpaid work
            affects your project margin.
          </p>
        </>
      ),
    },

    {
      h: "Use change orders for larger requests",
      body: (
        <>
          <p>
            When a request is clearly outside the original scope, create a
            change order before starting the work.
          </p>

          <p>
            It does not need to be complicated. You can state the additional
            work, price, and revised deadline in writing:
          </p>

          <blockquote className="border-l-2 pl-4 italic">
            "Adding [X] will take approximately [N] additional hours and cost
            $[Y]. The new delivery date will be [date]. Please confirm
            approval before I begin."
          </blockquote>

          <p>
            The important part is getting approval for the additional cost
            before doing the work.
          </p>
        </>
      ),
    },

    {
      h: "When should you do extra work for free?",
      body: (
        <>
          <p>
            Occasionally doing a genuinely small favor can be reasonable. The
            problem begins when unpaid extras become normal.
          </p>

          <p>
            Track the additional work you perform. If unpaid extras repeatedly
            consume a meaningful portion of your project time, you are
            effectively giving the client a discount without choosing to do
            so.
          </p>

          <p>
            A professional boundary is not about refusing to help clients. It
            is about making sure both sides understand when a request changes
            the original agreement.
          </p>
        </>
      ),
    },

    {
      h: "How to prevent scope creep on your next freelance project",
      body: (
        <>
          <p>
            Before starting your next project, make these five things explicit:
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Exactly what you will deliver</li>
            <li>What is specifically excluded</li>
            <li>How many revision rounds are included</li>
            <li>How additional work will be priced</li>
            <li>How changes affect the delivery date</li>
          </ul>

          <p>
            Clear scope protects both the freelancer and the client. It also
            makes difficult conversations much easier because you can point
            back to an agreement instead of arguing about expectations.
          </p>
        </>
      ),
    },

    {
      h: "The bottom line",
      body: (
        <>
          <p>
            Scope creep is usually easier to prevent than to fix. Define the
            project clearly, limit revisions, document changes, and price
            additional work before you start it.
          </p>

          <p>
            The goal is not to reject every client request. The goal is to
            make sure additional work is a conscious business decision rather
            than unpaid work that quietly reduces your earnings.
          </p>
        </>
      ),
    },
  ],

  related: [
    "/tools/scope-creep-cost-calculator",
    "/tools/project-quote-calculator",
    "/tools/billable-utilization-rate-calculator",
  ],
},

  "best-payment-methods-for-international-freelancers": {
    ...base("best-payment-methods-for-international-freelancers"),
    deck: "The cheapest method depends on corridor and amount. The expensive part is almost always the exchange rate, not the fee.",
    metaDescription: "Compare Wise, Payoneer, PayPal, Stripe and bank wires for international freelancers — real costs, exchange rate markups, speed and coverage.",
    sections: [
      { h: "Look at the exchange rate, not the fee", body: (
        <>
          <p>A platform advertising "low fees" can still cost you 3–4% by quoting a marked-up exchange rate. Compare every option against the mid-market rate — the number you see on a currency search — and treat the difference as a fee.</p>
          <p>The <Link to="/tools/currency-adjusted-rate-calculator">currency-adjusted rate calculator</Link> pulls live mid-market rates so you can see the gap.</p>
        </>
      )},
      { h: "The main options", body: (
        <>
          <ul>
            <li><strong>Wise</strong> — mid-market rate plus a transparent fee; local receiving accounts in several currencies. Usually the cheapest for straightforward transfers.</li>
            <li><strong>Payoneer</strong> — strong coverage in regions where Wise is limited; good for marketplace payouts, weaker rates than Wise.</li>
            <li><strong>PayPal</strong> — universally accepted and instant, but typically the most expensive once the FX markup is counted.</li>
            <li><strong>Stripe / card payments</strong> — excellent client experience, roughly 2.9% + fixed fee, plus a cross-border surcharge.</li>
            <li><strong>Bank wire (SWIFT)</strong> — sensible for large amounts; flat-ish fees favour big invoices, and intermediary bank charges can surprise you.</li>
          </ul>
        </>
      )},
      { h: "Match the method to the invoice size", body: (
        <>
          <p>Percentage-based methods hurt on large invoices; flat-fee methods hurt on small ones. Run both through the <Link to="/tools/payment-processing-fee-calculator">payment fee calculator</Link> and pick per invoice, not per client.</p>
        </>
      )},
      { h: "Bill in the currency that protects you", body: (
        <>
          <p>Invoicing in your own currency moves FX risk to the client, which is fair for long projects. If you invoice in theirs, add a small buffer for rate movement between quote and payment.</p>
        </>
      )},
      { h: "Don't forget tax paperwork", body: (
        <>
          <p>Cross-border invoices often need VAT/GST treatment, reverse charge notes, or a tax ID on the document. The <Link to="/tools/vat-gst-invoice-calculator">VAT/GST calculator</Link> gives you a clean breakdown to copy onto the invoice.</p>
        </>
      )},
    ],
    related: ["/tools/payment-processing-fee-calculator", "/tools/currency-adjusted-rate-calculator", "/tools/vat-gst-invoice-calculator"],
  },

  "freelance-emergency-fund-how-much": {
    ...base("freelance-emergency-fund-how-much"),
    deck: "Salaried advice says three months. Irregular income says more — and the right number is calculable.",
    metaDescription: "How much emergency fund does a freelancer need? Calculate runway from monthly costs, income volatility and payment delays, and where to hold it.",
    sections: [
      { h: "Why three months isn't enough", body: (
        <>
          <p>Employees lose income at a known date and can claim benefits. Freelancers lose income gradually, get paid late, and often carry business costs while revenue is zero. Six months of essential costs is a more realistic floor for most.</p>
        </>
      )},
      { h: "Calculate your number", body: (
        <>
          <p>Add your essential personal costs and your fixed business costs, then multiply by the months of runway your volatility demands. The <Link to="/tools/freelance-emergency-fund-calculator">emergency fund calculator</Link> does this and factors in your typical payment delay.</p>
        </>
      )},
      { h: "Keep the tax money separate", body: (
        <>
          <p>Money owed to a tax authority is not savings. Hold it in its own account so your runway figure is honest — the <Link to="/tools/self-employment-tax-estimator">tax estimator</Link> tells you the percentage to move on every invoice.</p>
        </>
      )},
      { h: "Where to hold it", body: (
        <>
          <p>An instant-access, interest-bearing account at a different bank than your day-to-day one. Friction is a feature: separate enough that you don't dip in, liquid enough to use within a day.</p>
        </>
      )},
      { h: "Build it without stalling everything else", body: (
        <>
          <p>Move a fixed percentage of every payment — 10% is a common starting point — and top it up with deposits and unusually large invoices. Track progress monthly alongside your <Link to="/tools/freelance-profit-margin-calculator">profit margin</Link>.</p>
        </>
      )},
    ],
    related: ["/tools/freelance-emergency-fund-calculator", "/tools/self-employment-tax-estimator", "/tools/days-to-invoice-payment-calculator"],
  },

  "freelance-retainers-explained": {
    ...base("freelance-retainers-explained"),
    deck: "Retainers trade a small discount for predictable income. Structure them badly and you'll fund unlimited work for a flat fee.",
    metaDescription: "Freelance retainers explained: pricing models, hour blocks, rollover rules, scope boundaries and contract clauses that keep retainers profitable.",
    sections: [
      { h: "Two kinds of retainer", body: (
        <>
          <p><strong>Capacity retainers</strong> reserve a block of your time each month. <strong>Deliverable retainers</strong> promise a defined output — four articles, one campaign, ongoing maintenance. Deliverable retainers are easier to defend and easier to price.</p>
        </>
      )},
      { h: "Price the block, then discount lightly", body: (
        <>
          <p>Start with your hourly rate times the monthly hour block. A 5–15% commitment discount is normal; beyond that you're paying the client for the privilege of predictability. The <Link to="/tools/retainer-pricing-calculator">retainer pricing calculator</Link> shows the effective hourly rate after any discount.</p>
        </>
      )},
      { h: "Set rollover rules", body: (
        <>
          <ul>
            <li>Unused hours expire at month end, or roll over once, capped at 25%</li>
            <li>Overage is billed at the standard hourly rate</li>
            <li>Both sides get a monthly usage summary</li>
          </ul>
          <p>Unlimited rollover turns a retainer into a debt you owe.</p>
        </>
      )},
      { h: "Define what's out of scope", body: (
        <>
          <p>Name the categories the retainer doesn't cover — new builds, rush weekend work, third-party costs. Otherwise every extra request gets absorbed; price them with the <Link to="/tools/scope-creep-cost-calculator">scope creep calculator</Link> instead.</p>
        </>
      )},
      { h: "Contract basics", body: (
        <>
          <p>Monthly billing in advance, 30-day notice on both sides, an annual rate review date, and a pause clause. Invoicing in advance is the single biggest cash-flow improvement most freelancers can make.</p>
        </>
      )},
    ],
    related: ["/tools/retainer-pricing-calculator", "/tools/freelance-hourly-rate-calculator", "/tools/scope-creep-cost-calculator"],
  },
};
