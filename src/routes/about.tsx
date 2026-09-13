import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — FreelanceRate" },
      { name: "description", content: "FreelanceRate is a free toolkit of calculators built for freelancers worldwide. No signup, no fluff — just working tools." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative mx-auto max-w-3xl px-4 py-24 md:px-6">
          <h1 className="font-display text-5xl font-bold tracking-tight animate-fade-up">About FreelanceRate</h1>
          <p className="mt-6 text-lg text-muted-foreground animate-fade-up">
            FreelanceRate is a free toolkit built for the millions of writers, designers, developers, consultants and virtual assistants who work for themselves.
          </p>
          <div className="mt-8 space-y-6 text-muted-foreground">
            <p>Every tool on this site answers a very specific question freelancers actually type into Google. What should my hourly rate be? How much late fee is fair? What percentage of this invoice should I stash for tax? What actually lands after PayPal takes its cut?</p>
            <p>None of these questions require an account. None of them require your email. Every calculator runs entirely in your browser — your numbers never leave your device.</p>
            <p>If a tool is missing or a country is wrong, <Link to="/contact" className="text-brand font-medium">tell us</Link>. We ship updates every week.</p>
          </div>

          <div className="mt-14 border-t pt-10">
            <h2 className="font-display text-2xl font-bold text-foreground">Who's behind this</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>FreelanceRate is an independently run, one-person project — not an accounting firm, and not a large editorial team. There's no professional accounting or tax credential behind it. What there is: a habit of building things by reading the primary source directly rather than repeating what other sites say.</p>
              <p>That's worth knowing, because the honest limitation of that approach is exactly what the disclaimers on this site say: nothing here is personalized tax or financial advice, and for anything that actually affects your filing, a real accountant licensed in your country will do a better job than any calculator.</p>
            </div>
          </div>

          <div id="sources" className="mt-10 border-t pt-10 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold text-foreground">How the tax numbers are sourced</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>The brackets and rates behind the tax tools are drawn from official government publications, not from other blogs or calculators:</p>
              <ul className="ml-5 list-disc space-y-2">
                <li>United States — <a href="https://www.irs.gov" target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">IRS.gov</a></li>
                <li>United Kingdom — <a href="https://www.gov.uk/topic/business-tax/self-employed" target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">HMRC / GOV.UK</a></li>
                <li>Canada — <a href="https://www.canada.ca/en/revenue-agency.html" target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">Canada Revenue Agency</a></li>
                <li>Australia — <a href="https://www.ato.gov.au" target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">Australian Taxation Office</a></li>
                <li>India — <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">Income Tax Department</a></li>
                <li>Pakistan — <a href="https://www.fbr.gov.pk" target="_blank" rel="noopener noreferrer" className="text-brand underline underline-offset-2">Federal Board of Revenue</a></li>
              </ul>
              <p>Tax rules change every year, sometimes mid-year. Each tool notes which year's brackets it's using — check that date against the current rules on the linked authority before relying on a number for anything real, and treat every result as a planning estimate, not a filed number.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
