import { useEffect } from "react";

export interface KeyboardHandlers {
  onDigit: (d: string) => void;
  onDecimal: () => void;
  onOperator: (op: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onBackspace: () => void;
  onParen: (p: "(" | ")") => void;
  onPercent?: () => void;
  enabled?: boolean;
}

export function useKeyboard(handlers: KeyboardHandlers) {
  useEffect(() => {
    if (handlers.enabled === false) return;

    function onKeyDown(e: KeyboardEvent) {
      const key = e.key;

      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        handlers.onDigit(key);
        return;
      }
      if (key === "." || key === "Decimal") {
        e.preventDefault();
        handlers.onDecimal();
        return;
      }
      if (key === "+" || key === "Add") {
        e.preventDefault();
        handlers.onOperator("+");
        return;
      }
      if (key === "-" || key === "Subtract") {
        e.preventDefault();
        handlers.onOperator("-");
        return;
      }
      if (key === "*" || key === "Multiply" || key === "x") {
        e.preventDefault();
        handlers.onOperator("*");
        return;
      }
      if (key === "/" || key === "Divide") {
        e.preventDefault();
        handlers.onOperator("/");
        return;
      }
      if (key === "^") {
        e.preventDefault();
        handlers.onOperator("^");
        return;
      }
      if (key === "%" && handlers.onPercent) {
        e.preventDefault();
        handlers.onPercent();
        return;
      }
      if (key === "(" ) {
        e.preventDefault();
        handlers.onParen("(");
        return;
      }
      if (key === ")") {
        e.preventDefault();
        handlers.onParen(")");
        return;
      }
      if (key === "Enter" || key === "=") {
        e.preventDefault();
        handlers.onEquals();
        return;
      }
      if (key === "Escape") {
        e.preventDefault();
        handlers.onClear();
        return;
      }
      if (key === "Backspace") {
        e.preventDefault();
        handlers.onBackspace();
        return;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlers]);
}
