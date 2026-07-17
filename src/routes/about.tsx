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
        </div>
      </main>
      <Footer />
    </div>
  );
}
