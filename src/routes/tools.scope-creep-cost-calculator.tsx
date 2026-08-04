import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/scope-creep-cost-calculator")({
  head: () => ({
    meta: [
      { title: "Scope Creep Cost Calculator for Freelancers | FreelanceRate" },
      { name: "description", content: "Price the 'quick extra' before you agree. See the change-order value, the margin damage of doing it free, and your real effective rate." },
      { property: "og:title", content: "Scope Creep Cost Calculator" },
      { property: "og:description", content: "Turn extra requests into a priced change order instead of free work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/tools/scope-creep-cost-calculator" }],
  }),
  component: Page,
});

function Page() {
  const [fee, setFee] = useState(4000);
  const [plannedHours, setPlannedHours] = useState(40);
  const [extraHours, setExtraHours] = useState(8);
  const [rate, setRate] = useState(100);
  const [rush, setRush] = useState(0);

  const { changeOrder, originalRate, effectiveRate, drop } = useMemo(() => {
    const changeOrder = extraHours * rate * (1 + rush / 100);
    const originalRate = plannedHours > 0 ? fee / plannedHours : 0;
    const totalHours = plannedHours + extraHours;
    const effectiveRate = totalHours > 0 ? fee / totalHours : 0;
    const drop = originalRate > 0 ? ((originalRate - effectiveRate) / originalRate) * 100 : 0;
    return { changeOrder, originalRate, effectiveRate, drop };
  }, [fee, plannedHours, extraHours, rate, rush]);

  return (
    <ToolShell
      toolKey="/tools/scope-creep-cost-calculator"
      h1="Scope Creep Cost Calculator"
      tagline="Price the 'quick extra thing' before you say yes to it."
      intro="Extra requests rarely feel expensive in the moment. This calculator turns them into a change-order figure, and shows what your effective hourly rate becomes if you absorb the work instead."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Agreed project fee">
              <Input type="number" value={fee} onChange={(e) => setFee(+e.target.value || 0)} />
            </Field>
            <Field label="Hours you planned for">
              <Input type="number" value={plannedHours} onChange={(e) => setPlannedHours(+e.target.value || 0)} />
            </Field>
            <Field label="Extra hours requested">
              <Input type="number" step="0.5" value={extraHours} onChange={(e) => setExtraHours(+e.target.value || 0)} />
            </Field>
            <Field label="Your hourly rate">
              <Input type="number" value={rate} onChange={(e) => setRate(+e.target.value || 0)} />
            </Field>
            <Field label="Rush premium %" hint="If it disrupts your schedule">
              <Input type="number" value={rush} onChange={(e) => setRush(+e.target.value || 0)} />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="Quote this change order" value={formatMoney(changeOrder)} sub={`${extraHours}h at ${formatMoney(rate)}/hr${rush ? ` + ${rush}% rush` : ""}`} />
            <Stat label="Effective rate if you do it free" value={formatMoney(effectiveRate)} sub={`Down from ${formatMoney(originalRate)}`} accent="warm" />
            <Stat label="Margin damage" value={`−${drop.toFixed(1)}%`} sub="On this project" />
            <div className="rounded-2xl border bg-secondary/40 p-5 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Copy-paste change order</p>
              <p className="mt-2">"Happy to add this — it's about {extraHours} hours, so {formatMoney(changeOrder)} added to the next invoice, and delivery moves accordingly. Reply 'approved' and I'll start."</p>
            </div>
          </div>
        </div>
      }
      works="The change order is the extra hours at your hourly rate, plus an optional rush premium. The effective rate divides your fixed fee by the total hours you'd actually work — planned plus absorbed — so you can see the pay cut in plain numbers."
      why={`Scope creep is almost never one big request. It's six small ones, each individually reasonable, that together turn a healthy fixed-bid project into an hourly job at half your rate.\n\nThe fix is a habit, not a confrontation: estimate, quote, get written approval, then work. Clients accept this far more readily than freelancers expect, because it's how every agency they've worked with operates.\n\nIf you do choose to absorb something, do it deliberately and note the value — unpaid extras above about 5% of project value are a discount you didn't decide to give.`}
      mistakes={[
        "Saying 'sure, no problem' before estimating the work.",
        "Absorbing extras to avoid an awkward conversation.",
        "Not writing down what was in scope at the start.",
        "Letting delivery dates slip without renegotiating them.",
        "Treating repeated free work as relationship-building.",
      ]}
      faqs={[
        { q: "What if the extra really is tiny?", a: "Do it, and mention it as a no-charge item. Making the value visible protects the boundary for bigger requests." },
        { q: "How do I bring up a change order politely?", a: "Lead with yes, then state hours, cost and the new date. Framing it as a scheduling question, not a money question, defuses most tension." },
        { q: "Should I charge a rush premium?", a: "If it means evenings, weekends or bumping other clients — yes, typically 25–50%." },
      ]}
      related={[
        "/tools/project-quote-calculator",
        "/tools/client-discount-calculator",
        "/tools/billable-utilization-rate-calculator",
      ]}
    />
  );
}
