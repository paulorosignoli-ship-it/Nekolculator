export type CalculatorMode = "basic" | "scientific" | "financial" | "hp";

export interface ModeTabDef {
  id: CalculatorMode;
  label: string;
  shortLabel: string;
}

export type MascotEmotion = "idle" | "happy" | "confused" | "sleepy";
