import type { ReactNode } from "react";

export type Hp12cKeyVariant = "default" | "shiftF" | "shiftG" | "power" | "enter";

interface Hp12cKeyProps {
  label: ReactNode;
  fLabel?: string;
  gLabel?: string;
  onClick: () => void;
  variant?: Hp12cKeyVariant;
  span?: 1 | 2;
  ariaLabel?: string;
  active?: boolean;
}

const VARIANT_BG: Record<Hp12cKeyVariant, string> = {
  default: "#2E2C2E",
  shiftF: "#D97B2E",
  shiftG: "#3E7FBF",
  power: "#1B1A1C",
  enter: "#232224",
};

export function Hp12cKey({ label, fLabel, gLabel, onClick, variant = "default", span = 1, ariaLabel, active }: Hp12cKeyProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`btn-press flex flex-col items-center justify-center rounded-lg py-1.5 ${span === 2 ? "col-span-2" : ""}`}
      style={{
        backgroundColor: VARIANT_BG[variant],
        outline: active ? "2px solid #F2C879" : "none",
        outlineOffset: active ? "1px" : undefined,
      }}
    >
      {fLabel && <span className="mb-0.5 text-[7px] font-bold leading-none" style={{ color: "#F2B77A" }}>{fLabel}</span>}
      <span className="text-[12px] font-bold leading-none text-white sm:text-sm">{label}</span>
      {gLabel && <span className="mt-0.5 text-[7px] font-bold leading-none" style={{ color: "#8FC4EE" }}>{gLabel}</span>}
    </button>
  );
}
