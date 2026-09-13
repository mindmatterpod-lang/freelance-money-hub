import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/vat-gst-invoice-calculator")({
  head: () => ({
    meta: [
      { title: "VAT / GST Invoice Calculator for Freelancers | FreelanceRate" },
      { name: "description", content: "Add or remove VAT/GST from an invoice amount, see the net, tax and gross lines, and copy a clean breakdown onto your invoice." },
      { property: "og:title", content: "VAT / GST Invoice Calculator" },
      { property: "og:description", content: "Add or strip VAT/GST and get a clean net, tax and gross invoice breakdown." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const RATES = [
  { label: "UK VAT 20%", v: 20 },
  { label: "EU standard 21%", v: 21 },
  { label: "Germany 19%", v: 19 },
  { label: "Australia GST 10%", v: 10 },
  { label: "Canada GST 5%", v: 5 },
  { label: "India GST 18%", v: 18 },
  { label: "Pakistan sales tax 15%", v: 15 },
];

function Page() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(20);
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [reverseCharge, setReverseCharge] = useState(false);

  const { net, tax, gross } = useMemo(() => {
    if (reverseCharge) return { net: amount, tax: 0, gross: amount };
    if (mode === "add") {
      const tax = amount * (rate / 100);
      return { net: amount, tax, gross: amount + tax };
    }
    const net = amount / (1 + rate / 100);
    return { net, tax: amount - net, gross: amount };
  }, [amount, rate, mode, reverseCharge]);

  return (
    <ToolShell
      toolKey="/tools/vat-gst-invoice-calculator"
      h1="VAT / GST Invoice Calculator"
      tagline="Add or strip VAT/GST and get a clean invoice breakdown."
      intro="Whether you're adding tax to a quoted fee or working backwards from a gross figure the client agreed to, this gives you the net, tax and gross lines to copy straight onto the invoice."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Amount">
              <Input type="number" value={amount} onChange={(e) => setAmount(+e.target.value || 0)} />
            </Field>
            <Field label="Mode">
              <select value={mode} onChange={(e) => setMode(e.target.value as "add" | "remove")} className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm">
                <option value="add">Add tax to this net amount</option>
                <option value="remove">Extract tax from this gross amount</option>
              </select>
            </Field>
            <Field label="Tax rate">
              <select value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm">
                {RATES.map((r) => <option key={r.label} value={r.v}>{r.label}</option>)}
              </select>
            </Field>
            <Field label="Custom rate %">
              <Input type="number" step="0.5" value={rate} onChange={(e) => setRate(+e.target.value || 0)} />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={reverseCharge} onChange={(e) => setReverseCharge(e.target.checked)} />
              B2B cross-border — reverse charge applies
            </label>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="Net (your fee)" value={formatMoney(net)} />
            <Stat label="Tax" value={formatMoney(tax)} sub={reverseCharge ? "Reverse charge — tax accounted for by the customer" : `${rate}% applied`} accent="warm" />
            <Stat label="Gross (invoice total)" value={formatMoney(gross)} />
            <div className="rounded-2xl border bg-secondary/40 p-5 text-sm text-muted-foreground">
              Invoice wording for reverse charge is usually a line such as "VAT reverse charge — customer to account for VAT". Confirm the exact requirement for your country and your client's.
            </div>
          </div>
        </div>
      }
      works="Adding tax multiplies your net fee by the rate. Extracting tax divides the gross by 1 + rate, because the tax is already inside the number. Ticking reverse charge zeroes the tax line, which is common on B2B cross-border services."
      why={`Getting VAT or GST wrong is one of the few freelance mistakes that costs money after the invoice is paid. If you quote a gross figure and later discover tax was inside it, you've silently cut your fee by the tax rate.\n\nRegistration thresholds, place-of-supply rules and reverse charge treatment vary by country and by whether your client is a business or a consumer. The arithmetic here is universal; the rules are not.\n\nAlways state net, tax and gross separately on the invoice, along with your tax registration number where you have one.`}
      mistakes={[
        "Quoting a fee without saying whether it includes tax.",
        "Applying tax to clients where reverse charge should apply instead.",
        "Spending tax collected on behalf of a tax authority.",
        "Missing a registration threshold and owing back-dated tax.",
        "Leaving the tax registration number off the invoice.",
      ]}
      faqs={[
        { q: "Do I have to charge VAT or GST?", a: "Only if you're registered, or required to register. Thresholds and rules differ by country — check your tax authority's guidance." },
        { q: "What is reverse charge?", a: "For many B2B cross-border services, the customer accounts for the tax instead of you. You invoice with no tax and add a reverse charge note." },
        { q: "Should I quote net or gross?", a: "To business clients, quote net and add tax. To consumers, quote gross — they can't reclaim it and care about the total." },
      ]}
      related={[
        "/tools/self-employment-tax-estimator",
        "/tools/payment-processing-fee-calculator",
        "/tools/currency-adjusted-rate-calculator",
      ]}
    />
  );
}
