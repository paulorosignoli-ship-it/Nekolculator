import type { LanguageCode } from "../../lib/i18n";
import type { LegalContent } from "./types";
import { legalEn } from "./en";
import { legalPtBR } from "./pt-BR";
import { legalEs } from "./es";
import { legalJa } from "./ja";

const LEGAL_BY_LANGUAGE: Record<LanguageCode, LegalContent> = {
  en: legalEn,
  "pt-BR": legalPtBR,
  es: legalEs,
  ja: legalJa,
};

export function getLegalContent(language: LanguageCode): LegalContent {
  return LEGAL_BY_LANGUAGE[language] ?? legalEn;
}
