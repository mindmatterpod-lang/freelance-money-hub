import { createFileRoute, Link } from "@tanstack/react-router";
import { GuideShell } from "./guides.how-to-set-your-freelance-rate";

export const Route = createFileRoute("/guides/freelance-tax-basics-by-country")({
  head: () => ({
    meta: [
      { title: "Freelance Tax Basics by Country | FreelanceRate" },
      { name: "description", content: "What self-employed people actually owe in the US, UK, Canada, Australia, India and Pakistan — plainly explained, with an estimator." },
    ],
  }),
  component: () => (
    <GuideShell
      breadcrumb="Tax basics by country"
      title="Freelance Tax Basics by Country: What You Actually Owe"
      deck="A plain-language tour of self-employment tax in six major freelance markets. This isn't tax advice — it's the vocabulary you need before you talk to an accountant."
      sections={[
        { h: "The universal shape", body: (
          <p>Almost every country charges self-employed workers two things: <b>income tax</b> (progressive brackets on your net profit) and a <b>social insurance contribution</b> (a flat-ish % that funds pensions, healthcare, or unemployment). Freelancers pay both halves of the social contribution — where an employee would split it with their employer, you don't.</p>
        )},
        { h: "Country snapshots", body: (
          <ul className="list-disc space-y-2 pl-5">
            <li><b>US:</b> Federal income tax (10–37%) + self-employment tax (~15.3% up to the Social Security cap) + state tax.</li>
            <li><b>UK:</b> Income tax (0–45%) + Class 2 and Class 4 National Insurance.</li>
            <li><b>Canada:</b> Federal income tax (15–33%) + provincial tax + both halves of CPP.</li>
            <li><b>Australia:</b> Income tax (0–45%) + Medicare Levy (~2%) + optional super contributions.</li>
            <li><b>India:</b> New regime slabs (0–30%) + 4% cess; GST kicks in above the turnover threshold.</li>
            <li><b>Pakistan:</b> Salaried slabs generally apply; export-of-services freelancers may qualify for a favorable 1% turnover tax if paid into a proper account.</li>
          </ul>
        )},
        { h: "Run your own estimate", body: (
          <p>Use our <Link to="/tools/self-employment-tax-estimator">Self-Employment Tax Estimator</Link> to plug your income and expenses into any of these six countries. It'll tell you both the estimated total tax and — crucially — what % of every invoice to set aside the day it clears.</p>
        )},
        { h: "When to hire an accountant", body: (
          <p>The moment you (a) cross a VAT/GST threshold, (b) earn from multiple countries, (c) start thinking about incorporating, or (d) buy any asset over a few thousand dollars. A good local accountant will save more than they cost in year one.</p>
        )},
      ]}
      related={[
        "/tools/self-employment-tax-estimator",
        "/tools/freelance-profit-margin-calculator",
        "/tools/freelance-hourly-rate-calculator",
      ]}
    />
  ),
});
