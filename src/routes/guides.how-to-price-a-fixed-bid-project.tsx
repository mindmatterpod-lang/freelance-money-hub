import { createFileRoute, Link } from "@tanstack/react-router";
import { GuideShell } from "./guides.how-to-set-your-freelance-rate";

export const Route = createFileRoute("/guides/how-to-price-a-fixed-bid-project")({
  head: () => ({
    meta: [
      { title: "How to Price a Fixed-Bid Freelance Project | FreelanceRate" },
      { name: "description", content: "Turn hours, complexity and risk into a fixed-bid quote clients accept — with deposits and revision overages baked in." },
    ],
  }),
  component: () => (
    <GuideShell
      breadcrumb="Fixed-bid pricing"
      title="Fixed Bid vs. Hourly: How to Price Any Freelance Project"
      deck="Hourly is honest; fixed-bid is scary. Here's how to price fixed-bid work without giving away your margin — and when to use each model."
      sections={[
        { h: "When to go fixed-bid", body: (
          <p>Fixed-bid works when the scope is genuinely knowable: a landing page, a defined report, a well-scoped 2-week engagement. It fails when the scope is exploratory: research phases, strategy work, or ‘we'll see how it goes’ clients.</p>
        )},
        { h: "The three-step estimate", body: (
          <>
            <p>1. Estimate hours honestly, including kickoff, meetings, QA and delivery.</p>
            <p>2. Multiply by your hourly rate (see the <Link to="/tools/freelance-hourly-rate-calculator">Hourly Rate Calculator</Link>).</p>
            <p>3. Apply a complexity multiplier: 1.0× for repeatable work, 1.3× for moderate unknowns, 1.6× for new stack + new client.</p>
            <p>Our <Link to="/tools/project-quote-calculator">Project Quote Calculator</Link> does all three in one screen.</p>
          </>
        )},
        { h: "Structure the quote so scope creep costs money", body: (
          <p>Every fixed-bid quote should have three parts: a deposit (30–50%), a defined number of revision rounds, and a per-revision overage rate (~1.25× your hourly rate). This turns ‘quick tweaks’ into a decision, not a favor.</p>
        )},
        { h: "What to do if you were wrong", body: (
          <p>If the project blows past the estimate, don't silently eat it. Tell the client early, show what changed, and offer a change order at your overage rate. Clients respect this. What they don't respect is discovering the overage at the end.</p>
        )},
      ]}
      related={[
        "/tools/project-quote-calculator",
        "/tools/freelance-hourly-rate-calculator",
        "/tools/invoice-late-fee-calculator",
        "/blog/hourly-vs-fixed-price-vs-value-based-pricing",
        "/guides/how-to-set-your-freelance-rate",
      ]}
    />
  ),
});
