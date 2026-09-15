export type CalculatorMode = "basic" | "scientific" | "financial" | "hp";

export type LegalView = "privacy" | "terms" | "cookies";
export type AppView = "calculator" | LegalView;

export interface ModeTabDef {
  id: CalculatorMode;
  label: string;
  shortLabel: string;
}

export type MascotEmotion = "idle" | "happy" | "confused" | "sleepy";
