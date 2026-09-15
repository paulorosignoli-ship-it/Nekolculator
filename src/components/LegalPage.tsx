import type { LegalDocument } from "../content/legal/types";
import { useLanguage, useTranslation } from "../lib/i18n";

interface LegalPageProps {
  document: LegalDocument;
  onBack: () => void;
}

export function LegalPage({ document, onBack }: LegalPageProps) {
  const t = useTranslation();
  const { language } = useLanguage();

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="btn-press mb-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
        style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-display)" }}
      >
        <span aria-hidden="true">←</span> {t.footer.backToCalculator}
      </button>

      <h1 className="font-rounded text-xl font-bold" style={{ color: "var(--color-display)" }}>
        {document.title}
      </h1>
      <p className="mb-4 mt-1 text-xs opacity-70" style={{ color: "var(--color-display)" }}>
        {t.footer.lastUpdated}: {document.effectiveDate}
      </p>

      {language !== "en" && (
        <p
          className="mb-4 rounded-xl px-3 py-2 text-[11px] leading-relaxed"
          style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-display)" }}
        >
          {t.footer.translationNotice}
        </p>
      )}

      <div className="max-h-[55vh] overflow-y-auto rounded-2xl p-4 text-sm leading-relaxed" style={{ backgroundColor: "var(--color-num-btn)", color: "var(--color-num-btn-text)" }}>
        {document.intro.map((p, i) => (
          <p key={`intro-${i}`} className="mb-3">
            {p}
          </p>
        ))}

        {document.sections.map((section) => (
          <div key={section.heading} className="mb-4">
            <h2 className="mb-1.5 font-rounded text-sm font-bold" style={{ color: "var(--color-accent)" }}>
              {section.heading}
            </h2>
            {section.body.map((p, i) => (
              <p key={i} className="mb-2 text-[13px] opacity-90">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
