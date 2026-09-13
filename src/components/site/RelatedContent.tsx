// Single source of truth for every tool, guide, and blog post on the site,
// plus a resolver so any page can link to any other page's card regardless
// of content type. Deliberately has NO imports from ToolShell / BlogShell —
// both of those import FROM here instead, to avoid a circular dependency.

export const ALL_TOOLS = [
  { to: "/tools/freelance-hourly-rate-calculator", title: "Freelance Hourly Rate Calculator", blurb: "Turn your target income into a rate that actually covers your business." },
  { to: "/tools/project-quote-calculator", title: "Project Quote Calculator", blurb: "Price fixed-bid projects with a built-in risk buffer and deposit." },
  { to: "/tools/invoice-late-fee-calculator", title: "Invoice Late Fee Calculator", blurb: "Calculate fair late fees and generate a reminder email." },
  { to: "/tools/self-employment-tax-estimator", title: "Self-Employment Tax Estimator", blurb: "Rough tax owed and how much to set aside per invoice." },
  { to: "/tools/currency-adjusted-rate-calculator", title: "Currency-Adjusted Rate", blurb: "See your real take-home after FX and payment platform fees." },
  { to: "/tools/annual-income-to-hourly-rate-calculator", title: "Salary → Freelance Hourly", blurb: "The hourly rate that actually matches your old day job salary." },
  { to: "/tools/freelance-profit-margin-calculator", title: "Freelance Profit Margin", blurb: "Gross margin, net margin, and break-even project count." },
  { to: "/tools/days-to-invoice-payment-calculator", title: "Cash Flow / Payment Date", blurb: "When each invoice actually lands, with overlap warnings." },
  { to: "/tools/freelance-day-rate-calculator", title: "Freelance Day Rate Calculator", blurb: "Convert your hourly rate into a defensible day rate." },
  { to: "/tools/retainer-pricing-calculator", title: "Monthly Retainer Calculator", blurb: "Price a retainer with the right hour block and discount." },
  { to: "/tools/rate-increase-calculator", title: "Rate Increase Calculator", blurb: "See the income impact of raising rates — even if clients leave." },
  { to: "/tools/payment-processing-fee-calculator", title: "Payment Fee Calculator", blurb: "What PayPal, Wise, Stripe and Payoneer really cost you." },
  { to: "/tools/vat-gst-invoice-calculator", title: "VAT / GST Invoice Calculator", blurb: "Add or strip VAT/GST and get a clean invoice breakdown." },
  { to: "/tools/scope-creep-cost-calculator", title: "Scope Creep Cost Calculator", blurb: "Price the 'quick extra' before you agree to it." },
  { to: "/tools/freelance-emergency-fund-calculator", title: "Emergency Fund Calculator", blurb: "How much runway you need before slow months hurt." },
  { to: "/tools/client-discount-calculator", title: "Discount Impact Calculator", blurb: "How many extra hours a 'small' discount really costs." },
  { to: "/tools/billable-utilization-rate-calculator", title: "Billable Utilization Calculator", blurb: "What share of your week is actually earning money." },
] as const;

export type ToolKey = (typeof ALL_TOOLS)[number]["to"];

// Guides had no central registry before this — each of the 4 guide route
// files only knew its own title. Centralizing them here is what makes
// cross-type "related" links (tool <-> guide <-> post) possible at all.
export const ALL_GUIDES = [
  {
    to: "/guides/how-to-set-your-freelance-rate",
    title: "How to Set Your Freelance Rate: A Complete Guide",
    blurb: "Calculate a rate that covers your income goal, expenses, taxes, non-billable time and profit.",
  },
  {
    to: "/guides/how-to-invoice-international-clients",
    title: "How to Invoice International Clients as a Freelancer",
    blurb: "Currency, payment method, fees and terms — a full international invoicing system.",
  },
  {
    to: "/guides/freelance-tax-basics-by-country",
    title: "Freelance Tax Rate: How Much Do Freelancers Pay?",
    blurb: "Income tax, self-employment contributions, and country-specific rules explained.",
  },
  {
    to: "/guides/how-to-price-a-fixed-bid-project",
    title: "Fixed Bid vs. Hourly: How to Price Any Freelance Project",
    blurb: "Price fixed-bid work without giving away your margin — and when to use each model.",
  },
] as const;

