"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Bitcoin, ChartNoAxesCombined, Gem } from "lucide-react";
import { useMemo } from "react";
import { investments } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const investmentIcons = { bitcoin: Bitcoin, ethereum: Gem, stocks: ChartNoAxesCombined };
const iconStyles = {
  orange: "bg-orange-400/10 text-orange-300",
  indigo: "bg-indigo-400/10 text-indigo-300",
  emerald: "bg-emerald-400/10 text-emerald-300",
};

export default function InvestmentsPage() {
  const portfolio = useMemo(() => investments, []);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-7">
      <header>
        <p className="text-sm text-zinc-500">Suivez la performance de votre portefeuille</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Investissements</h1>
      </header>

      <section className="grid gap-4 lg:grid-cols-3">
        {portfolio.map((asset) => {
          const Icon = investmentIcons[asset.icon];
          const positive = asset.change >= 0;
          const points = asset.history.map((value, index) => `${index * 15},${90 - value}`).join(" ");
          return (
            <article key={asset.id} className="rounded-2xl border border-white/[0.07] bg-[#0b0b0d] p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-300/15">
              <div className="flex items-center justify-between">
                <span className={cn("grid h-11 w-11 place-items-center rounded-xl", iconStyles[asset.color])}>
                  <Icon size={21} strokeWidth={1.8} />
                </span>
                <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium", positive ? "bg-emerald-400/[0.08] text-emerald-300" : "bg-rose-400/[0.08] text-rose-300")}>
                  {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {positive ? "+" : ""}{asset.change.toFixed(2)}%
                </span>
              </div>
              <div className="mt-6 flex items-end justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-zinc-200">{asset.name}</p>
                  <p className="mt-1 text-xs text-zinc-600">{asset.symbol}</p>
                </div>
                <p className="text-lg font-semibold tracking-tight text-white">{asset.value}</p>
              </div>
              <div className="mt-5 h-20 w-full">
                <svg viewBox="0 0 105 100" preserveAspectRatio="none" className="h-full w-full" aria-label={`Tendance ${asset.name}`}>
                  <polyline
                    points={points}
                    fill="none"
                    stroke={positive ? "#34d399" : "#fb7185"}
                    strokeWidth="2.5"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-2 text-[11px] text-zinc-600">Performance sur 7 jours</p>
            </article>
          );
        })}
      </section>
    </motion.div>
  );
}
