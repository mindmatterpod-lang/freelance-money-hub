import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/billable-utilization-rate-calculator")({
  head: () => ({
    meta: [
      { title: "Billable Utilization Rate Calculator for Freelancers | FreelanceRate" },
      { name: "description", content: "Calculate your billable utilization rate, your true earnings per working hour, and the annual cost of unbilled admin time." },
      { property: "og:title", content: "Billable Utilization Rate Calculator" },
      { property: "og:description", content: "What share of your working week actually earns money — and what the rest costs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [worked, setWorked] = useState(45);
  const [billable, setBillable] = useState(24);
  const [rate, setRate] = useState(90);
  const [weeks, setWeeks] = useState(46);

  const { utilization, weekly, trueHourly, annual, unbilledValue } = useMemo(() => {
    const utilization = worked > 0 ? (billable / worked) * 100 : 0;
    const weekly = billable * rate;
    const trueHourly = worked > 0 ? weekly / worked : 0;
    const annual = weekly * weeks;
    const unbilledValue = Math.max(0, worked - billable) * rate * weeks;
    return { utilization, weekly, trueHourly, annual, unbilledValue };
  }, [worked, billable, rate, weeks]);

  return (
    <ToolShell
      toolKey="/tools/billable-utilization-rate-calculator"
      h1="Billable Utilization Rate Calculator"
      tagline="What share of your working week actually earns money?"
      intro="Your hourly rate is not what you earn per hour worked. This calculator shows your utilization rate, your true earnings per hour at the desk, and the annual value of the hours nobody pays for."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Hours worked per week" hint="Everything, including admin">
              <Input type="number" value={worked} onChange={(e) => setWorked(+e.target.value || 0)} />
            </Field>
            <Field label="Billable hours per week">
              <Input type="number" value={billable} onChange={(e) => setBillable(+e.target.value || 0)} />
            </Field>
            <Field label="Your hourly rate">
              <Input type="number" value={rate} onChange={(e) => setRate(+e.target.value || 0)} />
            </Field>
            <Field label="Working weeks per year" hint="44–46 after holiday and illness">
              <Input type="number" value={weeks} onChange={(e) => setWeeks(+e.target.value || 0)} />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="Utilization rate" value={`${utilization.toFixed(0)}%`} sub="Billable ÷ total hours worked" />
            <Stat label="True earnings per hour worked" value={formatMoney(trueHourly)} sub={`Your quoted rate is ${formatMoney(rate)}`} accent="warm" />
            <Stat label="Annual billable revenue" value={formatMoney(annual)} sub={`${weeks} working weeks`} />
            <Stat label="Value of unbilled time" value={formatMoney(unbilledValue)} sub="What admin costs you per year at your rate" />
            {utilization > 75 && (
              <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
                ⚠ Above 75% utilization is rarely sustainable solo — sales, admin and rest all need real hours.
              </div>
            )}
          </div>
        </div>
      }
      works="Utilization is billable hours divided by total hours worked. True hourly earnings divide your weekly billable revenue by every hour you actually worked, which is the number that reflects reality. Unbilled time is valued at your rate to show its opportunity cost."
      why={`Freelancers quote a rate and then feel poorer than the number suggests. Utilization explains why: at 55% utilization, a $90 rate is really about $50 per hour at the desk.\n\nThere are only two levers. Raise the rate, or raise utilization by cutting admin — templates, a proper invoicing tool, fewer discovery calls with unqualified leads, and a booking link instead of email tennis.\n\nUse the real utilization figure when you set rates. Assuming 80% billable is the single most common reason freelance rate calculations come out too low.`}
      mistakes={[
        "Assuming 40 billable hours a week is achievable.",
        "Not tracking non-billable time at all, so it can't be reduced.",
        "Chasing utilization above 80% and burning out.",
        "Spending unbilled hours on tasks that could be templated or automated.",
        "Setting rates from a fantasy utilization figure.",
      ]}
      faqs={[
        { q: "What's a good utilization rate for a freelancer?", a: "55–70% is healthy for a solo freelancer. Agencies target 60–75% for staff, and even that includes dedicated support functions." },
        { q: "Does marketing time count as billable?", a: "No — but it's the most valuable non-billable time you spend. Protect it rather than eliminating it." },
        { q: "How do I raise utilization?", a: "Template proposals and contracts, batch admin into one block a week, qualify leads before calls, and automate invoicing and reminders." },
      ]}
      related={[
        "/tools/freelance-hourly-rate-calculator",
        "/tools/scope-creep-cost-calculator",
        "/tools/freelance-profit-margin-calculator",
      ]}
    />
  );
}
