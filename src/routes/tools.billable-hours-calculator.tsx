import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useCurrency } from "@/lib/currency";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/billable-hours-calculator")({
  head: () => ({
    meta: [
      { title: "Billable Hours Calculator for Freelancers | FreelanceRate" },
      {
        name: "description",
        content:
          "How many hours can you actually bill? Enter your working week, admin time and weeks off to see billable hours, billable % and annual revenue.",
      },
      { property: "og:title", content: "Billable Hours Calculator" },
      {
        property: "og:description",
        content: "Your real billable hours — and what the non-billable ones cost you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  useCurrency();
  const [workingHours, setWorkingHours] = useState(40);
  const [nonBillable, setNonBillable] = useState(15);
  const [weeksOff, setWeeksOff] = useState(6);
  const [rate, setRate] = useState(75);

  const { billableWeek, billableYear, billablePct, revenue, lostRevenue, nonBillableYear } =
    useMemo(() => {
      const billableWeek = Math.max(0, workingHours - nonBillable);
      const workingWeeks = Math.max(0, 52 - weeksOff);
      const billableYear = billableWeek * workingWeeks;
      const nonBillableYear = nonBillable * workingWeeks;
      const billablePct = workingHours > 0 ? (billableWeek / workingHours) * 100 : 0;
      const revenue = billableYear * rate;
      const lostRevenue = nonBillableYear * rate;
      return { billableWeek, billableYear, billablePct, revenue, lostRevenue, nonBillableYear };
    }, [workingHours, nonBillable, weeksOff, rate]);

  return (
    <ToolShell
      toolKey="/tools/billable-hours-calculator"
      h1="Billable Hours Calculator"
      tagline="How many hours can you actually bill — and what are the rest worth?"
      intro="A 40-hour week is not 40 billable hours. Admin, marketing, proposals and learning eat a large share of it. This shows your real billable capacity and what it earns at your rate."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Working hours per week" hint="All work, billable or not">
              <Input
                type="number"
                min="0"
                value={workingHours}
                onChange={(e) => setWorkingHours(+e.target.value || 0)}
              />
            </Field>
            <Field label="Non-billable hours per week" hint="Admin, marketing, proposals, learning">
              <Input
                type="number"
                min="0"
                value={nonBillable}
                onChange={(e) => setNonBillable(+e.target.value || 0)}
              />
            </Field>
            <Field label="Weeks off per year" hint="Holidays, sick days, slow weeks">
              <Input
                type="number"
                min="0"
                max="52"
                value={weeksOff}
                onChange={(e) => setWeeksOff(+e.target.value || 0)}
              />
            </Field>
            <Field label="Hourly rate">
              <Input
                type="number"
                min="0"
                value={rate}
                onChange={(e) => setRate(+e.target.value || 0)}
              />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat
              label="Billable hours / week"
              value={`${billableWeek.toFixed(1)} h`}
              sub={`Out of ${workingHours} working hours`}
            />
            <Stat
              label="Billable hours / year"
              value={`${Math.round(billableYear).toLocaleString()} h`}
              sub={`${52 - weeksOff} working weeks`}
              accent="warm"
            />
            <Stat
              label="Billable %"
              value={`${billablePct.toFixed(0)}%`}
              sub="Share of your week that earns money"
            />
            <Stat
              label="Annual revenue at your rate"
              value={formatMoney(revenue)}
              sub={`At ${formatMoney(rate)} / hour`}
            />
            <Stat
              label="Revenue lost to non-billable time"
              value={formatMoney(lostRevenue)}
              sub={`${Math.round(nonBillableYear).toLocaleString()} non-billable hours / year`}
            />
            <div className="rounded-2xl border bg-secondary/40 p-5 text-sm text-muted-foreground">
              Most freelancers bill 50–70% of their working hours. If your billable share is below
              50%, the fix is usually fewer, better clients — not more hours.
            </div>
          </div>
        </div>
      }
      works="We subtract your non-billable hours from your working week to get billable hours per week, multiply by your working weeks (52 minus weeks off) for the annual figure, and multiply by your hourly rate for revenue. The 'lost revenue' figure is what those non-billable hours would have earned at the same rate."
      why={`Your rate is only half the pricing equation — the other half is how many hours you can actually sell. A freelancer at $100/hour who bills 20 hours a week earns less than one at $75/hour who bills 35.\n\nNon-billable time is not wasted time; proposals and marketing are what keep the pipeline full. But it is unpaid time, and your rate has to carry it. That is why the hourly rate calculator divides by billable hours, not working hours.\n\nIf the revenue number here is lower than your target, you have two levers: raise the rate, or raise the billable share. Retainers and repeat clients usually move the second lever faster than working longer hours does.`}
      mistakes={[
        "Planning your income on a 40-hour billable week — almost nobody bills that.",
        "Forgetting holidays, sick days and slow weeks when setting an annual target.",
        "Treating admin and marketing as free — they are paid for by your billable hours.",
        "Cutting your rate to win work instead of cutting non-billable time.",
        "Never tracking billable vs non-billable hours, so the split stays a guess.",
      ]}
      faqs={[
        {
          q: "What is a realistic billable percentage for a freelancer?",
          a: "Most sustainable freelancers bill 50–70% of their working hours. Below 50% usually means too much time on sales and admin; above 70% usually means a steady retainer book or very little pipeline work.",
        },
        {
          q: "How many billable hours are there in a year?",
          a: "At 25 billable hours a week for 46 working weeks, about 1,150 hours. The exact number depends on your working week, your non-billable load and your time off — run your own numbers above.",
        },
        {
          q: "Should I count learning and marketing as non-billable?",
          a: "Yes — nobody pays you directly for them. They are investments in future billable work, and your rate needs to cover them, but they are not billable hours.",
        },
        {
          q: "How do I increase my billable hours?",
          a: "Retainers, repeat clients and productised services cut proposal and admin time per dollar earned. Raising your rate also helps: fewer, better-paid hours beat more cheap ones.",
        },
      ]}
      related={[
        "/tools/billable-utilization-rate-calculator",
        "/tools/freelance-hourly-rate-calculator",
        "/tools/freelance-day-rate-calculator",
      ]}
    />
  );
}
