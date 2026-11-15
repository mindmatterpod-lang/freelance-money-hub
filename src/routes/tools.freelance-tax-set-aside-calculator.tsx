import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useCurrency } from "@/lib/currency";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/freelance-tax-set-aside-calculator")({
  head: () => ({
    meta: [
      { title: "Freelancer Tax Set-Aside Calculator: How Much to Save | FreelanceRate" },
      {
        name: "description",
        content:
          "Free calculator for how much of each freelance invoice to set aside for taxes. Enter your income, expenses and tax percentage to get per-invoice and quarterly amounts.",
      },
      { property: "og:title", content: "Freelancer Tax Set-Aside Calculator" },
      {
        property: "og:description",
        content: "How much of every freelance payment to set aside for taxes — per invoice, per month and per quarter.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  useCurrency();
  const [income, setIncome] = useState(60000);
  const [expenses, setExpenses] = useState(8000);
  const [pct, setPct] = useState(25);
  const [invoice, setInvoice] = useState(2500);

  const r = useMemo(() => {
    const profit = Math.max(0, income - expenses);
    const yearly = profit * (pct / 100);
    const effectiveOnGross = income > 0 ? (yearly / income) * 100 : 0;
    const perInvoice = invoice * (effectiveOnGross / 100);
    return {
      profit,
      yearly,
      quarterly: yearly / 4,
      monthly: yearly / 12,
      perInvoice,
      keep: invoice - perInvoice,
      effectiveOnGross,
    };
  }, [income, expenses, pct, invoice]);

  return (
    <ToolShell
      toolKey="/tools/freelance-tax-set-aside-calculator"
      h1="Freelancer Tax Set-Aside Calculator"
      tagline="See how much of every invoice to park for taxes."
      intro="Enter your yearly income, business expenses and the tax percentage you expect to pay on profit. The calculator shows what to set aside per invoice, per month and per quarter."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Expected yearly income (gross)">
              <Input type="number" min="0" value={income} onChange={(e) => setIncome(+e.target.value || 0)} />
            </Field>
            <Field label="Yearly business expenses">
              <Input type="number" min="0" value={expenses} onChange={(e) => setExpenses(+e.target.value || 0)} />
            </Field>
            <Field label="Tax rate on profit (%)" hint="Use the Tax Estimator for a rough figure">
              <Input type="number" min="0" max="100" step="0.5" value={pct} onChange={(e) => setPct(+e.target.value || 0)} />
            </Field>
            <Field label="Example invoice amount">
              <Input type="number" min="0" value={invoice} onChange={(e) => setInvoice(+e.target.value || 0)} />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="Set aside from this invoice" value={formatMoney(r.perInvoice)} sub={`≈ ${r.effectiveOnGross.toFixed(1)}% of each payment`} accent="warm" />
            <Stat label="Quarterly tax savings" value={formatMoney(r.quarterly)} />
            <Stat label="Monthly tax savings" value={formatMoney(r.monthly)} />
            <Stat label="Estimated yearly tax" value={formatMoney(r.yearly)} sub={`On profit of ${formatMoney(r.profit)}`} />
          </div>
        </div>
      }
      works={`The calculator subtracts your expenses from your income to get profit, applies the tax percentage you enter, and then converts the yearly result into a share of each payment.

Formula:
Yearly tax = (income − expenses) × tax rate
Set-aside per invoice = invoice × (yearly tax ÷ income)

Because expenses reduce your taxable profit, the percentage of each invoice you set aside is lower than your tax rate on profit. The tax rate is your own estimate, so treat the result as a planning figure rather than a filing amount.`}
      why={`Freelance income arrives without tax withheld, so the full invoice amount lands in your account even though part of it will be owed later. Spending it all is one of the most common ways freelancers end up with a tax bill they cannot pay.

A simple habit fixes this: move a fixed percentage into a separate savings account every time you get paid. That keeps the money out of your daily spending and makes quarterly or yearly payments routine.

Tax rules differ by country and income level, so check the figure with a local accountant or your tax authority's published guidance.`}
      mistakes={[
        "Guessing a tax percentage without checking how your country taxes self-employed profit.",
        "Setting aside a percentage of profit instead of the percentage of each payment you actually receive.",
        "Keeping tax money in your everyday account, where it gets spent.",
        "Forgetting social security or self-employment contributions, which may be separate from income tax.",
        "Skipping a top-up when income rises mid-year.",
      ]}
      faqs={[
        {
          q: "How much should a freelancer set aside for taxes?",
          a: "It depends on your country, income and deductible expenses. Many freelancers choose a flat percentage of each payment as a planning figure, then adjust it after checking local rules or speaking to an accountant. Use the calculator above to see what your own numbers imply.",
        },
        {
          q: "Should I set aside tax from gross income or from profit?",
          a: "Tax is generally calculated on profit after allowable expenses, but you receive gross payments. This calculator converts the tax on profit into a percentage of each payment so you know what to move aside when you get paid.",
        },
        {
          q: "Where should I keep my tax savings?",
          a: "A separate savings account makes it harder to spend the money by accident. Moving the set-aside amount as soon as each invoice is paid keeps the habit simple.",
        },
        {
          q: "Does this include self-employment or social security contributions?",
          a: "Only if you include them in the percentage you enter. Some countries charge them separately from income tax, so add them to your estimate if they apply to you.",
        },
        {
          q: "Is this calculator tax advice?",
          a: "No. It is a planning estimate based on the numbers you enter. Confirm your actual obligations with your tax authority or a qualified accountant.",
        },
      ]}
      related={[
        "/tools/self-employment-tax-estimator",
        "/guides/freelance-tax-basics-by-country",
        "/blog/freelance-tax-deductions-checklist",
      ]}
    />
  );
}
