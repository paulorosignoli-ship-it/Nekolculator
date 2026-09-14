import { useCallback, useEffect, useState } from "react";
import { applyThemeToRoot, getRandomTheme, themes, type CatTheme } from "../lib/themes";

const STORAGE_KEY = "nekolculator-theme-id";

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

  useEffect(() => {
    applyThemeToRoot(theme);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, theme.id);
    }
  }, [theme]);

  const cycleTheme = useCallback(() => {
    setTheme((current) => {
      const idx = themes.findIndex((t) => t.id === current.id);
      return themes[(idx + 1) % themes.length];
    });
  }, []);

  const randomizeTheme = useCallback(() => {
    setTheme((current) => getRandomTheme(current.id));
  }, []);

  return { theme, cycleTheme, randomizeTheme, allThemes: themes, setTheme };
}
