import { useEffect, useState } from "react";
import { useTranslation } from "../lib/i18n";
import type { LegalView } from "../types";

const STORAGE_KEY = "nekolculator-cookie-consent";

export type CookieConsentValue = "all" | "necessary";

export function getStoredConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "all" || v === "necessary" ? v : null;
}

interface CookieConsentProps {
  forceOpen: boolean;
  onResolved: (value: CookieConsentValue) => void;
  onNavigate: (view: LegalView) => void;
}

export function CookieConsent({ forceOpen, onResolved, onNavigate }: CookieConsentProps) {
  const t = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (forceOpen) {
      setVisible(true);
      return;
    }
    setVisible(getStoredConsent() === null);
  }, [forceOpen]);

  if (!visible) return null;

  const choose = (value: CookieConsentValue) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
    onResolved(value);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
      <div
        className="pointer-events-auto w-full max-w-md animate-pop-in rounded-2xl p-4 shadow-soft"
        style={{ backgroundColor: "var(--color-body)", border: "1.5px solid var(--color-body-border)" }}
        role="dialog"
        aria-live="polite"
      >
        <p className="mb-3 text-xs leading-relaxed" style={{ color: "var(--color-display)" }}>
          {t.cookies.message}{" "}
          <button
            type="button"
            className="underline decoration-dotted underline-offset-2"
            onClick={() => onNavigate("cookies")}
          >
            {t.cookies.bannerPolicyLinkText}
          </button>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => choose("necessary")}
            className="btn-press flex-1 rounded-full py-2 text-xs font-bold"
            style={{ backgroundColor: "var(--color-op-btn)", color: "var(--color-op-btn-text)" }}
          >
            {t.cookies.necessaryOnly}
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="btn-press flex-1 rounded-full py-2 text-xs font-bold"
            style={{ backgroundColor: "var(--color-equals-btn)", color: "var(--color-equals-btn-text)" }}
          >
            {t.cookies.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
