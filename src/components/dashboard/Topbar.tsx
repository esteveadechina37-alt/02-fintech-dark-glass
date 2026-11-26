"use client";

import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/": "Vue d’ensemble",
  "/comptes": "Comptes",
  "/cartes": "Cartes",
  "/transactions": "Transactions",
  "/investissements": "Investissements",
};

type TopbarProps = {
  onMenuOpen: () => void;
};

export function Topbar({ onMenuOpen }: TopbarProps) {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Espace personnel";

  return (
    <GlassCard className="flex h-[62px] items-center justify-between gap-3 px-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2 text-xs text-zinc-500">
        <motion.button
          type="button"
          aria-label="Ouvrir le menu"
          onClick={onMenuOpen}
          whileTap={{ scale: 0.98 }}
          className="mr-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-zinc-300 transition hover:bg-white/[0.06] md:hidden"
        >
          <Menu size={19} />
        </motion.button>
        <span className="hidden sm:inline">Espace personnel</span>
        <span className="hidden text-zinc-700 sm:inline">/</span>
        <span className="truncate text-zinc-300">{title}</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <label className="hidden h-9 items-center gap-2 rounded-lg border border-white/[0.06] bg-black/20 px-3 sm:flex">
          <Search size={14} className="text-zinc-600" />
          <input
            type="search"
            placeholder="Rechercher..."
            aria-label="Rechercher"
            className="w-28 bg-transparent text-xs text-zinc-300 outline-none placeholder:text-zinc-600 focus:w-36"
          />
          <kbd className="rounded border border-white/[0.08] px-1 text-[10px] text-zinc-600">⌘ K</kbd>
        </label>
        <motion.button type="button" aria-label="Notifications" whileTap={{ scale: 0.98 }} className="relative grid h-9 w-9 place-items-center rounded-lg text-zinc-400 transition hover:bg-white/[0.06] hover:text-white">
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400 ring-2 ring-[#101012]" />
        </motion.button>
        <div className="hidden h-7 border-l border-white/[0.08] sm:block" />
        <motion.button type="button" whileTap={{ scale: 0.98 }} className="flex items-center gap-2 rounded-lg p-1 transition hover:bg-white/[0.04]">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-orange-400 text-[10px] font-semibold text-[#24170d]">
            AD
          </span>
          <ChevronDown size={14} className="hidden text-zinc-500 sm:block" />
        </motion.button>
      </div>
    </GlassCard>
  );
}
