import type { ReactNode } from "react";

export type ButtonVariant = "number" | "operator" | "equals" | "muted";

interface CalcButtonProps {
  label: ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  span?: 1 | 2;
  ariaLabel?: string;
  small?: boolean;
  wide?: boolean;
}

const variantStyle: Record<ButtonVariant, { bg: string; color: string }> = {
  number: { bg: "var(--color-num-btn)", color: "var(--color-num-btn-text)" },
  operator: { bg: "var(--color-op-btn)", color: "var(--color-op-btn-text)" },
  equals: { bg: "var(--color-equals-btn)", color: "var(--color-equals-btn-text)" },
  muted: { bg: "transparent", color: "var(--color-num-btn-text)" },
};

export function CalcButton({ label, onClick, variant = "number", span = 1, ariaLabel, small, wide }: CalcButtonProps) {
  const style = variantStyle[variant];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`btn-press rounded-2xl font-rounded font-bold shadow-button ${
        small ? "text-sm sm:text-base" : "text-lg sm:text-xl"
      } ${span === 2 ? "col-span-2" : ""} ${wide ? "w-full py-4" : ""}`}
      style={{
        backgroundColor: style.bg,
        color: style.color,
        aspectRatio: wide ? undefined : span === 2 ? "2.15 / 1" : "1 / 1",
      }}
    >
      {label}
    </button>
  );
}
