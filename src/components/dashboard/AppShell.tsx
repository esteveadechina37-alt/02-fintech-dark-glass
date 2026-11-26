"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { MobileMenu } from "@/components/dashboard/MobileMenu";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isOverview = pathname === "/";

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#050505] text-white min-[1000px]:h-screen min-[1000px]:overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed -left-40 -top-40 z-0 h-[28rem] w-[28rem] rounded-full bg-violet-700/15 blur-[100px]"
        animate={{ x: [0, 35, 0], y: [0, 25, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed -bottom-48 right-[-8rem] z-0 h-[32rem] w-[32rem] rounded-full bg-blue-700/10 blur-[110px]"
        animate={{ x: [0, -30, 0], y: [0, -28, 0], scale: [1.05, 0.94, 1.05] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-[48%] top-[40%] z-0 h-[18rem] w-[18rem] rounded-full bg-indigo-600/[0.07] blur-[100px]"
        animate={{ x: [0, 24, 0], y: [0, -22, 0] }}
        transition={{ duration: 31, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="dashboard-shell relative z-10 mx-auto flex min-h-screen max-w-[1600px] gap-4 p-3 sm:p-4 min-[1000px]:h-full min-[1000px]:min-h-0 min-[1000px]:overflow-hidden">
        <Sidebar className="sticky top-4 hidden h-[calc(100vh-2rem)] bg-white/[0.02] md:flex min-[1000px]:top-4 min-[1000px]:h-full" />
        <div className="flex min-w-0 flex-1 flex-col min-[1000px]:h-full min-[1000px]:min-h-0">
          <Topbar onMenuOpen={() => setMenuOpen(true)} />
          <main
            className={cn(
              "mx-auto mt-6 w-full max-w-[1320px] flex-1",
              isOverview
                ? "min-[1000px]:mt-3 min-[1000px]:min-h-0 min-[1000px]:overflow-hidden"
                : "min-[1000px]:mt-3 min-[1000px]:min-h-0 min-[1000px]:overflow-y-auto",
            )}
          >
            {children}
          </main>
          <footer className="mx-auto mt-6 hidden max-w-[1320px] pb-2 text-center text-[11px] text-zinc-700 min-[1000px]:hidden">
            Vos données financières restent privées et sécurisées.
          </footer>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
