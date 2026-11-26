"use client";

import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  ChartNoAxesCombined,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings2,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/cn";

const links = [
  { label: "Vue d’ensemble", href: "/", icon: LayoutDashboard },
  { label: "Comptes", href: "/comptes", icon: Wallet },
  { label: "Cartes", href: "/cartes", icon: CreditCard },
  { label: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { label: "Investissements", href: "/investissements", icon: ChartNoAxesCombined },
];

type SidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <GlassCard className={cn("flex h-full w-[232px] shrink-0 flex-col p-4", className)}>
      <Link href="/" onClick={onNavigate} className="flex items-center gap-3 px-2 py-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-violet-900/30">
          <span className="text-lg font-bold">n</span>
        </span>
        <span className="text-[17px] font-semibold tracking-tight">nexora</span>
        <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.65)]" />
      </Link>

      <div className="mt-9">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
          Espace personnel
        </p>
        <nav className="space-y-1" aria-label="Navigation principale">
          {links.map(({ label, href, icon: Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <motion.div key={href} whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] transition-colors",
                    active
                      ? "bg-gradient-to-r from-indigo-500/20 to-violet-500/10 font-medium text-white shadow-[0_0_18px_rgba(99,102,241,0.12)]"
                      : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon size={17} strokeWidth={1.8} className={active ? "text-violet-300" : ""} />
                  {label}
                  {href === "/transactions" && (
                    <span className="ml-auto rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-zinc-500">
                      4
                    </span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto space-y-1">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
          Préférences
        </p>
        <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-zinc-500 transition hover:bg-white/[0.04] hover:text-zinc-200">
          <Settings2 size={17} strokeWidth={1.8} />
          Paramètres
        </a>
        <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-zinc-500 transition hover:bg-white/[0.04] hover:text-zinc-200">
          <CircleHelp size={17} strokeWidth={1.8} />
          Centre d&apos;aide
        </a>
        <div className="my-4 border-t border-white/[0.07]" />
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-zinc-500 transition hover:bg-white/[0.04] hover:text-zinc-200">
          <LogOut size={17} strokeWidth={1.8} />
          Déconnexion
        </button>
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-orange-400 text-xs font-semibold text-[#24170d]">
            AD
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-zinc-200">Alex Dupont</p>
            <p className="mt-0.5 truncate text-[10px] text-zinc-600">Compte Premium</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
