import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useCurrency } from "@/lib/currency";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/upwork-fee-calculator")({
  head: () => ({
    meta: [
      { title: "Upwork Fee Calculator 2026 — What You Keep After Fees | FreelanceRate" },
      {
        name: "description",
        content:
          "Free Upwork fee calculator for 2026. Enter your contract amount and your per-contract service fee (0–15%) to see what you keep after fees, Connects and withdrawals — and what to quote to keep your target.",
      },
      { property: "og:title", content: "Upwork Fee Calculator 2026 — What You Keep" },
      {
        property: "og:description",
        content:
          "Upwork's fee is 0–15% per contract since May 2025. See your real take-home after the fee, Connects and withdrawal costs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  useCurrency();
  const [amount, setAmount] = useState(1000);
  const [feePct, setFeePct] = useState(10);
  const [connects, setConnects] = useState(0);
  const [withdrawal, setWithdrawal] = useState(0);
  const [target, setTarget] = useState(1000);

  const { feeAmount, connectsCost, youKeep, effective, quote } = useMemo(() => {
    const feeAmount = amount * (feePct / 100);
    const connectsCost = connects * 0.15;
    const youKeep = amount - feeAmount - connectsCost - withdrawal;
    const effective = amount > 0 ? ((amount - youKeep) / amount) * 100 : 0;
    const quote = feePct >= 100 ? NaN : target / (1 - feePct / 100);
    return { feeAmount, connectsCost, youKeep, effective, quote };
  }, [amount, feePct, connects, withdrawal, target]);

  return (
    <ToolShell
      toolKey="/tools/upwork-fee-calculator"
      h1="Upwork Fee Calculator 2026"
      tagline="What you actually keep after Upwork's variable service fee, Connects and withdrawal costs."
      intro="Upwork no longer takes a flat 10%. Since May 2025 every new contract has its own service fee between 0% and 15%. Enter the fee shown on your offer to see your real take-home — and what to quote to keep the amount you want."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Contract amount" hint="What the client pays you">
              <Input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(+e.target.value || 0)}
              />
            </Field>
            <Field label="Freelancer service fee %" hint="0–15% — copy it from your offer">
              <Input
                type="number"
                min="0"
                max="15"
                step="0.5"
                value={feePct}
                onChange={(e) => setFeePct(Math.min(15, Math.max(0, +e.target.value || 0)))}
              />
            </Field>
            <Field label="Connects spent" hint="$0.15 each">
              <Input
                type="number"
                min="0"
                value={connects}
                onChange={(e) => setConnects(+e.target.value || 0)}
              />
            </Field>
            <Field label="Withdrawal fee" hint="e.g. $2.99 for non-US bank transfers">
              <Input
                type="number"
                min="0"
                step="0.01"
                value={withdrawal}
                onChange={(e) => setWithdrawal(+e.target.value || 0)}
              />
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
              sub={`On a ${formatMoney(amount)} contract`}
            />
            <Stat
              label="Upwork service fee"
              value={formatMoney(feeAmount)}
              sub={`${feePct}% of the contract amount`}
              accent="warm"
            />
            <Stat
              label="Effective fee"
              value={`${effective.toFixed(2)}%`}
              sub={`Including ${formatMoney(connectsCost)} Connects + ${formatMoney(withdrawal)} withdrawal`}
            />
            <Stat
              label={`Quote this to keep ${formatMoney(target)}`}
              value={formatMoney(quote)}
              sub="Target ÷ (1 − service fee)"
            />
            <div className="rounded-2xl border bg-secondary/40 p-5 text-sm text-muted-foreground">
              Since May 2025 the freelancer service fee is set per contract (0–15%); 10% is the most
              common figure. Contracts formed before May 2025 keep the flat 10%. Always use the rate
              shown on your offer — fees checked November 2026.
            </div>
          </div>
        </div>
      }
      works="We take the contract amount, subtract the service fee percentage shown on your offer, then subtract Connects ($0.15 each) and your withdrawal fee. The quote figure works backwards: target take-home ÷ (1 − service fee) gives the amount to bill so the fee leaves you with exactly your target."
      why={`The old "Upwork takes 10%" rule is stale, and using it costs real money. At 15% a $1,000 contract pays you $850, not $900 — and once Connects, withdrawal fees and currency conversion are added, most freelancers' all-in cost lands at 12–16%, not 10%.\n\nKnowing your per-contract fee before you accept changes what you quote, which jobs are worth the Connects, and how often you withdraw. A small job with a 15% fee and a $2.99 withdrawal can be barely worth doing; the same job at 0% is a different deal entirely.`}
      mistakes={[
        "Assuming 10% for every contract — check the rate on your own offer, it varies from 0% to 15%.",
        "Adding 10% on top instead of dividing: to keep $1,000 at 10% you quote $1,111, not $1,100.",
        "Forgetting Connects when judging whether a small job is profitable.",
        "Withdrawing small amounts often and paying the withdrawal fee many times.",
        "Ignoring the client's 5% marketplace fee when wondering why a client thinks you are expensive.",
      ]}
      faqs={[
        {
          q: "How much does Upwork take from freelancers in 2026?",
          a: "A variable freelancer service fee of 0–15% per contract, set when the contract is formed and locked for its life. 10% is the most common figure. Connects cost $0.15 each, and withdrawal fees depend on the method and your tax address.",
        },
        {
          q: "Is Upwork still 10%?",
          a: "Not as a flat rate. Contracts formed from May 2025 onwards are 0–15% per contract. Contracts formed before May 2025 keep the flat 10%.",
        },
        {
          q: "How do I calculate my Upwork take-home?",
          a: "Take-home = contract amount × (1 − service fee) − Connects cost − withdrawal fee. Enter your numbers above for the exact figure.",
        },
        {
          q: "What should I quote to keep $1,000?",
          a: "Divide your target by (1 − fee). At 10% that is $1,000 ÷ 0.90 = $1,111. At 15% it is $1,176. Then add Connects and withdrawal costs on top if you want those covered too.",
        },
        {
          q: "What are Connects and what do they cost?",
          a: "Connects are the credits you spend to submit a proposal — $0.15 each. The job listing shows how many a proposal costs, and Freelancer Plus ($19.99/month) includes 100 a month.",
        },
      ]}
      related={[
        "/tools/payment-processing-fee-calculator",
        "/tools/currency-adjusted-rate-calculator",
        "/tools/freelance-hourly-rate-calculator",
        "/blog/upwork-fees-2026-explained",
      ]}
    />
  );
}
