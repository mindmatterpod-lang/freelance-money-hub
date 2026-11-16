import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useCurrency } from "@/lib/currency";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/fiverr-fee-calculator")({
  head: () => ({
    meta: [
      { title: "Fiverr Fee Calculator — Seller Earnings After 20% | FreelanceRate" },
      {
        name: "description",
        content:
          "Free Fiverr fee calculator. Enter your gig price, extras and tip to see what you keep after Fiverr's 20% commission, what your buyer pays, and what to charge to keep your target.",
      },
      { property: "og:title", content: "Fiverr Fee Calculator — What You Keep After 20%" },
      {
        property: "og:description",
        content:
          "Fiverr keeps 20% of every order, including tips and extras. See your real earnings and what the buyer pays at checkout.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const WITHDRAWALS = [
  { id: "paypal", label: "PayPal — free", fee: 0 },
  { id: "payoneer", label: "Bank transfer via Payoneer — $3", fee: 3 },
  { id: "direct", label: "US direct deposit — $1", fee: 1 },
] as const;

function Page() {
  useCurrency();
  const [price, setPrice] = useState(100);
  const [extras, setExtras] = useState(0);
  const [tip, setTip] = useState(0);
  const [withdrawalId, setWithdrawalId] = useState<string>("paypal");
  const [target, setTarget] = useState(100);

  const {
    orderTotal,
    sellerFee,
    youKeep,
    buyerFee,
    buyerPays,
    withdrawalFee,
    quote,
    quoteWithWithdrawal,
  } = useMemo(() => {
    const orderTotal = price + extras + tip;
    const sellerFee = orderTotal * 0.2;
    const withdrawalFee = WITHDRAWALS.find((w) => w.id === withdrawalId)?.fee ?? 0;
    const youKeep = orderTotal * 0.8 - withdrawalFee;
    const buyerFee = orderTotal * 0.055 + (orderTotal > 0 && orderTotal < 200 ? 3.5 : 0);
    const buyerPays = orderTotal + buyerFee;
    const quote = target / 0.8;
    const quoteWithWithdrawal = (target + withdrawalFee) / 0.8;
    return {
      orderTotal,
      sellerFee,
      youKeep,
      buyerFee,
      buyerPays,
      withdrawalFee,
      quote,
      quoteWithWithdrawal,
    };
  }, [price, extras, tip, withdrawalId, target]);

  return (
    <ToolShell
      toolKey="/tools/fiverr-fee-calculator"
      h1="Fiverr Fee Calculator"
      tagline="What you keep after Fiverr's 20% cut — and what your buyer actually pays."
      intro="Fiverr takes a flat 20% of every order, including extras and tips, with no volume discount. Enter your gig price to see your real earnings, the buyer's checkout total, and what to charge to keep the amount you want."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Gig price" hint="Your listed package price">
              <Input
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(+e.target.value || 0)}
              />
            </Field>
            <Field label="Extras" hint="Gig extras added to the order">
              <Input
                type="number"
                min="0"
                value={extras}
                onChange={(e) => setExtras(+e.target.value || 0)}
              />
            </Field>
            <Field label="Tip" hint="Fiverr takes 20% of tips too">
              <Input
                type="number"
                min="0"
                value={tip}
                onChange={(e) => setTip(+e.target.value || 0)}
              />
            </Field>
            <Field label="Withdrawal method">
              <select
                value={withdrawalId}
                onChange={(e) => setWithdrawalId(e.target.value)}
                className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
              >
                {WITHDRAWALS.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Target take-home" hint="What you want to keep">
              <Input
                type="number"
                min="0"
                value={target}
                onChange={(e) => setTarget(+e.target.value || 0)}
              />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat
              label="You keep"
              value={formatMoney(youKeep)}
              sub={`80% of ${formatMoney(orderTotal)} minus ${formatMoney(withdrawalFee)} withdrawal`}
            />
            <Stat
              label="Fiverr's 20% cut"
              value={formatMoney(sellerFee)}
              sub="On the full order, including extras and tips"
              accent="warm"
            />
            <Stat
              label="Buyer pays"
              value={formatMoney(buyerPays)}
              sub={`Order ${formatMoney(orderTotal)} + ${formatMoney(buyerFee)} buyer fees`}
            />
            <Stat
              label={`Charge this to keep ${formatMoney(target)}`}
              value={formatMoney(quote)}
              sub={`Or ${formatMoney(quoteWithWithdrawal)} to cover the withdrawal fee too`}
            />
            <div className="rounded-2xl border bg-secondary/40 p-5 text-sm text-muted-foreground">
              Example: a $100 gig pays you $80. The buyer pays $109 — the $100 price plus a 5.5%
              service fee and the $3.50 small-order fee on purchases under $200. Fees checked
              November 2026.
            </div>
          </div>
        </div>
      }
      works="We add the gig price, extras and tip into one order total, then take 20% off for Fiverr and subtract the withdrawal fee for your chosen method. The buyer side is separate: 5.5% of the order plus a $3.50 small-order fee when the total is under $200. The quote figure works backwards: target ÷ 0.8 gives the price that leaves you with your target after the 20% cut."
      why={`Fiverr's fee is simple, which is exactly why it is easy to underprice against. There are no tiers, no volume discounts and no exemption for tips — 20% comes off everything, every time. A $100 gig is $80 in your balance, and a $25 gig is $20 before withdrawal fees.\n\nThe buyer side matters too. Your gig costs the client more than your price, and on small orders the flat $3.50 fee makes the real platform cut much larger than 20% — on a $25 order Fiverr and the buyer fee together take about 32% of what the client pays.\n\nPrice from the take-home you want, not from the number that looks good on the gig page.`}
      mistakes={[
        "Pricing a gig at the amount you want to keep — a $100 price pays you $80, not $100.",
        "Forgetting the 20% applies to tips and extras, not just the base gig price.",
        "Ignoring withdrawal fees on small orders, where a $3 fee is a large share of what you keep.",
        "Assuming the fee drops as you level up — it stays at 20% for every seller level.",
        "Forgetting the 7–14 day clearing period when planning cash flow.",
      ]}
      faqs={[
        {
          q: "How much does Fiverr take from sellers?",
          a: "A flat 20% commission on every order, including gig extras and tips. On a $100 gig you keep $80, before any withdrawal fee.",
        },
        {
          q: "What does the buyer pay on Fiverr?",
          a: "The buyer pays your gig price plus a 5.5% service fee, and a $3.50 small-order fee on purchases under $200. A $100 gig costs the buyer $109.",
        },
        {
          q: "How do I calculate what to charge on Fiverr to keep $100?",
          a: "Divide your target by 0.8: $100 ÷ 0.8 = $125. Price the gig at $125 and Fiverr's 20% leaves you with $100 before withdrawal fees.",
        },
        {
          q: "How long does it take for Fiverr earnings to clear?",
          a: "Earnings clear 14 days after an order is marked complete, or 7 days for Top Rated Sellers, sellers on Seller Plus and Fiverr Pro.",
        },
        {
          q: "What are Fiverr's withdrawal fees?",
          a: "Withdrawing to PayPal is free on Fiverr's side. A local bank transfer via Payoneer costs $3 per transfer and a US direct deposit costs $1. PayPal or Payoneer may add their own currency conversion charges.",
        },
      ]}
      related={[
        "/tools/upwork-fee-calculator",
        "/tools/payment-processing-fee-calculator",
        "/tools/freelance-hourly-rate-calculator",
        "/blog/fiverr-fees-2026-explained",
      ]}
    />
  );
}
