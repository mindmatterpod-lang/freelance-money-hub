import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useCurrency } from "@/lib/currency";
import { ToolShell, Stat, Field } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/tools/freelance-invoice-generator")({
  head: () => ({
    meta: [
      { title: "Freelance Invoice Generator — Free, No Signup, Print to PDF | FreelanceRate" },
      {
        name: "description",
        content:
          "Free freelance invoice generator. Add your details and line items, get a clean invoice with tax and discount, then print or save as PDF — no signup, your data stays in your browser.",
      },
      { property: "og:title", content: "Freelance Invoice Generator — Free" },
      {
        property: "og:description",
        content:
          "Build a professional freelance invoice in minutes. Line items, tax, discount, print to PDF — no signup.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

interface LineItem {
  desc: string;
  qty: number;
  rate: number;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function plusDaysIso(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function money(n: number, code: string) {
  if (!isFinite(n)) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code.toUpperCase(),
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(n);
  }
}

function Page() {
  useCurrency();
  const [yourName, setYourName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(todayIso);
  const [dueDate, setDueDate] = useState(() => plusDaysIso(14));
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [items, setItems] = useState<LineItem[]>([
    { desc: "Website design — homepage", qty: 1, rate: 500 },
    { desc: "Revisions (2 rounds)", qty: 1, rate: 150 },
  ]);
  const [taxPct, setTaxPct] = useState(0);
  const [discountPct, setDiscountPct] = useState(0);
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  const { subtotal, discountAmount, taxAmount, total } = useMemo(() => {
    const subtotal = items.reduce((sum, it) => sum + it.qty * it.rate, 0);
    const discountAmount = subtotal * (discountPct / 100);
    const taxAmount = (subtotal - discountAmount) * (taxPct / 100);
    return { subtotal, discountAmount, taxAmount, total: subtotal - discountAmount + taxAmount };
  }, [items, discountPct, taxPct]);

  const plainText = useMemo(() => {
    const lines = [
      `INVOICE ${invoiceNo}`,
      `From: ${yourName || "[Your name]"}${yourEmail ? ` (${yourEmail})` : ""}`,
      `To: ${clientName || "[Client name]"}`,
      `Date: ${invoiceDate}    Due: ${dueDate}`,
      "",
      ...items.map(
        (it) =>
          `${it.desc} — ${it.qty} × ${money(it.rate, currencyCode)} = ${money(it.qty * it.rate, currencyCode)}`,
      ),
      "",
      `Subtotal: ${money(subtotal, currencyCode)}`,
      ...(discountAmount > 0
        ? [`Discount (${discountPct}%): -${money(discountAmount, currencyCode)}`]
        : []),
      ...(taxAmount > 0 ? [`Tax (${taxPct}%): ${money(taxAmount, currencyCode)}`] : []),
      `TOTAL DUE: ${money(total, currencyCode)}`,
      ...(notes ? ["", notes] : []),
    ];
    return lines.join("\n");
  }, [
    invoiceNo,
    yourName,
    yourEmail,
    clientName,
    invoiceDate,
    dueDate,
    items,
    subtotal,
    discountAmount,
    discountPct,
    taxAmount,
    taxPct,
    total,
    notes,
    currencyCode,
  ]);

  const updateItem = (index: number, field: keyof LineItem, value: string) => {
    setItems((prev) =>
      prev.map((it, i) =>
        i === index ? { ...it, [field]: field === "desc" ? value : +value || 0 } : it,
      ),
    );
  };

  const copyInvoice = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <ToolShell
      toolKey="/tools/freelance-invoice-generator"
      h1="Freelance Invoice Generator"
      tagline="A professional invoice in minutes — free, no signup, print to PDF."
      intro="Fill in your details and line items, and get a clean, numbered invoice with tax and discount handled. Everything runs in your browser — nothing is uploaded or stored."
      calculator={
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <Field label="Your name / business">
              <Input
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                placeholder="Jane Freelancer"
              />
            </Field>
            <Field label="Your email">
              <Input
                type="email"
                value={yourEmail}
                onChange={(e) => setYourEmail(e.target.value)}
                placeholder="jane@example.com"
              />
            </Field>
            <Field label="Client name">
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Acme Ltd"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Invoice number">
                <Input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
              </Field>
              <Field label="Currency code" hint="USD, EUR, GBP…">
                <Input
                  value={currencyCode}
                  onChange={(e) => setCurrencyCode(e.target.value.toUpperCase().slice(0, 3))}
                />
              </Field>
              <Field label="Invoice date">
                <Input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </Field>
              <Field label="Due date">
                <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </Field>
            </div>
            <div>
              <p className="mb-1.5 text-sm font-medium">Line items</p>
              <div className="space-y-2">
                {items.map((it, i) => (
                  <div key={i} className="grid grid-cols-[1fr_64px_88px_32px] items-center gap-2">
                    <Input
                      value={it.desc}
                      onChange={(e) => updateItem(i, "desc", e.target.value)}
                      placeholder="Description"
                      aria-label="Item description"
                    />
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      value={it.qty}
                      onChange={(e) => updateItem(i, "qty", e.target.value)}
                      aria-label="Quantity"
                    />
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={it.rate}
                      onChange={(e) => updateItem(i, "rate", e.target.value)}
                      aria-label="Rate"
                    />
                    <button
                      type="button"
                      onClick={() => setItems((prev) => prev.filter((_, j) => j !== i))}
                      disabled={items.length <= 1}
                      className="rounded-md border px-2 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40"
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setItems((prev) => [...prev, { desc: "", qty: 1, rate: 0 }])}
                className="mt-2 rounded-full border px-3 py-1.5 text-xs font-semibold"
              >
                + Add item
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Discount %" hint="Applied before tax">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={discountPct}
                  onChange={(e) => setDiscountPct(+e.target.value || 0)}
                />
              </Field>
              <Field label="Tax %">
                <Input
                  type="number"
                  min="0"
                  step="0.5"
                  value={taxPct}
                  onChange={(e) => setTaxPct(+e.target.value || 0)}
                />
              </Field>
            </div>
            <Field label="Payment details / notes" hint="Bank details, payment link, terms">
              <Textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Payment due within 14 days. Bank transfer to…"
              />
            </Field>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Stat
                label="Subtotal"
                value={money(subtotal, currencyCode)}
                sub={`${items.length} line item${items.length === 1 ? "" : "s"}`}
              />
              <Stat
                label="Total due"
                value={money(total, currencyCode)}
                sub={`Due ${dueDate || "—"}`}
                accent="warm"
              />
            </div>
            <div className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-bold">
                    {yourName || "Your name / business"}
                  </p>
                  {yourEmail && <p className="text-xs text-muted-foreground">{yourEmail}</p>}
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold">INVOICE {invoiceNo}</p>
                  <p className="text-xs text-muted-foreground">
                    {invoiceDate} · Due {dueDate}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm">
                <span className="text-muted-foreground">Bill to: </span>
                <b>{clientName || "Client name"}</b>
              </p>
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                    <th className="py-2 pr-2 font-medium">Description</th>
                    <th className="w-12 py-2 text-right font-medium">Qty</th>
                    <th className="w-20 py-2 text-right font-medium">Rate</th>
                    <th className="w-24 py-2 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2 pr-2">{it.desc || "—"}</td>
                      <td className="py-2 text-right">{it.qty}</td>
                      <td className="py-2 text-right">{money(it.rate, currencyCode)}</td>
                      <td className="py-2 text-right font-medium">
                        {money(it.qty * it.rate, currencyCode)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className="mt-4 space-y-1.5 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <b>{money(subtotal, currencyCode)}</b>
                </li>
                {discountAmount > 0 && (
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Discount ({discountPct}%)</span>
                    <b>−{money(discountAmount, currencyCode)}</b>
                  </li>
                )}
                {taxAmount > 0 && (
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Tax ({taxPct}%)</span>
                    <b>{money(taxAmount, currencyCode)}</b>
                  </li>
                )}
                <li className="flex justify-between border-t pt-2 text-base">
                  <span>Total due</span>
                  <b>{money(total, currencyCode)}</b>
                </li>
              </ul>
              {notes && (
                <p className="mt-4 whitespace-pre-wrap text-xs text-muted-foreground">{notes}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft"
              >
                Print / Save as PDF
              </button>
              <button
                type="button"
                onClick={copyInvoice}
                className="rounded-full border px-5 py-2.5 text-sm font-semibold"
              >
                {copied ? "Copied!" : "Copy invoice text"}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Printing opens your browser's print dialog — choose "Save as PDF" to download the
              invoice. Your data never leaves this page.
            </p>
          </div>
        </div>
      }
      works="Each line item is quantity × rate, added up into a subtotal. A discount is taken off the subtotal first, then tax is applied to the discounted amount — which is how most invoices are structured. The preview updates live as you type, and Print / Save as PDF uses your browser's own print dialog, so the invoice comes out clean without any account or upload."
      why={`A good invoice is a payment system, not a document. Clients pay the invoice that is easiest to process: a number they can reference, a due date they can see, line items that match the agreed scope, and payment details with no friction.\n\nMost late payments are not disputes — they are an invoice stuck in someone's queue because something was missing or unclear. A numbered, dated invoice with clear terms removes the most common reasons to delay.\n\nBecause this generator runs entirely in your browser, you can use it for any client, in any currency, without creating an account or handing your client list to a third party.`}
      mistakes={[
        "Sending an invoice with no number or no due date — both make it easy to deprioritise.",
        "Lumping everything into one vague line item instead of matching the agreed scope.",
        "Forgetting to state payment terms and a late-fee clause before the invoice goes out.",
        "Applying tax to the pre-discount total, or forgetting tax entirely where it applies.",
        "Using a new numbering scheme every time — keep one sequence so you can track what is owed.",
      ]}
      faqs={[
        {
          q: "What makes a freelance invoice valid?",
          a: "At minimum: your name and contact details, the client's name, a unique invoice number, the invoice date and a due date, clear line items with quantities and rates, and the total due. Some countries also require a tax ID or VAT/GST details — check your local rules.",
        },
        {
          q: "Is this invoice generator really free?",
          a: "Yes. There is no account, no watermark and no limit. Everything runs in your browser, and printing or saving as PDF uses your browser's own print dialog.",
        },
        {
          q: "How do I save the invoice as a PDF?",
          a: "Click Print / Save as PDF, then choose 'Save as PDF' as the destination in your browser's print dialog. You can also print a paper copy from the same dialog.",
        },
        {
          q: "Should tax be applied before or after the discount?",
          a: "In most cases tax is applied to the discounted subtotal, which is what this generator does. Tax rules vary by country, so confirm with your accountant if you are unsure.",
        },
        {
          q: "What payment terms should I use?",
          a: "Net 14 is normal for solo freelancers. Net 30 is a concession, and anything longer should come with a deposit or a price premium. Put the terms in writing before the work starts, and consider a late-fee clause.",
        },
      ]}
      related={[
        "/tools/invoice-late-fee-calculator",
        "/tools/days-to-invoice-payment-calculator",
        "/tools/vat-gst-invoice-calculator",
        "/guides/how-to-invoice-international-clients",
      ]}
    />
  );
}
