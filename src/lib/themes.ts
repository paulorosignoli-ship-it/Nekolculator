import { darken, lighten } from "./color";

export type CatPattern =
  | "tabby"
  | "void"
  | "siamese"
  | "calico"
  | "fluffy"
  | "tuxedo"
  | "kitten"
  | "jaguar"
  | "solid"
  | "rosette"
  | "tortoiseshell"
  | "hairless";

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
  {
    id: "jaguar",
    name: "Jaguar",
    tagline: "Prowling through the jungle...",
    colors: {
      bg: "#FAE6D3",
      body: "#FFF8F0",
      bodyBorder: "#F0CFA8",
      display: "#2A1810",
      displayText: "#FFEEDC",
      displaySubText: "#E0A46E",
      numBtn: "#FCEEDD",
      numBtnText: "#2A1810",
      opBtn: "#D98A3E",
      opBtnText: "#FFFFFF",
      equalsBtn: "#A8321E",
      equalsBtnText: "#FFFFFF",
      accent: "#A8321E",
      accentSoft: "#F0CFA8",
    },
    pattern: "jaguar",
    furColor: "#E8A050",
    furAccent: "#2B1B12",
    eyeColor: "#8FA83A",
    soundPitch: 0.85,
  },
  {
    id: "brown-tabby",
    name: "Brown Tabby",
    tagline: "Stalking the sunbeam...",
    colors: {
      bg: "#EDE6D6",
      body: "#F9F5EC",
      bodyBorder: "#D9CBAE",
      display: "#2A2419",
      displayText: "#F5EFE0",
      displaySubText: "#B8A87C",
      numBtn: "#F3EEE1",
      numBtnText: "#2A2419",
      opBtn: "#9C8A5C",
      opBtnText: "#FFFFFF",
      equalsBtn: "#6B7A4F",
      equalsBtnText: "#FFFFFF",
      accent: "#6B7A4F",
      accentSoft: "#D9CBAE",
    },
    pattern: "tabby",
    furColor: "#B89A6E",
    furAccent: "#4A3C24",
    eyeColor: "#7A9B4A",
    soundPitch: 1.0,
  },
  {
    id: "russian-gray",
    name: "Russian Gray",
    tagline: "Quietly crunching the numbers...",
    colors: {
      bg: "#E6ECEA",
      body: "#F7FBFA",
      bodyBorder: "#CBDAD6",
      display: "#232B29",
      displayText: "#EFF7F4",
      displaySubText: "#94B0AA",
      numBtn: "#EEF5F3",
      numBtnText: "#232B29",
      opBtn: "#6E8A85",
      opBtnText: "#FFFFFF",
      equalsBtn: "#3D6B63",
      equalsBtnText: "#FFFFFF",
      accent: "#3D6B63",
      accentSoft: "#CBDAD6",
    },
    pattern: "solid",
    furColor: "#A9B4B2",
    furAccent: "#7C8886",
    eyeColor: "#7FCC9E",
    soundPitch: 1.05,
  },
  {
    id: "tortoiseshell",
    name: "Tortoiseshell",
    tagline: "A patchwork of pounces...",
    colors: {
      bg: "#F3E7DE",
      body: "#FCF6F0",
      bodyBorder: "#E3C7AE",
      display: "#2E1F16",
      displayText: "#FBEEE0",
      displaySubText: "#D19E6E",
      numBtn: "#F8EDE1",
      numBtnText: "#2E1F16",
      opBtn: "#8A5A34",
      opBtnText: "#FFFFFF",
      equalsBtn: "#402A1E",
      equalsBtnText: "#FFF3E4",
      accent: "#B5652E",
      accentSoft: "#E3C7AE",
    },
    pattern: "tortoiseshell",
    furColor: "#C9793A",
    furAccent: "#231712",
    eyeColor: "#8FA84A",
    soundPitch: 0.95,
  },
  {
    id: "bengal",
    name: "Bengal",
    tagline: "Wild spots, sharp math...",
    colors: {
      bg: "#FBF0DC",
      body: "#FFFAF0",
      bodyBorder: "#F0D9A8",
      display: "#24211A",
      displayText: "#FFF6E2",
      displaySubText: "#D9B36E",
      numBtn: "#FBF2DF",
      numBtnText: "#24211A",
      opBtn: "#D9A23E",
      opBtnText: "#2A2010",
      equalsBtn: "#1E8A8A",
      equalsBtnText: "#FFFFFF",
      accent: "#1E8A8A",
      accentSoft: "#F0D9A8",
    },
    pattern: "rosette",
    furColor: "#E3A94E",
    furAccent: "#3A2414",
    eyeColor: "#6B4A28",
    soundPitch: 1.0,
  },
  {
    id: "sphynx",
    name: "Sphynx",
    tagline: "Sleek, bald, and brilliant...",
    colors: {
      bg: "#F3E9EA",
      body: "#FCF6F7",
      bodyBorder: "#E4CFD2",
      display: "#2B2224",
      displayText: "#F7EBEA",
      displaySubText: "#C79FA4",
      numBtn: "#F7EDEE",
      numBtnText: "#2B2224",
      opBtn: "#A9878C",
      opBtnText: "#FFFFFF",
      equalsBtn: "#6E4650",
      equalsBtnText: "#FFF3F4",
      accent: "#6E4650",
      accentSoft: "#E4CFD2",
    },
    pattern: "hairless",
    furColor: "#E4C7C2",
    furAccent: "#B99490",
    eyeColor: "#8FC4D6",
    soundPitch: 1.1,
  },
];

