import { useState } from "react";
import { FinancialError, solveTVM, type TVMKnown } from "../../../lib/financial";

const TVM_KEYS: { key: TVMKnown; label: string }[] = [
  { key: "N", label: "N" },
  { key: "I", label: "I/YR" },
  { key: "PV", label: "PV" },
  { key: "PMT", label: "PMT" },
  { key: "FV", label: "FV" },
];

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

export function FinancialHP() {
  const [values, setValues] = useState<Record<TVMKnown, string>>({
    N: "12",
    I: "6",
    PV: "-1000",
    PMT: "0",
    FV: "",
  });
  const [pyr, setPyr] = useState(12);
  const [beginMode, setBeginMode] = useState(false);
  const [target, setTarget] = useState<TVMKnown>("FV");
  const [error, setError] = useState<string | null>(null);
  const [rpnMode, setRpnMode] = useState(false);

  const setVal = (key: TVMKnown, v: string) => setValues((prev) => ({ ...prev, [key]: v }));

  const compute = () => {
    setError(null);
    try {
      const n = parseFloat(values.N || "0");
      const iyr = parseFloat(values.I || "0");
      const pv = parseFloat(values.PV || "0");
      const pmt = parseFloat(values.PMT || "0");
      const fv = parseFloat(values.FV || "0");
      const periodicRate = iyr / 100 / pyr;
      const result = solveTVM(target, {
        n,
        i: periodicRate,
        pv,
        pmt,
        fv,
        type: beginMode ? 1 : 0,
      });
      setVal(target, (Math.round(result * 1e6) / 1e6).toString());
    } catch (e) {
      setError(e instanceof FinancialError ? e.message : "Couldn't solve with these numbers — try adjusting one.");
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold" style={{ color: "var(--color-display)" }}>
          {rpnMode ? "RPN Stack Mode" : "TVM Solver"}
        </span>
        <button
          onClick={() => setRpnMode((m) => !m)}
          className="btn-press rounded-full px-3 py-1.5 text-[11px] font-bold"
          style={{ backgroundColor: "var(--color-accent)", color: "var(--color-equals-btn-text)" }}
        >
          {rpnMode ? "Switch to TVM" : "Switch to RPN"}
        </button>
      </div>

      {!rpnMode ? (
        <>
          <div className="mb-3 flex gap-2">
            <div className="flex-1">
              <span className="mb-1 block text-[11px] font-bold" style={{ color: "var(--color-display)" }}>
                Payments / year
              </span>
              <input
                type="number"
                value={pyr}
                onChange={(e) => setPyr(parseInt(e.target.value || "1", 10))}
                className="w-full rounded-xl px-3 py-2 font-rounded text-sm font-semibold outline-none"
                style={{ backgroundColor: "var(--color-num-btn)", color: "var(--color-num-btn-text)" }}
              />
            </div>
            <button
              onClick={() => setBeginMode((b) => !b)}
              className="btn-press rounded-xl px-3 text-xs font-bold"
              style={{ backgroundColor: "var(--color-op-btn)", color: "var(--color-op-btn-text)" }}
            >
              {beginMode ? "BEGIN" : "END"}
            </button>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {TVM_KEYS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTarget(key)}
                className="btn-press rounded-xl py-1.5 text-[11px] font-bold"
                style={{
                  backgroundColor: target === key ? "var(--color-accent)" : "var(--color-op-btn)",
                  color: target === key ? "var(--color-equals-btn-text)" : "var(--color-op-btn-text)",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-1.5 grid grid-cols-5 gap-1.5">
            {TVM_KEYS.map(({ key }) => (
              <input
                key={key}
                type="text"
                inputMode="decimal"
                value={values[key]}
                disabled={key === target}
                onChange={(e) => setVal(key, e.target.value)}
                className="w-full rounded-xl px-2 py-2 text-center font-rounded text-xs font-bold outline-none disabled:opacity-60"
                style={{ backgroundColor: "var(--color-num-btn)", color: "var(--color-num-btn-text)" }}
              />
            ))}
          </div>

          <p className="mt-2 text-[11px] leading-snug" style={{ color: "var(--color-accent)" }}>
            Cash out = negative, cash in = positive. Pick the field to solve for, fill in the rest, then compute.
          </p>

          <button
            onClick={compute}
            className="btn-press mt-3 w-full rounded-2xl py-3 font-rounded font-bold shadow-button"
            style={{ backgroundColor: "var(--color-equals-btn)", color: "var(--color-equals-btn-text)" }}
          >
            Compute {target}
          </button>

          {error && (
            <div className="mt-3 rounded-2xl p-3 text-xs font-semibold" style={{ backgroundColor: "var(--color-display)", color: "#F0A0A0" }}>
              {error}
            </div>
          )}
        </>
      ) : (
        <RpnCalculator />
      )}
    </div>
  );
}

function RpnCalculator() {
  const [stack, setStack] = useState<number[]>([0, 0, 0, 0]); // T, Z, Y, X (index 3 = X, the bottom-most entry line)
  const [entry, setEntry] = useState("0");
  const [freshEntry, setFreshEntry] = useState(true);

  const x = stack[3];

  const onDigit = (d: string) => {
    setEntry((prev) => (freshEntry ? d : prev + d));
    setFreshEntry(false);
  };

  const onDecimal = () => {
    setEntry((prev) => (freshEntry ? "0." : prev.includes(".") ? prev : prev + "."));
    setFreshEntry(false);
  };

  const onEnter = () => {
    const val = parseFloat(entry || "0");
    setStack((prev) => [prev[1], prev[2], val, val]); // duplicate X into Y, push
    setFreshEntry(true);
  };

  const onOp = (op: "+" | "-" | "*" | "/") => {
    const xVal = freshEntry ? x : parseFloat(entry || "0");
    const base = freshEntry ? stack : [stack[0], stack[1], stack[2], xVal];
    const a = base[2];
    const b = xVal;
    let result = 0;
    if (op === "+") result = a + b;
    else if (op === "-") result = a - b;
    else if (op === "*") result = a * b;
    else result = b === 0 ? NaN : a / b;
    setStack((prev) => [prev[0], prev[0], prev[1], result]);
    setEntry(fmt(result));
    setFreshEntry(true);
  };

  const onChs = () => {
    if (freshEntry) {
      setEntry(fmt(-x));
      setStack((prev) => [prev[0], prev[1], prev[2], -x]);
    } else {
      setEntry((prev) => (prev.startsWith("-") ? prev.slice(1) : "-" + prev));
    }
  };

  const onClx = () => {
    setEntry("0");
    setFreshEntry(true);
    setStack((prev) => [prev[0], prev[1], prev[2], 0]);
  };

  const rows = [
    { label: "T", value: stack[0] },
    { label: "Z", value: stack[1] },
    { label: "Y", value: stack[2] },
  ];

  return (
    <div>
      <div className="rounded-2xl p-3" style={{ backgroundColor: "var(--color-display)" }}>
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between py-0.5 text-xs" style={{ color: "var(--color-display-subtext)" }}>
            <span>{r.label}</span>
            <span>{fmt(r.value)}</span>
          </div>
        ))}
        <div className="mt-1 flex justify-between border-t pt-1.5 font-rounded text-lg font-bold" style={{ borderColor: "var(--color-accent)", color: "var(--color-display-text)" }}>
          <span>X</span>
          <span>{entry}</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        <button onClick={onClx} className="btn-press rounded-xl py-2.5 text-sm font-bold" style={{ backgroundColor: "var(--color-op-btn)", color: "var(--color-op-btn-text)" }}>CLx</button>
        <button onClick={onChs} className="btn-press rounded-xl py-2.5 text-sm font-bold" style={{ backgroundColor: "var(--color-op-btn)", color: "var(--color-op-btn-text)" }}>CHS</button>
        <button onClick={() => onOp("/")} className="btn-press rounded-xl py-2.5 text-sm font-bold" style={{ backgroundColor: "var(--color-op-btn)", color: "var(--color-op-btn-text)" }}>÷</button>
        <button onClick={() => onOp("*")} className="btn-press rounded-xl py-2.5 text-sm font-bold" style={{ backgroundColor: "var(--color-op-btn)", color: "var(--color-op-btn-text)" }}>×</button>

        {["7", "8", "9"].map((d) => (
          <button key={d} onClick={() => onDigit(d)} className="btn-press rounded-xl py-2.5 text-sm font-bold" style={{ backgroundColor: "var(--color-num-btn)", color: "var(--color-num-btn-text)" }}>{d}</button>
        ))}
        <button onClick={() => onOp("-")} className="btn-press rounded-xl py-2.5 text-sm font-bold" style={{ backgroundColor: "var(--color-op-btn)", color: "var(--color-op-btn-text)" }}>−</button>

        {["4", "5", "6"].map((d) => (
          <button key={d} onClick={() => onDigit(d)} className="btn-press rounded-xl py-2.5 text-sm font-bold" style={{ backgroundColor: "var(--color-num-btn)", color: "var(--color-num-btn-text)" }}>{d}</button>
        ))}
        <button onClick={() => onOp("+")} className="btn-press rounded-xl py-2.5 text-sm font-bold" style={{ backgroundColor: "var(--color-op-btn)", color: "var(--color-op-btn-text)" }}>+</button>

        {["1", "2", "3"].map((d) => (
          <button key={d} onClick={() => onDigit(d)} className="btn-press rounded-xl py-2.5 text-sm font-bold" style={{ backgroundColor: "var(--color-num-btn)", color: "var(--color-num-btn-text)" }}>{d}</button>
        ))}
        <button onClick={onEnter} className="btn-press row-span-2 rounded-xl text-sm font-bold" style={{ backgroundColor: "var(--color-equals-btn)", color: "var(--color-equals-btn-text)" }}>ENTER</button>

        <button onClick={() => onDigit("0")} className="btn-press col-span-2 rounded-xl py-2.5 text-sm font-bold" style={{ backgroundColor: "var(--color-num-btn)", color: "var(--color-num-btn-text)" }}>0</button>
        <button onClick={onDecimal} className="btn-press rounded-xl py-2.5 text-sm font-bold" style={{ backgroundColor: "var(--color-num-btn)", color: "var(--color-num-btn-text)" }}>.</button>
      </div>
    </div>
  );
}
