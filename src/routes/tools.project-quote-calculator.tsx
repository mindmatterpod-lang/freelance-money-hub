import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/project-quote-calculator")({
  head: () => ({
    meta: [
      { title: "Project Quote Calculator — Free Fixed-Bid Pricing | FreelanceRate" },
      { name: "description", content: "Turn hours and complexity into a defensible fixed-bid project quote, with deposit and per-revision overage rate." },
    ],
  }),
  component: Page,
});

const COMPLEXITY: Record<string, { label: string; mult: number }> = {
  simple: { label: "Simple (1.0×)", mult: 1 },
  moderate: { label: "Moderate (1.3×)", mult: 1.3 },
  complex: { label: "Complex (1.6×)", mult: 1.6 },
};

function Page() {
  const [hours, setHours] = useState(40);
  const [rate, setRate] = useState(85);
  const [complexity, setComplexity] = useState<keyof typeof COMPLEXITY>("moderate");
  const [revisions, setRevisions] = useState(2);
  const [deposit, setDeposit] = useState(40);

  const { quote, depositAmt, overage } = useMemo(() => {
    const q = hours * rate * COMPLEXITY[complexity].mult;
    return {
      quote: q,
      depositAmt: q * (deposit / 100),
      overage: rate * 1.25,
    };
  }, [hours, rate, complexity, revisions, deposit]);

  return (
    <ToolShell
      toolKey="/tools/project-quote-calculator"
      h1="Project Quote / Fixed-Bid Calculator"
      tagline="Price fixed-bid projects with a built-in risk buffer, deposit and revision overage."
      intro="Fixed-bid pricing punishes bad estimates. This calculator multiplies your hours by your rate, then adds a complexity buffer so unknowns don't eat your margin."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Estimated hours to complete">
              <Input type="number" value={hours} onChange={(e) => setHours(+e.target.value || 0)} />
            </Field>
            <Field label="Your hourly rate">
              <Input type="number" value={rate} onChange={(e) => setRate(+e.target.value || 0)} />
            </Field>
            <Field label="Complexity / risk">
              <select
                value={complexity}
                onChange={(e) => setComplexity(e.target.value as keyof typeof COMPLEXITY)}
                className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm"
              >
                {Object.entries(COMPLEXITY).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Revision rounds included">
              <Input type="number" value={revisions} onChange={(e) => setRevisions(+e.target.value || 0)} />
            </Field>
            <Field label="Deposit %" hint="30–50% is typical">
              <Input type="number" value={deposit} onChange={(e) => setDeposit(+e.target.value || 0)} />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="Suggested project quote" value={formatMoney(quote)} sub={`${hours}h × ${formatMoney(rate)} × ${COMPLEXITY[complexity].mult}×`} />
            <Stat label="Deposit up front" value={formatMoney(depositAmt)} sub={`${deposit}% before you start`} accent="warm" />
            <Stat label="Per-revision overage rate" value={formatMoney(overage)} sub={`Anything beyond ${revisions} rounds`} />
            <div className="rounded-2xl border bg-secondary/40 p-5 text-sm text-muted-foreground">
              <b className="text-foreground">Pro tip:</b> put the deposit, the number of revisions, and the overage rate in your quote as three separate line items. It makes scope clear and makes overages easier to invoice.
            </div>
          </div>
        </div>
      }
      works="Multiply estimated hours by your hourly rate, apply a complexity multiplier for unknowns (1.0×–1.6×), then split into a deposit and a per-revision overage rate so scope creep is priced in from day one."
      why={`Fixed-bid projects transfer risk from the client to you: if it takes twice as long, you eat the cost. The only defense is pricing that risk up front.\n\nA complexity multiplier is not padding — it's insurance. If everything goes smoothly, you earn a healthier margin. If it doesn't, you don't work for free.\n\nDeposits and revision overages protect the other axis: cash flow and scope. Together they turn a scary quote into a boring, professional one.`}
      mistakes={[
        "Quoting only 'my rate × my best-case hours' with no buffer.",
        "Skipping the deposit and financing the client for free.",
        "Not defining how many revisions are included.",
        "Forgetting to include kickoff, meetings and QA in the hour estimate.",
        "Adjusting the number down to 'win' the job without cutting scope.",
      ]}
      faqs={[
        { q: "How do I pick a complexity multiplier?", a: "Simple: you've done this exact project before. Moderate: new scope but familiar stack. Complex: new client, new stack, unclear requirements." },
        { q: "Is a 50% deposit unreasonable?", a: "Not for small studios and solo freelancers. It's standard in design, dev, and video work. Consider 30–40% for larger clients with procurement." },
        { q: "How much should I charge per revision?", a: "1.25× your hourly rate is a good default — it discourages scope creep without feeling punitive." },
      ]}
      related={[
        "/tools/freelance-hourly-rate-calculator",
        "/tools/invoice-late-fee-calculator",
        "/tools/freelance-profit-margin-calculator",
      ]}
    />
  );
}
