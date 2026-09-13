import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Mail, MessageSquare, Bug } from "lucide-react";
import { SUPPORT_EMAIL } from "@/lib/site-config";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — FreelanceRate" },
      { name: "description", content: "Get in touch with the FreelanceRate team. Feature requests, bug reports and country additions welcome." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const items = [
    { icon: MessageSquare, title: "Feature requests", body: "Missing a calculator? Tell us what you'd type into Google.", href: `mailto:${SUPPORT_EMAIL}?subject=Feature%20request` },
    { icon: Bug, title: "Bugs & wrong numbers", body: "Found an incorrect tax bracket or a broken calculation? Send it over.", href: `mailto:${SUPPORT_EMAIL}?subject=Bug%20report` },
    { icon: Mail, title: "Everything else", body: "Partnerships, press, or a friendly hello.", href: `mailto:${SUPPORT_EMAIL}` },
  ];
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        <div className="relative mx-auto max-w-3xl px-4 py-24 md:px-6">
          <h1 className="font-display text-5xl font-bold tracking-tight animate-fade-up">Contact us</h1>
          <p className="mt-4 text-lg text-muted-foreground animate-fade-up">The best way to reach us is email. We usually reply within a day or two.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {items.map((it) => (
              <a key={it.title} href={it.href} className="group rounded-2xl border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-glow animate-fade-up">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand"><it.icon className="h-5 w-5 text-white" /></span>
                <h3 className="mt-4 font-semibold">{it.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{it.body}</p>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
