import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/freelance-day-rate-calculator")({
  head: () => ({
    meta: [
      { title: "Freelance Day Rate Calculator — Free | FreelanceRate" },
      { name: "description", content: "Turn your hourly rate into a day rate clients accept. Includes a minimum-day premium, weekly rate, and monthly full-time equivalent." },
      { property: "og:title", content: "Freelance Day Rate Calculator" },
      { property: "og:description", content: "Convert an hourly rate into a defensible day, week and month rate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [hourly, setHourly] = useState(85);
  const [hoursPerDay, setHoursPerDay] = useState(7);
  const [premium, setPremium] = useState(10);
  const [weekDiscount, setWeekDiscount] = useState(10);

  const { day, week, month } = useMemo(() => {
    const day = hourly * hoursPerDay * (1 + premium / 100);
    const week = day * 5 * (1 - weekDiscount / 100);
    return { day, week, month: week * 4 };
  }, [hourly, hoursPerDay, premium, weekDiscount]);

  return (
    <ToolShell
      toolKey="/tools/freelance-day-rate-calculator"
      h1="Freelance Day Rate Calculator"
      tagline="Turn an hourly rate into a day rate you can quote without flinching."
      intro="Many clients budget in days, not hours. This calculator converts your hourly rate into day, week and month figures — with a premium for blocking out a whole day and an optional commitment discount."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Your hourly rate">
              <Input type="number" value={hourly} onChange={(e) => setHourly(+e.target.value || 0)} />
            </Field>
            <Field label="Billable hours in a booked day" hint="6–8 is typical">
              <Input type="number" step="0.5" value={hoursPerDay} onChange={(e) => setHoursPerDay(+e.target.value || 0)} />
            </Field>
            <Field label="Full-day premium %" hint="You're turning other work away">
              <Input type="number" value={premium} onChange={(e) => setPremium(+e.target.value || 0)} />
            </Field>
            <Field label="Weekly commitment discount %">
              <Input type="number" value={weekDiscount} onChange={(e) => setWeekDiscount(+e.target.value || 0)} />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="Day rate" value={formatMoney(day)} sub={`${hoursPerDay}h booked at ${formatMoney(hourly)}/hr + ${premium}%`} />
            <Stat label="Week rate (5 days)" value={formatMoney(week)} sub={`${weekDiscount}% commitment discount applied`} accent="warm" />
            <Stat label="Month (4 weeks)" value={formatMoney(month)} sub="Full-time equivalent engagement" />
          </div>
        </div>
      }
      works="We multiply your hourly rate by the hours you'd actually bill in a booked day, then add a premium because a booked day blocks all other work. Weekly and monthly figures apply an optional commitment discount for longer bookings."
      why={`Day rates aren't just hourly rates times eight. When you block out a day, you lose the ability to take smaller, higher-value work, and you absorb context-switching costs you would otherwise pass on.\n\nA day rate also changes how clients perceive you — buying a day of expertise feels different to buying seven hours of labour. The premium is part of that positioning.\n\nQuoting weekly and monthly figures upfront makes it easy for a client to expand the engagement without renegotiating from zero.`}
      mistakes={[
        "Multiplying hourly by 8 and calling it a day rate.",
        "Discounting weeks and months by 25% or more just to look competitive.",
        "Not saying how many hours a 'day' actually means in your contract.",
        "Forgetting travel days, kick-off calls and handover time.",
        "Quoting a day rate for work you can't finish in a day.",
      ]}
      faqs={[
        { q: "How many hours should a day rate cover?", a: "State it explicitly — usually 7 or 8 hours. Anything beyond that should be billed hourly or agreed as overtime." },
        { q: "Should a day rate be higher or lower than hourly x 8?", a: "Slightly higher in most cases. You're pricing exclusivity, not just time." },
        { q: "Is a weekly discount worth it?", a: "Up to about 10–15%. Beyond that you're funding the client's cash flow with your own margin." },
      ]}
      related={[
        "/tools/freelance-hourly-rate-calculator",
        "/tools/retainer-pricing-calculator",
        "/tools/project-quote-calculator",
      ]}
    />
  );
}
