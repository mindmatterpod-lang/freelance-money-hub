import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/invoice-late-fee-calculator")({
  head: () => ({
    meta: [
      {
        title: "Invoice Late Fee Calculator — Calculate Overdue Invoice Fees | FreelanceRate",
      },
      {
        name: "description",
        content:
          "Calculate late fees on overdue invoices using a monthly or daily rate. Get the fee, new invoice total, and a professional payment reminder email.",
      },
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

Just a quick reminder that invoice for ${formatMoney(amount)} is now ${days} days past due. Per our agreed payment terms, a late fee of ${rate}% ${
      mode === "monthly" ? "per month" : "per day"
    } applies once payment is overdue.

This adds ${formatMoney(fee)}, bringing the current total to ${formatMoney(total)}.

Could you confirm when we can expect payment? Happy to resend the invoice if it's helpful.

Thanks!`;

    return { fee, total, email };
  }, [amount, days, mode, rate]);

  return (
    <ToolShell
      toolKey="/tools/invoice-late-fee-calculator"
      h1="Invoice Late Fee Calculator"
      tagline="Calculate the late fee on an overdue invoice — and generate a professional payment reminder."
      intro="Enter your invoice amount, days overdue, and agreed late-fee rate to calculate the additional amount owed and the updated invoice total."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Invoice amount">
              <Input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(+e.target.value || 0)}
              />
            </Field>

            <Field label="Days overdue">
              <Input
                type="number"
                min="0"
                value={days}
                onChange={(e) => setDays(+e.target.value || 0)}
              />
            </Field>

            <Field label="Late fee type">
              <select
                value={mode}
                onChange={(e) =>
                  setMode(e.target.value as "monthly" | "daily")
                }
                className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
              >
                <option value="monthly">Percentage per month</option>
                <option value="daily">Percentage per day</option>
              </select>
            </Field>

            <Field
              label="Late fee rate (%)"
              hint={
                mode === "monthly"
                  ? "Enter the monthly rate stated in your agreement."
                  : "Enter the daily rate stated in your agreement."
              }
            >
              <Input
                type="number"
                min="0"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(+e.target.value || 0)}
              />
            </Field>
          </div>

          <div className="grid content-start gap-3">
            <Stat
              label="Late fee owed"
              value={formatMoney(fee)}
              accent="warm"
            />

            <Stat
              label="New total invoice amount"
              value={formatMoney(total)}
            />

            <div className="rounded-2xl border bg-secondary/40 p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  Reminder email
                </p>

                <button
                  className="rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-white"
                  onClick={() =>
                    navigator.clipboard?.writeText(email)
                  }
                >
                  Copy
                </button>
              </div>

              <pre className="mt-3 whitespace-pre-wrap break-words text-xs text-foreground/80">
                {email}
              </pre>
            </div>
          </div>
        </div>
      }
      works={`For a monthly percentage, this calculator prorates the monthly rate across the number of days an invoice is overdue.

Formula:
Late fee = Invoice amount × (monthly rate ÷ 100) × (days overdue ÷ 30)

For a daily percentage:
Late fee = Invoice amount × (daily rate ÷ 100) × days overdue

The calculation is an estimate based on the rate you enter. Your contract, invoice terms, and applicable local rules determine whether and how a late fee can actually be charged.`}
      why={`Late payments can create a real cash-flow problem for freelancers. While you are waiting for an overdue invoice, you may still have software costs, operating expenses, taxes, and other bills to cover.

A clearly written late-payment clause can give clients an incentive to pay on time and gives you a defined process when an invoice becomes overdue.

The important part is agreeing to the late-fee terms before the work begins and using a rate that is appropriate for your contract and applicable rules.`}
      mistakes={[
        "Charging a late fee that was never included in the original agreement or invoice terms.",
        "Waiting too long before sending a polite payment reminder.",
        "Using a rate without checking whether it is permitted under the applicable rules.",
        "Calculating the fee from the wrong outstanding balance.",
        "Failing to show the updated amount clearly when sending an overdue-invoice reminder.",
      ]}
      faqs={[
        {
          q: "How do I calculate a late fee on an invoice?",
          a: "Multiply the outstanding invoice amount by the agreed late-fee percentage, then prorate it for the number of days overdue when the agreement uses a monthly rate. For example, a monthly rate can be calculated as invoice amount × rate ÷ 100 × days overdue ÷ 30.",
        },
        {
          q: "What is a typical freelance invoice late fee?",
          a: "There is no universal rate that applies to every freelancer or country. The appropriate rate depends on your contract, client location, applicable rules, and the terms agreed before the invoice became overdue.",
        },
        {
          q: "Can I charge a late fee if it was not in my contract?",
          a: "Do not assume that you can. Late-fee rights depend on the agreement and applicable rules. Ideally, state the payment deadline and late-fee terms clearly before starting the project.",
        },
        {
          q: "Should freelancers charge late fees on every overdue invoice?",
          a: "Not necessarily. Some freelancers use the late fee as a contractual incentive and may choose to waive it for a good client or a first-time delay. The important thing is to have clear payment terms and communicate professionally.",
        },
        {
          q: "How do I politely remind a client about a late invoice?",
          a: "Keep the message short and professional. State the invoice number, original due date, outstanding amount, and the requested payment date. If your agreed terms include a late fee, mention the fee without using threatening language.",
        },
      ]}
      related={[
        "/tools/days-to-invoice-payment-calculator",
        "/tools/project-quote-calculator",
        "/tools/currency-adjusted-rate-calculator",
      ]}
    />
  );
}
