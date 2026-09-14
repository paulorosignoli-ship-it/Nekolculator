import { useCallback, useMemo, useState } from "react";
import { CalculatorError, evaluate, formatResult, type AngleMode } from "../lib/calculator";

const MAX_LENGTH = 60;

const STATUS_IDLE = "Ready to pounce...";
const STATUS_TYPING = "Sharpening claws...";

export interface UseCalculatorOptions {
  onEquals?: (success: boolean) => void;
}

/** Toggles the sign of the trailing number in an expression string, respecting operator context. */
function toggleTrailingSign(input: string): string {
  let i = input.length;
  while (i > 0 && /[0-9.]/.test(input[i - 1])) i--;
  if (i === input.length) return input; // nothing numeric to toggle
  const numStart = i;
  const before = input.slice(0, numStart);
  if (before.endsWith("-")) {
    const beforeMinus = before.slice(0, -1);
    const lastChar = beforeMinus[beforeMinus.length - 1];
    const isUnary = beforeMinus === "" || /[+\-*/^(]/.test(lastChar);
    if (isUnary) {
      return beforeMinus + input.slice(numStart);
    }
  }
  return before + "-" + input.slice(numStart);
}

export function useCalculator(options: UseCalculatorOptions = {}) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string>("");
  const [statusText, setStatusText] = useState(STATUS_IDLE);
  const [hasError, setHasError] = useState(false);
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [angleMode, setAngleMode] = useState<AngleMode>("DEG");

  const displayValue = input.length ? input : "0";

  const prettyDisplay = useMemo(() => {
    return displayValue
      .replace(/\*/g, "\u00d7")
      .replace(/\//g, "\u00f7")
      .replace(/(?<=[\d).%!])-/g, "\u2212") // binary minus after a value-like char
      .replace(/^-/, "\u2212"); // leading unary minus
  }, [displayValue]);

  const appendDigit = useCallback(
    (digit: string) => {
      setInput((prev) => {
        const base = justEvaluated ? "" : prev;
        const next = base + digit;
        return next.length > MAX_LENGTH ? base : next;
      });
      setJustEvaluated(false);
      setResult("");
      setStatusText(STATUS_TYPING);
      setHasError(false);
    },
    [justEvaluated]
  );

  const appendDecimal = useCallback(() => {
    setInput((prev) => {
      const base = justEvaluated ? "0" : prev;
      // find current number segment (after last operator/paren)
      const segment = base.split(/[+\-*/^(]/).pop() ?? "";
      if (segment.includes(".")) return base;
      return (base.length === 0 ? "0" : base) + ".";
    });
    setJustEvaluated(false);
    setStatusText(STATUS_TYPING);
    setHasError(false);
  }, [justEvaluated]);

  const appendOperator = useCallback(
    (op: string) => {
      setInput((prev) => {
        let base = justEvaluated ? result || prev : prev;
        if (!base) {
          if (op === "-") return "-";
          return base; // ignore leading +,*,/,^
        }
        // replace a trailing operator (not a unary minus at the very start) with the new one
        if (/[+\-*/^]$/.test(base) && !/\($/.test(base)) {
          return base.slice(0, -1) + op;
        }
        return base + op;
      });
      setJustEvaluated(false);
      setResult("");
      setStatusText(STATUS_TYPING);
      setHasError(false);
    },
    [justEvaluated, result]
  );

  const appendFunction = useCallback(
    (fn: string) => {
      setInput((prev) => {
        const base = justEvaluated ? "" : prev;
        return base + fn + "(";
      });
      setJustEvaluated(false);
      setResult("");
      setStatusText(STATUS_TYPING);
      setHasError(false);
    },
    [justEvaluated]
  );

  const appendConstant = useCallback(
    (c: string) => {
      setInput((prev) => {
        const base = justEvaluated ? "" : prev;
        return base + c;
      });
      setJustEvaluated(false);
      setResult("");
      setStatusText(STATUS_TYPING);
      setHasError(false);
    },
    [justEvaluated]
  );

  const appendParen = useCallback((paren: "(" | ")") => {
    setInput((prev) => {
      const base = justEvaluated ? "" : prev;
      if (paren === ")") {
        const opens = (base.match(/\(/g) || []).length;
        const closes = (base.match(/\)/g) || []).length;
        if (opens <= closes) return base; // no unmatched open paren to close
      }
      return base + paren;
    });
    setJustEvaluated(false);
    setResult("");
    setStatusText(STATUS_TYPING);
    setHasError(false);
  }, [justEvaluated]);

  const applyPostfix = useCallback(
    (symbol: "%" | "!") => {
      setInput((prev) => {
        const base = justEvaluated ? result || prev : prev;
        if (!base || /[+\-*/^(]$/.test(base)) return base;
        return base + symbol;
      });
      setJustEvaluated(false);
      setStatusText(STATUS_TYPING);
      setHasError(false);
    },
    [justEvaluated, result]
  );

  const backspace = useCallback(() => {
    if (justEvaluated) {
      setInput("");
      setResult("");
      setJustEvaluated(false);
      setStatusText(STATUS_IDLE);
      return;
    }
    setInput((prev) => prev.slice(0, -1));
    setHasError(false);
    setStatusText(STATUS_TYPING);
  }, [justEvaluated]);

  const clearAll = useCallback(() => {
    setInput("");
    setResult("");
    setHasError(false);
    setJustEvaluated(false);
    setStatusText(STATUS_IDLE);
  }, []);

  const toggleSign = useCallback(() => {
    setInput((prev) => {
      const base = justEvaluated ? result || prev : prev;
      return toggleTrailingSign(base);
    });
    setJustEvaluated(false);
    setStatusText(STATUS_TYPING);
  }, [justEvaluated, result]);

  const toggleAngleMode = useCallback(() => {
    setAngleMode((m) => (m === "DEG" ? "RAD" : "DEG"));
  }, []);

  const equals = useCallback(() => {
    if (!input.trim()) return;
    try {
      const value = evaluate(input, angleMode);
      const formatted = formatResult(value);
      setResult(formatted);
      setInput(formatted);
      setJustEvaluated(true);
      setHasError(false);
      setStatusText("Purring over the answer~");
      options.onEquals?.(true);
    } catch (e) {
      const message = e instanceof CalculatorError ? e.message : "Something went sideways.";
      setHasError(true);
      setStatusText(message);
      setJustEvaluated(true);
      options.onEquals?.(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, angleMode, options]);

  return {
    input,
    displayValue,
    prettyDisplay,
    result,
    statusText,
    hasError,
    angleMode,
    justEvaluated,
    appendDigit,
    appendDecimal,
    appendOperator,
    appendFunction,
    appendConstant,
    appendParen,
    applyPostfix,
    backspace,
    clearAll,
    toggleSign,
    toggleAngleMode,
    equals,
  };
}
