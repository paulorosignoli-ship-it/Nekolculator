import { useTranslation } from "../lib/i18n";
import type { LegalView } from "../types";

interface FooterProps {
  onNavigate: (view: LegalView) => void;
  onOpenCookieSettings: () => void;
}

export function Footer({ onNavigate, onOpenCookieSettings }: FooterProps) {
  const t = useTranslation();

  const linkClass = "underline decoration-dotted underline-offset-2 opacity-70 hover:opacity-100";

  return (
    <div className="mt-4 flex flex-col items-center gap-1.5 text-center">
      <div
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px]"
        style={{ color: "var(--color-display)" }}
      >
        <button type="button" className={linkClass} onClick={() => onNavigate("privacy")}>
          {t.footer.privacy}
        </button>
        <button type="button" className={linkClass} onClick={() => onNavigate("terms")}>
          {t.footer.terms}
        </button>
        <button type="button" className={linkClass} onClick={() => onNavigate("cookies")}>
          {t.footer.cookies}
        </button>
        <button type="button" className={linkClass} onClick={onOpenCookieSettings}>
          {t.footer.cookieSettings}
        </button>
      </div>
      <p className="text-[10px] opacity-50" style={{ color: "var(--color-display)" }}>
        {t.common.footer}
      </p>
    </div>
  );
}