export function getRandomTheme(excludeId?: string): CatTheme {
  const pool = excludeId ? themes.filter((t) => t.id !== excludeId) : themes;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getThemeById(id: string): CatTheme {
  return themes.find((t) => t.id === id) ?? themes[0];
}

/** Programmatically derives a dark-mode palette from a theme's light palette.
 * Keeps each theme's hue/personality but swaps light surfaces for dark ones
 * and flips their paired text colors, so every theme gets a dark mode for free.
 */
export function getDarkColors(colors: ThemeColors): ThemeColors {
  return {
    bg: darken(colors.bg, 12, 0.7),
    body: darken(colors.body, 17, 0.6),
    bodyBorder: darken(colors.bodyBorder, 26, 0.6),
    display: darken(colors.display, 8, 0.8),
    displayText: colors.displayText,
    displaySubText: colors.displaySubText,
    numBtn: darken(colors.numBtn, 24, 0.5),
    numBtnText: lighten(colors.numBtnText, 92),
    opBtn: darken(colors.opBtn, 38),
    opBtnText: colors.opBtnText,
    equalsBtn: colors.equalsBtn,
    equalsBtnText: colors.equalsBtnText,
    accent: lighten(colors.accent, 62),
    accentSoft: darken(colors.accentSoft, 28, 0.6),
  };
}

export function applyThemeToRoot(theme: CatTheme, darkMode = false) {
  const root = document.documentElement;
  const colors = darkMode ? getDarkColors(theme.colors) : theme.colors;
  const map: Record<string, string> = {
    "--color-bg": colors.bg,
    "--color-body": colors.body,
    "--color-body-border": colors.bodyBorder,
    "--color-display": colors.display,
    "--color-display-text": colors.displayText,
    "--color-display-subtext": colors.displaySubText,
    "--color-num-btn": colors.numBtn,
    "--color-num-btn-text": colors.numBtnText,
    "--color-op-btn": colors.opBtn,
    "--color-op-btn-text": colors.opBtnText,
    "--color-equals-btn": colors.equalsBtn,
    "--color-equals-btn-text": colors.equalsBtnText,
    "--color-accent": colors.accent,
    "--color-accent-soft": colors.accentSoft,
  };
  for (const [key, value] of Object.entries(map)) {
    root.style.setProperty(key, value);
  }
  root.classList.toggle("dark", darkMode);
}
