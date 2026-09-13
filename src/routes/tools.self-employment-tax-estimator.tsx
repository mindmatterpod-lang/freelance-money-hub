import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolShell, Stat, Field, formatMoney } from "@/components/site/ToolShell";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/tools/self-employment-tax-estimator")({
  head: () => ({
    meta: [
      { title: "Self-Employment Tax Estimator — Free | FreelanceRate" },
      { name: "description", content: "Estimate self-employment tax across the US, UK, Canada, Australia, India and Pakistan. Not tax advice — a working ballpark." },
    ],
  }),
  component: Page,
});

interface Country {
  code: string;
  label: string;
  currency: string;
  brackets: { upto: number; rate: number }[];
  extra?: { label: string; rate: number };
  note: string;
}

const COUNTRIES: Country[] = [
  {
    code: "US", label: "United States", currency: "USD",
    brackets: [
      { upto: 11600, rate: 0.10 }, { upto: 47150, rate: 0.12 },
      { upto: 100525, rate: 0.22 }, { upto: 191950, rate: 0.24 },
      { upto: 243725, rate: 0.32 }, { upto: 609350, rate: 0.35 },
      { upto: Infinity, rate: 0.37 },
    ],
    extra: { label: "SE tax (Social Security + Medicare)", rate: 0.153 },
    note: "Federal only. State income tax and the ~15.3% self-employment tax are added on top. Source: IRS 2024 brackets.",
  },
  {
    code: "UK", label: "United Kingdom", currency: "GBP",
    brackets: [
      { upto: 12570, rate: 0 }, { upto: 50270, rate: 0.20 },
      { upto: 125140, rate: 0.40 }, { upto: Infinity, rate: 0.45 },
    ],
    extra: { label: "Class 4 NI (approx.)", rate: 0.06 },
    note: "England/Wales/NI bands. Add Class 2/4 National Insurance. Source: HMRC 2024/25.",
  },
  {
    code: "CA", label: "Canada", currency: "CAD",
    brackets: [
      { upto: 55867, rate: 0.15 }, { upto: 111733, rate: 0.205 },
      { upto: 173205, rate: 0.26 }, { upto: 246752, rate: 0.29 },
      { upto: Infinity, rate: 0.33 },
    ],
    extra: { label: "CPP (both halves)", rate: 0.119 },
    note: "Federal only. Provincial tax and both CPP halves are added. Source: CRA 2024.",
  },
  {
    code: "AU", label: "Australia", currency: "AUD",
    brackets: [
      { upto: 18200, rate: 0 }, { upto: 45000, rate: 0.19 },
      { upto: 135000, rate: 0.325 }, { upto: 190000, rate: 0.37 },
      { upto: Infinity, rate: 0.45 },
    ],
    note: "Medicare Levy (~2%) applies above thresholds. Source: ATO 2024–25.",
  },
  {
    code: "IN", label: "India (new regime)", currency: "INR",
    brackets: [
      { upto: 300000, rate: 0 }, { upto: 700000, rate: 0.05 },
      { upto: 1000000, rate: 0.10 }, { upto: 1200000, rate: 0.15 },
      { upto: 1500000, rate: 0.20 }, { upto: Infinity, rate: 0.30 },
    ],
    note: "New regime slabs. Cess (4%) and surcharge may apply. Source: Income Tax Dept.",
  },
  {
    code: "PK", label: "Pakistan", currency: "PKR",
    brackets: [
      { upto: 600000, rate: 0 }, { upto: 1200000, rate: 0.05 },
      { upto: 2200000, rate: 0.15 }, { upto: 3200000, rate: 0.25 },
      { upto: 4100000, rate: 0.30 }, { upto: Infinity, rate: 0.35 },
    ],
    note: "Salaried slabs — freelancers often qualify for a 1% export services turnover tax; consult a CA. Source: FBR 2024.",
  },
];

function taxOn(income: number, brackets: Country["brackets"]) {
  let owed = 0, last = 0;
  for (const b of brackets) {
    if (income <= last) break;
    const cap = Math.min(income, b.upto);
    owed += (cap - last) * b.rate;
    last = cap;
    if (income <= b.upto) break;
  }
  return owed;
}

