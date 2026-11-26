import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function GlassCard({ className, interactive = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "group relative isolate rounded-2xl border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition-all duration-300 before:pointer-events-none before:absolute before:-inset-px before:-z-10 before:rounded-[inherit] before:bg-gradient-to-br before:from-violet-500/0 before:via-blue-500/0 before:to-violet-500/0 before:opacity-0 before:blur-xl before:transition-opacity before:duration-300 hover:before:from-violet-500/20 hover:before:via-blue-500/10 hover:before:to-violet-500/20 hover:before:opacity-100",
        interactive && "hover:scale-[1.02] hover:border-violet-300/20",
        className,
      )}
      {...props}
    />
  );
}
