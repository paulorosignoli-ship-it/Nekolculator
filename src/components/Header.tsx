import type { CatTheme } from "../lib/themes";
import type { MascotEmotion } from "../types";
import { Mascot } from "./Mascot";
import { SideControls } from "./SideControls";
import { useTranslation } from "../lib/i18n";

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

  return (
    <div className="mb-3 flex flex-wrap items-start justify-between gap-y-2">
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

      <SideControls
        muted={muted}
        onToggleMute={onToggleMute}
        onCycleTheme={onCycleTheme}
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
      />
    </div>
  );
}