export type GuideKey = (typeof ALL_GUIDES)[number]["to"];

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  readMins: number;
  category: string;
}

export const ALL_POSTS: BlogPostMeta[] = [
  { slug: "how-much-should-a-freelancer-charge-per-hour", title: "How Much Should a Freelancer Charge Per Hour in 2026?", excerpt: "Benchmark ranges by discipline, and the arithmetic that turns a target income into an hourly number you can defend.", readMins: 8, category: "Pricing" },
  { slug: "freelance-rate-negotiation-scripts", title: "12 Freelance Rate Negotiation Scripts That Actually Work", excerpt: "Word-for-word replies for 'that's out of budget', 'can you do it cheaper', and the silent client.", readMins: 9, category: "Negotiation" },
  { slug: "how-to-raise-your-rates-with-existing-clients", title: "How to Raise Your Rates With Existing Clients (Without Losing Them)", excerpt: "The timing, the email, and the maths that prove a rate rise wins even when some clients walk.", readMins: 7, category: "Pricing" },
  { slug: "hourly-vs-fixed-price-vs-value-based-pricing", title: "Hourly vs Fixed Price vs Value-Based Pricing: Which Is Right for You?", excerpt: "A practical comparison of the three pricing models, with the risk each one shifts onto you.", readMins: 8, category: "Pricing" },
  { slug: "how-to-get-clients-to-pay-on-time", title: "How to Get Clients to Pay On Time: A Freelancer's System", excerpt: "Deposits, terms, reminders and late fees — the boring system that fixes most cash-flow pain.", readMins: 7, category: "Cash flow" },
  { slug: "freelance-tax-deductions-checklist", title: "The Freelance Tax Deductions Checklist Most People Miss", excerpt: "Home office, software, equipment, travel, training — what typically qualifies and how to keep records.", readMins: 9, category: "Tax" },
  { slug: "how-to-avoid-scope-creep", title: "How to Avoid Scope Creep (And What to Say When It Happens)", excerpt: "Why scope creep is a pricing failure, not a client failure — and the change-order language that stops it.", readMins: 7, category: "Client work" },
  { slug: "best-payment-methods-for-international-freelancers", title: "Best Payment Methods for International Freelancers", excerpt: "Wise, Payoneer, PayPal, Stripe and bank wires compared on real cost, speed and coverage.", readMins: 8, category: "Payments" },
  { slug: "freelance-emergency-fund-how-much", title: "How Big Should a Freelancer's Emergency Fund Be?", excerpt: "Runway maths for irregular income, and where to keep the money so you actually leave it alone.", readMins: 6, category: "Money" },
  { slug: "freelance-retainers-explained", title: "Freelance Retainers Explained: Pricing, Scope and Contracts", excerpt: "How to structure a retainer so it's predictable income for you and obvious value for the client.", readMins: 8, category: "Pricing" },
];

export type BlogKey = `/blog/${(typeof ALL_POSTS)[number]["slug"]}`;

// A related link can point at any content type. Existing call sites that
// only ever passed ToolKey[] keep type-checking unchanged.
export type RelatedKey = ToolKey | GuideKey | BlogKey | (string & {});

export interface RelatedItem {
  to: string;
  title: string;
  blurb: string;
  kind: "Tool" | "Guide" | "Article";
  cta: string;
}

/** Look up display info for a list of related paths, regardless of whether
 * each one points at a tool, a guide, or a blog post. Unknown paths are
 * silently dropped rather than crashing a page over a typo. */
export function resolveRelated(paths: readonly string[]): RelatedItem[] {
  return paths
    .map((path): RelatedItem | null => {
      const tool = ALL_TOOLS.find((t) => t.to === path);
      if (tool) return { ...tool, kind: "Tool", cta: "Open tool" };

      const guide = ALL_GUIDES.find((g) => g.to === path);
      if (guide) return { ...guide, kind: "Guide", cta: "Read guide" };

      const post = ALL_POSTS.find((p) => `/blog/${p.slug}` === path);
      if (post) {
        return { to: `/blog/${post.slug}`, title: post.title, blurb: post.excerpt, kind: "Article", cta: "Read article" };
      }

      return null;
    })
    .filter((item): item is RelatedItem => item !== null);
}
