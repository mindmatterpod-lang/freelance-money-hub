import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/freelance-emergency-fund-calculator")({
  head: () => ({
    meta: [
      { title: "Freelance Emergency Fund Calculator — Free | FreelanceRate" },
      { name: "description", content: "Work out how much runway a freelancer needs based on personal costs, business overhead, payment delays and income volatility." },
      { property: "og:title", content: "Freelance Emergency Fund Calculator" },
      { property: "og:description", content: "How much runway you need before a slow month becomes a crisis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [personal, setPersonal] = useState(2200);
  const [business, setBusiness] = useState(400);
  const [months, setMonths] = useState(6);
  const [saved, setSaved] = useState(3000);
  const [monthlySave, setMonthlySave] = useState(500);

  const { burn, target, gap, monthsToGoal, currentRunway } = useMemo(() => {
    const burn = personal + business;
    const target = burn * months;
    const gap = Math.max(0, target - saved);
    return {
      burn,
      target,
      gap,
      monthsToGoal: monthlySave > 0 ? Math.ceil(gap / monthlySave) : Infinity,
      currentRunway: burn > 0 ? saved / burn : 0,
    };
  }, [personal, business, months, saved, monthlySave]);

  return (
    <ToolShell
      toolKey="/tools/freelance-emergency-fund-calculator"
      h1="Freelance Emergency Fund Calculator"
      tagline="How much runway you need before a quiet month turns into a crisis."
      intro="Freelance income arrives irregularly and late. This calculator sets a runway target from your real monthly burn, then shows how long your current savings would last and how quickly you'll close the gap."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Essential personal costs / month" hint="Rent, food, bills, insurance">
              <Input type="number" value={personal} onChange={(e) => setPersonal(+e.target.value || 0)} />
            </Field>
            <Field label="Fixed business costs / month">
              <Input type="number" value={business} onChange={(e) => setBusiness(+e.target.value || 0)} />
            </Field>
            <Field label="Months of runway you want" hint="6 is a sensible floor">
              <Input type="number" value={months} onChange={(e) => setMonths(+e.target.value || 0)} />
            </Field>
            <Field label="Already saved">
              <Input type="number" value={saved} onChange={(e) => setSaved(+e.target.value || 0)} />
            </Field>
            <Field label="Saving per month">
              <Input type="number" value={monthlySave} onChange={(e) => setMonthlySave(+e.target.value || 0)} />
            </Field>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="Target emergency fund" value={formatMoney(target)} sub={`${months} months at ${formatMoney(burn)}/mo`} />
            <Stat label="Still to save" value={formatMoney(gap)} sub={isFinite(monthsToGoal) ? `${monthsToGoal} months at current pace` : "Set a monthly amount"} accent="warm" />
            <Stat label="Current runway" value={`${currentRunway.toFixed(1)} months`} sub="If income stopped today" />
            {currentRunway < 3 && (
              <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
                ⚠ Under three months of runway. Prioritise deposits and shorter payment terms while you build the buffer.
              </div>
            )}
          </div>
        </div>
      }
      works="Your monthly burn is essential personal costs plus fixed business costs. The target is burn multiplied by the months of runway you want. Current runway divides what you've already saved by the burn, so you can see where you stand today."
      why={`Employees can usually get by on three months of savings. Freelancers can't: income tapers rather than stops, invoices land late, and business costs keep running whether or not work does.\n\nSix months is a reasonable floor. If your income is highly seasonal, your clients pay on Net 60, or you support dependants, aim higher.\n\nKeep tax money in a separate account entirely — it isn't savings, it's money you're holding for someone else.`}
      mistakes={[
        "Counting money owed to a tax authority as part of the fund.",
        "Keeping the fund in the same account you spend from.",
        "Basing the target on comfortable spending rather than essential spending.",
        "Ignoring fixed business costs that continue during a dry spell.",
        "Waiting for a 'good month' to start saving instead of moving a fixed percentage of every payment.",
      ]}
      faqs={[
        { q: "How many months should I aim for?", a: "Six months of essential costs for most freelancers; nine to twelve if income is seasonal or you have dependants." },
        { q: "Where should I keep it?", a: "An instant-access, interest-bearing account at a different bank than your everyday one — liquid, but not one tap away." },
        { q: "Should I invest the emergency fund?", a: "No. Its job is to be there in full on a bad day, not to grow." },
      ]}
      related={[
        "/tools/self-employment-tax-estimator",
        "/tools/days-to-invoice-payment-calculator",
        "/tools/freelance-profit-margin-calculator",
      ]}
    />
  );
}
