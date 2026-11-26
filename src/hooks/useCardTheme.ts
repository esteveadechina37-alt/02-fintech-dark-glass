"use client";

import { useCallback, useEffect, useState } from "react";
import type { CardTheme } from "@/types";

const storageKey = "nexora-card-theme";
const themes: CardTheme[] = ["violet", "gold", "emerald", "dark"];

function isCardTheme(value: string | null): value is CardTheme {
  return value !== null && themes.some((theme) => theme === value);
}

export function useCardTheme() {
  const [theme, setThemeState] = useState<CardTheme>("violet");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(storageKey);
    if (isCardTheme(storedTheme)) setThemeState(storedTheme);
  }, []);

  const setTheme = useCallback((nextTheme: CardTheme) => {
    setThemeState(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
  }, []);

  return { theme, setTheme };
}
