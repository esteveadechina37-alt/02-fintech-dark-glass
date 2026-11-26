"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "@/components/dashboard/Sidebar";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Fermer le menu"
            className="absolute inset-0 h-full w-full bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            className="absolute inset-y-0 left-0 w-[288px] max-w-[85vw] p-3"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <Sidebar className="w-full" onNavigate={onClose} />
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
