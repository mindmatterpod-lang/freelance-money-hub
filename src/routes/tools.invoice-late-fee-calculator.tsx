import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/invoice-late-fee-calculator")({
  head: () => ({
    meta: [
      { title: "Invoice Late Fee Calculator — Free | FreelanceRate" },
      { name: "description", content: "Calculate fair late fees on overdue invoices and generate a copy-paste reminder email in seconds." },
    ],
  }),
  component: Page,
});

function Page() {
  const [amount, setAmount] = useState(2500);
  const [days, setDays] = useState(14);
  const [mode, setMode] = useState<"monthly" | "daily">("monthly");
  const [rate, setRate] = useState(1.5);

  const { fee, total, email } = useMemo(() => {
    const fee =
      mode === "monthly"
        ? amount * (rate / 100) * (days / 30)
        : amount * (rate / 100) * days;
    const total = amount + fee;
    const email = `Subject: Friendly reminder — invoice ${days} days overdue

Hi there,

Just a quick reminder that invoice for ${formatMoney(amount)} is now ${days} days past due. Per our terms, a late fee of ${rate}% ${mode === "monthly" ? "per month" : "per day"} applies once payment is overdue, which adds ${formatMoney(fee)} — bringing the new total to ${formatMoney(total)}.

Could you confirm when we can expect payment? Happy to resend the invoice if it's helpful.

Thanks!`;
    return { fee, total, email };
  }, [amount, days, mode, rate]);

  return (
    <ToolShell
      toolKey="/tools/invoice-late-fee-calculator"
      h1="Invoice Late Fee Calculator"
      tagline="Calculate a fair late fee on an overdue invoice — and get a copy-paste reminder."
      intro="Overdue invoices cost freelancers real money. This calculator produces a defensible late fee and drafts a polite, professional reminder email around it."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Invoice amount">
              <Input type="number" value={amount} onChange={(e) => setAmount(+e.target.value || 0)} />
            </Field>
            <Field label="Days overdue">
              <Input type="number" value={days} onChange={(e) => setDays(+e.target.value || 0)} />
            </Field>
            <Field label="Late fee type">
              <select value={mode} onChange={(e) => setMode(e.target.value as "monthly" | "daily")} className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm">
                <option value="monthly">Flat % per month (typical)</option>
                <option value="daily">Daily interest rate</option>
              </select>
            </Field>
            <Field label={`Rate (%)`} hint={mode === "monthly" ? "1.5%/mo is common" : "0.05%/day ≈ 1.5%/mo"}>
              <Input type="number" step="0.01" value={rate} onChange={(e) => setRate(+e.target.value || 0)} />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="Late fee owed" value={formatMoney(fee)} accent="warm" />
            <Stat label="New total invoice amount" value={formatMoney(total)} />
            <div className="rounded-2xl border bg-secondary/40 p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase text-muted-foreground">Reminder email</p>
                <button
                  className="rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-white"
                  onClick={() => navigator.clipboard?.writeText(email)}
                >
                  Copy
                </button>
              </div>
              <pre className="mt-3 whitespace-pre-wrap break-words text-xs text-foreground/80">{email}</pre>
            </div>
          </div>
        </div>
      }
      works="Late fees are usually stated as a percentage per month applied to the outstanding invoice. We prorate that percentage across the number of days overdue so the fee reflects how late payment actually is."
      why={`Late payment isn't a service you provide for free. Real interest, opportunity cost, and administrative time all pile up while a client sits on your invoice.\n\nA published, reasonable late fee — 1.5% per month is a broadly accepted freelancer standard — signals professionalism and gives you a concrete, non-emotional lever when a client goes quiet.\n\nMost of the time you'll never need to charge it. The fact that it exists in your contract does most of the work.`}
      mistakes={[
        "Not mentioning a late fee anywhere in the original contract or invoice.",
        "Waiting weeks before sending the first reminder.",
        "Applying a punitive rate that makes the client defensive.",
        "Forgetting to update the total on the reissued invoice.",
        "Not resetting the clock: fees keep accruing until the invoice is paid.",
      ]}
      faqs={[
        { q: "Is charging a late fee legal?", a: "In most countries, yes — provided the fee is disclosed in your original contract or invoice terms. Local usury laws may cap the maximum rate; check locally." },
        { q: "What's a fair late fee?", a: "1.5% per month is the most common freelancer default and is generally seen as reasonable." },
        { q: "Should I always charge it?", a: "No. Use it sparingly. It's a lever, not a revenue stream." },
      ]}
      related={[
        "/tools/days-to-invoice-payment-calculator",
        "/tools/project-quote-calculator",
        "/tools/currency-adjusted-rate-calculator",
      ]}
    />
  );
}
