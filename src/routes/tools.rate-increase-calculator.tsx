import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/rate-increase-calculator")({
  head: () => ({
    meta: [
      { title: "Freelance Rate Increase Calculator — Free | FreelanceRate" },
      { name: "description", content: "See what a rate rise really does to your income, including how many clients you can afford to lose and still come out ahead." },
      { property: "og:title", content: "Freelance Rate Increase Calculator" },
      { property: "og:description", content: "Model a rate rise: new income, break-even churn, and hours saved." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/tools/rate-increase-calculator" }],
  }),
  component: Page,
});

function Page() {
  const [rate, setRate] = useState(80);
  const [increase, setIncrease] = useState(20);
  const [hours, setHours] = useState(100);
  const [churn, setChurn] = useState(10);

  const { newRate, current, projected, breakEvenChurn, hoursSaved } = useMemo(() => {
    const newRate = rate * (1 + increase / 100);
    const current = rate * hours;
    const keptHours = hours * (1 - churn / 100);
    const projected = newRate * keptHours;
    const breakEvenChurn = increase > 0 ? (increase / (100 + increase)) * 100 : 0;
    const hoursSaved = current > 0 ? hours - current / newRate : 0;
    return { newRate, current, projected, breakEvenChurn, hoursSaved };
  }, [rate, increase, hours, churn]);

  return (
    <ToolShell
      toolKey="/tools/rate-increase-calculator"
      h1="Freelance Rate Increase Calculator"
      tagline="How much churn can you absorb and still earn more? Usually far more than you think."
      intro="Raising rates feels risky because the downside is vivid and the upside is abstract. This calculator makes both concrete: your new monthly income, and the exact percentage of work you could lose before you're worse off."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Current hourly rate">
              <Input type="number" value={rate} onChange={(e) => setRate(+e.target.value || 0)} />
            </Field>
            <Field label="Increase %">
              <Input type="number" value={increase} onChange={(e) => setIncrease(+e.target.value || 0)} />
            </Field>
            <Field label="Billable hours per month">
              <Input type="number" value={hours} onChange={(e) => setHours(+e.target.value || 0)} />
            </Field>
            <Field label="Expected work lost %" hint="Clients who won't accept the new rate">
              <Input type="number" value={churn} onChange={(e) => setChurn(+e.target.value || 0)} />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="New hourly rate" value={formatMoney(newRate)} sub={`Up from ${formatMoney(rate)}`} />
            <Stat label="Monthly income after churn" value={formatMoney(projected)} sub={`Currently ${formatMoney(current)}`} accent="warm" />
            <Stat label="Break-even churn" value={`${breakEvenChurn.toFixed(1)}%`} sub="Work you could lose and still match today" />
            <Stat label="Hours freed at same income" value={`${hoursSaved.toFixed(1)} h`} sub="Per month, if you keep income flat" />
          </div>
        </div>
      }
      works="We apply the increase to your rate, reduce your billable hours by the churn you expect, and compare the result to today's income. Break-even churn is increase ÷ (100 + increase) — the share of work you could lose while still earning exactly the same."
      why={`Most freelancers under-price for years because they overestimate how many clients will leave. A 20% rise breaks even at roughly 16.7% lost volume — and real-world churn from a well-communicated increase is usually lower than that.\n\nThe hours-freed number matters just as much. If you keep income flat at the higher rate, you buy back time for marketing, better clients, or simply not working weekends.\n\nGive 30–60 days' notice, state the new rate as a fact, and apply it to new work first.`}
      mistakes={[
        "Apologising for the increase, or over-explaining it.",
        "Raising rates for everyone on the same day with no notice.",
        "Backing down the moment one client pushes back.",
        "Raising rates while your pipeline is empty.",
        "Forgetting to update proposal templates and your retainer agreements.",
      ]}
      faqs={[
        { q: "How much should I raise rates by?", a: "10–20% annually is routine. Larger jumps make sense when you've changed positioning or your rate has been static for years." },
        { q: "How much notice should I give?", a: "30 to 60 days, in writing, with work already in progress honoured at the old rate." },
        { q: "What if a good client says no?", a: "Offer a phased increase or a defined grace period with an end date — not an indefinite exception." },
      ]}
      related={[
        "/tools/freelance-hourly-rate-calculator",
        "/tools/client-discount-calculator",
        "/tools/retainer-pricing-calculator",
      ]}
    />
  );
}
