import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/payment-processing-fee-calculator")({
  head: () => ({
    meta: [
      { title: "Payment Processing Fee Calculator (PayPal, Wise, Stripe) | FreelanceRate" },
      { name: "description", content: "See what PayPal, Wise, Stripe, Payoneer or a bank wire really costs on an invoice — including FX markup — and what to gross up to." },
      { property: "og:title", content: "Payment Processing Fee Calculator" },
      { property: "og:description", content: "Real cost of PayPal, Wise, Stripe, Payoneer and bank wires on freelance invoices." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const PRESETS = [
  { id: "paypal", label: "PayPal (international)", pct: 4.4, flat: 0.3, fx: 3.0 },
  { id: "wise", label: "Wise", pct: 0.6, flat: 0.3, fx: 0 },
  { id: "stripe", label: "Stripe (cross-border card)", pct: 3.9, flat: 0.3, fx: 1.0 },
  { id: "payoneer", label: "Payoneer", pct: 2.0, flat: 0, fx: 0.5 },
  { id: "wire", label: "Bank wire (SWIFT)", pct: 0, flat: 25, fx: 2.0 },
  { id: "custom", label: "Custom", pct: 2, flat: 0, fx: 0 },
] as const;

function Page() {
  const [amount, setAmount] = useState(2500);
  const [preset, setPreset] = useState<string>("paypal");
  const [pct, setPct] = useState(4.4);
  const [flat, setFlat] = useState(0.3);
  const [fx, setFx] = useState(3.0);

  const applyPreset = (id: string) => {
    setPreset(id);
    const p = PRESETS.find((x) => x.id === id);
    if (p && id !== "custom") { setPct(p.pct); setFlat(p.flat); setFx(p.fx); }
  };

  const { fee, fxCost, total, net, effective, grossUp } = useMemo(() => {
    const fee = amount * (pct / 100) + flat;
    const fxCost = amount * (fx / 100);
    const total = fee + fxCost;
    const net = amount - total;
    const effective = amount > 0 ? (total / amount) * 100 : 0;
    const grossUp = 1 - (pct + fx) / 100 > 0 ? (amount + flat) / (1 - (pct + fx) / 100) : NaN;
    return { fee, fxCost, total, net, effective, grossUp };
  }, [amount, pct, flat, fx]);

  return (
    <ToolShell
      toolKey="/tools/payment-processing-fee-calculator"
      h1="Payment Processing Fee Calculator"
      tagline="What PayPal, Wise, Stripe, Payoneer and bank wires actually cost you."
      intro="Platform fees are only half the story — the exchange rate markup is usually the bigger number. This calculator shows your true net, the effective percentage lost, and what to invoice if you want to receive the full amount."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Invoice amount">
              <Input type="number" value={amount} onChange={(e) => setAmount(+e.target.value || 0)} />
            </Field>
            <Field label="Payment method">
              <select value={preset} onChange={(e) => applyPreset(e.target.value)} className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm">
                {PRESETS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
            </Field>
            <Field label="Percentage fee %">
              <Input type="number" step="0.1" value={pct} onChange={(e) => { setPreset("custom"); setPct(+e.target.value || 0); }} />
            </Field>
            <Field label="Fixed fee">
              <Input type="number" step="0.1" value={flat} onChange={(e) => { setPreset("custom"); setFlat(+e.target.value || 0); }} />
            </Field>
            <Field label="FX markup %" hint="Above the mid-market rate">
              <Input type="number" step="0.1" value={fx} onChange={(e) => { setPreset("custom"); setFx(+e.target.value || 0); }} />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="You actually receive" value={formatMoney(net)} sub={`On a ${formatMoney(amount)} invoice`} />
            <Stat label="Total cost" value={formatMoney(total)} sub={`Platform ${formatMoney(fee)} + FX ${formatMoney(fxCost)}`} accent="warm" />
            <Stat label="Effective cost" value={`${effective.toFixed(2)}%`} sub="Of the invoice value" />
            <Stat label="Invoice this to net your target" value={formatMoney(grossUp)} sub="Grossed-up amount" />
            <div className="rounded-2xl border bg-secondary/40 p-5 text-sm text-muted-foreground">
              Preset figures are typical published rates and vary by country, currency and account type. Check your provider's current pricing before quoting.
            </div>
          </div>
        </div>
      }
      works="We apply the percentage fee and any fixed fee to the invoice, then add the exchange rate markup as a separate cost, because that's where most of the money quietly goes. The gross-up figure is the amount to invoice so the net lands on your target after all charges."
      why={`On a $2,500 invoice, the difference between a 0.6% method and a 4.4% method plus 3% FX is roughly $170 — every single invoice. Across a year that's often more than a month of income.\n\nPercentage-based methods hurt on large invoices; flat-fee wires hurt on small ones. Choosing per invoice rather than per client is worth real money.\n\nIf a client insists on an expensive method, gross the invoice up rather than absorbing the cost silently.`}
      mistakes={[
        "Comparing platforms on advertised fees while ignoring the exchange rate markup.",
        "Using the same payment method for a $200 invoice and a $20,000 one.",
        "Absorbing a client's preferred-method costs without repricing.",
        "Forgetting that processing fees are usually a deductible business expense.",
        "Ignoring intermediary bank charges on SWIFT transfers.",
      ]}
      faqs={[
        { q: "What's the cheapest way to get paid internationally?", a: "For most corridors, a local receiving account with a mid-market-rate provider like Wise. Large invoices sometimes favour a bank wire with flat fees." },
        { q: "Can I pass fees on to the client?", a: "Yes — either gross the invoice up or state a surcharge for specific methods in your terms, where local rules allow it." },
        { q: "Are payment fees tax deductible?", a: "Typically yes, as a business expense. Confirm with an accountant in your jurisdiction." },
      ]}
      related={[
        "/tools/currency-adjusted-rate-calculator",
        "/tools/vat-gst-invoice-calculator",
        "/tools/freelance-profit-margin-calculator",
      ]}
    />
  );
}
