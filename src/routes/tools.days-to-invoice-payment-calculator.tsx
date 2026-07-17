import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/days-to-invoice-payment-calculator")({
  head: () => ({
    meta: [
      { title: "Days to Invoice Payment Calculator — Cash Flow | FreelanceRate" },
      { name: "description", content: "See when your invoice will actually clear given Net 15/30/60 terms plus historical client delays. Spot overlapping gaps early." },
    ],
  }),
  component: Page,
});

function addDays(d: Date, n: number) {
  const x = new Date(d); x.setDate(x.getDate() + n); return x;
}
function fmt(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" });
}

function Page() {
  const today = new Date().toISOString().slice(0, 10);
  const [invoiceDate, setInvoiceDate] = useState(today);
  const [terms, setTerms] = useState(30);
  const [delay, setDelay] = useState(7);

  const { due, expected, gap } = useMemo(() => {
    const d = new Date(invoiceDate);
    const due = addDays(d, terms);
    const expected = addDays(due, delay);
    const gap = Math.round((expected.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    return { due, expected, gap };
  }, [invoiceDate, terms, delay]);

  return (
    <ToolShell
      toolKey="/tools/days-to-invoice-payment-calculator"
      h1="Days-to-Payment / Cash Flow Calculator"
      tagline="When each invoice actually lands. Spot cash flow gaps before they hit."
      intro="Payment terms are the theoretical due date. Reality is the due date plus your client's typical delay. This calculator shows the real one, and how far away it is."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Invoice date">
              <Input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
            </Field>
            <Field label="Payment terms">
              <select value={terms} onChange={(e) => setTerms(+e.target.value)} className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm">
                <option value={7}>Net 7</option>
                <option value={14}>Net 14</option>
                <option value={15}>Net 15</option>
                <option value={30}>Net 30</option>
                <option value={45}>Net 45</option>
                <option value={60}>Net 60</option>
              </select>
            </Field>
            <Field label="Client's historical average delay (days)" hint="0 if they always pay on time">
              <Input type="number" value={delay} onChange={(e) => setDelay(+e.target.value || 0)} />
            </Field>
            <div className="rounded-xl border border-dashed p-3 text-xs text-muted-foreground">
              Send the invoice the day the work ships. Every day you delay sending it delays the money by the same amount.
            </div>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="Contractual due date" value={fmt(due)} sub={`Net ${terms}`} />
            <Stat label="Realistic payment date" value={fmt(expected)} sub={`+${delay} days typical delay`} accent="warm" />
            <Stat label="Total cash-flow gap" value={`${gap} days`} sub="From invoice date to money in bank" />
            {gap > 45 && (
              <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
                ⚠ Long gap. Consider a milestone or partial upfront invoice to smooth cash flow.
              </div>
            )}
          </div>
        </div>
      }
      works="We add the payment term (Net 15/30/60) to the invoice date to get the contractual due date, then add your client's typical delay to get the realistic date. The total gap tells you how much runway you need between finishing work and getting paid."
      why={`Freelancers usually track revenue but rarely track cash flow — and cash is what pays rent. A profitable month can still be a cash-flow disaster if three big invoices all clear on the same distant date.\n\nModeling the realistic payment date (not the contractual one) lets you plan: milestone invoicing on longer projects, staggered start dates, or a 30-day cash buffer before you accept a Net 60 client.\n\nRun this for every invoice you send, and keep a rolling view of what's actually coming in.`}
      mistakes={[
        "Treating Net 30 as ‘I'll be paid in 30 days.’",
        "Sending the invoice a week after finishing the work.",
        "Taking on multiple Net 60 clients without a cash buffer.",
        "Not asking for a deposit on projects longer than 4 weeks.",
        "Assuming a chase email is enough — put late fees in your terms.",
      ]}
      faqs={[
        { q: "How do I know my client's typical delay?", a: "Look at your last 3–5 invoices with them and average the actual days to payment. Or ask their AP team directly." },
        { q: "What terms should I use?", a: "Net 14 or Net 15 is standard for solo freelancers. Larger companies often push for Net 30 or 60 — negotiate a deposit if you accept those." },
        { q: "What if the client pays early?", a: "Enjoy it. Track their real average — some clients earn 0-day delay and are worth a small loyalty discount." },
      ]}
      related={[
        "/tools/invoice-late-fee-calculator",
        "/tools/project-quote-calculator",
        "/tools/freelance-profit-margin-calculator",
      ]}
    />
  );
}
