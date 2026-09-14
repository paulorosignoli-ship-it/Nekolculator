import { useEffect } from "react";
import { Display } from "../Display";
import { BasicKeypad } from "../Keypad/BasicKeypad";
import { useCalculator } from "../../hooks/useCalculator";
import { useKeyboard } from "../../hooks/useKeyboard";
import type { MascotEmotion } from "../../types";

interface BasicModeProps {
  onPress: () => void;
  onResult: (success: boolean) => void;
  onEmotion: (emotion: MascotEmotion) => void;
}

export function BasicMode({ onPress, onResult, onEmotion }: BasicModeProps) {
  const calc = useCalculator({ onEquals: onResult });

  useEffect(() => {
    onEmotion(calc.hasError ? "confused" : calc.justEvaluated ? "happy" : "idle");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calc.hasError, calc.justEvaluated]);

  useKeyboard({
    onDigit: (d) => {
      onPress();
      calc.appendDigit(d);
    },
    onDecimal: () => {
      onPress();
      calc.appendDecimal();
    },
    onOperator: (op) => {
      onPress();
      calc.appendOperator(op);
    },
    onEquals: () => {
      onPress();
      calc.equals();
    },
    onClear: () => {
      onPress();
      calc.clearAll();
    },
    onBackspace: () => {
      onPress();
      calc.backspace();
    },
    onParen: () => {},
    onPercent: () => {
      onPress();
      calc.applyPostfix("%");
    },
  });

  return (
    <div>
      <Display expression={calc.prettyDisplay} statusText={calc.statusText} hasError={calc.hasError} />
      <BasicKeypad
        onDigit={(d) => {
          onPress();
          calc.appendDigit(d);
        }}
        onDecimal={() => {
          onPress();
          calc.appendDecimal();
        }}
        onOperator={(op) => {
          onPress();
          calc.appendOperator(op);
        }}
        onEquals={() => {
          onPress();
          calc.equals();
        }}
        onClear={() => {
          onPress();
          calc.clearAll();
        }}
        onBackspace={() => {
          onPress();
          calc.backspace();
        }}
        onToggleSign={() => {
          onPress();
          calc.toggleSign();
        }}
        onPercent={() => {
          onPress();
          calc.applyPostfix("%");
        }}
      />
    </div>
  );
}
