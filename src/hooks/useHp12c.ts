import { useCallback, useMemo, useState } from "react";
import { solveTVM, FinancialError, type TVMKnown } from "../lib/financial";

export type ShiftState = "none" | "f" | "g";

interface TVMRegisters {
  n?: number;
  i?: number;
  pv?: number;
  pmt?: number;
  fv?: number;
}

export interface Hp12cState {
  stack: [number, number, number, number]; // T, Z, Y, X
  entryStr: string;
  isEntering: boolean;
  liftEnabled: boolean;
  exponentMode: boolean;
  exponentStr: string;
  shift: ShiftState;
  pendingMemoryOp: "sto" | "rcl" | null;
  memory: number[]; // 10 registers, 0-9
  decimalPlaces: number;
  lastX: number;
  tvm: TVMRegisters;
  tvmFresh: boolean; // true if X currently holds a value the user typed/computed that a TVM key press should store
  pyr: number;
  beginMode: boolean;
  statsCount: number;
  poweredOn: boolean;
  messageKey: string | null; // key into a small status vocabulary the UI resolves via translations
}

function initialState(): Hp12cState {
  return {
    stack: [0, 0, 0, 0],
    entryStr: "0",
    isEntering: false,
    liftEnabled: true,
    exponentMode: false,
    exponentStr: "",
    shift: "none",
    pendingMemoryOp: null,
    memory: new Array(10).fill(0),
    decimalPlaces: 2,
    lastX: 0,
    tvm: {},
    tvmFresh: false,
    pyr: 12,
    beginMode: false,
    statsCount: 0,
    poweredOn: true,
    messageKey: null,
  };
}

function currentX(entryStr: string, exponentMode: boolean, exponentStr: string): number {
  const mantissa = parseFloat(entryStr || "0");
  if (!exponentMode) return mantissa;
  const exp = parseFloat(exponentStr || "0");
  return mantissa * Math.pow(10, exp);
}

