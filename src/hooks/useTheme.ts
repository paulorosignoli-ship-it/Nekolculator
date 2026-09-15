import { useCallback, useEffect, useState } from "react";
import { applyThemeToRoot, getRandomTheme, themes, type CatTheme } from "../lib/themes";

const STORAGE_KEY = "nekolculator-theme-id";
const DARK_STORAGE_KEY = "nekolculator-dark-mode";

function getInitialDarkMode(): boolean {
  if (typeof window === "undefined") return false;
  const saved = window.localStorage.getItem(DARK_STORAGE_KEY);
  if (saved === "1") return true;
  if (saved === "0") return false;
  // No explicit preference yet — respect the OS/browser setting.
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export function useTheme() {
  const [theme, setTheme] = useState<CatTheme>(() => {
    if (typeof window !== "undefined") {
      const saved = window.sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const found = themes.find((t) => t.id === saved);
        if (found) return found;
      }
    }
    return getRandomTheme();
  });

  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);

  useEffect(() => {
    applyThemeToRoot(theme, darkMode);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, theme.id);
      window.localStorage.setItem(DARK_STORAGE_KEY, darkMode ? "1" : "0");
    }
  }, [theme, darkMode]);

  const cycleTheme = useCallback(() => {
    setTheme((current) => {
      const idx = themes.findIndex((t) => t.id === current.id);
      return themes[(idx + 1) % themes.length];
    });
  }, []);

  const randomizeTheme = useCallback(() => {
    setTheme((current) => getRandomTheme(current.id));
  }, []);

  const toggleDarkMode = useCallback(() => setDarkMode((d) => !d), []);

  return { theme, cycleTheme, randomizeTheme, allThemes: themes, setTheme, darkMode, toggleDarkMode };
}
