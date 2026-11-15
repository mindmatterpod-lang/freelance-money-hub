import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

// Display currency for all calculators. Amounts are NOT converted: the
// calculators are unit-less, so the chosen currency just controls the symbol
// and number formatting shown next to the result.

export const CURRENCIES = [
  ["USD", "US Dollar"], ["EUR", "Euro"], ["GBP", "British Pound"], ["PKR", "Pakistani Rupee"],
  ["INR", "Indian Rupee"], ["BDT", "Bangladeshi Taka"], ["BRL", "Brazilian Real"],
  ["ARS", "Argentine Peso"], ["MXN", "Mexican Peso"], ["COP", "Colombian Peso"],
  ["CLP", "Chilean Peso"], ["PEN", "Peruvian Sol"], ["IDR", "Indonesian Rupiah"],
  ["VND", "Vietnamese Dong"], ["PHP", "Philippine Peso"], ["MYR", "Malaysian Ringgit"],
  ["THB", "Thai Baht"], ["TRY", "Turkish Lira"], ["NGN", "Nigerian Naira"],
  ["KES", "Kenyan Shilling"], ["ZAR", "South African Rand"], ["EGP", "Egyptian Pound"],
  ["MAD", "Moroccan Dirham"], ["AED", "UAE Dirham"], ["SAR", "Saudi Riyal"],
  ["CAD", "Canadian Dollar"], ["AUD", "Australian Dollar"], ["NZD", "New Zealand Dollar"],
  ["SGD", "Singapore Dollar"], ["JPY", "Japanese Yen"], ["KRW", "South Korean Won"],
  ["CNY", "Chinese Yuan"], ["RUB", "Russian Ruble"], ["UAH", "Ukrainian Hryvnia"],
  ["PLN", "Polish Zloty"], ["CHF", "Swiss Franc"], ["SEK", "Swedish Krona"],
] as const;

const REGION_TO_CURRENCY: Record<string, string> = {
  US: "USD", GB: "GBP", PK: "PKR", IN: "INR", BD: "BDT", BR: "BRL", AR: "ARS", MX: "MXN",
  CO: "COP", CL: "CLP", PE: "PEN", ID: "IDR", VN: "VND", PH: "PHP", MY: "MYR", TH: "THB",
  TR: "TRY", NG: "NGN", KE: "KES", ZA: "ZAR", EG: "EGP", MA: "MAD", AE: "AED", SA: "SAR",
  CA: "CAD", AU: "AUD", NZ: "NZD", SG: "SGD", JP: "JPY", KR: "KRW", CN: "CNY", RU: "RUB",
  UA: "UAH", PL: "PLN", CH: "CHF", SE: "SEK",
  DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", IE: "EUR",
  PT: "EUR", FI: "EUR", GR: "EUR",
};

let activeCurrency = "USD";
let activeLocale = "en-US";

export function getActiveCurrency() { return activeCurrency; }
export function getActiveLocale() { return activeLocale; }

function validLocale(l: string) {
  try { return Intl.NumberFormat.supportedLocalesOf([l]).length > 0; } catch { return false; }
}

interface Ctx { currency: string; setCurrency: (c: string) => void }
const CurrencyContext = createContext<Ctx>({ currency: "USD", setCurrency: () => {} });

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setState] = useState("USD");

  const setCurrency = useCallback((c: string) => {
    activeCurrency = c;
    setState(c);
    try { localStorage.setItem("fr-currency", c); } catch { /* storage unavailable */ }
  }, []);

  // Detect after mount so server and first client render match.
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("fr-currency"); } catch { /* ignore */ }
    const lang = typeof navigator !== "undefined" ? navigator.language : "en-US";
    if (lang && validLocale(lang)) activeLocale = lang;
    const region = lang?.split("-")[1]?.toUpperCase();
    const detected = region ? REGION_TO_CURRENCY[region] : undefined;
    const next = saved && CURRENCIES.some(([c]) => c === saved) ? saved : detected ?? "USD";
    activeCurrency = next;
    setState(next);
  }, []);

  const value = useMemo(() => ({ currency, setCurrency }), [currency, setCurrency]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

/** Call in any component that renders formatMoney() output so it re-renders on change. */
export function useCurrency() {
  return useContext(CurrencyContext);
}
