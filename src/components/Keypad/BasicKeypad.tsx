import { CalcButton } from "./Button";
import type { Translations } from "../../lib/i18n/types";

interface BasicKeypadProps {
  t: Translations;
  onDigit: (d: string) => void;
  onDecimal: () => void;
  onOperator: (op: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onBackspace: () => void;
  onToggleSign: () => void;
  onPercent: () => void;
}

export function BasicKeypad({
  t,
  onDigit,
  onDecimal,
  onOperator,
  onEquals,
  onClear,
  onBackspace,
  onToggleSign,
  onPercent,
}: BasicKeypadProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="grid grid-cols-4 gap-2.5">
        <CalcButton label="AC" variant="operator" onClick={onClear} ariaLabel={t.basic.allClear} />
        <CalcButton label="+/-" variant="operator" onClick={onToggleSign} ariaLabel={t.basic.toggleSign} />
        <CalcButton label="%" variant="operator" onClick={onPercent} ariaLabel={t.basic.percent} />
        <CalcButton label="⌫" variant="operator" onClick={onBackspace} ariaLabel={t.basic.backspace} />

        <CalcButton label="7" onClick={() => onDigit("7")} />
        <CalcButton label="8" onClick={() => onDigit("8")} />
        <CalcButton label="9" onClick={() => onDigit("9")} />
        <CalcButton label="÷" variant="operator" onClick={() => onOperator("/")} ariaLabel={t.basic.divide} />

        <CalcButton label="4" onClick={() => onDigit("4")} />
        <CalcButton label="5" onClick={() => onDigit("5")} />
        <CalcButton label="6" onClick={() => onDigit("6")} />
        <CalcButton label="×" variant="operator" onClick={() => onOperator("*")} ariaLabel={t.basic.multiply} />

        <CalcButton label="1" onClick={() => onDigit("1")} />
        <CalcButton label="2" onClick={() => onDigit("2")} />
        <CalcButton label="3" onClick={() => onDigit("3")} />
        <CalcButton label="−" variant="operator" onClick={() => onOperator("-")} ariaLabel={t.basic.subtract} />

        <CalcButton label="0" span={2} onClick={() => onDigit("0")} />
        <CalcButton label="." onClick={onDecimal} />
        <CalcButton label="+" variant="operator" onClick={() => onOperator("+")} ariaLabel={t.basic.add} />
      </div>
      <CalcButton label="=" variant="equals" wide onClick={onEquals} ariaLabel={t.basic.equals} />
    </div>
  );
}
