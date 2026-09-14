import type { CalculatorMode, ModeTabDef } from "../types";

const TABS: ModeTabDef[] = [
  { id: "basic", label: "Basic", shortLabel: "Basic" },
  { id: "scientific", label: "Scientific", shortLabel: "Sci" },
  { id: "financial", label: "Financial", shortLabel: "Fin" },
  { id: "hp", label: "HP-Style TVM", shortLabel: "TVM" },
];

interface ModeTabsProps {
  mode: CalculatorMode;
  onChange: (mode: CalculatorMode) => void;
}

export function ModeTabs({ mode, onChange }: ModeTabsProps) {
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
