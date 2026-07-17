import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/annual-income-to-hourly-rate-calculator")({
  head: () => ({
    meta: [
      { title: "Salary → Freelance Hourly Rate Calculator | FreelanceRate" },
      { name: "description", content: "Coming from a salary? Find the hourly rate that actually matches your old day-job pay, with unpaid time and business costs baked in." },
    ],
  }),
  component: Page,
});

function Page() {
  const [salary, setSalary] = useState(70000);
  const [uplift, setUplift] = useState(35);
  const [days, setDays] = useState(220);
  const [hours, setHours] = useState(5);

  const { target, hourly, salaryHourly } = useMemo(() => {
    const target = salary * (1 + uplift / 100);
    const billable = Math.max(1, days * hours);
    return {
      target,
      hourly: target / billable,
      salaryHourly: salary / (52 * 40),
    };
  }, [salary, uplift, days, hours]);

  return (
    <ToolShell
      toolKey="/tools/annual-income-to-hourly-rate-calculator"
      h1="Salary → Freelance Hourly Rate Calculator"
      tagline="The hourly rate that actually matches your old day-job salary."
      intro="If you're leaving a salary, dividing by 2,080 hours gives a dangerously low number. This calculator adds an uplift for benefits, unpaid time and business costs."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Old annual salary (gross)">
              <Input type="number" value={salary} onChange={(e) => setSalary(+e.target.value || 0)} />
            </Field>
            <Field label="Uplift %" hint="30–40% covers benefits, PTO & overheads">
              <Input type="number" value={uplift} onChange={(e) => setUplift(+e.target.value || 0)} />
            </Field>
            <Field label="Working days per year">
              <Input type="number" value={days} onChange={(e) => setDays(+e.target.value || 0)} />
            </Field>
            <Field label="Billable hours per day">
              <Input type="number" step="0.5" value={hours} onChange={(e) => setHours(+e.target.value || 0)} />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="Equivalent freelance hourly rate" value={formatMoney(hourly)} sub={`Target income: ${formatMoney(target)}`} />
            <Stat label="Naive salary / 2,080h" value={formatMoney(salaryHourly)} sub="What people usually quote — it's too low" accent="warm" />
            <div className="rounded-2xl border bg-secondary/40 p-5 text-sm text-muted-foreground">
              A salary paid for a lot of things you'll now pay for yourself: healthcare, paid time off, a laptop, software, retirement contributions, and unbillable admin hours. The uplift bakes those back in.
            </div>
          </div>
        </div>
      }
      works="We take your gross salary, add an uplift for benefits and unpaid time (typically 30–40%), then divide by the hours you can realistically bill each year — not the 2,080 hours a full-time job assumes."
      why={`This is the single biggest mistake freelancers make when they leave a job: 'I made $70k, so I need $35/hr.' That math assumes you can bill 40 hours a week for 52 weeks with zero costs.\n\nIn reality you'll bill closer to 25 hours a week for 44 weeks, and pay out of pocket for the things HR handled. The right number is often 50–80% higher than the naive calculation.\n\nUse this as your minimum. Anything lower is a pay cut disguised as freedom.`}
      mistakes={[
        "Dividing salary by 2,080 hours as if freelancing is the same shape as a job.",
        "Ignoring the value of employer-paid benefits (~25–35% on top of salary).",
        "Assuming every working hour is billable — it isn't.",
        "Forgetting equipment, software, and professional development were once expensed.",
        "Anchoring to the naive number in negotiations.",
      ]}
      faqs={[
        { q: "Why 35% uplift?", a: "It roughly covers employer-side taxes, healthcare, paid time off, retirement matching and equipment. Adjust up if your prior benefits were richer." },
        { q: "Is this the same as the hourly rate calculator?", a: "Same math, different starting point. Use this one if you're coming from salary; use the other if you already think in terms of freelance income and expenses." },
        { q: "What if I want to earn more than my old salary?", a: "You should — plan for at least a 10–20% real raise to make the risk of self-employment worth it." },
      ]}
      related={[
        "/tools/freelance-hourly-rate-calculator",
        "/tools/self-employment-tax-estimator",
        "/tools/freelance-profit-margin-calculator",
      ]}
    />
  );
}
