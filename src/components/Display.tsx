interface DisplayProps {
  expression: string;
  statusText: string;
  hasError?: boolean;
  angleMode?: "DEG" | "RAD";
}

export function Display({ expression, statusText, hasError, angleMode }: DisplayProps) {
  return (
    <div
      className="mb-4 rounded-3xl px-5 pb-4 pt-5 shadow-inner"
      style={{ backgroundColor: "var(--color-display)" }}
    >
      <div className="mb-1 flex items-center justify-between">
        <span
          className="text-xs font-semibold"
          style={{ color: hasError ? "#F0A0A0" : "var(--color-display-subtext)" }}
        >
          {statusText}
        </span>
        {angleMode && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold"
            style={{ backgroundColor: "var(--color-accent)", color: "var(--color-equals-btn-text)" }}
          >
            {angleMode}
          </span>
        )}
      </div>
      <div
        className="scrollbar-none overflow-x-auto whitespace-nowrap text-right font-rounded text-4xl font-bold"
        style={{ color: "var(--color-display-text)" }}
      >
        {expression}
      </div>
    </div>
  );
}
