import { createFileRoute, Link } from "@tanstack/react-router";
import { GuideShell } from "./guides.how-to-set-your-freelance-rate";

export const Route = createFileRoute("/guides/how-to-invoice-international-clients")({
  head: () => ({
    meta: [
      { title: "How to Invoice International Clients Without Losing Money | FreelanceRate" },
      { name: "description", content: "Cut FX and platform fees, get paid on time, and structure invoices for any client in the world." },
    ],
  }),
  component: () => (
    <GuideShell
      breadcrumb="International invoicing"
      title="How to Invoice International Clients Without Losing Money to Fees"
      deck="Cross-border freelancing is where quiet money leaks live. FX spreads, PayPal fees, and slow bank rails can eat 3–6% of an invoice before you see it."
      sections={[
        { h: "Quote in a strong, stable currency", body: (
          <>
            <p>USD and EUR are the safest defaults for international work. They shield you from your own currency's swings between quote and payment.</p>
            <p>Before you finalize, check what actually lands in your account with our <Link to="/tools/currency-adjusted-rate-calculator">Currency-Adjusted Rate Calculator</Link>.</p>
          </>
        )},
        { h: "Choose the right rails", body: (
          <>
            <p>For most currency pairs, <b>Wise</b> is dramatically cheaper than PayPal. <b>Payoneer</b> sits between the two and is competitive for USD payouts to countries where Wise coverage is thinner.</p>
            <p>Whatever you pick, open a multi-currency account so you can hold funds in the invoice currency and convert only when the rate is good.</p>
          </>
        )},
        { h: "Put payment terms and late fees on the invoice", body: (
          <>
            <p>Include Net 14 or Net 15 terms, a bank / rail choice, and a small late fee clause (1.5%/mo is standard). Use our <Link to="/tools/invoice-late-fee-calculator">Late Fee Calculator</Link> to draft a polite reminder if the invoice slips.</p>
          </>
        )},
        { h: "Track when the money will actually arrive", body: (
          <>
            <p>Net 30 doesn't mean 30 days. It means <i>at least</i> 30 days. Model each client's real delay with our <Link to="/tools/days-to-invoice-payment-calculator">Cash Flow Calculator</Link> so you don't accept three long-term clients whose payments all clear on the same day.</p>
          </>
        )},
      ]}
      related={[
        "/tools/currency-adjusted-rate-calculator",
        "/tools/invoice-late-fee-calculator",
        "/tools/days-to-invoice-payment-calculator",
      ]}
    />
  ),
});
