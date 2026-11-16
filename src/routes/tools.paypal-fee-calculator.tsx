import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useCurrency } from "@/lib/currency";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/paypal-fee-calculator")({
  head: () => ({
    meta: [
      { title: "PayPal Fee Calculator — What You Keep | FreelanceRate" },
      {
        name: "description",
        content:
          "PayPal fee calculator for freelancers: domestic and international rates, what you keep after fees, and what to invoice to net your target.",
      },
      { property: "og:title", content: "PayPal Fee Calculator" },
      {
        property: "og:description",
        content: "What PayPal takes — and what to charge to keep your target.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const PRESETS = [
  { id: "domestic", label: "Domestic (US) — 2.99% + $0.49", pct: 2.99, flat: 0.49 },
  { id: "international", label: "International — 4.4% + $0.30", pct: 4.4, flat: 0.3 },
  { id: "custom", label: "Custom rate", pct: 2.99, flat: 0.49 },
] as const;

function Page() {
  useCurrency();
  const [amount, setAmount] = useState(500);
  const [preset, setPreset] = useState<string>("international");
  const [pct, setPct] = useState(4.4);
  const [flat, setFlat] = useState(0.3);

  const applyPreset = (id: string) => {
    setPreset(id);
    const p = PRESETS.find((x) => x.id === id);
    if (p && id !== "custom") {
      setPct(p.pct);
      setFlat(p.flat);
    }
  };

  const { fee, net, effective, grossUp } = useMemo(() => {
    const fee = amount * (pct / 100) + flat;
    const net = amount - fee;
    const effective = amount > 0 ? (fee / amount) * 100 : 0;
    const grossUp = 1 - pct / 100 > 0 ? (amount + flat) / (1 - pct / 100) : NaN;
    return { fee, net, effective, grossUp };
  }, [amount, pct, flat]);

  return (
    <ToolShell
      toolKey="/tools/paypal-fee-calculator"
      h1="PayPal Fee Calculator"
      tagline="What PayPal takes from your payment — and what to charge to keep your target."
      intro="PayPal is the easiest way for a client to pay you, and one of the most expensive once the percentage, the fixed fee and the currency conversion are counted. See your real take-home before you quote."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Amount received">
              <Input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(+e.target.value || 0)}
              />
            </Field>
            <Field label="Fee type">
              <select
                value={preset}
                onChange={(e) => applyPreset(e.target.value)}
                className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
              >
                {PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Percentage fee %">
              <Input
                type="number"
                min="0"
                step="0.01"
                value={pct}
                onChange={(e) => {
                  setPreset("custom");
                  setPct(+e.target.value || 0);
                }}
              />
            </Field>
            <Field label="Fixed fee">
              <Input
                type="number"
                min="0"
                step="0.01"
                value={flat}
                onChange={(e) => {
                  setPreset("custom");
                  setFlat(+e.target.value || 0);
                }}
              />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat
              label="You actually receive"
              value={formatMoney(net)}
              sub={`On a ${formatMoney(amount)} payment`}
            />
            <Stat
              label="PayPal fee"
              value={formatMoney(fee)}
              sub={`${pct}% + ${formatMoney(flat)} fixed`}
              accent="warm"
            />
            <Stat
              label="Effective cost"
              value={`${effective.toFixed(2)}%`}
              sub="Of the payment value"
            />
            <Stat
              label="Invoice this to net your target"
              value={formatMoney(grossUp)}
              sub="Grossed-up amount"
            />
            <div className="rounded-2xl border bg-secondary/40 p-5 text-sm text-muted-foreground">
              Fees vary by country and account type, and PayPal adds a currency-conversion markup on
              top when the payment crosses currencies. Check PayPal&apos;s current fee page for your
              country before quoting. Figures here use the US commercial rates checked November
              2026.
            </div>
          </div>
        </div>
      }
      works="We apply the percentage fee and the fixed fee to the amount received. The gross-up figure is the amount to invoice so the net lands on your target after PayPal takes its cut: (target + fixed fee) ÷ (1 − percentage fee)."
      why={`On a $500 international payment, PayPal's 4.4% plus the fixed fee takes about $22 — and if the payment also crosses currencies, the conversion markup can take more than the fee itself.\n\nThat is the trade-off: PayPal is nearly universal, clients trust it, and it pays fast. For a small one-off payment that convenience is worth it. For large or recurring invoices, a mid-market-rate provider like Wise usually keeps far more of your money.\n\nThe practical move is to price the fee in. Either gross the invoice up using the figure above, or agree a different payment method for larger amounts — and say so in your terms before the work starts.`}
      mistakes={[
        "Quoting a price and then absorbing PayPal's fee silently.",
        "Forgetting the fixed fee on small payments, where it is a large share.",
        "Ignoring the currency-conversion markup, which is often bigger than the fee.",
        "Using the domestic rate for an international payment.",
        "Assuming PayPal's fee is the same in every country — it varies.",
      ]}
      faqs={[
        {
          q: "What is PayPal's fee for receiving money?",
          a: "For US commercial payments it is 2.99% + $0.49 domestic, or 4.4% + $0.30 for international payments (rates checked November 2026). Other countries have their own fee schedules, and currency conversion adds a separate markup.",
        },
        {
          q: "How much does PayPal take from $100?",
          a: "On a $100 international payment at 4.4% + $0.30, PayPal takes $4.70 and you keep $95.30. On a domestic payment at 2.99% + $0.49, it takes $3.48 and you keep $96.52 — before any currency conversion.",
        },
        {
          q: "Can I pass the PayPal fee on to the client?",
          a: "Yes — either gross the invoice up using the figure above, or state a surcharge for PayPal payments in your terms where local rules allow it. Many freelancers simply quote a price that already includes it.",
        },
        {
          q: "Is PayPal or Wise cheaper for freelancers?",
          a: "For international payments, Wise is usually cheaper: it charges a small transparent fee at the mid-market rate, while PayPal combines a higher percentage fee with a conversion markup. Compare both on the same invoice with our payment fee calculator.",
        },
      ]}
      related={[
        "/tools/payment-processing-fee-calculator",
        "/tools/fiverr-fee-calculator",
        "/tools/upwork-fee-calculator",
      ]}
    />
  );
}
