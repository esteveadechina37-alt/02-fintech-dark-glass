"use client";

import { motion } from "framer-motion";
import { Check, CreditCard, ShieldCheck } from "lucide-react";
import { useMemo } from "react";
import { CreditCard3D } from "@/components/dashboard/CreditCard3D";
import { GlassCard } from "@/components/ui/GlassCard";
import { useCardTheme } from "@/hooks/useCardTheme";
import type { CardTheme } from "@/types";
import { cn } from "@/lib/cn";

const swatches: Record<CardTheme, string> = {
  violet: "bg-gradient-to-br from-indigo-500 to-violet-500",
  gold: "bg-gradient-to-br from-amber-400 to-yellow-700",
  emerald: "bg-gradient-to-br from-emerald-400 to-teal-700",
  dark: "bg-gradient-to-br from-zinc-400 to-zinc-800",
};

export default function CardsPage() {
  const { theme, setTheme } = useCardTheme();
  const themes = useMemo(
    () => [
      { id: "violet" as const, label: "Violet" },
      { id: "gold" as const, label: "Or" },
      { id: "emerald" as const, label: "Émeraude" },
      { id: "dark" as const, label: "Graphite" },
    ],
    [],
  );
  const limits = useMemo(
    () => [
      { label: "Paiement", used: "1 240 €", limit: "5 000 €", percent: 25, color: "bg-violet-400" },
      { label: "Retrait", used: "180 €", limit: "1 000 €", percent: 18, color: "bg-emerald-400" },
    ],
    [],
  );

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-7">
      <header>
        <p className="text-sm text-zinc-500">Gérez vos moyens de paiement</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Mes cartes</h1>
      </header>

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <section>
          <div className="mb-4 flex items-center gap-2">
            <CreditCard size={17} className="text-violet-300" />
            <h2 className="text-sm font-semibold">Carte principale</h2>
          </div>
          <CreditCard3D theme={theme} />
          <div className="mt-6">
            <p className="mb-3 text-xs font-medium text-zinc-400">Personnaliser le style</p>
            <div className="flex flex-wrap gap-3">
              {themes.map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  aria-label={`Choisir le thème ${item.label}`}
                  aria-pressed={theme === item.id}
                  onClick={() => setTheme(item.id)}
                  whileTap={{ scale: 0.96 }}
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-full ring-offset-2 ring-offset-[#050505] transition hover:scale-105",
                    swatches[item.id],
                    theme === item.id ? "ring-2 ring-violet-300" : "ring-0",
                  )}
                >
                  {theme === item.id && <Check size={16} className="text-white drop-shadow" />}
                </motion.button>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-600">Thème sélectionné : {themes.find((item) => item.id === theme)?.label}</p>
          </div>
        </section>

        <section className="space-y-4">
          <GlassCard interactive className="p-4 sm:p-5">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
                <ShieldCheck size={19} />
              </span>
              <div>
                <h2 className="text-sm font-semibold">Plafonds de la carte</h2>
                <p className="mt-1 text-xs text-zinc-500">Réinitialisation dans 12 jours</p>
              </div>
            </div>
            <div className="space-y-6">
              {limits.map((limit) => (
                <div key={limit.label}>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-zinc-300">{limit.label}</span>
                    <span className="text-zinc-500">{limit.used} <span className="text-zinc-700">/ {limit.limit}</span></span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className={cn("h-full rounded-full transition-all duration-500", limit.color)} style={{ width: `${limit.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          <div className="rounded-2xl border border-white/[0.06] bg-[#0b0b0d] p-5">
            <h2 className="text-sm font-semibold">Sécurité de la carte</h2>
            <p className="mt-1 text-xs leading-5 text-zinc-500">Votre carte est active et protégée par la validation 3D Secure.</p>
            <button type="button" className="mt-4 rounded-lg border border-white/[0.08] px-3 py-2 text-xs text-zinc-300 transition hover:bg-white/[0.04]">
              Gérer les paramètres
            </button>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
