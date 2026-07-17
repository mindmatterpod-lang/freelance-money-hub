import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/currency-adjusted-rate-calculator")({
  head: () => ({
    meta: [
      { title: "Currency-Adjusted Freelance Rate Calculator | FreelanceRate" },
      { name: "description", content: "Convert your freelance rate into local currency and see your real take-home after PayPal, Wise or Payoneer fees. Live FX from Frankfurter API." },
    ],
  }),
  component: Page,
});

const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD", "INR", "PKR", "NGN", "BRL", "ZAR", "PHP", "MXN", "JPY", "SGD"];

function Page() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [fee, setFee] = useState(2);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d?.rates?.[to]) setRate(d.rates[to]);
        else setError("Rate not available for this pair.");
      })
      .catch(() => !cancelled && setError("Could not fetch live rate."))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [from, to]);

  const { converted, afterFee, feeAmount } = useMemo(() => {
    if (!rate) return { converted: 0, afterFee: 0, feeAmount: 0 };
    const c = amount * rate;
    const f = c * (fee / 100);
    return { converted: c, afterFee: c - f, feeAmount: f };
  }, [amount, rate, fee]);

  return (
    <ToolShell
      toolKey="/tools/currency-adjusted-rate-calculator"
      h1="Currency-Adjusted Rate Calculator"
      tagline="See your real take-home after FX conversion and payment platform fees."
      intro="Charging in USD but paid in your local currency? The number on the invoice and the number that lands in your account are rarely the same. This tool bridges that gap."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Rate you're charging">
              <Input type="number" value={amount} onChange={(e) => setAmount(+e.target.value || 0)} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Charged in">
                <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm">
                  {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Paid out in">
                <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm">
                  {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Payment platform fee %" hint="Wise ~1%, PayPal ~4%, Payoneer ~2%">
              <Input type="number" step="0.1" value={fee} onChange={(e) => setFee(+e.target.value || 0)} />
            </Field>
            <div className="rounded-xl border border-dashed p-3 text-xs text-muted-foreground">
              Live FX from the free Frankfurter API. {loading ? "Loading rate…" : rate ? `1 ${from} = ${rate.toFixed(4)} ${to}` : error || ""}
            </div>
          </div>
          <div className="grid content-start gap-3">
            <Stat label={`Converted (${to})`} value={formatMoney(converted, to)} sub="Before platform fees" />
            <Stat label="Platform fee taken" value={formatMoney(feeAmount, to)} accent="warm" />
            <Stat label="Real take-home" value={formatMoney(afterFee, to)} sub={`Effective ${(afterFee && amount ? (afterFee / (amount * (rate || 1))) * 100 : 0).toFixed(1)}% of gross`} />
          </div>
        </div>
      }
      works="We fetch a live mid-market exchange rate from the Frankfurter API, convert your amount, then subtract your payment platform's fee to show what actually lands in your account."
      why={`Cross-border freelancers can lose 3–6% of every invoice to a mix of unfavorable FX spreads and payment processor fees.\n\nOn a $10,000 year, that's a full month of rent quietly gone. Knowing the real take-home rate helps you either negotiate slightly higher pricing or switch to a cheaper payout method (Wise multi-currency accounts are dramatically cheaper than PayPal for most pairs).\n\nRun this before you send any invoice into a new currency corridor.`}
      mistakes={[
        "Using PayPal by default without comparing Wise or Payoneer.",
        "Quoting in your local currency to a client whose currency is stronger.",
        "Forgetting that some platforms take fees on both send and receive.",
        "Not budgeting for a small FX buffer — rates move between invoice and payment.",
        "Withdrawing to bank in small batches, paying a flat fee each time.",
      ]}
      faqs={[
        { q: "Which platform is cheapest?", a: "For most major currencies, Wise is dramatically cheaper than PayPal. Payoneer sits in between and can be very competitive for USD payouts." },
        { q: "Are these rates live?", a: "Yes — the tool queries frankfurter.app for the current mid-market rate. It's a great benchmark but your actual receive rate may be 0.3–2% worse depending on your provider." },
        { q: "Should I quote in my currency or the client's?", a: "For international clients, quoting in a strong stable currency (USD or EUR) protects you from your own currency's swings — but be transparent about the pricing model." },
      ]}
      related={[
        "/tools/freelance-hourly-rate-calculator",
        "/tools/invoice-late-fee-calculator",
        "/tools/days-to-invoice-payment-calculator",
      ]}
    />
  );
}
