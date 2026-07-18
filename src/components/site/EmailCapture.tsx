import { useState } from "react";
import { CheckCircle2, Mail, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export function EmailCapture({ source }: { source?: string } = {}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const { error: insertError } = await supabase
        .from("subscribers")
        .insert({ email: value, source: source ?? (typeof window !== "undefined" ? window.location.pathname : null) });
      if (insertError && insertError.code !== "23505") {
        // 23505 = unique violation → treat as already subscribed / success
        throw insertError;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setError("Something went wrong. Try again.");
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 pb-16 md:px-6">
      <div className="relative overflow-hidden rounded-3xl border bg-gradient-hero p-6 shadow-glow md:p-10">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-brand/30 blur-3xl animate-blob" />
        <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-brand-2/30 blur-3xl animate-blob" style={{ animationDelay: "-4s" }} />
        <div className="relative grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs font-medium text-brand">
              <Sparkles className="h-3.5 w-3.5" /> Free PDF
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">
              Get the free Freelance Rate Cheat Sheet
            </h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              A one-page PDF with the formulas, uplift percentages, and negotiation lines every freelancer should have on their desk. Plus one short email a month with new tools.
            </p>
          </div>

          <div>
            {status === "success" ? (
              <div className="flex items-start gap-3 rounded-2xl border bg-card p-5 shadow-soft animate-fade-up">
                <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-brand" />
                <div>
                  <p className="font-semibold">You're on the list.</p>
                  <p className="mt-1 text-sm text-muted-foreground">Check your inbox — the cheat sheet is on its way.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-2 rounded-2xl border bg-card p-4 shadow-soft">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="h-4 w-4 text-brand" /> Email address
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    type="email"
                    required
                    placeholder="you@studio.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                    aria-invalid={status === "error"}
                  />
                  <Button type="submit" disabled={status === "loading"} className="shrink-0">
                    {status === "loading" ? "Sending…" : "Send me the PDF"}
                  </Button>
                </div>
                {status === "error" && <p className="text-xs text-destructive">{error}</p>}
                <p className="text-[11px] text-muted-foreground">No spam. Unsubscribe with one click.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
