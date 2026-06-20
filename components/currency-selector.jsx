"use client";

import { useCurrency, CURRENCIES } from "@/hooks/use-currency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CurrencySelector() {
  const { currency, setCurrency, mounted } = useCurrency();

  if (!mounted) return null;

  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger className="w-[100px] h-9">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {CURRENCIES.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            {c.symbol} {c.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
