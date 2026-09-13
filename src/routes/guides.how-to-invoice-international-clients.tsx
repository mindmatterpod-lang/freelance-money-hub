import { createFileRoute, Link } from "@tanstack/react-router";
import { GuideShell } from "./guides.how-to-set-your-freelance-rate";

export const Route = createFileRoute(
  "/guides/how-to-invoice-international-clients",
)({
  head: () => ({
    meta: [
      {
        title:
          "How to Invoice International Clients as a Freelancer | Freelance Money Hub",
      },
      {
        name: "description",
        content:
          "Learn how to invoice international clients, choose the right currency, handle payment fees, set payment terms, track payments, and reduce cross-border payment problems.",
      },
      {
        name: "robots",
        content: "index, follow",
      },
    ],
  }),

  component: () => (
    <GuideShell
      breadcrumb="International invoicing"
      title="How to Invoice International Clients as a Freelancer"
      deck="A practical international invoicing system for freelancers: choose the currency, payment method, fees and payment terms before the work begins — then calculate what you actually receive."
      sections={[
        {
          h: "Quick answer: How do you invoice an international client?",
          body: (
            <>
              <p>
                To invoice an international client, create a professional
                invoice that clearly identifies you and your client, describes
                the services provided, states the amount and currency, gives a
                specific due date, and explains exactly how the client should
                pay.
              </p>

              <p>
                Before starting the project, agree on the{" "}
                <strong>
                  price, currency, payment schedule, payment method, fees, and
                  payment deadline
                </strong>
                .
              </p>

              <p>
                A good international invoice should let the client answer five
                questions immediately:
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Who is being paid?</li>
                <li>What services are being paid for?</li>
                <li>How much is owed?</li>
                <li>Which currency is being used?</li>
                <li>When and how should the payment be made?</li>
              </ul>
            </>
          ),
        },

        {
          h: "The International Invoice Decision Framework",
          body: (
            <>
              <p>
                Before sending an international invoice, make four decisions:
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border bg-secondary/40 p-5">
                  <h3 className="font-semibold">1. Currency</h3>
                  <p className="mt-2 text-sm">
                    Which currency will appear on the invoice and who carries
                    the currency-conversion risk?
                  </p>
                </div>

                <div className="rounded-2xl border bg-secondary/40 p-5">
                  <h3 className="font-semibold">2. Payment rail</h3>
                  <p className="mt-2 text-sm">
                    Which payment method can both sides use and what does it
                    cost?
                  </p>
                </div>

                <div className="rounded-2xl border bg-secondary/40 p-5">
                  <h3 className="font-semibold">3. Fee responsibility</h3>
                  <p className="mt-2 text-sm">
                    Who pays transaction, conversion, receiving, or
                    intermediary charges?
                  </p>
                </div>

                <div className="rounded-2xl border bg-secondary/40 p-5">
                  <h3 className="font-semibold">4. Payment timing</h3>
                  <p className="mt-2 text-sm">
                    When is the invoice due and when do you realistically
                    expect the money to become available?
                  </p>
                </div>
              </div>

              <p>
                If these four decisions are clear before the project starts,
                many international payment problems can be prevented before
                they happen.
              </p>
            </>
          ),
        },

        {
          h: "What is an international freelance invoice?",
          body: (
            <>
              <p>
                An international freelance invoice is a request for payment
                sent to a client in another country. The basic structure is
                similar to a domestic invoice, but international transactions
                can introduce additional considerations such as currencies,
                exchange rates, payment providers, bank charges, and
                country-specific tax requirements.
              </p>

              <p>
                The goal is not to make the invoice complicated. The goal is
                to remove uncertainty so the client knows exactly what they
                owe and how to pay it.
              </p>
            </>
          ),
        },

        {
          h: "What should an international freelance invoice include?",
          body: (
            <>
              <p>
                Include enough information for the client and their accounting
                team to identify the invoice and process the payment without
                unnecessary back-and-forth.
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Your name or business name</li>
                <li>Your contact information</li>
                <li>Client or company name</li>
                <li>Client billing information</li>
                <li>A unique invoice number</li>
                <li>Invoice issue date</li>
                <li>Payment due date</li>
                <li>Clear description of services</li>
                <li>Quantity or hours where relevant</li>
                <li>Price for each service</li>
                <li>Total amount due</li>
                <li>Invoice currency</li>
                <li>Payment terms</li>
                <li>Payment instructions or payment link</li>
                <li>Relevant tax or business information</li>
              </ul>

              <p>
                Your invoice should match the agreement you made with the
                client before the project started.
              </p>
            </>
          ),
        },

        {
          h: "An international invoice example",
          body: (
            <>
              <p>
                Suppose you complete a website project for an overseas client
                and agree on a total price of <strong>$1,000 USD</strong>.
              </p>

              <div className="rounded-2xl border bg-secondary/40 p-5">
                <p className="font-semibold">Example invoice</p>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <span>Invoice number</span>
                    <strong>INV-2026-014</strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Service</span>
                    <strong>Website development</strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Amount</span>
                    <strong>$1,000 USD</strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Payment terms</span>
                    <strong>Net 14</strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Payment method</span>
                    <strong>Agreed payment method</strong>
                  </div>
                </div>
              </div>

              <p>
                The exact payment method and any applicable fees should be
                agreed before the invoice is issued. The invoice and the
                original agreement should describe the same deal.
              </p>
            </>
          ),
        },

        {
          h: "The invoice amount is not always your real earnings",
          body: (
            <>
              <p>
                An international invoice tells your client what they owe. Your
                actual proceeds can be different after payment costs and
                currency conversion.
              </p>

              <div className="rounded-2xl border bg-secondary/40 p-5">
                <p className="text-sm font-semibold">
                  Example: $1,000 international invoice
                </p>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span>Invoice amount</span>
                    <strong>$1,000</strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Payment processing cost</span>
                    <span>− $X</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Currency conversion impact</span>
                    <span>− $Y</span>
                  </div>

                  <div className="flex justify-between gap-4 border-t pt-3">
                    <span className="font-semibold">
                      Estimated amount received
                    </span>
                    <strong>$1,000 − X − Y</strong>
                  </div>
                </div>
              </div>

              <p>
                The actual numbers depend on the payment route, currencies,
                exchange rate, account, and provider. Do not assume that the
                invoice total is the same as the amount that reaches your
                account.
              </p>

              <p>
                Use our{" "}
                <Link to="/tools/currency-adjusted-rate-calculator">
                  Currency-Adjusted Rate Calculator
                </Link>{" "}
                to model the effect on your effective freelance rate.
              </p>
            </>
          ),
        },

        {
          h: "The International Invoice Formula",
          body: (
            <>
              <p>
                Use this simple model when thinking about international
                freelance payments:
              </p>

              <div className="rounded-2xl border bg-secondary/40 p-5 text-center">
                <p className="font-display text-xl font-bold">
                  Invoice Amount − Payment Costs − FX Impact = Amount Received
                </p>
              </div>

              <p>
                This isn't a tax formula. It's a practical cash-flow framework.
              </p>

              <p>
                If your actual receipts are consistently lower than expected,
                look at your payment setup, conversion costs, and pricing
                rather than looking only at the invoice total.
              </p>
            </>
          ),
        },

        {
          h: "1. Agree on payment terms before starting",
          body: (
            <>
              <p>
                Many international payment problems are caused before the
                invoice is ever created. Agree on the important details before
                beginning the project.
              </p>

              <p>Confirm:</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Total project price or hourly rate</li>
                <li>Invoice currency</li>
                <li>Deposit or upfront payment</li>
                <li>Milestone payments</li>
                <li>Final payment</li>
                <li>Payment deadline</li>
                <li>Accepted payment method</li>
                <li>Who pays transaction fees</li>
                <li>How currency-conversion costs are handled</li>
                <li>Any agreed late-payment terms</li>
              </ul>

              <p>
                Written agreement is particularly useful when you and your
                client operate in different countries.
              </p>
            </>
          ),
        },

        {
          h: "2. Choose the invoice currency carefully",
          body: (
            <>
              <p>
                Always make the currency obvious. Write{" "}
                <strong>$750 USD</strong> instead of simply{" "}
                <strong>$750</strong>.
              </p>

              <p>
                USD, EUR, and GBP are common choices for international freelance
                work, but there is no universal best currency. The correct
                choice is the currency you and your client agreed to use.
              </p>

              <p>
                Your invoice amount may not be the same amount that eventually
                reaches your account. Exchange-rate differences, conversion
                charges, and payment-processing fees can affect the final
                amount.
              </p>

              <p>
                Before accepting a project, use our{" "}
                <Link to="/tools/currency-adjusted-rate-calculator">
                  Currency-Adjusted Rate Calculator
                </Link>{" "}
                to estimate the effect of currency conversion.
              </p>
            </>
          ),
        },

        {
          h: "Which currency should you invoice in?",
          body: (
            <>
              <p>
                There isn't one currency that is automatically best for every
                freelancer. Use this decision process:
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  If you and the client already agreed on a currency, use that
                  currency.
                </li>
                <li>
                  If your business expenses are mainly in another currency,
                  consider the effect of conversion before quoting.
                </li>
                <li>
                  If the client requests their local currency, calculate the
                  effect on your effective rate before agreeing.
                </li>
                <li>
                  For long projects, decide in advance how currency changes
                  will be handled.
                </li>
              </ul>

              <p>
                The important question isn't simply{" "}
                <strong>"USD or EUR?"</strong> It is{" "}
                <strong>"Who carries the currency risk?"</strong>
              </p>
            </>
          ),
        },

        {
          h: "3. Decide who pays international payment fees",
          body: (
            <>
              <p>
                Depending on the payment route, international transactions can
                involve transaction fees, currency-conversion costs,
                intermediary-bank charges, or withdrawal fees.
              </p>

              <p>Decide before the project begins whether these costs are:</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>included in your quoted price,</li>
                <li>paid by the client, or</li>
                <li>handled according to another written agreement.</li>
              </ul>

              <p>
                The key is transparency. Avoid surprising the client with a
                new payment cost after the work has been completed.
              </p>
            </>
          ),
        },

        {
          h: "4. Choose an international payment method",
          body: (
            <>
              <p>
                There is no single payment method that is best for every
                freelancer and every client. Compare the options based on the
                countries involved, currencies supported, fees, speed, and
                convenience.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="px-3 py-3 text-left">Factor</th>
                      <th className="px-3 py-3 text-left">
                        What to check
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-b">
                      <td className="px-3 py-3 font-medium">Fees</td>
                      <td className="px-3 py-3">
                        Transaction, receiving, and withdrawal charges
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="px-3 py-3 font-medium">
                        Exchange rate
                      </td>
                      <td className="px-3 py-3">
                        How currency conversion affects your payout
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="px-3 py-3 font-medium">Speed</td>
                      <td className="px-3 py-3">
                        How long the transfer normally takes
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="px-3 py-3 font-medium">
                        Availability
                      </td>
                      <td className="px-3 py-3">
                        Whether the service supports both countries
                      </td>
                    </tr>

                    <tr>
                      <td className="px-3 py-3 font-medium">Convenience</td>
                      <td className="px-3 py-3">
                        How easy it is for the client to pay
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                The cheapest option for you isn't always the easiest option
                for the client. Choose the payment arrangement together before
                issuing the invoice. For a deeper comparison of specific
                providers — Wise, Payoneer, PayPal, Stripe, and bank wires —
                see{" "}
                <Link to="/blog/best-payment-methods-for-international-freelancers">
                  our breakdown of the best payment methods for international freelancers
                </Link>
                .
              </p>
            </>
          ),
        },

        {
          h: "5. Give every invoice a unique number",
          body: (
            <>
              <p>
                Use a consistent invoice numbering system so you can identify
                payments and follow up on outstanding invoices.
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>INV-2026-001</li>
                <li>INV-2026-002</li>
                <li>INV-2026-003</li>
              </ul>

              <p>
                Keep a record of the invoice number, client, amount, currency,
                issue date, due date, and payment status.
              </p>
            </>
          ),
        },

        {
          h: "6. Describe your freelance services clearly",
          body: (
            <>
              <p>
                Avoid vague descriptions such as{" "}
                <strong>"Freelance work — $500."</strong>
              </p>

              <p>
                Instead, make the invoice clear enough that the client can
                understand exactly what they are paying for.
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Responsive website development — $600 USD</li>
                <li>Website testing and optimization — $150 USD</li>
                <li>Final agreed revisions — $100 USD</li>
              </ul>

              <p>
                For larger projects, list milestones or deliverables instead
                of putting the entire project into one vague line item.
              </p>
            </>
          ),
        },

        {
          h: "7. Set a clear payment deadline",
          body: (
            <>
              <p>
                Give the client a specific payment deadline. Avoid vague
                phrases such as "pay soon."
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Due on receipt</li>
                <li>Net 7</li>
                <li>Net 14</li>
                <li>Net 30</li>
              </ul>

              <p>
                Use the payment term you agreed to with the client. Don't
                introduce a different deadline when you send the invoice.
              </p>

              <p>
                A clear due date also makes follow-ups easier because you can
                refer to a specific date.
              </p>
            </>
          ),
        },

        {
          h: "8. Consider deposits and milestone payments",
          body: (
            <>
              <p>
                For larger projects, you don't necessarily need to wait until
                final delivery before requesting payment.
              </p>

              <p>
                A deposit or milestone structure can reduce unpaid work and
                improve cash flow.
              </p>

              <p>For example:</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>30% before work begins</li>
                <li>40% after an agreed milestone</li>
                <li>30% on final delivery</li>
              </ul>

              <p>
                The exact structure should be agreed with the client before
                the project begins.
              </p>
            </>
          ),
        },

        {
          h: "9. Use a simple currency-risk clause",
          body: (
            <>
              <p>
                If you invoice in a currency different from your normal
                business currency, document how payment and conversion will be
                handled.
              </p>

              <div className="rounded-2xl border bg-secondary/40 p-5">
                <p className="text-sm italic">
                  "The project fee will be invoiced in USD. Payment will be
                  made in USD. Any conversion or receiving charges applied by
                  the client's payment provider or bank are the responsibility
                  of the payer unless otherwise agreed in writing."
                </p>
              </div>

              <p>
                Adapt any contract language to your actual agreement and local
                requirements. The purpose is simply to remove ambiguity before
                payment is due.
              </p>
            </>
          ),
        },

        {
          h: "10. Check tax and VAT requirements",
          body: (
            <>
              <p>
                International invoicing can involve tax or VAT considerations,
                but there isn't one rule that applies to every freelancer and
                every international client.
              </p>

              <p>
                The relevant treatment can depend on your country, the client's
                country, whether the client is a business or individual, the
                service being provided, and your registration status.
              </p>

              <p>
                Before adding or removing tax from an international invoice,
                check the rules that apply to your specific transaction.
              </p>

              <p>
                If you regularly work with overseas clients or your revenue is
                growing, professional local tax advice can be worthwhile.
              </p>
            </>
          ),
        },

        {
          h: "For freelancers in Pakistan working with international clients",
          body: (
            <>
              <p>
                If you're based in Pakistan and work with overseas clients,
                your invoicing workflow has an additional practical
                consideration: keeping clear records of your foreign-currency
                invoices and payments.
              </p>

              <p>
                Keep copies of invoices, payment confirmations, client
                agreements, and relevant transaction records. Tax and
                reporting requirements can depend on your particular situation,
                so don't assume that one international-invoicing rule applies
                to every Pakistani freelancer.
              </p>

              <p>Your practical workflow can be:</p>

              <ol className="list-decimal space-y-2 pl-5">
                <li>Agree on the project and currency.</li>
                <li>Issue a numbered invoice.</li>
                <li>Record the payment method and expected amount.</li>
                <li>Keep the payment confirmation when funds arrive.</li>
                <li>Record the actual amount received.</li>
                <li>Keep supporting documentation together.</li>
              </ol>

              <p>
                For country-specific tax treatment, use current local guidance
                or consult a qualified professional.
              </p>
            </>
          ),
        },

        {
          h: "For freelancers in the United States working with international clients",
          body: (
            <>
              <p>
                If you're a U.S.-based freelancer working with clients in
                other countries, the invoice itself can look very similar to a
                domestic freelance invoice. The additional challenge is
                keeping your international payments, currencies, expenses,
                and records organized.
              </p>

              <p>
                If you operate as an independent contractor or other
                self-employed person, your freelance income can create U.S.
                tax obligations. Your exact tax treatment depends on your
                circumstances, so an international client does not automatically
                mean that the income is outside the U.S. tax system.
              </p>

              <h3>What should a U.S. freelancer keep?</h3>

              <p>
                Keep your invoice and supporting records together rather than
                treating the payment confirmation as your only record.
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Client agreement or statement of work</li>
                <li>Invoice number and invoice date</li>
                <li>Amount invoiced and currency</li>
                <li>Payment confirmation</li>
                <li>Amount actually received</li>
                <li>Payment-provider or bank fees</li>
                <li>Business expenses related to the project</li>
                <li>Relevant tax documents received from clients or platforms</li>
              </ul>

              <h3>What about estimated taxes?</h3>

              <p>
                Self-employed people may need to make estimated tax payments
                during the year. The requirement depends on the individual's
                tax situation.
              </p>

              <p>
                Don't use the amount on your international invoice as a
                substitute for calculating your actual tax position. Business
                expenses, total income, deductions, filing status, and other
                circumstances can affect what you ultimately owe.
              </p>

              <h3>U.S. freelancer workflow</h3>

              <ol className="list-decimal space-y-2 pl-5">
                <li>Agree on the project price and currency.</li>
                <li>Send a numbered invoice.</li>
                <li>Record the payment when it arrives.</li>
                <li>Record payment-provider or bank fees.</li>
                <li>Keep business expense records.</li>
                <li>Set aside money for taxes based on your situation.</li>
                <li>Reconcile the invoice with the actual payment.</li>
              </ol>

              <p>
                For complicated cross-border situations, get advice based on
                your specific circumstances rather than relying on a generic
                invoice guide.
              </p>
            </>
          ),
        },

        {
          h: "11. What if an international client pays late?",
          body: (
            <>
              <p>
                First, check that the invoice was actually received and that
                the payment instructions were correct.
              </p>

              <p>
                Then send a short professional reminder containing the invoice
                number, outstanding amount, original due date, and requested
                payment date.
              </p>

              <p>
                If your agreement contains a late-payment clause, follow the
                terms you agreed to rather than inventing a new charge after
                the fact.
              </p>

              <p>
                Use our{" "}
                <Link to="/tools/invoice-late-fee-calculator">
                  Invoice Late Fee Calculator
                </Link>{" "}
                to estimate a potential late fee based on your agreed terms.
              </p>
            </>
          ),
        },

        {
          h: "12. Track how long international payments actually take",
          body: (
            <>
              <p>
                The invoice due date and the date money becomes available to
                you aren't necessarily the same thing.
              </p>

              <p>
                Track when invoices are issued, when they become due, and when
                payments actually arrive. After several projects, you'll have
                useful information about your real client payment cycle.
              </p>

              <p>
                Use our{" "}
                <Link to="/tools/days-to-invoice-payment-calculator">
                  Days to Invoice Payment Calculator
                </Link>{" "}
                to model payment timing and think about your cash-flow needs.
              </p>
            </>
          ),
        },

        {
          h: "13. Keep a record of every international invoice",
          body: (
            <>
              <p>
                Once you have multiple international clients, don't rely on
                memory.
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Invoice number</li>
                <li>Client</li>
                <li>Invoice amount</li>
                <li>Currency</li>
                <li>Invoice date</li>
                <li>Due date</li>
                <li>Payment method</li>
                <li>Payment status</li>
                <li>Date payment was received</li>
              </ul>

              <p>
                Good records make overdue follow-ups easier and help you
                understand your actual international freelance cash flow.
              </p>
            </>
          ),
        },

        {
          h: "The 60-second international invoice audit",
          body: (
            <>
              <p>Before clicking send, answer these eight questions:</p>

              <ol className="list-decimal space-y-2 pl-5">
                <li>Is the client's billing name correct?</li>
                <li>Are your own details correct?</li>
                <li>Is the currency explicitly written?</li>
                <li>Does the amount match the agreement?</li>
                <li>Is the due date unambiguous?</li>
                <li>Does the payment method work for both countries?</li>
                <li>Have payment and conversion fees been discussed?</li>
                <li>Can you identify this invoice six months from now?</li>
              </ol>

              <p>
                If all eight answers are yes, you've removed most of the basic
                ambiguities that can slow down an international payment.
              </p>
            </>
          ),
        },

        {
          h: "When you should not send the invoice yet",
          body: (
            <>
              <p>
                Don't rush to invoice simply because the work is finished if
                the commercial terms are still unclear.
              </p>

              <p>Pause and clarify if:</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>The client hasn't confirmed the final amount.</li>
                <li>The invoice currency wasn't agreed.</li>
                <li>The payment method is unclear.</li>
                <li>The client hasn't provided required billing information.</li>
                <li>You're unsure who is responsible for payment charges.</li>
                <li>The project's final scope is disputed.</li>
              </ul>

              <p>
                Five minutes of clarification before sending can prevent much
                more expensive payment problems later.
              </p>
            </>
          ),
        },

        {
          h: "International freelance invoice checklist",
          body: (
            <>
              <p>Before sending an international invoice, check:</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Client name and billing information are correct</li>
                <li>Your details are correct</li>
                <li>Invoice number is unique</li>
                <li>Invoice date is included</li>
                <li>Due date is clear</li>
                <li>Services are described clearly</li>
                <li>Amounts are correct</li>
                <li>Currency is explicitly stated</li>
                <li>Payment method is clear</li>
                <li>Payment fees have been discussed</li>
                <li>Relevant tax requirements have been checked</li>
                <li>Invoice matches the client agreement</li>
              </ul>
            </>
          ),
        },

        {
          h: "Common international invoicing mistakes",
          body: (
            <>
              <p>Avoid these common mistakes:</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Writing a currency symbol without specifying the currency
                </li>
                <li>Agreeing on payment terms only verbally</li>
                <li>Ignoring currency conversion costs</li>
                <li>Providing incomplete payment instructions</li>
                <li>Forgetting the invoice due date</li>
                <li>Adding unexpected fees after the project</li>
                <li>Failing to track overdue invoices</li>
                <li>Assuming tax treatment is identical across countries</li>
                <li>Waiting too long before following up</li>
              </ul>
            </>
          ),
        },

        {
          h: "Frequently asked questions",
          body: (
            <>
              <h3>How do I invoice an international client?</h3>
              <p>
                Create a professional invoice containing your details, the
                client's details, invoice number, services, amount, currency,
                due date, payment terms, and payment instructions. Make sure
                the invoice matches the agreement you made with the client.
              </p>

              <h3>Can I invoice an international client in USD?</h3>
              <p>
                Yes, if you and the client agree to use USD and your chosen
                payment arrangement supports receiving it.
              </p>

              <h3>What currency should freelancers use for international clients?</h3>
              <p>
                Use the currency agreed with the client. USD, EUR, and GBP are
                common choices, but the appropriate currency depends on your
                agreement and payment arrangement.
              </p>

              <h3>How do I receive payment from an international client?</h3>
              <p>
                Use a payment method available in both countries and compare
                its fees, exchange rates, supported currencies, transfer speed,
                and convenience before choosing it.
              </p>

              <h3>How can I reduce international invoice fees?</h3>
              <p>
                Compare transaction charges, exchange rates, conversion fees,
                withdrawal costs, and transfer methods before choosing how to
                receive payment.
              </p>

              <h3>What payment terms should freelancers use?</h3>
              <p>
                Common terms include due on receipt, Net 7, Net 14, and Net
                30. Choose a term that fits your agreement and clearly display
                the resulting due date.
              </p>

              <h3>Should I charge a late fee?</h3>
              <p>
                If you use a late fee, it should be clearly communicated and
                agreed according to the terms applicable to your transaction.
                Local rules can affect what is permitted.
              </p>

              <h3>What happens if an international client doesn't pay?</h3>
              <p>
                Confirm receipt of the invoice, check the payment instructions,
                send a professional reminder, and follow the payment and
                late-payment terms in your agreement.
              </p>

              <h3>Do international freelance invoices need tax or VAT?</h3>
              <p>
                Not every international invoice is treated the same way. Tax
                or VAT requirements depend on the countries involved, the
                customer, the service, and your circumstances.
              </p>

              <h3>How do U.S. freelancers invoice international clients?</h3>
              <p>
                U.S. freelancers can use the same basic professional invoice
                structure: identify both parties, describe the services, state
                the amount and currency, give a due date, and provide payment
                instructions. Keep supporting records for your income and
                expenses.
              </p>

              <h3>
                Does a U.S. freelancer pay tax on income from foreign clients?
              </h3>
              <p>
                U.S. citizens and residents generally have U.S. tax
                obligations on their self-employment income, including income
                from international clients. Specific international situations
                can have additional rules.
              </p>

              <h3>Do U.S. freelancers have to pay estimated taxes?</h3>
              <p>
                A self-employed person may need to make estimated tax payments
                during the year. The requirement depends on the individual's
                tax situation.
              </p>

              <h3>
                Should freelancers in Pakistan keep records of international
                payments?
              </h3>
              <p>
                Yes. Keep invoices, client agreements, payment confirmations,
                and relevant transaction records together. Specific tax and
                reporting requirements depend on your circumstances.
              </p>
            </>
          ),
        },

        {
          h: "Final takeaway",
          body: (
            <>
              <p>
                International invoicing doesn't need to be complicated. The
                key is to remove uncertainty before the invoice is sent.
              </p>

              <p>
                Agree on the price, currency, payment method, fees, payment
                schedule, and deadline before beginning the work. Then make
                every one of those details obvious on the invoice.
              </p>

              <p>
                Most importantly, don't confuse the invoice amount with your
                actual proceeds. Payment costs, conversion, and timing can all
                affect your real freelance cash flow.
              </p>

              <p>
                Use our{" "}
                <Link to="/tools/currency-adjusted-rate-calculator">
                  Currency-Adjusted Rate Calculator
                </Link>
                ,{" "}
                <Link to="/tools/invoice-late-fee-calculator">
                  Invoice Late Fee Calculator
                </Link>
                , and{" "}
                <Link to="/tools/days-to-invoice-payment-calculator">
                  Days to Invoice Payment Calculator
                </Link>{" "}
                to turn the ideas in this guide into practical numbers.
              </p>

              <div className="rounded-2xl border bg-secondary/40 p-5">
                <p className="font-semibold">
                  Freelance Money Hub principle
                </p>

                <p className="mt-2 text-sm">
                  Don't optimize only for the amount you invoice. Optimize for
                  the amount you actually receive, the time it takes to receive
                  it, and how predictable that cash flow becomes.
                </p>
              </div>
            </>
          ),
        },
      ]}
      related={[
        "/tools/currency-adjusted-rate-calculator",
        "/tools/invoice-late-fee-calculator",
        "/tools/days-to-invoice-payment-calculator",
        "/blog/best-payment-methods-for-international-freelancers",
        "/guides/freelance-tax-basics-by-country",
      ]}
    />
  ),
});
