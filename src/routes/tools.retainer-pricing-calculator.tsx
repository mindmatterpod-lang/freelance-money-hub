import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

const SITE_URL = "https://freelance-money-hub.vercel.app";
const FULL_URL = "https://freelance-money-hub.vercel.app/tools/retainer-pricing-calculator";

export const Route = createFileRoute("/tools/retainer-pricing-calculator")({
  head: () => {
    // 1. JSON-LD WebApplication Schema
    const webAppSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Monthly Retainer Pricing Calculator for Freelancers",
      url: FULL_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Calculate monthly retainer fees, effective hourly rates, overage pricing, and annual contract value for freelance clients.",
    };

    // 2. JSON-LD FAQ Schema
    const faqData = [
      {
        q: "What is a monthly retainer fee?",
        a: "A monthly retainer fee is a recurring fixed payment made in advance by a client to reserve a set amount of a freelancer's or agency's time, expertise, or deliverables every month.",
      },
      {
        q: "How does retainer pricing compare to hourly rate billing?",
        a: "Retainer pricing trades a small discount off your standard hourly rate in exchange for guaranteed monthly income, predictable client scheduling, and upfront payments.",
      },
      {
        q: "How many hours should a freelancer include in a retainer?",
        a: "A retainer block should include a minimum of 10 hours per month. Anything less is usually easier to bill on an ad-hoc hourly basis.",
      },
      {
        q: "Should unused retainer hours roll over?",
        a: "If allowed, rollover hours should be capped at 25% of the total monthly block and expire after one billing cycle to prevent overcommitment.",
      },
      {
        q: "What notice period should be set for retainer contracts?",
        a: "A standard retainer agreement should specify a 30-day notice period for cancellation or adjustments on both sides.",
      },
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    };

    return {
      title: "Monthly Retainer Pricing Calculator — Free Freelance Retainer Fee Model",
      meta: [
        {
          name: "description",
          content:
            "Calculate monthly retainer fees, compare retainer Vs hourly rates, set overage pricing, and model annual contract values for freelance services.",
        },
        {
          name: "keywords",
          content:
            "monthly retainer, retainer pricing calculator, retainer vs hourly rate, retainer fee, retainer model pricing, freelance monthly retainer rates",
        },
        { property: "og:title", content: "Monthly Retainer Pricing Calculator for Freelancers" },
        {
          property: "og:description",
          content:
            "Price your freelance retainer packages with confidence. Calculate effective hourly rates, overage penalties, and contract values.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: FULL_URL },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Monthly Retainer Pricing Calculator" },
        {
          name: "twitter:description",
          content:
            "Calculate effective hourly rates, overage rates, and monthly retainer fees for your freelance business.",
        },
      ],
      links: [{ rel: "canonical", href: FULL_URL }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(webAppSchema),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(faqSchema),
        },
      ],
    };
  },
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
      tagline="Calculate predictable monthly retainer fees and effective hourly rates."
      intro="Set your monthly hour block, apply a commitment discount, and calculate your effective hourly rate, overage rates, and annual contract value."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Standard hourly rate">
              <Input type="number" value={hourly} onChange={(e) => setHourly(+e.target.value || 0)} />
            </Field>
            <Field label="Hours included per month">
              <Input type="number" value={hours} onChange={(e) => setHours(+e.target.value || 0)} />
            </Field>
            <Field label="Commitment discount %" hint="5–15% is standard">
              <Input type="number" value={discount} onChange={(e) => setDiscount(+e.target.value || 0)} />
            </Field>
            <Field label="Overage premium %" hint="Charged above the block">
              <Input type="number" value={overagePremium} onChange={(e) => setOveragePremium(+e.target.value || 0)} />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="Monthly retainer fee" value={formatMoney(fee)} sub={`${hours} hours included`} />
            <Stat
              label="Effective hourly rate"
              value={formatMoney(effective)}
              sub={`vs standard ${formatMoney(hourly)}`}
              accent="warm"
            />
            <Stat label="Overage rate" value={formatMoney(overage)} sub="Per hour beyond the block" />
            <Stat label="Annual contract value" value={formatMoney(annual)} sub="If retained for 12 months" />
            {discount > 20 && (
              <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
                ⚠ A commitment discount above 20% usually reduces earnings below standard ad-hoc hourly work.
              </div>
            )}
          </div>
        </div>
      }
      works="The monthly retainer fee is calculated by multiplying your standard hourly rate by the included hours, minus a commitment discount. The effective hourly rate shows your true earnings per hour inside the retainer, while the overage rate sets a premium rate for additional work beyond the agreed hour block."
      why={`Transitioning to a monthly retainer model provides consistent income and steady cash flow for freelancers.

### Retainer vs. Hourly Rate Billing
While hourly billing charges only for tracked time after work is delivered, retainer model pricing secures upfront commitments in exchange for reserved capacity. Charging upfront converts retainer agreements into working capital and eliminates payment delays.

### Managing Rollover and Scope Drift
To maintain profitability, retainer agreements must clearly define how overage hours and unused time are handled. Standard practice is to limit unused hours to a maximum of 25% rollover for one billing period and to price overage work at a 10–20% premium.`}
      mistakes={[
        "Offering 'unlimited' availability or tasks for a single flat monthly fee.",
        "Allowing unused retainer hours to roll over indefinitely.",
        "Failing to track hours, leading to unbilled scope creep beyond the retainer block.",
        "Billing retainer fees in arrears instead of upfront at the start of the month.",
        "Neglecting an annual rate review clause in long-term retainer agreements.",
      ]}
      faqs={[
        {
          q: "What is a monthly retainer fee?",
          a: "A monthly retainer fee is a fixed recurring fee paid upfront by a client to guarantee a freelancer's availability and specific deliverables every month.",
        },
        {
          q: "How does retainer model pricing differ from standard hourly billing?",
          a: "Retainer model pricing offers predictable monthly revenue and upfront payments in exchange for a small bulk discount (typically 5–15%), whereas standard hourly billing charges after work is completed.",
        },
        {
          q: "How many hours should be included in a monthly retainer?",
          a: "A retainer package should generally include a minimum of 10 hours per month. Smaller commitments are usually better billed on a standard hourly basis.",
        },
        {
          q: "Should unused retainer hours roll over into the next month?",
          a: "Unused hours should either expire or be strictly capped (e.g., max 25% rollover expiring after 30 days) to prevent client hour-stacking.",
        },
        {
          q: "What notice period should be included in a retainer agreement?",
          a: "A 30-day written notice period for either party is standard, along with a scheduled annual rate review date.",
        },
      ]}
      related={[
        "/tools/freelance-day-rate-calculator",
        "/tools/freelance-hourly-rate-calculator",
        "/tools/freelance-profit-margin-calculator",
      ]}
    />
  );
}