export function useHp12c() {
  const [state, setState] = useState<Hp12cState>(initialState);

  const update = (patch: Partial<Hp12cState>) => setState((s) => ({ ...s, ...patch }));

  const x = state.isEntering ? currentX(state.entryStr, state.exponentMode, state.exponentStr) : state.stack[3];

  const displayString = useMemo(() => {
    if (!state.poweredOn) return "";
    if (state.isEntering) {
      let str = state.entryStr;
      if (state.exponentMode) {
        str += " \u00d710^" + (state.exponentStr || "0");
      }
      return str;
    }
    if (!Number.isFinite(x)) return "Error";
    return x.toLocaleString(undefined, {
      minimumFractionDigits: state.decimalPlaces,
      maximumFractionDigits: state.decimalPlaces,
    });
  }, [state, x]);

  const clearShift = useCallback(() => update({ shift: "none" }), []);

  const pressShift = useCallback((s: "f" | "g") => {
    setState((prev) => ({ ...prev, shift: prev.shift === s ? "none" : s, pendingMemoryOp: null }));
  }, []);

  const pushLift = (s: Hp12cState): [number, number, number, number] => [s.stack[1], s.stack[2], s.stack[3], s.stack[3]];

  const setX = (s: Hp12cState, value: number): [number, number, number, number] => [
    s.stack[0],
    s.stack[1],
    s.stack[2],
    value,
  ];

  const commitEntryToStack = (s: Hp12cState): Hp12cState => {
    if (!s.isEntering) return s;
    const value = currentX(s.entryStr, s.exponentMode, s.exponentStr);
    return {
      ...s,
      stack: setX(s, value),
      isEntering: false,
      exponentMode: false,
      exponentStr: "",
    };
  };

  const pressDigit = useCallback((d: string) => {
    setState((prev) => {
      let s = { ...prev, messageKey: null };

      // f-shift + digit sets the decimal display precision (a real HP-12c feature).
      if (s.shift === "f") {
        const places = Math.max(0, Math.min(9, parseInt(d, 10)));
        return { ...s, decimalPlaces: places, shift: "none" };
      }

      if (s.pendingMemoryOp) {
        const idx = parseInt(d, 10);
        if (s.pendingMemoryOp === "sto") {
          const memory = [...s.memory];
          memory[idx] = s.isEntering ? currentX(s.entryStr, s.exponentMode, s.exponentStr) : s.stack[3];
          return { ...commitEntryToStack(s), memory, pendingMemoryOp: null, messageKey: "stored" };
        } else {
          const committed = commitEntryToStack(s);
          return {
            ...committed,
            stack: pushLiftThenSet(committed, s.memory[idx]),
            pendingMemoryOp: null,
            liftEnabled: true,
            messageKey: "computed",
          };
        }
      }

      if (s.exponentMode) {
        if (s.exponentStr.replace("-", "").length >= 2) return s;
        return { ...s, exponentStr: s.exponentStr + d };
      }

      if (s.isEntering) {
        if (s.entryStr.replace("-", "").replace(".", "").length >= 10) return s;
        const next = s.entryStr === "0" ? d : s.entryStr + d;
        return { ...s, entryStr: next };
      }

      // starting a brand new number
      const stack = s.liftEnabled ? pushLift(s) : s.stack;
      return { ...s, stack, isEntering: true, entryStr: d, liftEnabled: true, tvmFresh: true };
    });
  }, []);

  function pushLiftThenSet(s: Hp12cState, value: number): [number, number, number, number] {
    const lifted = pushLift(s);
    return [lifted[0], lifted[1], lifted[2], value];
  }

  const pressDecimal = useCallback(() => {
    setState((prev) => {
      let s = { ...prev, messageKey: null };
      if (s.exponentMode) return s;
      if (s.isEntering) {
        if (s.entryStr.includes(".")) return s;
        return { ...s, entryStr: s.entryStr + "." };
      }
      const stack = s.liftEnabled ? pushLift(s) : s.stack;
      return { ...s, stack, isEntering: true, entryStr: "0.", liftEnabled: true, tvmFresh: true };
    });
  }, []);

  const pressEex = useCallback(() => {
    setState((prev) => {
      let s = { ...prev, messageKey: null };
      if (!s.isEntering) {
        const stack = s.liftEnabled ? pushLift(s) : s.stack;
        s = { ...s, stack, isEntering: true, entryStr: "1", liftEnabled: true, tvmFresh: true };
      }
      return { ...s, exponentMode: true, exponentStr: "" };
    });
  }, []);

  const pressChs = useCallback(() => {
    setState((prev) => {
      const s = { ...prev, messageKey: null };
      if (s.exponentMode) {
        return { ...s, exponentStr: s.exponentStr.startsWith("-") ? s.exponentStr.slice(1) : "-" + s.exponentStr };
      }
      if (s.isEntering) {
        return { ...s, entryStr: s.entryStr.startsWith("-") ? s.entryStr.slice(1) : "-" + s.entryStr };
      }
      return { ...s, stack: setX(s, -s.stack[3]) };
    });
  }, []);

  const pressBackspace = useCallback(() => {
    setState((prev) => {
      const s = { ...prev, messageKey: null };
      if (s.exponentMode) {
        return { ...s, exponentStr: s.exponentStr.slice(0, -1) };
      }
      if (s.isEntering) {
        const next = s.entryStr.slice(0, -1);
        return { ...s, entryStr: next === "" || next === "-" ? "0" : next };
      }
      return { ...s, stack: setX(s, 0), liftEnabled: true };
    });
  }, []);

  const pressEnter = useCallback(() => {
    setState((prev) => {
      const committed = commitEntryToStack({ ...prev, messageKey: null });
      const lifted = pushLift(committed);
      return { ...committed, stack: lifted, liftEnabled: false };
    });
  }, []);

  const pressClx = useCallback(() => {
    setState((prev) => {
      const s = { ...prev, messageKey: null };
      return { ...s, stack: setX(s, 0), isEntering: false, exponentMode: false, exponentStr: "", liftEnabled: true };
    });
  }, []);

  const pressRollDown = useCallback(() => {
    setState((prev) => {
      const s = commitEntryToStack({ ...prev, messageKey: null });
      if (s.shift === "g") {
        // x <> y swap
        const [t, z, y, xx] = s.stack;
        return { ...s, stack: [t, z, xx, y], shift: "none", liftEnabled: true };
      }
      const [t, z, y, xx] = s.stack;
      return { ...s, stack: [xx, t, z, y], liftEnabled: true };
    });
  }, []);

  const notImplemented = useCallback(() => {
    update({ shift: "none", messageKey: "notImplemented" });
  }, []);

  const pressArithmetic = useCallback((op: "+" | "-" | "*" | "/", onError: () => void) => {
    setState((prev) => {
      const s = commitEntryToStack({ ...prev, messageKey: null });
      const [t, z, y, xx] = s.stack;
      let result: number;
      if (op === "+") result = y + xx;
      else if (op === "-") result = y - xx;
      else if (op === "*") result = y * xx;
      else {
        if (xx === 0) {
          onError();
          return { ...s, messageKey: "errorDivZero" };
        }
        result = y / xx;
      }
      return {
        ...s,
        stack: [t, t, z, result],
        lastX: xx,
        liftEnabled: true,
        isEntering: false,
      };
    });
  }, []);

  const pressUnary = useCallback(
    (fn: "1/x" | "sqrt" | "yx" | "pow2" | "ex" | "ln" | "frac" | "intg" | "fact", onError: () => void) => {
      setState((prev) => {
        const s = commitEntryToStack({ ...prev, messageKey: null });
        const xx = s.stack[3];
        const yy = s.stack[2];
        let result = xx;
        let consumesY = false;
        try {
          switch (fn) {
            case "1/x":
              if (xx === 0) throw new Error("div0");
              result = 1 / xx;
              break;
            case "sqrt":
              if (xx < 0) throw new Error("domain");
              result = Math.sqrt(xx);
              break;
            case "yx":
              result = Math.pow(yy, xx);
              consumesY = true;
              break;
            case "pow2":
              result = xx * xx;
              break;
            case "ex":
              result = Math.exp(xx);
              break;
            case "ln":
              if (xx <= 0) throw new Error("domain");
              result = Math.log(xx);
              break;
            case "frac":
              result = xx - Math.trunc(xx);
              break;
            case "intg":
              result = Math.trunc(xx);
              break;
            case "fact": {
              if (xx < 0 || Math.floor(xx) !== xx || xx > 170) throw new Error("domain");
              let f = 1;
              for (let k = 2; k <= xx; k++) f *= k;
              result = f;
              break;
            }
          }
        } catch (err) {
          onError();
          const key = err instanceof Error && err.message === "div0" ? "errorDivZero" : "errorDomain";
          return { ...s, messageKey: key, shift: "none" };
        }
        if (!Number.isFinite(result)) {
          onError();
          return { ...s, messageKey: "errorOverflow", shift: "none" };
        }
        const stack: [number, number, number, number] = consumesY
          ? [s.stack[0], s.stack[0], s.stack[1], result]
          : setX(s, result);
        return { ...s, stack, lastX: xx, liftEnabled: true, isEntering: false, shift: "none" };
      });
    },
    []
  );

  const pressPercentFamily = useCallback((fn: "%" | "%T" | "d%") => {
    setState((prev) => {
      const s = commitEntryToStack({ ...prev, messageKey: null });
      const xx = s.stack[3];
      const yy = s.stack[2];
      let result = xx;
      if (fn === "%") result = (yy * xx) / 100;
      else if (fn === "%T") result = yy === 0 ? NaN : (xx / yy) * 100;
      else result = yy === 0 ? NaN : ((xx - yy) / yy) * 100;
      // percent family keeps Y unchanged, replaces X only, does not drop the stack
      return { ...s, stack: setX(s, result), lastX: xx, liftEnabled: true, isEntering: false };
    });
  }, []);

  const pressStoRcl = useCallback((which: "sto" | "rcl") => {
    setState((prev) => {
      const s = { ...prev, messageKey: null };
      if (s.shift === "g" && which === "rcl") {
        // g + RCL = LSTx
        const committed = commitEntryToStack(s);
        return {
          ...committed,
          stack: pushLiftThenSet(committed, committed.lastX),
          liftEnabled: true,
          shift: "none",
        };
      }
      return { ...s, pendingMemoryOp: which, shift: "none" };
    });
  }, []);

  const pressTvm = useCallback((key: TVMKnown, onError: () => void) => {
    setState((prev) => {
      let s = commitEntryToStack({ ...prev, messageKey: null });

      // g-shifted: n -> P/YR=12, i -> P/YR=1
      if (s.shift === "g" && key === "N") {
        return { ...s, pyr: 12, shift: "none", messageKey: "stored" };
      }
      if (s.shift === "g" && key === "I") {
        return { ...s, pyr: 1, shift: "none", messageKey: "stored" };
      }
      // f-shifted PMT = RND (round X to the current decimal display precision)
      if (s.shift === "f" && key === "PMT") {
        const rounded = parseFloat(s.stack[3].toFixed(s.decimalPlaces));
        return { ...s, stack: setX(s, rounded), shift: "none", messageKey: "computed" };
      }
      // Other f-shifted TVM keys (AMORT/INT/NPV/IRR) aren't implemented in this build.
      if (s.shift === "f") {
        return { ...s, shift: "none", messageKey: "notImplemented" };
      }

      const fieldMap: Record<TVMKnown, keyof TVMRegisters> = {
        N: "n",
        I: "i",
        PV: "pv",
        PMT: "pmt",
        FV: "fv",
      };
      const field = fieldMap[key];

      if (s.tvmFresh) {
        const tvm = { ...s.tvm, [field]: s.stack[3] };
        return { ...s, tvm, tvmFresh: false, liftEnabled: true, messageKey: "stored" };
      }

      // No fresh input — solve for this register from the other four.
      try {
        const periodicRate = (s.tvm.i ?? 0) / 100 / s.pyr;
        const result = solveTVM(key, {
          n: s.tvm.n ?? 0,
          i: periodicRate,
          pv: s.tvm.pv ?? 0,
          pmt: s.tvm.pmt ?? 0,
          fv: s.tvm.fv ?? 0,
          type: s.beginMode ? 1 : 0,
        });
        const displayResult = key === "I" ? result * s.pyr * 100 : result;
        const tvm = { ...s.tvm, [field]: displayResult };
        return {
          ...s,
          stack: pushLiftThenSet(s, displayResult),
          tvm,
          liftEnabled: true,
          messageKey: "computed",
        };
      } catch (e) {
        onError();
        return { ...s, messageKey: e instanceof FinancialError ? "errorNoSolution" : "errorGeneric" };
      }
    });
  }, []);

  const pressBeginEnd = useCallback((mode: "begin" | "end") => {
    update({ beginMode: mode === "begin", shift: "none", messageKey: "stored" });
  }, []);

  const pressStats = useCallback((direction: "plus" | "minus") => {
    setState((prev) => {
      const s = commitEntryToStack({ ...prev, messageKey: null });
      const statsCount = Math.max(0, s.statsCount + (direction === "plus" ? 1 : -1));
      const stack = pushLiftThenSet(s, statsCount);
      return { ...s, statsCount, stack, liftEnabled: true, shift: "none" };
    });
  }, []);

  const togglePower = useCallback(() => {
    setState((prev) => (prev.poweredOn ? initialState() : { ...initialState(), poweredOn: true }));
  }, []);

  return {
    state,
    x,
    displayString,
    pressDigit,
    pressDecimal,
    pressEex,
    pressChs,
    pressBackspace,
    pressEnter,
    pressClx,
    pressRollDown,
    pressArithmetic,
    pressUnary,
    pressPercentFamily,
    pressStoRcl,
    pressTvm,
    pressBeginEnd,
    pressStats,
    pressShift,
    clearShift,
    notImplemented,
    togglePower,
  };
}
