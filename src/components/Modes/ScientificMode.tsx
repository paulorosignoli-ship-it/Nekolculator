import { useEffect } from "react";
import { Display } from "../Display";
import { BasicKeypad } from "../Keypad/BasicKeypad";
import { ScientificKeypad } from "../Keypad/ScientificKeypad";
import { useCalculator } from "../../hooks/useCalculator";
import { useKeyboard } from "../../hooks/useKeyboard";
import type { MascotEmotion } from "../../types";

interface ScientificModeProps {
  onPress: () => void;
  onResult: (success: boolean) => void;
  onEmotion: (emotion: MascotEmotion) => void;
}

export function ScientificMode({ onPress, onResult, onEmotion }: ScientificModeProps) {
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
    onParen: (p) => {
      onPress();
      calc.appendParen(p);
    },
    onPercent: () => {
      onPress();
      calc.applyPostfix("%");
    },
  });

  return (
    <div>
      <Display
        expression={calc.prettyDisplay}
        statusText={calc.statusText}
        hasError={calc.hasError}
        angleMode={calc.angleMode}
      />
      <ScientificKeypad
        onParen={(p) => {
          onPress();
          calc.appendParen(p);
        }}
        onOperator={(op) => {
          onPress();
          calc.appendOperator(op);
        }}
        onFunction={(fn) => {
          onPress();
          calc.appendFunction(fn);
        }}
        onConstant={(c) => {
          onPress();
          calc.appendConstant(c);
        }}
        onPostfix={(s) => {
          onPress();
          calc.applyPostfix(s);
        }}
        angleMode={calc.angleMode}
        onToggleAngleMode={() => {
          onPress();
          calc.toggleAngleMode();
        }}
      />
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
