import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Translations } from "./types";
import { en } from "./en";
import { ptBR } from "./pt-BR";
import { es } from "./es";
import { ja } from "./ja";

export type LanguageCode = "en" | "pt-BR" | "es" | "ja";

export interface LanguageOption {
  code: LanguageCode;
  flag: string;
  label: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "pt-BR", flag: "🇧🇷", label: "Português (Brasil)" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
];

const DICTS: Record<LanguageCode, Translations> = {
  en,
  "pt-BR": ptBR,
  es,
  ja,
};

const STORAGE_KEY = "nekolculator-language";

function detectInitialLanguage(): LanguageCode {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
  if (saved && DICTS[saved]) return saved;
  const nav = window.navigator?.language ?? "en";
  if (nav.toLowerCase().startsWith("pt")) return "pt-BR";
  if (nav.toLowerCase().startsWith("es")) return "es";
  if (nav.toLowerCase().startsWith("ja")) return "ja";
  return "en";
}

interface LanguageContextValue {
  language: LanguageCode;
  t: Translations;
  setLanguage: (code: LanguageCode) => void;
  cycleLanguage: () => void;
  currentOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(detectInitialLanguage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = useCallback((code: LanguageCode) => setLanguageState(code), []);

  const cycleLanguage = useCallback(() => {
    setLanguageState((current) => {
      const idx = LANGUAGES.findIndex((l) => l.code === current);
      return LANGUAGES[(idx + 1) % LANGUAGES.length].code;
    });
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const currentOption = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];
    return { language, t: DICTS[language], setLanguage, cycleLanguage, currentOption };
  }, [language, setLanguage, cycleLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

/** Convenience hook when a component only needs the translation dictionary. */
export function useTranslation(): Translations {
  return useLanguage().t;
}