function Page() {
  const [countryCode, setCountryCode] = useState("US");
  const [income, setIncome] = useState(80000);
  const [expenses, setExpenses] = useState(6000);
  const country = COUNTRIES.find((c) => c.code === countryCode)!;

  const { tax, extra, total, effective, setAside } = useMemo(() => {
    const net = Math.max(0, income - expenses);
    const tax = taxOn(net, country.brackets);
    const extra = country.extra ? net * country.extra.rate : 0;
    const total = tax + extra;
    return {
      tax, extra, total,
      effective: net > 0 ? (total / net) * 100 : 0,
      setAside: income > 0 ? (total / income) * 100 : 0,
    };
  }, [income, expenses, country]);

  return (
    <ToolShell
      toolKey="/tools/self-employment-tax-estimator"
      h1="Self-Employment Tax Estimator"
      tagline="Rough tax owed and how much to set aside from each invoice."
      intro="A quick, country-aware ballpark of what you'll owe on your freelance income — plus a suggested percentage to stash from every invoice so tax season isn't a scramble."
      calculator={
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Country">
              <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm">
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
            </Field>
            <Field label={`Annual freelance income (${country.currency})`}>
              <Input type="number" value={income} onChange={(e) => setIncome(+e.target.value || 0)} />
            </Field>
            <Field label={`Business expenses / deductions (${country.currency})`}>
              <Input type="number" value={expenses} onChange={(e) => setExpenses(+e.target.value || 0)} />
            </Field>
            <div className="rounded-xl border border-dashed p-3 text-xs text-muted-foreground">
              <b className="text-foreground">Heads up:</b> this is an estimate, not tax advice. {country.note}
            </div>
          </div>
          <div className="grid content-start gap-3">
            <Stat label="Estimated income tax" value={formatMoney(tax, country.currency)} sub="Federal / central only" />
            {country.extra && (
              <Stat label={country.extra.label} value={formatMoney(extra, country.currency)} accent="warm" />
            )}
            <Stat label="Estimated total tax" value={formatMoney(total, country.currency)} sub={`Effective rate: ${effective.toFixed(1)}%`} />
            <div className="rounded-2xl border bg-secondary/40 p-5 text-sm">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Set aside per invoice</p>
              <p className="mt-2 font-display text-3xl font-bold text-gradient-brand">{setAside.toFixed(0)}%</p>
              <p className="mt-1 text-xs text-muted-foreground">Move this share into a separate tax savings account the day each invoice clears.</p>
            </div>
          </div>
        </div>
      }
      works="We subtract deductible expenses from your income, then apply that country's published income-tax brackets. Where a separate self-employment or social-insurance contribution exists (US SE tax, UK Class 4 NI, Canada CPP), we add an approximate flat percentage on top."
      why={`Freelancers get paid gross. Nobody withholds tax on your behalf — that's your job. Under-setting aside is the single most common reason a solo income year ends badly.\n\nA rough estimate is enormously more useful than none. It tells you what percentage of every invoice to move into a separate account, so at tax time you have the money instead of scrambling to find it.\n\nThis tool is deliberately simple and country-aware. It won't replace an accountant, especially in complex cases (multi-jurisdiction income, VAT/GST, incorporated entities), but it's a solid working ballpark.`}
      mistakes={[
        "Spending gross income and dealing with tax later.",
        "Assuming your tax rate is the top-bracket rate — most of your income sits in lower bands.",
        "Forgetting country-specific self-employment / social insurance contributions on top of income tax.",
        "Missing quarterly / advance tax deadlines that carry penalties.",
        "Not deducting legitimate business expenses (software, home office, hardware).",
      ]}
      faqs={[
        { q: "Is this tool tax advice?", a: "No. It's an estimate based on publicly published brackets. For anything binding, speak to a local accountant." },
        { q: "Why is the ‘set aside’ % higher than the effective rate?", a: "Because the % is applied to gross income, before you deduct expenses — that way you always have enough put aside." },
        { q: "Do you support state / provincial tax?", a: "Not yet. The estimate is federal / central only, so it will be conservative in high-tax states." },
        { q: "How much tax do freelancers actually pay?", a: "It depends on income and country, but most freelancers pay both regular income tax and a self-employment surcharge — for example, ~15.3% Social Security + Medicare in the US, or Class 4 National Insurance in the UK — on top of their income tax bracket. Run your numbers above for a country-specific estimate." },
        { q: "What is the self-employment tax rate?", a: "In the US it's 15.3% (Social Security + Medicare) on top of federal income tax. In the UK it's Class 2/4 National Insurance (~6% approximated here) on top of income tax. Canada adds both halves of CPP (~11.9%). Other countries in this tool use income tax brackets only, since they don't have a separate self-employment surcharge." },
        { q: "How much can I earn freelancing before paying tax?", a: "It depends on your country's tax-free threshold — for example $0 taxable band varies by system, but the UK's is £12,570, Australia's is AUD 18,200, India's new regime starts at ₹300,000, and Pakistan's is PKR 600,000. The US has no flat threshold but a standard deduction reduces taxable income. Select your country above to see the exact bracket." },
      ]}
      related={[
        "/tools/freelance-hourly-rate-calculator",
        "/tools/freelance-profit-margin-calculator",
        "/tools/currency-adjusted-rate-calculator",
      ]}
    />
  );
}
