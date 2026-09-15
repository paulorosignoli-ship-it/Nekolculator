import type { CSSProperties } from "react";
import { useLanguage, useTranslation } from "../lib/i18n";
import { PawIcon, SoundIcon, MuteIcon, SunIcon, MoonIcon } from "./Icons";

interface SideControlsProps {
  muted: boolean;
  onToggleMute: () => void;
  onCycleTheme: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const buttonStyle: CSSProperties = {
  backgroundColor: "var(--color-body)",
  border: "1.5px solid var(--color-body-border)",
};

export function SideControls({ muted, onToggleMute, onCycleTheme, darkMode, onToggleDarkMode }: SideControlsProps) {
  const t = useTranslation();
  const { currentOption, cycleLanguage } = useLanguage();

  return (
    <div className="absolute right-3 top-3 z-20 flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onCycleTheme}
        aria-label={t.header.themeButton}
        title={t.header.themeButton}
        className="btn-press flex h-9 w-9 items-center justify-center rounded-full shadow-soft"
        style={buttonStyle}
      >
        <PawIcon color="var(--color-accent)" />
      </button>
      <button
        type="button"
        onClick={onToggleDarkMode}
        aria-label={darkMode ? t.header.darkModeOff : t.header.darkModeOn}
        title={darkMode ? t.header.darkModeOff : t.header.darkModeOn}
        className="btn-press flex h-9 w-9 items-center justify-center rounded-full shadow-soft"
        style={buttonStyle}
      >
        {darkMode ? <SunIcon color="var(--color-accent)" /> : <MoonIcon color="var(--color-accent)" />}
      </button>
      <button
        type="button"
        onClick={onToggleMute}
        aria-label={muted ? t.header.unmuteButton : t.header.muteButton}
        title={muted ? t.header.unmuteButton : t.header.muteButton}
        className="btn-press flex h-9 w-9 items-center justify-center rounded-full shadow-soft"
        style={buttonStyle}
      >
        {muted ? <MuteIcon color="var(--color-accent)" /> : <SoundIcon color="var(--color-accent)" />}
      </button>

      <button
        type="button"
        onClick={cycleLanguage}
        aria-label={t.header.languageButton}
        title={t.header.languageButton}
        className="btn-press mt-1.5 flex h-9 w-9 items-center justify-center rounded-full text-base shadow-soft"
        style={buttonStyle}
      >
        <span aria-hidden="true">{currentOption.flag}</span>
      </button>
    </div>
  );
}
