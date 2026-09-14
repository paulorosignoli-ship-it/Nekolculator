import type { AngleMode } from "../../lib/calculator";
import { CalcButton } from "./Button";

interface ScientificKeypadProps {
  onParen: (p: "(" | ")") => void;
  onOperator: (op: string) => void;
  onFunction: (fn: string) => void;
  onConstant: (c: string) => void;
  onPostfix: (symbol: "%" | "!") => void;
  angleMode: AngleMode;
  onToggleAngleMode: () => void;
}

export function ScientificKeypad({
  onParen,
  onOperator,
  onFunction,
  onConstant,
  onPostfix,
  angleMode,
  onToggleAngleMode,
}: ScientificKeypadProps) {
  return (
    <div className="mb-2.5 grid grid-cols-4 gap-2">
      <CalcButton small variant="muted" label="(" onClick={() => onParen("(")} ariaLabel="Open parenthesis" />
      <CalcButton small variant="muted" label=")" onClick={() => onParen(")")} ariaLabel="Close parenthesis" />
      <CalcButton small variant="muted" label="xʸ" onClick={() => onOperator("^")} ariaLabel="Power" />
      <CalcButton small variant="muted" label="x²" onClick={() => onOperator("^2")} ariaLabel="Square" />

      <CalcButton small variant="muted" label="√x" onClick={() => onFunction("sqrt")} ariaLabel="Square root" />
      <CalcButton small variant="muted" label="sin" onClick={() => onFunction("sin")} />
      <CalcButton small variant="muted" label="cos" onClick={() => onFunction("cos")} />
      <CalcButton small variant="muted" label="tan" onClick={() => onFunction("tan")} />

      <CalcButton small variant="muted" label="log" onClick={() => onFunction("log")} />
      <CalcButton small variant="muted" label="ln" onClick={() => onFunction("ln")} />
      <CalcButton small variant="muted" label="π" onClick={() => onConstant("\u03c0")} ariaLabel="Pi" />
      <CalcButton small variant="muted" label="e" onClick={() => onConstant("e")} ariaLabel="Euler's number" />

      <CalcButton small variant="muted" label="n!" onClick={() => onPostfix("!")} ariaLabel="Factorial" />
      <CalcButton
        small
        variant="muted"
        span={2}
        label={angleMode}
        onClick={onToggleAngleMode}
        ariaLabel="Toggle degrees/radians"
      />
    </div>
  );
}
