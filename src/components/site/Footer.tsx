import { Link } from "@tanstack/react-router";
import { Calculator } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-secondary/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand">
              <Calculator className="h-5 w-5 text-white" />
            </span>
            <span className="font-display text-lg font-bold">FreelanceRate</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            A free, no-signup toolkit that helps freelancers everywhere price their work with confidence.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Calculators</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/tools/freelance-hourly-rate-calculator" className="hover:text-foreground">Hourly rate</Link></li>
            <li><Link to="/tools/project-quote-calculator" className="hover:text-foreground">Project quote</Link></li>
            <li><Link to="/tools/invoice-late-fee-calculator" className="hover:text-foreground">Late fees</Link></li>
            <li><Link to="/tools/self-employment-tax-estimator" className="hover:text-foreground">Tax estimator</Link></li>
            <li><Link to="/tools/currency-adjusted-rate-calculator" className="hover:text-foreground">Currency rate</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Guides</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/guides/how-to-set-your-freelance-rate" className="hover:text-foreground">Setting your rate</Link></li>
            <li><Link to="/guides/how-to-invoice-international-clients" className="hover:text-foreground">Invoicing internationally</Link></li>
            <li><Link to="/guides/freelance-tax-basics-by-country" className="hover:text-foreground">Tax basics by country</Link></li>
            <li><Link to="/guides/how-to-price-a-fixed-bid-project" className="hover:text-foreground">Fixed-bid pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-foreground">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FreelanceRate. Estimates only — not financial or tax advice.
      </div>
    </footer>
  );
}
