"use client";

import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowUpRightFromSquare,
  ChevronDown,
  Plus,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { DashboardCalendar } from "@/components/dashboard/DashboardCalendar";
import { CreditCard3D } from "@/components/dashboard/CreditCard3D";
import { CryptoList } from "@/components/dashboard/CryptoList";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { Modal } from "@/components/ui/Modal";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/cn";
import { transactions } from "@/lib/mock-data";
import { useCardTheme } from "@/hooks/useCardTheme";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Home() {
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [accountAdded, setAccountAdded] = useState(false);
  const { theme } = useCardTheme();
  const today = useMemo(() => format(new Date(), "EEEE d MMMM yyyy", { locale: fr }), []);
  const recentTransactions = useMemo(() => transactions.slice(0, 4), []);
  const stats = useMemo(
    () => [
      {
        label: "Solde total",
        amount: 24859.42,
        change: "+12.8%",
        description: "vs. mois dernier",
        icon: Wallet,
        color: "text-violet-300",
        iconBg: "bg-violet-500/10",
      },
      {
        label: "Revenus",
        amount: 8420,
        change: "+8.2%",
        description: "vs. mois dernier",
        icon: ArrowDownLeft,
        color: "text-emerald-300",
        iconBg: "bg-emerald-500/10",
      },
      {
        label: "Dépenses",
        amount: 3268.5,
        change: "-3.1%",
        description: "vs. mois dernier",
        icon: ArrowUpRight,
        color: "text-rose-300",
        iconBg: "bg-rose-500/10",
      },
    ],
    [],
  );

  function handleAddAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAccountAdded(true);
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-3 min-[1000px]:h-full min-[1000px]:min-h-0 min-[1000px]:gap-2 min-[1000px]:overflow-hidden"
    >
      <motion.section
        variants={sectionVariants}
        className="flex shrink-0 flex-wrap items-end justify-between gap-3"
      >
        <div>
          <p className="mb-1 text-xs capitalize text-zinc-500">{today}</p>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Bonjour, Alex <span aria-hidden="true">✦</span>
          </h1>
          <p className="mt-1 text-xs text-zinc-500 sm:text-sm min-[1000px]:hidden">
            Voici un aperçu de vos finances aujourd&apos;hui.
          </p>
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setAccountAdded(false);
            setAddAccountOpen(true);
          }}
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 text-xs font-medium text-zinc-300 transition-all duration-300 hover:scale-[1.02] hover:border-violet-400/30 hover:bg-white/[0.06] sm:px-4 sm:text-sm"
        >
          <Plus size={15} />
          Ajouter un compte
        </motion.button>
      </motion.section>

      <motion.section variants={sectionVariants} aria-label="Résumé financier" className="shrink-0">
        <GlassCard className="grid gap-0 p-1.5 sm:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={cn(
                  "flex min-w-0 items-center justify-between gap-2 px-3 py-2.5 sm:px-4",
                  index > 0 && "border-t border-white/[0.07] sm:border-l sm:border-t-0",
                )}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                    <span>{stat.label}</span>
                    <span className="hidden text-[10px] text-zinc-600 2xl:inline">
                      {stat.description}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-baseline gap-2">
                    <AnimatedNumber
                      value={stat.amount}
                        className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-2xl min-[1000px]:text-xl 2xl:text-3xl"
                    />
                    <span
                      className={cn(
                        "text-[10px] font-medium sm:text-xs",
                        stat.change.startsWith("+") ? "text-emerald-300" : "text-rose-300",
                      )}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg sm:h-9 sm:w-9", stat.iconBg, stat.color)}>
                  <Icon size={16} strokeWidth={1.8} />
                </span>
              </div>
            );
          })}
        </GlassCard>
      </motion.section>

      <motion.div
        variants={pageVariants}
        className="grid gap-3 min-[1000px]:min-h-0 min-[1000px]:flex-1 min-[1000px]:grid-cols-12 min-[1000px]:overflow-hidden"
      >
        <motion.section
          variants={sectionVariants}
          className="flex min-w-0 flex-col gap-3 min-[1000px]:col-span-8 min-[1000px]:min-h-0 min-[1000px]:grid min-[1000px]:grid-rows-[minmax(0,1fr)_minmax(0,1.08fr)]"
        >
          <div className="min-h-0 min-[1000px]:flex min-[1000px]:flex-col">
            <div className="mb-1 flex shrink-0 items-center justify-between">
              <div>
                <h2 className="text-sm font-medium text-gray-400">Évolution du solde</h2>
                <p className="mt-0.5 text-[10px] text-zinc-600">Suivez vos finances en un coup d&apos;œil</p>
              </div>
              <button type="button" className="rounded-lg border border-white/[0.08] bg-[#0c0c0e]/80 px-2.5 py-1.5 text-[10px] text-zinc-300 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]">
                7 derniers jours <ChevronDown className="ml-1 inline" size={12} />
              </button>
            </div>
            <GlassCard interactive className="flex flex-col p-3 min-[1000px]:min-h-0 min-[1000px]:flex-1">
              <div className="mb-1 flex shrink-0 items-center justify-between">
                <div>
                  <p className="text-[10px] font-medium text-gray-400">Valeur nette</p>
                  <AnimatedNumber
                    value={24859.42}
                    className="block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-xl font-bold tracking-tight text-transparent"
                  />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/[0.08] px-2 py-1 text-[10px] font-medium text-emerald-300">
                  <ArrowUpRight size={11} /> 12.8%
                </span>
              </div>
              <BalanceChart className="h-[190px] min-[1000px]:h-[clamp(125px,16vh,185px)] min-[1000px]:min-h-0 min-[1000px]:flex-1" />
            </GlassCard>
          </div>

          <GlassCard interactive className="flex min-h-0 flex-col p-3 min-[1000px]:overflow-hidden">
            <div className="mb-2 flex shrink-0 items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-medium text-gray-400">Transactions récentes</h2>
                <p className="text-[10px] text-zinc-600">Vos quatre dernières opérations</p>
              </div>
              <Link href="/transactions" className="shrink-0 text-[10px] font-medium text-violet-300 transition hover:text-violet-200">
                Tout voir <ArrowUpRightFromSquare className="ml-1 inline" size={11} />
              </Link>
            </div>
            <TransactionList items={recentTransactions} compact />
            <div className="mt-auto border-t border-white/[0.06] pt-2">
              <div className="mb-1 flex items-center justify-between">
                <h3 className="text-[10px] font-medium text-gray-400">Marché crypto</h3>
                <Link href="/investissements" className="text-[9px] text-zinc-600 transition hover:text-violet-300">
                  Voir le portefeuille
                </Link>
              </div>
              <CryptoList compact />
            </div>
          </GlassCard>
        </motion.section>

        <motion.aside
          variants={sectionVariants}
          className="flex min-w-0 flex-col gap-3 min-[1000px]:col-span-4 min-[1000px]:min-h-0"
        >
          <section className="shrink-0">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-400">Ma carte</h2>
              <Link href="/cartes" className="text-[10px] text-zinc-500 transition hover:text-white">Gérer</Link>
            </div>
            <CreditCard3D theme={theme} />
            <QuickActions />
          </section>
          <DashboardCalendar />
        </motion.aside>
      </motion.div>

      <Modal
        open={addAccountOpen}
        onClose={() => setAddAccountOpen(false)}
        title={accountAdded ? "Compte ajouté" : "Ajouter un compte"}
        description={accountAdded ? "Votre nouveau compte est prêt à être configuré." : "Ajoutez un compte à votre espace financier."}
      >
        {accountAdded ? (
          <div className="space-y-4">
            <p className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] p-4 text-sm text-emerald-200">
              Le compte a été ajouté à votre espace.
            </p>
            <button type="button" onClick={() => setAddAccountOpen(false)} className="w-full rounded-xl bg-violet-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-400">
              Terminé
            </button>
          </div>
        ) : (
          <form onSubmit={handleAddAccount} className="space-y-4">
            <label className="block space-y-2 text-xs font-medium text-zinc-400">
              Nom du compte
              <input required placeholder="Ex. Compte épargne" className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-400/60" />
            </label>
            <label className="block space-y-2 text-xs font-medium text-zinc-400">
              Type de compte
              <select className="w-full rounded-xl border border-white/10 bg-[#151519] px-3 py-3 text-sm text-white outline-none focus:border-violet-400/60">
                <option>Compte courant</option>
                <option>Épargne</option>
                <option>Investissement</option>
              </select>
            </label>
            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-medium text-white transition hover:brightness-110">
              Ajouter le compte
            </button>
          </form>
        )}
      </Modal>
    </motion.div>
  );
}
