import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/freelance-profit-margin-calculator")({
  head: () => ({
    meta: [
      { title: "Freelance Profit Margin Calculator — Free | FreelanceRate" },
      { name: "description", content: "Calculate gross margin, net margin, and how many projects per month you need to break even as a freelancer." },
    ],
  }),
  component: Page,
});

function Page() {
  const [revenue, setRevenue] = useState(5000);
  const [direct, setDirect] = useState(800);
  const [overhead, setOverhead] = useState(1500);

  const { gross, net, grossPct, netPct, breakEven } = useMemo(() => {
    const gross = revenue - direct;
    const net = gross - overhead;
    const grossPct = revenue > 0 ? (gross / revenue) * 100 : 0;
    const netPct = revenue > 0 ? (net / revenue) * 100 : 0;
    const breakEven = gross > 0 ? Math.ceil(overhead / gross) : Infinity;
    return { gross, net, grossPct, netPct, breakEven };
  }, [revenue, direct, overhead]);

  return (
    <ToolShell
      toolKey="/tools/freelance-profit-margin-calculator"
      h1="Freelance Profit Margin Calculator"
      tagline="Gross margin, net margin, and break-even project count per month."
      intro="Revenue isn't income. This calculator separates what a project earns from what a project keeps, and tells you how many you need to run each month to stay solvent."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Revenue per project" hint="Or per month, if you prefer">
              <Input type="number" value={revenue} onChange={(e) => setRevenue(+e.target.value || 0)} />
            </Field>
            <Field label="Direct costs" hint="Subcontractors, per-project tools & assets">
              <Input type="number" value={direct} onChange={(e) => setDirect(+e.target.value || 0)} />
            </Field>
            <Field label="Monthly overhead" hint="Rent, insurance, always-on software">
              <Input type="number" value={overhead} onChange={(e) => setOverhead(+e.target.value || 0)} />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="Gross margin" value={`${grossPct.toFixed(0)}%`} sub={formatMoney(gross)} />
            <Stat label="Net margin" value={`${netPct.toFixed(0)}%`} sub={formatMoney(net)} accent="warm" />
            <Stat label="Break-even projects / month" value={isFinite(breakEven) ? String(breakEven) : "—"} sub="To cover fixed overhead" />
          </div>
        </div>
      }
      works="Gross margin = (revenue − direct costs) ÷ revenue. Net margin subtracts monthly overhead. Break-even = overhead ÷ contribution margin per project — the number of projects you need each month before you start making real money."
      why={`Freelancers often optimize for revenue and are surprised when the bank account doesn't grow. Direct costs and fixed overhead quietly eat the difference.\n\nA clear split between gross and net margin makes it obvious where the leak is — too much subcontracting, tool creep, or an overhead base that's grown faster than your rates.\n\nBreak-even is the number that tells you when the month starts paying for itself. Everything after that is profit.`}
      mistakes={[
        "Confusing revenue with take-home income.",
        "Signing up for tools you use once, then forgetting they auto-renew.",
        "Under-pricing to win volume, then losing money at scale.",
        "Not raising rates when overhead grows.",
        "Ignoring how much unpaid time each project actually consumes.",
      ]}
      faqs={[
        { q: "What's a healthy net margin for a freelancer?", a: "30–50% is common for solo freelancers with low overhead. Below 20% suggests you're either under-pricing or over-spending." },
        { q: "Are my own hours a direct cost?", a: "Not in this calculator — we assume you're paying yourself out of the net margin. Add a salary line to overhead if you'd rather model it that way." },
        { q: "How often should I run this?", a: "Once a quarter, and any time you take on a new recurring cost." },
      ]}
      related={[
        "/tools/freelance-hourly-rate-calculator",
        "/tools/project-quote-calculator",
        "/tools/days-to-invoice-payment-calculator",
      ]}
    />
  );
}
