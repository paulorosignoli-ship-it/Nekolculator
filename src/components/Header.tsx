import type { CatTheme } from "../lib/themes";
import type { MascotEmotion } from "../types";
import { Mascot } from "./Mascot";
import { useTranslation } from "../lib/i18n";

interface HeaderProps {
  theme: CatTheme;
  emotion: MascotEmotion;
}

/** Mascot + title only — the theme/dark-mode/volume/language buttons now live
 * in SideControls, a vertical rail on the right edge of the card. */
export function Header({ theme, emotion }: HeaderProps) {
  const t = useTranslation();

  return (
    <div className="flex items-center gap-2.5 py-1 pr-14">
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
  );
}
