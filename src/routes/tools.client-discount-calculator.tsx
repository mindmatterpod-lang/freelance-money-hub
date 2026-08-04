import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/client-discount-calculator")({
  head: () => ({
    meta: [
      { title: "Freelance Discount Impact Calculator — Free | FreelanceRate" },
      { name: "description", content: "See what a client discount really costs: lost fee, reduced effective hourly rate, and the extra work needed to make it back." },
      { property: "og:title", content: "Freelance Discount Impact Calculator" },
      { property: "og:description", content: "How many extra hours a 'small' discount really costs you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/tools/client-discount-calculator" }],
  }),
  component: Page,
});

function Page() {
  const [fee, setFee] = useState(3000);
  const [hours, setHours] = useState(30);
  const [discount, setDiscount] = useState(15);
  const [costs, setCosts] = useState(400);

  const { discounted, lost, newRate, oldRate, extraHours, marginDrop } = useMemo(() => {
    const discounted = fee * (1 - discount / 100);
    const lost = fee - discounted;
    const oldRate = hours > 0 ? fee / hours : 0;
    const newRate = hours > 0 ? discounted / hours : 0;
    const extraHours = newRate > 0 ? lost / newRate : 0;
    const oldMargin = fee - costs;
    const newMargin = discounted - costs;
    const marginDrop = oldMargin > 0 ? ((oldMargin - newMargin) / oldMargin) * 100 : 0;
    return { discounted, lost, newRate, oldRate, extraHours, marginDrop };
  }, [fee, hours, discount, costs]);

  return (
    <ToolShell
      toolKey="/tools/client-discount-calculator"
      h1="Client Discount Impact Calculator"
      tagline="A 15% discount is rarely a 15% problem. Here's the real number."
      intro="Discounts come out of profit, not revenue — which is why a modest-sounding cut can wipe out a third of what a project actually earns you. This shows the fee lost, the new effective rate, and the extra unpaid hours it represents."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Original fee">
              <Input type="number" value={fee} onChange={(e) => setFee(+e.target.value || 0)} />
            </Field>
            <Field label="Hours of work">
              <Input type="number" value={hours} onChange={(e) => setHours(+e.target.value || 0)} />
            </Field>
            <Field label="Discount %">
              <Input type="number" value={discount} onChange={(e) => setDiscount(+e.target.value || 0)} />
            </Field>
            <Field label="Direct costs on the project" hint="Tools, subcontractors, assets">
              <Input type="number" value={costs} onChange={(e) => setCosts(+e.target.value || 0)} />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="Discounted fee" value={formatMoney(discounted)} sub={`You give up ${formatMoney(lost)}`} />
            <Stat label="Effective hourly rate" value={formatMoney(newRate)} sub={`Down from ${formatMoney(oldRate)}`} accent="warm" />
            <Stat label="Profit lost" value={`−${marginDrop.toFixed(1)}%`} sub="After direct costs" />
            <Stat label="Equivalent free work" value={`${extraHours.toFixed(1)} h`} sub="Hours you'd work for nothing" />
            <div className="rounded-2xl border bg-secondary/40 p-5 text-sm text-muted-foreground">
              If you do discount, trade it for something: full payment upfront, a longer commitment, a case study, or a reduced scope.
            </div>
          </div>
        </div>
      }
      works="We apply the discount to the fee, recalculate your effective hourly rate over the same hours, and express the loss as unpaid hours. The profit figure subtracts direct costs first, because discounts come out of margin — not revenue."
      why={`A 15% discount on a project with 25% direct costs removes around 20% of your profit. The client sees a small concession; your business sees a large one.\n\nThe unpaid-hours figure is the one that changes behaviour. 'I'll knock off 15%' sounds generous. 'I'll work four and a half hours for free' sounds like what it is.\n\nWhen a discount is genuinely strategic — a dream logo, a long commitment, upfront cash — take it knowingly and get something in return. Never discount just because someone asked.`}
      mistakes={[
        "Offering a discount before the client has even objected to the price.",
        "Discounting without reducing scope.",
        "Giving a 'first project' discount that becomes the permanent rate.",
        "Ignoring direct costs when judging whether a discount is affordable.",
        "Repeating a discount every time the same client returns.",
      ]}
      faqs={[
        { q: "Is any discount acceptable?", a: "Yes — 5–10% for upfront payment or a multi-month commitment is normal and often profitable once cash flow is factored in." },
        { q: "What should I offer instead of a discount?", a: "Reduced scope, a phased delivery, or a longer timeline. All lower the client's cost without lowering your rate." },
        { q: "How do I undo a discount later?", a: "Attach an end date when you give it, or frame it as a one-off introductory rate in writing." },
      ]}
      related={[
        "/tools/rate-increase-calculator",
        "/tools/project-quote-calculator",
        "/tools/scope-creep-cost-calculator",
      ]}
    />
  );
}
