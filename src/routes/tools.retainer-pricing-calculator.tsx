import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/retainer-pricing-calculator")({
  head: () => ({
    meta: [
      { title: "Monthly Retainer Pricing Calculator — Free | FreelanceRate" },
      { name: "description", content: "Price a freelance retainer: hour block, commitment discount, effective hourly rate, overage rate and annual contract value." },
      { property: "og:title", content: "Monthly Retainer Pricing Calculator" },
      { property: "og:description", content: "Work out a retainer fee, effective hourly rate and overage rate in seconds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/tools/retainer-pricing-calculator" }],
  }),
  component: Page,
});

function Page() {
  const [hourly, setHourly] = useState(90);
  const [hours, setHours] = useState(20);
  const [discount, setDiscount] = useState(10);
  const [overagePremium, setOveragePremium] = useState(10);

  const { fee, effective, overage, annual } = useMemo(() => {
    const gross = hourly * hours;
    const fee = gross * (1 - discount / 100);
    return {
      fee,
      effective: hours > 0 ? fee / hours : 0,
      overage: hourly * (1 + overagePremium / 100),
      annual: fee * 12,
    };
  }, [hourly, hours, discount, overagePremium]);

  return (
    <ToolShell
      toolKey="/tools/retainer-pricing-calculator"
      h1="Monthly Retainer Pricing Calculator"
      tagline="A retainer fee that's predictable for the client and profitable for you."
      intro="Set the hour block, choose a commitment discount you can live with, and see the effective hourly rate you'd actually be earning — plus the overage rate for anything beyond the block."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Standard hourly rate">
              <Input type="number" value={hourly} onChange={(e) => setHourly(+e.target.value || 0)} />
            </Field>
            <Field label="Hours included per month">
              <Input type="number" value={hours} onChange={(e) => setHours(+e.target.value || 0)} />
            </Field>
            <Field label="Commitment discount %" hint="5–15% is normal">
              <Input type="number" value={discount} onChange={(e) => setDiscount(+e.target.value || 0)} />
            </Field>
            <Field label="Overage premium %" hint="Charged above the block">
              <Input type="number" value={overagePremium} onChange={(e) => setOveragePremium(+e.target.value || 0)} />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="Monthly retainer fee" value={formatMoney(fee)} sub={`${hours} hours included`} />
            <Stat label="Effective hourly rate" value={formatMoney(effective)} sub={`vs standard ${formatMoney(hourly)}`} accent="warm" />
            <Stat label="Overage rate" value={formatMoney(overage)} sub="Per hour beyond the block" />
            <Stat label="Annual contract value" value={formatMoney(annual)} sub="If retained all 12 months" />
            {discount > 20 && (
              <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
                ⚠ A discount above 20% usually means the retainer earns less than ad-hoc work.
              </div>
            )}
          </div>
        </div>
      }
      works="The fee is your hourly rate times the included hours, less a commitment discount. The effective hourly rate shows what you actually earn per hour inside the retainer, and the overage rate prices hours beyond the block — usually at a small premium, since they're unplanned."
      why={`Retainers are the most reliable way for a freelancer to smooth income, but they only work if the maths is explicit. The two failure modes are a discount that's too deep, and an hour block nobody tracks.\n\nBilling monthly in advance turns a retainer into working capital. Combined with expiring or capped rollover hours, it removes most of the cash-flow anxiety of freelancing.\n\nReview the fee annually. A retainer set three years ago at a rate you no longer charge is a slow, invisible pay cut.`}
      mistakes={[
        "Offering 'unlimited' anything for a flat monthly fee.",
        "Letting unused hours roll over forever.",
        "Not tracking hours, so nobody knows if the block is being exceeded.",
        "Billing in arrears instead of in advance.",
        "Never reviewing the rate at renewal.",
      ]}
      faqs={[
        { q: "How many hours should a retainer include?", a: "Enough to be meaningful — usually 10 hours minimum. Below that, ad-hoc hourly billing is simpler for both sides." },
        { q: "Should unused hours roll over?", a: "Cap it. One month of rollover, limited to 25% of the block, is a fair compromise." },
        { q: "What notice period should I set?", a: "30 days on both sides, with an annual rate review date written into the agreement." },
      ]}
      related={[
        "/tools/freelance-day-rate-calculator",
        "/tools/freelance-hourly-rate-calculator",
        "/tools/freelance-profit-margin-calculator",
      ]}
    />
  );
}
