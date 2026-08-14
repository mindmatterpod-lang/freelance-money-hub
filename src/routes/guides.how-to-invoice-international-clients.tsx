import { createFileRoute, Link } from "@tanstack/react-router";
import { GuideShell } from "./guides.how-to-set-your-freelance-rate";

export const Route = createFileRoute(
  "/guides/how-to-invoice-international-clients",
)({
  head: () => ({
    meta: [
      {
        title:
          "How to Invoice International Clients | Freelance Money Hub",
      },
      {
        name: "description",
        content:
          "Learn how to invoice international clients as a freelancer, including invoice examples, currencies, payment terms, fees, late payments, and practical tips.",
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
      deck="Learn how to create, send, and manage professional international invoices, including currencies, payment terms, payment fees, late payments, and invoice examples."
      sections={[
        {
          h: "Quick answer: How do you invoice an international client?",
          body: (
            <>
              <p>
                To invoice an international client, create a clear invoice
                that identifies both you and your client, describes the work
                completed, states the amount and currency, gives a payment due
                date, and explains how the client should pay.
              </p>

              <p>
                Before sending the invoice, agree with your client on the
                project price, currency, payment schedule, payment method, and
                any applicable fees or taxes. Keeping these details clear from
                the beginning can prevent payment problems later.
              </p>
            </>
          ),
        },

        {
          h: "What should an international freelance invoice include?",
          body: (
            <>
              <p>
                A professional international invoice should make it easy for
                your client to understand exactly what they are paying for.
              </p>

              <ul>
                <li>Your name or business name</li>
                <li>Your appropriate contact information</li>
                <li>Client or company name</li>
                <li>Client contact or billing information</li>
                <li>A unique invoice number</li>
                <li>Invoice issue date</li>
                <li>Payment due date</li>
                <li>A clear description of your services</li>
                <li>Price for each service</li>
                <li>Total amount due</li>
                <li>Currency, such as USD, EUR, or GBP</li>
                <li>Agreed payment terms</li>
                <li>Payment instructions or payment link</li>
                <li>Relevant project or purchase-order information, if required</li>
              </ul>

              <p>
                The exact information required can vary depending on your
                country, business structure, client, and the type of service
                you provide.
              </p>
            </>
          ),
        },

        {
          h: "1. Agree on payment terms before starting the project",
          body: (
            <>
              <p>
                The easiest way to avoid invoice disputes is to agree on the
                important payment details before you begin the work.
              </p>

              <p>Discuss:</p>

              <ul>
                <li>Total project price or hourly rate</li>
                <li>Invoice currency</li>
                <li>Deposit or upfront payment</li>
                <li>Milestone payments</li>
                <li>Final payment</li>
                <li>Payment deadline</li>
                <li>Accepted payment method</li>
                <li>Responsibility for transaction or conversion fees</li>
                <li>Any agreed late-payment terms</li>
              </ul>

              <p>
                For larger projects, milestone payments can reduce the amount
                of unpaid work you have completed before receiving payment.
              </p>
            </>
          ),
        },

        {
          h: "2. Choose the invoice currency",
          body: (
            <>
              <p>
                Always make the currency obvious on the invoice. For example,
                write <strong>$750 USD</strong> instead of simply writing
                <strong>$750</strong>.
              </p>

              <p>
                The currency should be agreed with the client before the
                invoice is issued. Common currencies for international
                freelance work include USD, EUR, and GBP, although the best
                choice depends on the client and payment arrangement.
              </p>

              <p>
                If your receiving account uses another currency, remember that
                the amount you ultimately receive can be affected by exchange
                rates and payment-provider or banking fees.
              </p>

              <p>
                Before setting your final price, you can estimate the effect of
                currency conversion with our{" "}
                <Link to="/tools/currency-adjusted-rate-calculator">
                  Currency-Adjusted Rate Calculator
                </Link>
                .
              </p>
            </>
          ),
        },

        {
          h: "3. Give every invoice a unique number",
          body: (
            <>
              <p>
                Use a consistent invoice numbering system so you can easily
                track payments and communicate with clients.
              </p>

              <p>
                For example:
              </p>

              <ul>
                <li>INV-2026-001</li>
                <li>INV-2026-002</li>
                <li>INV-2026-003</li>
              </ul>

              <p>
                A unique invoice number also makes it easier for a client to
                reference the correct payment when contacting you.
              </p>
            </>
          ),
        },

        {
          h: "4. Describe your services clearly",
          body: (
            <>
              <p>
                Avoid vague invoice descriptions such as
                <strong> "Freelance work — $500"</strong>.
              </p>

              <p>
                Instead, describe what the client is paying for. For example:
              </p>

              <ul>
                <li>Responsive website development — $600 USD</li>
                <li>Website testing and optimization — $150 USD</li>
                <li>Final revisions — $100 USD</li>
              </ul>

              <p>
                Clear descriptions reduce confusion and make it easier for a
                client or accounts department to approve the invoice.
              </p>
            </>
          ),
        },

        {
          h: "5. Set a clear payment due date",
          body: (
            <>
              <p>
                Give your client a specific payment deadline instead of using
                vague wording such as "pay soon."
              </p>

              <p>Common payment terms include:</p>

              <ul>
                <li>Due on receipt</li>
                <li>Net 7</li>
                <li>Net 14</li>
                <li>Net 30</li>
              </ul>

              <p>
                For example, if your agreed terms are Net 14, clearly show the
                applicable due date on the invoice.
              </p>

              <p>
                The payment term should match what you and your client agreed
                before the work or billing period began.
              </p>
            </>
          ),
        },

        {
          h: "6. Choose an international payment method",
          body: (
            <>
              <p>
                Different payment methods can have different fees, processing
                times, supported currencies, and availability by country.
              </p>

              <p>When comparing payment methods, consider:</p>

              <ul>
                <li>Transaction fees</li>
                <li>Currency-conversion costs</li>
                <li>Transfer speed</li>
                <li>Supported countries</li>
                <li>Supported currencies</li>
                <li>Withdrawal options</li>
                <li>Convenience for your client</li>
              </ul>

              <p>
                The cheapest option is not necessarily the best option if it is
                difficult for your client to use. Choose a payment arrangement
                that works for both sides.
              </p>
            </>
          ),
        },

        {
          h: "7. Understand international payment and currency fees",
          body: (
            <>
              <p>
                The amount shown on your invoice is not always the exact amount
                that will arrive in your account.
              </p>

              <p>
                Depending on the payment arrangement, your payment may be
                affected by:
              </p>

              <ul>
                <li>Payment-processing fees</li>
                <li>Currency-conversion costs</li>
                <li>Bank charges</li>
                <li>Transfer fees</li>
              </ul>

              <p>
                If you expect the client to cover a specific fee, agree on that
                before the invoice is sent. Avoid adding unexpected charges
                after the client has already accepted the project price.
              </p>
            </>
          ),
        },

        {
          h: "8. International freelance invoice example",
          body: (
            <>
              <p>
                Here is a simple example of how an international freelance
                invoice could be structured:
              </p>

              <div
                style={{
                  border: "1px solid var(--border, #e5e7eb)",
                  borderRadius: "16px",
                  padding: "24px",
                  margin: "20px 0",
                  background: "var(--card, #ffffff)",
                }}
              >
                <h3>INVOICE</h3>

                <p>
                  <strong>Invoice #:</strong> INV-2026-001
                  <br />
                  <strong>Issue Date:</strong> August 15, 2026
                  <br />
                  <strong>Due Date:</strong> August 29, 2026
                </p>

                <hr />

                <p>
                  <strong>From</strong>
                  <br />
                  Alex Khan
                  <br />
                  Freelance Web Developer
                  <br />
                  Pakistan
                </p>

                <p>
                  <strong>Bill To</strong>
                  <br />
                  Example Client LLC
                  <br />
                  United States
                </p>

                <hr />

                <p>
                  <strong>Website Development</strong>
                  <br />
                  Responsive business website development — $600 USD
                </p>

                <p>
                  <strong>Testing & Optimization</strong>
                  <br />
                  Cross-browser testing and final optimization — $150 USD
                </p>

                <p>
                  <strong>Total: $750 USD</strong>
                </p>

                <p>
                  <strong>Payment Terms:</strong> Net 14
                  <br />
                  <strong>Currency:</strong> USD
                  <br />
                  <strong>Reference:</strong> INV-2026-001
                </p>
              </div>

              <p>
                The exact format of an invoice can vary, but the goal is always
                the same: make the payer, services, amount, currency, deadline,
                and payment instructions easy to identify.
              </p>
            </>
          ),
        },

        {
          h: "9. What if an international client pays late?",
          body: (
            <>
              <p>
                If a client misses the payment deadline, first check the
                payment terms you agreed upon.
              </p>

              <p>A professional follow-up process is:</p>

              <ol>
                <li>Confirm that the invoice was received.</li>
                <li>Check that the payment instructions were correct.</li>
                <li>Send a polite payment reminder.</li>
                <li>Reference the invoice number and original due date.</li>
                <li>Ask whether the client needs anything from you.</li>
                <li>Follow any late-payment terms that were previously agreed.</li>
              </ol>

              <p>
                If you use late fees, make the terms clear before the client
                accepts the project or payment agreement. Whether a particular
                fee is appropriate can depend on the agreement and applicable
                rules.
              </p>

              <p>
                Need to calculate a potential late fee? Use our{" "}
                <Link to="/tools/invoice-late-fee-calculator">
                  Freelance Invoice Late Fee Calculator
                </Link>
                .
              </p>
            </>
          ),
        },

        {
          h: "10. Should you ask for a deposit?",
          body: (
            <>
              <p>
                For larger projects, a deposit or milestone-based payment
                schedule can reduce the amount of unpaid work you complete
                before receiving payment.
              </p>

              <p>A project could, for example, be divided into:</p>

              <ul>
                <li>Project start payment</li>
                <li>Milestone payment</li>
                <li>Final delivery payment</li>
              </ul>

              <p>
                The exact structure should be agreed with the client before
                work begins.
              </p>
            </>
          ),
        },

        {
          h: "11. International invoicing from Pakistan",
          body: (
            <>
              <p>
                Pakistani freelancers working with international clients can
                use the same core invoicing principles: agree on the price and
                currency, identify both parties, describe the services, state
                payment terms, provide payment instructions, and keep accurate
                records.
              </p>

              <p>
                However, tax, banking, foreign-exchange, and reporting
                requirements can depend on your circumstances and may change
                over time.
              </p>

              <p>
                For tax or regulatory decisions, check current information from
                the relevant authorities or speak with a qualified professional
                rather than relying on a general online guide.
              </p>
            </>
          ),
        },

        {
          h: "12. Common international invoicing mistakes",
          body: (
            <>
              <h3>Not specifying the currency</h3>
              <p>
                "$500" can be ambiguous. "$500 USD" is much clearer.
              </p>

              <h3>Using vague service descriptions</h3>
              <p>
                Explain exactly what the client is being charged for.
              </p>

              <h3>Forgetting the due date</h3>
              <p>
                Give your client a specific payment deadline.
              </p>

              <h3>Adding unexpected fees</h3>
              <p>
                Discuss payment and currency-conversion fees before the
                project begins.
              </p>

              <h3>Not tracking invoices</h3>
              <p>
                Keep records of invoice numbers, clients, amounts, currencies,
                dates, due dates, and payment status.
              </p>

              <h3>Ignoring overdue invoices</h3>
              <p>
                Follow up professionally when an invoice becomes overdue
                instead of letting it remain unresolved.
              </p>
            </>
          ),
        },

        {
          h: "International invoice checklist",
          body: (
            <>
              <p>Before sending your invoice, check each item:</p>

              <ul>
                <li>✓ Client name is correct</li>
                <li>✓ Your details are correct</li>
                <li>✓ Invoice number is unique</li>
                <li>✓ Invoice date is included</li>
                <li>✓ Due date is clear</li>
                <li>✓ Services are described clearly</li>
                <li>✓ Amounts are correct</li>
                <li>✓ Currency is clearly stated</li>
                <li>✓ Payment method is clear</li>
                <li>✓ Agreed fees are handled correctly</li>
                <li>✓ Relevant tax considerations have been checked</li>
                <li>✓ Invoice matches your client agreement</li>
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
                Yes, if USD is the currency agreed with the client and the
                chosen payment arrangement supports it.
              </p>

              <h3>How do I invoice a US client?</h3>
              <p>
                Agree on the price and currency, identify the client, describe
                your services, state the amount and due date, and provide the
                agreed payment instructions.
              </p>

              <h3>How do I invoice a UK client?</h3>
              <p>
                Use the same basic process: identify both parties, describe the
                services, state the agreed currency and amount, provide payment
                terms, and give clear payment instructions. Check any applicable
                tax requirements for your circumstances.
              </p>

              <h3>What currency should freelancers use?</h3>
              <p>
                Use the currency agreed with your client. USD, EUR, and GBP are
                common choices, but the appropriate currency depends on your
                agreement and payment arrangement.
              </p>

              <h3>What should I do if an international client does not pay?</h3>
              <p>
                Check the agreed payment terms, confirm that the invoice was
                received, and send a professional reminder referencing the
                invoice number and due date.
              </p>

              <h3>Should freelancers charge late fees?</h3>
              <p>
                A late fee should be agreed appropriately and should be
                consistent with the applicable agreement and rules. If you use
                one, make the terms clear before the client accepts the
                arrangement.
              </p>

              <h3>How can I calculate a freelance invoice late fee?</h3>
              <p>
                You can use the{" "}
                <Link to="/tools/invoice-late-fee-calculator">
                  Freelance Money Hub Invoice Late Fee Calculator
                </Link>{" "}
                to estimate a late fee based on your inputs.
              </p>

              <h3>Can I invoice before completing a project?</h3>
              <p>
                Yes. If your agreement includes a deposit, milestone payment,
                retainer, or advance payment, you can invoice according to the
                agreed payment schedule.
              </p>

              <h3>Should I include taxes on an international invoice?</h3>
              <p>
                Tax treatment depends on your country, the client's country,
                your business structure, and the type of service. Do not assume
                that every international invoice has the same tax treatment.
              </p>
            </>
          ),
        },

        {
          h: "Related Freelance Money Hub tools",
          body: (
            <>
              <p>
                Use these tools alongside your international invoicing
                workflow:
              </p>

              <ul>
                <li>
                  <Link to="/tools/invoice-late-fee-calculator">
                    Invoice Late Fee Calculator
                  </Link>{" "}
                  — estimate a potential late-payment fee.
                </li>

                <li>
                  <Link to="/tools/currency-adjusted-rate-calculator">
                    Currency-Adjusted Rate Calculator
                  </Link>{" "}
                  — account for currency conversion when planning your rate.
                </li>

                <li>
                  <Link to="/tools/days-to-invoice-payment-calculator">
                    Days to Invoice Payment Calculator
                  </Link>{" "}
                  — estimate payment timing for cash-flow planning.
                </li>
              </ul>
            </>
          ),
        },

        {
          h: "Final takeaway",
          body: (
            <>
              <p>
                International invoicing becomes much easier when the important
                details are agreed before the project starts.
              </p>

              <p>
                Your invoice should make five things immediately clear:
              </p>

              <ol>
                <li>Who is paying?</li>
                <li>What are they paying for?</li>
                <li>How much do they owe?</li>
                <li>Which currency applies?</li>
                <li>When and how should they pay?</li>
              </ol>

              <p>
                Keep your invoices organized, make payment instructions easy to
                follow, and track overdue payments consistently.
              </p>

              <p>
                If a client has already missed a payment deadline, calculate a
                potential late fee with our{" "}
                <Link to="/tools/invoice-late-fee-calculator">
                  Invoice Late Fee Calculator
                </Link>
                .
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
