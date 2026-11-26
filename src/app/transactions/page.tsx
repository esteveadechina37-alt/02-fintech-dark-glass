"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { transactions } from "@/lib/mock-data";

export default function TransactionsPage() {
  const [query, setQuery] = useState("");
  const transactionList = useMemo(() => transactions, []);
  const filteredTransactions = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fr");
    if (!normalizedQuery) return transactionList;
    return transactionList.filter((item) =>
      `${item.name} ${item.detail}`.toLocaleLowerCase("fr").includes(normalizedQuery),
    );
  }, [query, transactionList]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <header>
        <p className="text-sm text-zinc-500">Toutes vos opérations au même endroit</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Transactions</h1>
      </header>

      <section className="rounded-2xl border border-white/[0.06] bg-[#0b0b0d] p-4 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold">Historique des opérations</h2>
            <p className="mt-1 text-xs text-zinc-600">{filteredTransactions.length} transactions</p>
          </div>
          <button type="button" className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/[0.08] px-3 text-xs text-zinc-400 transition hover:bg-white/[0.04] hover:text-white">
            <SlidersHorizontal size={14} /> Filtrer
          </button>
        </div>
        <label className="mb-4 flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-black/20 px-3 focus-within:border-violet-400/40">
          <Search size={15} className="shrink-0 text-zinc-600" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une transaction..."
            aria-label="Rechercher une transaction"
            className="w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
          />
        </label>
        <TransactionList items={filteredTransactions} />
      </section>
    </motion.div>
  );
}
