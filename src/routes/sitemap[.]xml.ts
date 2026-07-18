import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://freelance-money-hub.vercel.app";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/tools/freelance-hourly-rate-calculator", changefreq: "monthly", priority: "0.9" },
          { path: "/tools/project-quote-calculator", changefreq: "monthly", priority: "0.9" },
          { path: "/tools/invoice-late-fee-calculator", changefreq: "monthly", priority: "0.9" },
          { path: "/tools/self-employment-tax-estimator", changefreq: "monthly", priority: "0.9" },
          { path: "/tools/currency-adjusted-rate-calculator", changefreq: "monthly", priority: "0.9" },
          { path: "/tools/annual-income-to-hourly-rate-calculator", changefreq: "monthly", priority: "0.9" },
          { path: "/tools/freelance-profit-margin-calculator", changefreq: "monthly", priority: "0.9" },
          { path: "/tools/days-to-invoice-payment-calculator", changefreq: "monthly", priority: "0.9" },
          { path: "/guides/how-to-set-your-freelance-rate", changefreq: "monthly", priority: "0.8" },
          { path: "/guides/how-to-invoice-international-clients", changefreq: "monthly", priority: "0.8" },
          { path: "/guides/freelance-tax-basics-by-country", changefreq: "monthly", priority: "0.8" },
          { path: "/guides/how-to-price-a-fixed-bid-project", changefreq: "monthly", priority: "0.8" },
          { path: "/about", changefreq: "monthly", priority: "0.5" },
          { path: "/contact", changefreq: "monthly", priority: "0.5" },
          { path: "/privacy-policy", changefreq: "monthly", priority: "0.3" },
          { path: "/terms", changefreq: "monthly", priority: "0.3" },
        ];

        const urls = entries.map((e) =>
          `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
