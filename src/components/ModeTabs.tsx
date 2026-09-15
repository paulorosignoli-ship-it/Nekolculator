import type { CalculatorMode } from "../types";
import { useTranslation } from "../lib/i18n";

interface ModeTabsProps {
  mode: CalculatorMode;
  onChange: (mode: CalculatorMode) => void;
}

export function ModeTabs({ mode, onChange }: ModeTabsProps) {
  const t = useTranslation();

  const TABS: { id: CalculatorMode; label: string; shortLabel: string }[] = [
    { id: "basic", label: t.tabs.basic, shortLabel: t.tabs.basicShort },
    { id: "scientific", label: t.tabs.scientific, shortLabel: t.tabs.scientificShort },
    { id: "financial", label: t.tabs.financial, shortLabel: t.tabs.financialShort },
    { id: "hp", label: t.tabs.hp, shortLabel: t.tabs.hpShort },
  ];

  return (
    <div
      className="scrollbar-none mb-4 flex gap-1 overflow-x-auto rounded-full p-1"
      style={{ backgroundColor: "var(--color-accent-soft)" }}
      role="tablist"
      aria-label="Calculator mode"
    >
      {TABS.map((tab) => {
        const selected = tab.id === mode;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            className="btn-press flex-1 whitespace-nowrap rounded-full px-3 py-2 text-xs font-bold transition-colors sm:text-sm"
            style={{
              backgroundColor: selected ? "var(--color-accent)" : "transparent",
              color: selected ? "var(--color-equals-btn-text)" : "var(--color-display)",
            }}
          >
            <span className="sm:hidden">{tab.shortLabel}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
