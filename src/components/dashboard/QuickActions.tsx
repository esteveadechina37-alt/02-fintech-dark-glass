"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight, ArrowUpRight, Download } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useState, type FormEvent } from "react";

const actions = [
  { label: "Envoyer", icon: ArrowUpRight },
  { label: "Recevoir", icon: Download },
  { label: "Échanger", icon: ArrowLeftRight },
];

export function QuickActions() {
  const [sendOpen, setSendOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {actions.map(({ label, icon: Icon }, index) => (
          <motion.button
            key={label}
            type="button"
            onClick={index === 0 ? () => { setSent(false); setSendOpen(true); } : undefined}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={
              index === 0
                ? "flex h-[70px] flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-violet-950/30 transition-all duration-300 hover:scale-[1.02] min-[1000px]:h-[44px] min-[1000px]:gap-1"
                : "flex h-[70px] flex-col items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-[#0b0b0d] text-zinc-400 transition-all duration-300 hover:scale-[1.02] hover:border-white/[0.14] hover:text-white min-[1000px]:h-[44px] min-[1000px]:gap-1"
            }
          >
            <Icon size={17} strokeWidth={1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </motion.button>
        ))}
      </div>
      <Modal
        open={sendOpen}
        onClose={() => setSendOpen(false)}
        title={sent ? "Virement prêt" : "Envoyer de l’argent"}
        description={sent ? "Votre demande a été préparée pour la démo." : "Indiquez le bénéficiaire et le montant à envoyer."}
      >
        {sent ? (
          <div className="space-y-4">
            <p className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] p-4 text-sm text-emerald-200">
              Votre virement a bien été enregistré.
            </p>
            <button type="button" onClick={() => setSendOpen(false)} className="w-full rounded-xl bg-violet-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-400">
              Terminé
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4">
            <label className="block space-y-2 text-xs font-medium text-zinc-400">
              Bénéficiaire
              <input required placeholder="Nom ou IBAN" className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-400/60" />
            </label>
            <label className="block space-y-2 text-xs font-medium text-zinc-400">
              Montant
              <input required min="0.01" step="0.01" type="number" placeholder="0,00 €" className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-400/60" />
            </label>
            <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-medium text-white transition hover:brightness-110">
              Continuer
            </button>
          </form>
        )}
      </Modal>
    </>
  );
}
