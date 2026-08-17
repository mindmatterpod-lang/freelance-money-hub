import { createFileRoute, Link } from "@tanstack/react-router";
import { GuideShell } from "./guides.how-to-set-your-freelance-rate";

export const Route = createFileRoute(
  "/guides/how-to-invoice-international-clients",
)({
  head: () => ({
    meta: [
      {
        title:
          "How to Invoice International Clients: Complete Freelancer Guide | Freelance Money Hub",
      },
      {
        name: "description",
        content:
          "Learn how to invoice international clients, choose the right currency, set payment terms, handle fees, and reduce payment problems with a professional invoice.",
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
      deck="A practical guide to creating international invoices, choosing a currency, setting payment terms, handling payment fees, and getting paid smoothly by clients in other countries."
      sections={[
        {
          h: "Quick answer: How do you invoice an international client?",
          body: (
            <>
              <p>
                To invoice an international client, create a professional
                invoice that clearly identifies you and your client, describes
                the services provided, states the amount and currency, gives a
                payment due date, and explains exactly how the client should
                pay.
              </p>

              <p>
                Before starting the project, agree on the price, invoice
                currency, payment schedule, payment method, and responsibility
                for transaction or currency-conversion fees.
              </p>

              <p>
                The goal is simple: your client should be able to answer five
                questions immediately — <strong>who is being paid, what are
                they paying for, how much do they owe, which currency applies,
                and when/how should they pay?</strong>
              </p>
            </>
          ),
        },

        {
          h: "What should an international freelance invoice include?",
          body: (
            <>
              <p>
                An international invoice should contain enough information for
                the client, accounting department, or payment provider to
                identify and process the payment without having to contact you
                for basic details.
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Your name or business name</li>
                <li>Your contact information</li>
                <li>Client or company name</li>
                <li>Client billing information</li>
                <li>A unique invoice number</li>
                <li>Invoice issue date</li>
                <li>Payment due date</li>
                <li>Clear description of your services</li>
                <li>Price for each service</li>
                <li>Total amount due</li>
                <li>Invoice currency</li>
                <li>Payment terms</li>
                <li>Payment instructions or payment link</li>
                <li>Any required tax or business information</li>
              </ul>

              <p>
                Your invoice should match the agreement you made with the
                client before the work started.
              </p>
            </>
          ),
        },

        {
          h: "1. Agree on the payment terms before starting",
          body: (
            <>
              <p>
                Many international payment problems are caused before the
                invoice is even created. Agree on the important payment
                details before you begin the project.
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
                Written agreement is especially useful when you are working
                across different countries and currencies.
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
                <strong>$750 USD</strong> instead of simply writing{" "}
                <strong>$750</strong>.
              </p>

              <p>
                USD, EUR, and GBP are common currencies for international
                freelance work, but the correct choice is the currency you and
                your client agreed to use.
              </p>

              <p>
                Remember that the amount shown on your invoice may not be the
                same amount that eventually reaches your bank account.
                Exchange-rate differences, conversion charges, and payment
                processing fees can reduce the amount you receive.
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
          h: "3. Give every invoice a unique number",
          body: (
            <>
              <p>
                Use a consistent numbering system so you can quickly identify
                invoices and match incoming payments to the correct client.
              </p>

              <p>For example:</p>

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
          h: "4. Describe your freelance services clearly",
          body: (
            <>
              <p>
                Avoid vague descriptions such as{" "}
                <strong>"Freelance work — $500"</strong>.
              </p>

              <p>
                Instead, make the invoice clear enough that the client can
                understand exactly what they are paying for.
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Responsive website development — $600 USD</li>
                <li>Website testing and optimization — $150 USD</li>
                <li>Final revisions — $100 USD</li>
              </ul>

              <p>
                For larger projects, consider listing milestones or individual
                deliverables instead of putting the entire project into one
                vague line item.
              </p>
            </>
          ),
        },

        {
          h: "5. Set a clear payment due date",
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
                Use the payment term you agreed to with the client. Do not
                introduce a different deadline when you send the invoice.
              </p>

              <p>
                A clear due date also makes follow-ups much easier because you
                can refer to a specific date rather than asking when the client
                plans to pay.
              </p>
            </>
          ),
        },

        {
          h: "6. Choose an international payment method",
          body: (
            <>
              <p>
                International payment methods can differ in fees, processing
                times, supported currencies, availability, and withdrawal
                options.
              </p>

              <p>Compare:</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Transaction fees</li>
                <li>Currency-conversion costs</li>
                <li>Transfer speed</li>
                <li>Supported countries</li>
                <li>Supported currencies</li>
                <li>Withdrawal options</li>
                <li>Ease of use for your client</li>
              </ul>

              <p>
                The cheapest option for you is not always the easiest option
                for your client. Choose a payment arrangement that both sides
                understand before the invoice is issued.
              </p>
            </>
          ),
        },

        {
          h: "7. Account for currency and payment fees",
          body: (
            <>
              <p>
                Receiving $1,000 from an international client does not
                necessarily mean $1,000 reaches your account.
              </p>

              <p>
                Depending on the payment arrangement, you may encounter
                transaction fees, currency conversion costs, intermediary-bank
                charges, or withdrawal fees.
              </p>

              <p>
                Decide before the project begins whether these costs are:
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>included in your quoted price,</li>
                <li>paid by the client, or</li>
                <li>shared according to your agreement.</li>
              </ul>

              <p>
                Do not surprise the client with a new fee after the work has
                been completed.
              </p>
            </>
          ),
        },

        {
          h: "8. Consider deposits and milestone payments",
          body: (
            <>
              <p>
                You do not always need to wait until a project is completely
                finished before sending an invoice.
              </p>

              <p>
                For larger projects, a deposit or milestone structure can
                reduce your exposure to unpaid work and improve cash flow.
              </p>

              <p>For example:</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>30% deposit before work begins</li>
                <li>40% after an agreed milestone</li>
                <li>30% on final delivery</li>
              </ul>

              <p>
                The exact structure should be agreed with your client before
                the project starts.
              </p>
            </>
          ),
        },

        {
          h: "9. What if an international client pays late?",
          body: (
            <>
              <p>
                First, check that the invoice was actually received and that
                the payment instructions were correct.
              </p>

              <p>
                Then send a short, professional reminder that includes the
                invoice number, original due date, outstanding amount, and
                requested payment date.
              </p>

              <p>
                If your agreement contains a late-payment clause, follow the
                terms you agreed to rather than inventing a new charge after
                the fact.
              </p>

              <p>
                You can use our{" "}
                <Link to="/tools/invoice-late-fee-calculator">
                  Invoice Late Fee Calculator
                </Link>{" "}
                to estimate a potential late fee based on your agreed terms.
              </p>
            </>
          ),
        },

        {
          h: "10. Keep track of international invoices",
          body: (
            <>
              <p>
                Once you have several clients, relying on memory becomes risky.
                Maintain a simple record of your invoices.
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
                This makes it easier to follow up on overdue invoices and
                understand your actual cash flow.
              </p>

              <p>
                Our{" "}
                <Link to="/tools/days-to-invoice-payment-calculator">
                  Days to Invoice Payment Calculator
                </Link>{" "}
                can help you think about how long client payments actually
                take to arrive.
              </p>
            </>
          ),
        },

        {
          h: "International invoice checklist",
          body: (
            <>
              <p>Before sending an international invoice, check:</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Client name is correct</li>
                <li>Your details are correct</li>
                <li>Invoice number is unique</li>
                <li>Invoice date is included</li>
                <li>Due date is clear</li>
                <li>Services are described clearly</li>
                <li>Amounts are correct</li>
                <li>Currency is clearly stated</li>
                <li>Payment method is clear</li>
                <li>Agreed fees are handled correctly</li>
                <li>Relevant tax requirements have been checked</li>
                <li>Invoice matches your client agreement</li>
              </ul>
            </>
          ),
        },

        {
          h: "Frequently asked questions",
          body: (
            <>
              <h3>Can I invoice an international client in USD?</h3>
              <p>
                Yes, if USD is the currency agreed with the client and your
                payment arrangement supports receiving USD.
              </p>

              <h3>How do I invoice a US client?</h3>
              <p>
                Agree on the price and currency, identify both parties,
                describe your services, state the amount and due date, and
                provide the agreed payment instructions.
              </p>

              <h3>How do I invoice a UK client?</h3>
              <p>
                Follow the same basic process: identify both parties, describe
                the services, state the agreed amount and currency, provide
                payment terms, and give clear payment instructions.
              </p>

              <h3>What currency should freelancers use?</h3>
              <p>
                Use the currency agreed with your client. USD, EUR, and GBP are
                common choices for international freelance work, but the best
                choice depends on your agreement and payment arrangement.
              </p>

              <h3>How can I reduce international invoice fees?</h3>
              <p>
                Compare transaction charges, exchange rates, conversion fees,
                withdrawal costs, and transfer methods before choosing how to
                receive payment. Also consider whether your pricing should
                account for unavoidable payment costs.
              </p>

              <h3>What should I do if an international client does not pay?</h3>
              <p>
                Confirm that the invoice was received, check the payment terms,
                and send a professional reminder referencing the invoice number
                and due date. Follow any late-payment process included in your
                agreement.
              </p>

              <h3>Should freelancers charge late fees?</h3>
              <p>
                A late fee should be based on the terms agreed with the client
                and the rules applicable to the transaction. If you use one,
                communicate it clearly before the client accepts the
                arrangement.
              </p>
            </>
          ),
        },

        {
          h: "Final takeaway",
          body: (
            <>
              <p>
                International invoicing does not need to be complicated. The
                key is to remove uncertainty before the invoice is sent.
              </p>

              <p>
                Make the client, services, amount, currency, due date, and
                payment method obvious. Agree on fees and payment terms before
                starting the project, then keep accurate records after the
                invoice is sent.
              </p>

              <p>
                For freelancers working with overseas clients, small
                differences in currency conversion and payment timing can add
                up over time.
              </p>

              <p>
                Use the{" "}
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
                to turn the concepts in this guide into practical numbers.
              </p>
            </>
          ),
        },
      ]}
      related={[
        "/tools/currency-adjusted-rate-calculator",
        "/tools/invoice-late-fee-calculator",
        "/tools/days-to-invoice-payment-calculator",
      ]}
    />
  ),
});
