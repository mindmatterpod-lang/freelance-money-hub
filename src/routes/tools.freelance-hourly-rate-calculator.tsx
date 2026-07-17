import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/freelance-hourly-rate-calculator")({
  head: () => ({
    meta: [
      { title: "Freelance Hourly Rate Calculator — Free & Instant | FreelanceRate" },
      { name: "description", content: "Calculate your freelance hourly rate in seconds. Factor in expenses, holidays and profit margin — no signup, works worldwide." },
      { property: "og:title", content: "Freelance Hourly Rate Calculator — Free" },
      { property: "og:description", content: "Turn your target income into a rate that actually covers your business." },
    ],
  }),
  component: Page,
});

function Page() {
  const [income, setIncome] = useState(80000);
  const [days, setDays] = useState(220);
  const [hours, setHours] = useState(5);
  const [expenses, setExpenses] = useState(6000);
  const [margin, setMargin] = useState(20);

  const { hourly, daily, base, expensePart, marginPart } = useMemo(() => {
    const total = income + expenses;
    const withMargin = total * (1 + margin / 100);
    const billable = Math.max(1, days * hours);
    const hourly = withMargin / billable;
    return {
      hourly,
      daily: hourly * hours,
      base: income / billable,
      expensePart: expenses / billable,
      marginPart: (withMargin - total) / billable,
    };
  }, [income, days, hours, expenses, margin]);

  return (
    <ToolShell
      toolKey="/tools/freelance-hourly-rate-calculator"
      h1="Freelance Hourly Rate Calculator"
      tagline="Turn your target income into a rate that actually covers your business."
      intro="Most freelancers pick a number that just replaces their salary. This calculator adds the pieces salaries hide: unpaid time, business expenses, and a profit margin."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Desired annual income" hint="After business expenses">
              <Input type="number" value={income} onChange={(e) => setIncome(+e.target.value || 0)} />
            </Field>
            <Field label="Working days per year" hint="220 = accounts for holidays & sick days">
              <Input type="number" value={days} onChange={(e) => setDays(+e.target.value || 0)} />
            </Field>
            <Field label="Billable hours per day" hint="~5 is realistic (admin eats the rest)">
              <Input type="number" step="0.5" value={hours} onChange={(e) => setHours(+e.target.value || 0)} />
            </Field>
            <Field label="Annual business expenses" hint="Software, insurance, equipment">
              <Input type="number" value={expenses} onChange={(e) => setExpenses(+e.target.value || 0)} />
            </Field>
            <Field label="Profit margin buffer %" hint="20% is a healthy floor">
              <Input type="number" value={margin} onChange={(e) => setMargin(+e.target.value || 0)} />
            </Field>
          </div>
          <div className="space-y-4">
            <div className="grid gap-3">
              <Stat label="Recommended hourly rate" value={formatMoney(hourly)} sub={`Based on ${Math.round(days * hours)} billable hours/year`} />
              <Stat label="Recommended day rate" value={formatMoney(daily)} sub={`${hours} billable hours per day`} accent="warm" />
            </div>
            <div className="rounded-2xl border bg-secondary/40 p-5">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Rate breakdown / hour</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex justify-between"><span>Base income</span><b>{formatMoney(base)}</b></li>
                <li className="flex justify-between"><span>Expenses coverage</span><b>{formatMoney(expensePart)}</b></li>
                <li className="flex justify-between"><span>Profit buffer</span><b>{formatMoney(marginPart)}</b></li>
                <li className="mt-2 flex justify-between border-t pt-2"><span>Total</span><b>{formatMoney(hourly)}</b></li>
              </ul>
            </div>
          </div>
        </div>
      }
      works="We take your target income plus business expenses, add a profit buffer, then divide by the hours you can actually bill. Total ÷ (working days × billable hours) = your defensible hourly rate."
      why={`Freelancers routinely quote the salary equivalent of their old day job and forget that a job included paid time off, unpaid administrative hours, employer taxes, equipment, healthcare and software.\n\nA calculator like this bakes those back in. The number you get is not aspirational — it's the minimum rate that keeps you solvent and paid for the time you actually work.\n\nUse it as your floor. Charge above it whenever your positioning, niche or urgency lets you.`}
      mistakes={[
        "Assuming you can bill 8 hours per day. Realistically, 4–6 is the norm.",
        "Ignoring 4–6 weeks of unpaid time per year for holidays, sick days and slow weeks.",
        "Leaving out recurring software, insurance and hardware costs.",
        "Setting the rate at ‘what a salary would be’ instead of what a business needs.",
        "Never re-running the numbers after inflation or expense creep.",
      ]}
      faqs={[
        { q: "Why 220 working days?", a: "365 days minus weekends, national holidays, and a couple of weeks off for vacation and illness lands most freelancers around 220." },
        { q: "Why only 5 billable hours per day?", a: "Client work is only part of your day. Admin, marketing, invoicing and learning consume the rest." },
        { q: "Should I include taxes in ‘income’?", a: "No — enter your desired take-home before tax. Use our tax estimator to figure out how much extra to set aside per invoice." },
        { q: "How high should the profit margin be?", a: "20% is a healthy default. Higher if your niche or urgency justifies it, lower if you're pricing to win volume." },
      ]}
      related={[
        "/tools/project-quote-calculator",
        "/tools/annual-income-to-hourly-rate-calculator",
        "/tools/self-employment-tax-estimator",
      ]}
    />
  );
}
