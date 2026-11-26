"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Wifi } from "lucide-react";
import type { CardTheme } from "@/types";

const themeGradients: Record<CardTheme, string> = {
  violet: "linear-gradient(135deg, #282a58 0%, #3c3190 52%, #7756dc 100%)",
  gold: "linear-gradient(135deg, #47351c 0%, #95702e 52%, #d2a84e 100%)",
  emerald: "linear-gradient(135deg, #123d36 0%, #087b67 52%, #39b98d 100%)",
  dark: "linear-gradient(135deg, #111318 0%, #292d35 52%, #555b66 100%)",
};

export function CreditCard3D({ theme = "violet" }: { theme?: CardTheme }) {
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const rotateX = useSpring(useTransform(pointerY, [0, 100], [9, -9]), {
    stiffness: 160,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(pointerX, [0, 100], [-12, 12]), {
    stiffness: 160,
    damping: 20,
  });
  const reflection = useMotionTemplate`radial-gradient(circle at ${pointerX}% ${pointerY}%, rgba(255,255,255,0.26), transparent 42%)`;

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  }

  function resetPointer() {
    pointerX.set(50);
    pointerY.set(50);
  }

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          backgroundImage: themeGradients[theme],
        }}
        className="relative aspect-[1.65/1] w-full overflow-hidden rounded-[22px] border border-white/20 p-4 shadow-[0_22px_60px_-28px_rgba(99,102,241,0.65)] transition-all duration-300 hover:scale-[1.02] sm:p-5 min-[1000px]:aspect-[2.1/1]"
      >
        <motion.div className="absolute inset-0 opacity-80" style={{ background: reflection }} />
        <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute -bottom-24 left-5 h-44 w-56 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="relative flex h-full flex-col justify-between" style={{ transform: "translateZ(28px)" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">Nexora premium</p>
              <p className="mt-1 text-sm font-medium tracking-wide text-white/90">World Debit</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-5 w-5 rounded-full bg-[#ff5f55]/90" />
              <span className="-ml-2 h-5 w-5 rounded-full bg-[#ffb23f]/85" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-7 w-9 place-items-center rounded-md border border-white/35 bg-white/15">
                  <span className="h-3.5 w-5 rounded-[3px] border border-white/50" />
                </span>
                <Wifi className="rotate-90 text-white/70" size={19} />
              </div>
              <p className="font-mono text-[15px] tracking-[0.18em] text-white/90">•••• &nbsp;•••• &nbsp;•••• &nbsp;4829</p>
              <div className="mt-3 flex gap-8 text-[9px] uppercase tracking-[0.16em] text-white/55">
                <span>Alex Dupont</span>
                <span>09/28</span>
              </div>
            </div>
            <span className="text-[9px] font-bold italic tracking-wide text-white/70">VISA</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
