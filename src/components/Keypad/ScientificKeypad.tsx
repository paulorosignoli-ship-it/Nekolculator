import type { AngleMode } from "../../lib/calculator";
import { CalcButton } from "./Button";
import type { Translations } from "../../lib/i18n/types";

interface ScientificKeypadProps {
  t: Translations;
  onParen: (p: "(" | ")") => void;
  onOperator: (op: string) => void;
  onFunction: (fn: string) => void;
  onConstant: (c: string) => void;
  onPostfix: (symbol: "%" | "!") => void;
  angleMode: AngleMode;
  onToggleAngleMode: () => void;
}

export function ScientificKeypad({
  t,
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
      <CalcButton small variant="muted" label="(" onClick={() => onParen("(")} ariaLabel={t.scientific.openParen} />
      <CalcButton small variant="muted" label=")" onClick={() => onParen(")")} ariaLabel={t.scientific.closeParen} />
      <CalcButton small variant="muted" label="xʸ" onClick={() => onOperator("^")} ariaLabel={t.scientific.power} />
      <CalcButton small variant="muted" label="x²" onClick={() => onOperator("^2")} ariaLabel={t.scientific.square} />

      <CalcButton small variant="muted" label="√x" onClick={() => onFunction("sqrt")} ariaLabel={t.scientific.squareRoot} />
      <CalcButton small variant="muted" label="sin" onClick={() => onFunction("sin")} />
      <CalcButton small variant="muted" label="cos" onClick={() => onFunction("cos")} />
      <CalcButton small variant="muted" label="tan" onClick={() => onFunction("tan")} />

      <CalcButton small variant="muted" label="log" onClick={() => onFunction("log")} />
      <CalcButton small variant="muted" label="ln" onClick={() => onFunction("ln")} />
      <CalcButton small variant="muted" label="π" onClick={() => onConstant("\u03c0")} ariaLabel="Pi" />
      <CalcButton small variant="muted" label="e" onClick={() => onConstant("e")} ariaLabel="Euler's number" />

      <CalcButton small variant="muted" label="n!" onClick={() => onPostfix("!")} ariaLabel={t.scientific.factorial} />
      <CalcButton
        small
        variant="muted"
        span={2}
        label={angleMode}
        onClick={onToggleAngleMode}
        ariaLabel={t.scientific.toggleAngle}
      />
    </div>
  );
}
