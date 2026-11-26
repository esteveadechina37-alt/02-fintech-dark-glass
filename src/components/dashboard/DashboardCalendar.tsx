"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { GlassCard } from "@/components/ui/GlassCard";

export function DashboardCalendar() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  return (
    <GlassCard interactive className="flex flex-col p-3 sm:p-4 min-[1000px]:min-h-0 min-[1000px]:flex-1">
      <div className="mb-2 min-[1000px]:mb-1">
        <h2 className="text-sm font-medium text-gray-400">Calendrier</h2>
        <p className="mt-1 text-xs capitalize text-zinc-500">
          {selected ? format(selected, "EEEE d MMMM", { locale: fr }) : "Sélectionnez une date"}
        </p>
      </div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        locale={fr}
        showOutsideDays
        classNames={{
          root: "w-full",
          months: "flex w-full justify-center",
          month: "w-full space-y-1",
          month_caption: "flex justify-center py-0",
          caption_label: "text-sm font-medium capitalize text-zinc-200",
          nav: "absolute right-0 top-0 flex gap-1",
          button_previous: "grid h-7 w-7 place-items-center rounded-lg text-zinc-500 transition hover:bg-white/[0.07] hover:text-white",
          button_next: "grid h-7 w-7 place-items-center rounded-lg text-zinc-500 transition hover:bg-white/[0.07] hover:text-white",
          month_grid: "w-full border-collapse",
          weekdays: "",
          weekday: "h-7 text-center text-[10px] font-medium capitalize text-zinc-600 min-[1000px]:h-5",
          week: "",
          day: "h-8 w-8 p-0 text-center text-xs min-[1000px]:h-5",
          day_button: "mx-auto grid h-7 w-7 place-items-center rounded-lg text-[11px] text-zinc-300 transition hover:bg-white/[0.08] min-[1000px]:h-5 min-[1000px]:w-5",
          selected: "[&>button]:bg-violet-500 [&>button]:font-semibold [&>button]:text-white",
          today: "[&>button]:text-violet-300",
          outside: "[&>button]:text-zinc-700",
          disabled: "[&>button]:text-zinc-700 [&>button]:opacity-40",
          hidden: "invisible",
        }}
      />
    </GlassCard>
  );
}
