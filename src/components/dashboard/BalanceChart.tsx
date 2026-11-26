"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BalancePoint } from "@/types";
import { balanceHistory } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

export function BalanceChart({ className }: { className?: string }) {
  const data = useMemo<BalancePoint[]>(() => balanceHistory, []);

  return (
    <div className={cn("h-[210px] w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.34} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="balanceStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.055)" strokeDasharray="3 5" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717a", fontSize: 10 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#71717a", fontSize: 10 }}
            tickFormatter={(value: number) => `${value / 1000}k`}
            ticks={[10000, 15000, 20000, 25000, 30000]}
          />
          <Tooltip
            cursor={{ stroke: "rgba(167,139,250,0.3)", strokeDasharray: "4 4" }}
            contentStyle={{
              background: "rgba(17,17,20,0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              color: "#f4f4f5",
              fontSize: 12,
              backdropFilter: "blur(18px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
              padding: "10px 12px",
            }}
            formatter={(value) => [
              new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Number(value)),
              "Solde",
            ]}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="url(#balanceStroke)"
            strokeWidth={2.5}
            fill="url(#balanceFill)"
            activeDot={{ r: 4, fill: "#a78bfa", stroke: "#18181b", strokeWidth: 3 }}
            isAnimationActive={true}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
