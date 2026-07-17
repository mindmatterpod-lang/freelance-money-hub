import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — FreelanceRate" },
      { name: "description", content: "How FreelanceRate handles your data. Short answer: calculators run in your browser and we don't want your personal information." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-8 space-y-6 text-muted-foreground">
          <p><b className="text-foreground">The short version:</b> every calculator on this site runs entirely in your browser. The numbers you enter never leave your device.</p>
          <h2 className="font-display text-xl font-semibold text-foreground">What we collect</h2>
          <p>We use privacy-respecting analytics to understand which tools are popular and how the site performs. This data is aggregated and does not identify you personally.</p>
          <h2 className="font-display text-xl font-semibold text-foreground">Cookies</h2>
          <p>We use essential cookies for the site to function and, if you consent, minimal analytics cookies. We do not use advertising trackers by default.</p>
          <h2 className="font-display text-xl font-semibold text-foreground">Third-party services</h2>
          <p>The Currency-Adjusted Rate Calculator queries the public Frankfurter API for live exchange rates. Only the currency pair — never your amounts — is sent.</p>
          <h2 className="font-display text-xl font-semibold text-foreground">Contact</h2>
          <p>Questions about privacy? Email hello@freelancerate.example.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
