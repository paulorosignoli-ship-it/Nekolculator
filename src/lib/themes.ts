export type CatPattern = "tabby" | "void" | "siamese" | "calico" | "fluffy" | "tuxedo" | "kitten";

export interface ThemeColors {
  bg: string; // page background
  body: string; // calculator card background
  bodyBorder: string;
  display: string; // display screen background
  displayText: string;
  displaySubText: string;
  numBtn: string; // number button background
  numBtnText: string;
  opBtn: string; // operator/secondary button background
  opBtnText: string;
  equalsBtn: string; // primary action / equals button
  equalsBtnText: string;
  accent: string; // pill tabs, highlights
  accentSoft: string;
}

export interface CatTheme {
  id: string;
  name: string;
  tagline: string;
  colors: ThemeColors;
  pattern: CatPattern;
  furColor: string;
  furAccent: string;
  eyeColor: string;
  soundPitch: number; // multiplier applied to all synthesized sounds
}

export const themes: CatTheme[] = [
  {
    id: "orange-tabby",
    name: "Orange Tabby",
    tagline: "Ready to pounce...",
    colors: {
      bg: "#FDEED9",
      body: "#FFF9F2",
      bodyBorder: "#F8D8B8",
      display: "#2D1B14",
      displayText: "#FFF3E4",
      displaySubText: "#E8B98C",
      numBtn: "#FFF3E7",
      numBtnText: "#2D1B14",
      opBtn: "#F4A671",
      opBtnText: "#2D1B14",
      equalsBtn: "#E25B45",
      equalsBtnText: "#FFF9F2",
      accent: "#E25B45",
      accentSoft: "#F8D8B8",
    },
    pattern: "tabby",
    furColor: "#E8925A",
    furAccent: "#C96B3B",
    eyeColor: "#6B9B3B",
    soundPitch: 1,
  },
  {
    id: "black-void",
    name: "Black Void",
    tagline: "Silently calculating...",
    colors: {
      bg: "#EDE7F6",
      body: "#F7F4FB",
      bodyBorder: "#D9CFEE",
      display: "#171018",
      displayText: "#F1E9FF",
      displaySubText: "#A78FD1",
      numBtn: "#F0EAF9",
      numBtnText: "#1A1420",
      opBtn: "#8A6FC9",
      opBtnText: "#FFFFFF",
      equalsBtn: "#4B2E83",
      equalsBtnText: "#FFFFFF",
      accent: "#4B2E83",
      accentSoft: "#D9CFEE",
    },
    pattern: "void",
    furColor: "#221A2B",
    furAccent: "#4B2E83",
    eyeColor: "#C9A6FF",
    soundPitch: 0.78,
  },
  {
    id: "siamese-point",
    name: "Siamese Point",
    tagline: "Vocalizing a calculation...",
    colors: {
      bg: "#EFEAE0",
      body: "#FBF8F1",
      bodyBorder: "#E3D9C4",
      display: "#3A2E22",
      displayText: "#FDF6E9",
      displaySubText: "#C7A97C",
      numBtn: "#F6EFDF",
      numBtnText: "#3A2E22",
      opBtn: "#8C6A4A",
      opBtnText: "#FFF9F0",
      equalsBtn: "#4F708A",
      equalsBtnText: "#FFFFFF",
      accent: "#4F708A",
      accentSoft: "#E3D9C4",
    },
    pattern: "siamese",
    furColor: "#F1E2C6",
    furAccent: "#5B4636",
    eyeColor: "#4F98C9",
    soundPitch: 1.08,
  },
  {
    id: "calico",
    name: "Calico",
    tagline: "Patchwork math in progress...",
    colors: {
      bg: "#FBEFE7",
      body: "#FFFAF4",
      bodyBorder: "#F3D9C4",
      display: "#332018",
      displayText: "#FFF3E9",
      displaySubText: "#E3A876",
      numBtn: "#FDF1E4",
      numBtnText: "#332018",
      opBtn: "#D98A4E",
      opBtnText: "#FFFFFF",
      equalsBtn: "#B24A5B",
      equalsBtnText: "#FFFFFF",
      accent: "#B24A5B",
      accentSoft: "#F3D9C4",
    },
    pattern: "calico",
    furColor: "#FBF3E7",
    furAccent: "#D9782E",
    eyeColor: "#5A8C5A",
    soundPitch: 1.02,
  },
  {
    id: "fluffy-white",
    name: "Fluffy White",
    tagline: "Softly summing it up...",
    colors: {
      bg: "#EAF2F4",
      body: "#FBFEFF",
      bodyBorder: "#D7E7EA",
      display: "#233238",
      displayText: "#F2FBFD",
      displaySubText: "#9FC4CC",
      numBtn: "#F1FAFB",
      numBtnText: "#233238",
      opBtn: "#7FB3BE",
      opBtnText: "#FFFFFF",
      equalsBtn: "#3E8996",
      equalsBtnText: "#FFFFFF",
      accent: "#3E8996",
      accentSoft: "#D7E7EA",
    },
    pattern: "fluffy",
    furColor: "#FFFFFF",
    furAccent: "#E4EEF0",
    eyeColor: "#7EC2CE",
    soundPitch: 1.15,
  },
  {
    id: "tuxedo",
    name: "Tuxedo",
    tagline: "Dressed for the occasion...",
    colors: {
      bg: "#ECEDEF",
      body: "#FAFAFB",
      bodyBorder: "#D8DADD",
      display: "#1B1D22",
      displayText: "#F3F4F6",
      displaySubText: "#9AA0AC",
      numBtn: "#F1F2F4",
      numBtnText: "#1B1D22",
      opBtn: "#5C6470",
      opBtnText: "#FFFFFF",
      equalsBtn: "#232730",
      equalsBtnText: "#FFFFFF",
      accent: "#232730",
      accentSoft: "#D8DADD",
    },
    pattern: "tuxedo",
    furColor: "#20222A",
    furAccent: "#FFFFFF",
    eyeColor: "#F4C542",
    soundPitch: 0.9,
  },
  {
    id: "kitten",
    name: "Kitten",
    tagline: "Tiny paws, tiny numbers...",
    colors: {
      bg: "#FDEAF0",
      body: "#FFF8FB",
      bodyBorder: "#F7D3E2",
      display: "#3A222D",
      displayText: "#FFF1F7",
      displaySubText: "#E5A6C3",
      numBtn: "#FDEFF5",
      numBtnText: "#3A222D",
      opBtn: "#F3A8C4",
      opBtnText: "#3A222D",
      equalsBtn: "#E2578C",
      equalsBtnText: "#FFFFFF",
      accent: "#E2578C",
      accentSoft: "#F7D3E2",
    },
    pattern: "kitten",
    furColor: "#F6D8B8",
    furAccent: "#E8A165",
    eyeColor: "#7FB6E8",
    soundPitch: 1.35,
  },
];

export function getRandomTheme(excludeId?: string): CatTheme {
  const pool = excludeId ? themes.filter((t) => t.id !== excludeId) : themes;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getThemeById(id: string): CatTheme {
  return themes.find((t) => t.id === id) ?? themes[0];
}

export function applyThemeToRoot(theme: CatTheme) {
  const root = document.documentElement;
  const map: Record<string, string> = {
    "--color-bg": theme.colors.bg,
    "--color-body": theme.colors.body,
    "--color-body-border": theme.colors.bodyBorder,
    "--color-display": theme.colors.display,
    "--color-display-text": theme.colors.displayText,
    "--color-display-subtext": theme.colors.displaySubText,
    "--color-num-btn": theme.colors.numBtn,
    "--color-num-btn-text": theme.colors.numBtnText,
    "--color-op-btn": theme.colors.opBtn,
    "--color-op-btn-text": theme.colors.opBtnText,
    "--color-equals-btn": theme.colors.equalsBtn,
    "--color-equals-btn-text": theme.colors.equalsBtnText,
    "--color-accent": theme.colors.accent,
    "--color-accent-soft": theme.colors.accentSoft,
  };
  for (const [key, value] of Object.entries(map)) {
    root.style.setProperty(key, value);
  }
}
