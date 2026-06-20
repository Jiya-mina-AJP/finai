"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext({
  currency: "USD",
  symbol: "$",
  setCurrency: () => {},
  formatAmount: () => "",
  mounted: false,
});

export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US" },
  { code: "EUR", symbol: "€", name: "Euro", locale: "de-DE" },
  { code: "GBP", symbol: "£", name: "British Pound", locale: "en-GB" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", locale: "en-IN" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", locale: "ja-JP" },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar", locale: "en-CA" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", locale: "en-AU" },
];

export function CurrencyProvider({ children }) {
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("preferred_currency");
    if (saved) {
      setCurrencyCode(saved);
    }
    setMounted(true);
  }, []);

  const current = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];

  const setCurrency = (code) => {
    if (CURRENCIES.some((c) => c.code === code)) {
      setCurrencyCode(code);
      localStorage.setItem("preferred_currency", code);
    }
  };

  const formatAmount = (amount) => {
    // Avoid Next.js SSR hydration mismatch by using USD formatting before mounting
    const activeLocale = mounted ? current.locale : "en-US";
    const activeCode = mounted ? current.code : "USD";
    return new Intl.NumberFormat(activeLocale, {
      style: "currency",
      currency: activeCode,
    }).format(amount);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency: current.code,
        symbol: current.symbol,
        setCurrency,
        formatAmount,
        mounted,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
