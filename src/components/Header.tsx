import type { CatTheme } from "../lib/themes";
import type { MascotEmotion } from "../types";
import { Mascot } from "./Mascot";
import { useLanguage, useTranslation } from "../lib/i18n";

interface HeaderProps {
  theme: CatTheme;
  emotion: MascotEmotion;
  muted: boolean;
  onToggleMute: () => void;
  onCycleTheme: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({
  theme,
  emotion,
  muted,
  onToggleMute,
  onCycleTheme,
  darkMode,
  onToggleDarkMode,
}: HeaderProps) {
  const t = useTranslation();
  const { currentOption, cycleLanguage } = useLanguage();

  return (
    <div className="flex flex-wrap items-center justify-between gap-y-2 px-1 pb-3">
      <div className="flex items-center gap-2.5">
        <Mascot theme={theme} emotion={emotion} size={44} />
        <div>
          <h1 className="font-rounded text-lg font-bold leading-tight" style={{ color: "var(--color-display)" }}>
            {t.common.appName}
          </h1>
          <p className="text-[11px] leading-tight" style={{ color: "var(--color-accent)" }}>
            {theme.name}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-1.5">
        <button
          type="button"
          onClick={cycleLanguage}
          aria-label={t.header.languageButton}
          title={t.header.languageButton}
          className="btn-press flex h-9 w-9 items-center justify-center rounded-full text-base shadow-soft"
          style={{ backgroundColor: "var(--color-body)", border: "1.5px solid var(--color-body-border)" }}
        >
          <span aria-hidden="true">{currentOption.flag}</span>
        </button>
        <button
          type="button"
          onClick={onCycleTheme}
          aria-label={t.header.themeButton}
          title={t.header.themeButton}
          className="btn-press flex h-9 w-9 items-center justify-center rounded-full shadow-soft"
          style={{ backgroundColor: "var(--color-body)", border: "1.5px solid var(--color-body-border)" }}
        >
          <PawIcon color="var(--color-accent)" />
        </button>
        <button
          type="button"
          onClick={onToggleDarkMode}
          aria-label={darkMode ? t.header.darkModeOff : t.header.darkModeOn}
          title={darkMode ? t.header.darkModeOff : t.header.darkModeOn}
          className="btn-press flex h-9 w-9 items-center justify-center rounded-full shadow-soft"
          style={{ backgroundColor: "var(--color-body)", border: "1.5px solid var(--color-body-border)" }}
        >
          {darkMode ? <SunIcon color="var(--color-accent)" /> : <MoonIcon color="var(--color-accent)" />}
        </button>
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={muted ? t.header.unmuteButton : t.header.muteButton}
          title={muted ? t.header.unmuteButton : t.header.muteButton}
          className="btn-press flex h-9 w-9 items-center justify-center rounded-full shadow-soft"
          style={{ backgroundColor: "var(--color-body)", border: "1.5px solid var(--color-body-border)" }}
        >
          {muted ? <MuteIcon color="var(--color-accent)" /> : <SoundIcon color="var(--color-accent)" />}
        </button>
      </div>
    </div>
  );
}

function PawIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 100 100" fill={color}>
      <ellipse cx="50" cy="66" rx="24" ry="19" />
      <ellipse cx="26" cy="38" rx="10" ry="13" />
      <ellipse cx="42" cy="26" rx="10" ry="13" />
      <ellipse cx="58" cy="26" rx="10" ry="13" />
      <ellipse cx="74" cy="38" rx="10" ry="13" />
    </svg>
  );
}

function SoundIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="4 9 8 9 12 5 12 19 8 15 4 15" fill={color} stroke="none" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 6a8.5 8.5 0 0 1 0 12" />
    </svg>
  );
}

function MuteIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="4 9 8 9 12 5 12 19 8 15 4 15" fill={color} stroke="none" />
      <path d="M17 9l5 6M22 9l-5 6" />
    </svg>
  );
}

function SunIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
    </svg>
  );
}

function MoonIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color} stroke="none">
      <path d="M20.5 14.5a8.5 8.5 0 1 1-9-11.9 7 7 0 0 0 9 11.9Z" />
    </svg>
  );
}
