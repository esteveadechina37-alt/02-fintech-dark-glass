"use client";

import {
  ArrowDownLeft,
  BriefcaseBusiness,
  CarFront,
  Coffee,
  Music2,
  ShoppingBag,
  Store,
  Video,
} from "lucide-react";
import type { Transaction } from "@/types";
import { cn } from "@/lib/cn";

const transactionIcons = {
  store: Store,
  car: CarFront,
  salary: BriefcaseBusiness,
  music: Music2,
  shopping: ShoppingBag,
  transfer: ArrowDownLeft,
  coffee: Coffee,
  video: Video,
};

export function TransactionList({
  items,
  compact = false,
}: {
  items: Transaction[];
  compact?: boolean;
}) {
  return (
    <div className="divide-y divide-white/[0.055]">
      {items.map((transaction) => {
        const Icon = transactionIcons[transaction.icon];
        const incoming = transaction.direction === "incoming";
        const formattedAmount = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 2,
        }).format(transaction.amount);

        return (
          <div key={transaction.id} className={cn("flex items-center justify-between gap-4 first:pt-0 last:pb-0", compact ? "py-2" : "py-4")}>
            <div className="flex min-w-0 items-center gap-3">
              <span
                className={cn(
                  cn("grid shrink-0 place-items-center rounded-xl", compact ? "h-8 w-8 rounded-lg" : "h-10 w-10 rounded-xl"),
                  incoming ? "bg-emerald-400/10 text-emerald-300" : "bg-white/[0.05] text-zinc-400",
                )}
              >
                <Icon size={17} strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-zinc-200">{transaction.name}</p>
                <p className="mt-1 truncate text-xs text-zinc-600">{transaction.detail}</p>
              </div>
            </div>
            <p className={cn("shrink-0 text-sm font-medium", incoming ? "text-emerald-300" : "text-zinc-300")}>
              {incoming ? "+" : "−"} {formattedAmount}
            </p>
          </div>
        );
      })}
      {items.length === 0 && (
        <p className="py-8 text-center text-sm text-zinc-500">Aucune transaction trouvée.</p>
      )}
    </div>
  );
}
