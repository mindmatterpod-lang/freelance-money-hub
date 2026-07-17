import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — FreelanceRate" },
      { name: "description", content: "The terms under which you use FreelanceRate calculators and content." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <h1 className="font-display text-4xl font-bold">Terms of Use</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <p>FreelanceRate provides free calculators and educational content for informational purposes only.</p>
          <h2 className="font-display text-xl font-semibold text-foreground">Not professional advice</h2>
          <p>Nothing on this site is legal, financial, tax, or accounting advice. Tax estimates in particular are ballpark figures based on publicly published brackets and should be verified with a qualified professional in your jurisdiction.</p>
          <h2 className="font-display text-xl font-semibold text-foreground">No warranty</h2>
          <p>The calculators are provided as-is, without warranty of any kind. We make no guarantees about accuracy, completeness, or fitness for a particular purpose.</p>
          <h2 className="font-display text-xl font-semibold text-foreground">Fair use</h2>
          <p>You may use the calculators freely for personal or commercial purposes. Please do not scrape or resell the site's content.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
