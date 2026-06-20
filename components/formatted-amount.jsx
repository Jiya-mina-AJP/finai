"use client";

import { useCurrency } from "@/hooks/use-currency";

export default function FormattedAmount({ amount, className = "" }) {
  const { formatAmount } = useCurrency();

  return (
    <span className={className} suppressHydrationWarning>
      {formatAmount(amount)}
    </span>
  );
}
