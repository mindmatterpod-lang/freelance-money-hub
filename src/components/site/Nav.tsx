import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Calculator } from "lucide-react";

const tools = [
  { to: "/tools/freelance-hourly-rate-calculator", label: "Hourly Rate" },
  { to: "/tools/project-quote-calculator", label: "Project Quote" },
  { to: "/tools/invoice-late-fee-calculator", label: "Late Fee" },
  { to: "/tools/self-employment-tax-estimator", label: "Tax Estimator" },
  { to: "/tools/currency-adjusted-rate-calculator", label: "Currency Rate" },
  { to: "/tools/annual-income-to-hourly-rate-calculator", label: "Salary → Hourly" },
  { to: "/tools/freelance-profit-margin-calculator", label: "Profit Margin" },
  { to: "/tools/days-to-invoice-payment-calculator", label: "Cash Flow" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand animate-gradient-pan shadow-glow transition-transform group-hover:scale-105">
            <Calculator className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Freelance<span className="text-gradient-brand">Rate</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button className="text-sm font-medium text-foreground/80 hover:text-foreground">
              Tools
            </button>
            {toolsOpen && (
              <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3">
                <div className="glass rounded-2xl p-2 shadow-soft animate-fade-up">
                  {tools.map((t) => (
                    <Link
                      key={t.to}
                      to={t.to}
                      className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary"
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link to="/guides/how-to-set-your-freelance-rate" className="text-sm font-medium text-foreground/80 hover:text-foreground">
            Guides
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-foreground">
            About
          </Link>
          <Link
            to="/tools/freelance-hourly-rate-calculator"
            className="rounded-full bg-gradient-brand animate-gradient-pan px-4 py-2 text-sm font-semibold text-white shadow-soft hover:shadow-glow transition-shadow"
          >
            Start free
          </Link>
        </nav>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t md:hidden animate-fade-up">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Tools</p>
            <div className="grid gap-1">
              {tools.map((t) => (
                <Link key={t.to} to={t.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-secondary">
                  {t.label}
                </Link>
              ))}
            </div>
            <p className="mt-3 mb-2 text-xs font-semibold uppercase text-muted-foreground">More</p>
            <div className="grid gap-1">
              <Link to="/guides/how-to-set-your-freelance-rate" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-secondary">Guides</Link>
              <Link to="/about" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-secondary">About</Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-secondary">Contact</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
