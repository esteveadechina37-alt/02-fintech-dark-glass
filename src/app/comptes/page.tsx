"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChartNoAxesCombined, PiggyBank, Plus, Wallet } from "lucide-react";
import { useMemo } from "react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { GlassCard } from "@/components/ui/GlassCard";
import { accounts } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const accountIcons = { wallet: Wallet, "piggy-bank": PiggyBank, chart: ChartNoAxesCombined };
const toneClasses = {
  violet: "bg-violet-500/10 text-violet-300",
  emerald: "bg-emerald-500/10 text-emerald-300",
  blue: "bg-blue-500/10 text-blue-300",
};

export default function AccountsPage() {
  const accountList = useMemo(() => accounts, []);
  const total = useMemo(
    () => accountList.reduce((sum, account) => sum + account.balance, 0),
    [accountList],
  );

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-500">Votre patrimoine, en un seul endroit</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Mes comptes</h1>
        </div>
        <button type="button" className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 text-sm font-medium text-white transition hover:brightness-110">
          <Plus size={16} /> Ajouter un compte
        </button>
      </header>

      <GlassCard interactive className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-7">
        <div>
          <p className="text-sm text-zinc-400">Solde total de vos comptes</p>
          <AnimatedNumber value={total} className="mt-2 block text-3xl font-semibold tracking-tight sm:text-4xl" />
          <p className="mt-2 text-xs text-zinc-500">Mis à jour à l’instant</p>
        </div>
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-500/10 text-violet-300">
          <Wallet size={22} />
        </span>
      </GlassCard>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold">Tous les comptes</h2>
          <span className="text-xs text-zinc-600">{accountList.length} comptes</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {accountList.map((account) => {
            const Icon = accountIcons[account.icon];
            return (
              <article key={account.id} className="rounded-2xl border border-white/[0.07] bg-[#0b0b0d] p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-300/15">
                <div className="flex items-start justify-between">
                  <span className={cn("grid h-11 w-11 place-items-center rounded-xl", toneClasses[account.tone])}>
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <button type="button" aria-label={`Ouvrir ${account.name}`} className="rounded-lg p-2 text-zinc-600 transition hover:bg-white/[0.05] hover:text-white">
                    <ArrowUpRight size={17} />
                  </button>
                </div>
                <p className="mt-6 text-sm font-medium text-zinc-200">{account.name}</p>
                <p className="mt-1 text-xs text-zinc-600">{account.detail}</p>
                <AnimatedNumber value={account.balance} className="mt-4 block text-2xl font-semibold tracking-tight" />
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                  <div className={cn("h-full rounded-full", account.tone === "violet" ? "w-[72%] bg-violet-400" : account.tone === "emerald" ? "w-[56%] bg-emerald-400" : "w-[38%] bg-blue-400")} />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
