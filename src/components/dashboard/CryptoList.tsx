"use client";

import { ArrowDownRight, ArrowUpRight, Bitcoin, Gem, Sun } from "lucide-react";
import { useMemo } from "react";
import { cryptoAssets } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const cryptoIcons = { bitcoin: Bitcoin, ethereum: Gem, solana: Sun };

export function CryptoList({ compact = false }: { compact?: boolean }) {
  const assets = useMemo(() => cryptoAssets, []);

  return (
    <div className={cn(
      compact
        ? "grid grid-cols-3 gap-2"
        : "mt-3 divide-y divide-white/[0.055] rounded-2xl border border-white/[0.06] bg-[#0b0b0d] px-4",
    )}>
      {assets.map((asset) => {
        const Icon = cryptoIcons[asset.icon];
        const isPositive = asset.change >= 0;
        if (compact) {
          return (
            <div key={asset.symbol} className="flex min-w-0 items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-2 py-2">
              <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full", asset.iconBackground)}>
                <Icon size={14} className={asset.iconColor} strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-zinc-300">{asset.symbol}</p>
                <p className={cn("text-[9px]", isPositive ? "text-emerald-300" : "text-rose-300")}>
                  {isPositive ? "+" : ""}{asset.change.toFixed(2)}%
                </p>
              </div>
            </div>
          );
        }
        return (
          <div key={asset.symbol} className="flex items-center justify-between gap-3 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full", asset.iconBackground)}>
                <Icon size={18} className={asset.iconColor} strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-zinc-200">{asset.name}</p>
                <p className="mt-0.5 text-[10px] text-zinc-600">{asset.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-zinc-200">{asset.price}</p>
              <p className={cn("mt-1 inline-flex items-center gap-0.5 text-[10px]", isPositive ? "text-emerald-300" : "text-rose-300")}>
                {isPositive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                {Math.abs(asset.change).toFixed(2)}%
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
