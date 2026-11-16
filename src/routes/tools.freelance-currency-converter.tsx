import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useCurrency } from "@/lib/currency";
import { ToolShell, Stat, Field } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/freelance-currency-converter")({
  head: () => ({
    meta: [
      { title: "Freelance Currency Converter (Free) | FreelanceRate" },
      {
        name: "description",
        content:
          "Convert freelance payments and see your real take-home after the exchange rate and payment fees. Enter your rate — no live rates, no signup.",
      },
      { property: "og:title", content: "Freelance Currency Converter" },
      {
        property: "og:description",
        content: "What a freelance payment is really worth after FX and fees.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function fmt(n: number, code: string) {
  if (!isFinite(n)) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code.toUpperCase(),
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `${code.toUpperCase()} ${n.toFixed(2)}`;
  }
}

function Page() {
  useCurrency();
  const [amount, setAmount] = useState(1000);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [rate, setRate] = useState(0.92);
  const [feePct, setFeePct] = useState(1);
  const [fixedFee, setFixedFee] = useState(0);

  const { converted, feeCost, net, effectiveLoss } = useMemo(() => {
    const converted = amount * rate;
    const feeCost = converted * (feePct / 100) + fixedFee;
    const net = converted - feeCost;
    const effectiveLoss = converted > 0 ? (feeCost / converted) * 100 : 0;
    return { converted, feeCost, net, effectiveLoss };
  }, [amount, rate, feePct, fixedFee]);

  return (
    <ToolShell
      toolKey="/tools/freelance-currency-converter"
      h1="Freelance Currency Converter"
      tagline="What a freelance payment is really worth after the exchange rate and the fees."
      intro="Enter the amount, the exchange rate and what the payment method charges, and see exactly what lands in your account — in the currency you actually spend."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Amount">
              <Input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(+e.target.value || 0)}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="From currency" hint="3-letter code">
                <Input
                  value={from}
                  onChange={(e) => setFrom(e.target.value || "USD")}
                  maxLength={3}
                />
              </Field>
              <Field label="To currency" hint="3-letter code">
                <Input value={to} onChange={(e) => setTo(e.target.value || "EUR")} maxLength={3} />
              </Field>
            </div>
            <Field
              label={`Exchange rate (1 ${from.toUpperCase() || "USD"} = ? ${to.toUpperCase() || "EUR"})`}
              hint="Use the Wise mid-market rate"
            >
              <Input
                type="number"
                min="0"
                step="0.0001"
                value={rate}
                onChange={(e) => setRate(+e.target.value || 0)}
              />
            </Field>
            <Field label="Payment fee %">
              <Input
                type="number"
                min="0"
                step="0.1"
                value={feePct}
                onChange={(e) => setFeePct(+e.target.value || 0)}
              />
            </Field>
            <Field label={`Fixed fee (${to.toUpperCase() || "EUR"})`}>
              <Input
                type="number"
                min="0"
                step="0.1"
                value={fixedFee}
                onChange={(e) => setFixedFee(+e.target.value || 0)}
              />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat
              label="You actually receive"
              value={fmt(net, to)}
              sub={`On a ${fmt(amount, from)} payment`}
            />
            <Stat
              label="Converted amount"
              value={fmt(converted, to)}
              sub={`Before fees, at ${rate} per ${from.toUpperCase() || "USD"}`}
              accent="warm"
            />
            <Stat
              label="Total fees"
              value={fmt(feeCost, to)}
              sub={`${effectiveLoss.toFixed(2)}% of the converted amount`}
            />
            <Stat
              label="Effective loss"
              value={`${effectiveLoss.toFixed(2)}%`}
              sub="What FX + fees take in total"
            />
            <div className="rounded-2xl border bg-secondary/40 p-5 text-sm text-muted-foreground">
              Rates here are the ones you enter — this tool has no live rates. Check the current
              mid-market rate on Wise or your bank before quoting, and remember the rate you are
              offered is rarely the mid-market one.
            </div>
          </div>
        </div>
      }
      works="We multiply your amount by the exchange rate you enter, then subtract the payment fee (a percentage of the converted amount plus any fixed fee). The effective loss is the total fees as a percentage of the converted amount."
      why={`A $1,000 invoice is not $1,000 in your account. The exchange rate and the payment fee both take a cut, and on international work the two together often cost 2–5% — every single invoice.\n\nThe rate matters more than the fee. A provider advertising "no fees" can still quote you a rate 3% worse than the mid-market rate, which costs more than a transparent 1% fee would.\n\nRun the number before you quote, not after you are paid. If the conversion eats too much, invoice in your own currency or gross the price up.`}
      mistakes={[
        "Using the rate your payment provider quotes instead of the mid-market rate.",
        "Forgetting the fixed fee on small invoices, where it hurts most.",
        "Comparing payment methods on fees alone while ignoring the exchange rate.",
        "Quoting in the client's currency without a buffer for rate movement.",
        "Assuming the amount on the invoice is the amount that reaches your account.",
      ]}
      faqs={[
        {
          q: "Where do I find the exchange rate to enter?",
          a: "Use the mid-market rate shown on Wise, XE or Google — that is the real rate before any provider's markup. Then compare it with the rate your payment method actually offers; the gap is a hidden fee.",
        },
        {
          q: "Why is the amount I receive less than the converted amount?",
          a: "Payment providers charge a percentage fee, a fixed fee, or both — and some add a markup to the exchange rate itself. This calculator shows the fee side; the rate you enter decides the conversion side.",
        },
        {
          q: "Should I invoice in USD or my local currency?",
          a: "Invoicing in your own currency moves the FX risk to the client, which is fair for long projects. If you invoice in the client's currency, add a small buffer for rate movement between quote and payment.",
        },
        {
          q: "Does this tool use live exchange rates?",
          a: "No — rates are the ones you enter. Live rates change constantly, and the rate that matters is the one your payment provider actually gives you, which is usually worse than the mid-market rate.",
        },
      ]}
      related={[
        "/tools/currency-adjusted-rate-calculator",
        "/tools/payment-processing-fee-calculator",
        "/tools/upwork-fee-calculator",
      ]}
    />
  );
}
