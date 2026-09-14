import { CalcButton } from "./Button";

interface BasicKeypadProps {
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
        <CalcButton label="AC" variant="operator" onClick={onClear} ariaLabel="All clear" />
        <CalcButton label="+/-" variant="operator" onClick={onToggleSign} ariaLabel="Toggle sign" />
        <CalcButton label="%" variant="operator" onClick={onPercent} ariaLabel="Percent" />
        <CalcButton label="⌫" variant="operator" onClick={onBackspace} ariaLabel="Backspace" />

        <CalcButton label="7" onClick={() => onDigit("7")} />
        <CalcButton label="8" onClick={() => onDigit("8")} />
        <CalcButton label="9" onClick={() => onDigit("9")} />
        <CalcButton label="÷" variant="operator" onClick={() => onOperator("/")} ariaLabel="Divide" />

        <CalcButton label="4" onClick={() => onDigit("4")} />
        <CalcButton label="5" onClick={() => onDigit("5")} />
        <CalcButton label="6" onClick={() => onDigit("6")} />
        <CalcButton label="×" variant="operator" onClick={() => onOperator("*")} ariaLabel="Multiply" />

        <CalcButton label="1" onClick={() => onDigit("1")} />
        <CalcButton label="2" onClick={() => onDigit("2")} />
        <CalcButton label="3" onClick={() => onDigit("3")} />
        <CalcButton label="−" variant="operator" onClick={() => onOperator("-")} ariaLabel="Subtract" />

        <CalcButton label="0" span={2} onClick={() => onDigit("0")} />
        <CalcButton label="." onClick={onDecimal} />
        <CalcButton label="+" variant="operator" onClick={() => onOperator("+")} ariaLabel="Add" />
      </div>
      <CalcButton label="=" variant="equals" wide onClick={onEquals} ariaLabel="Equals" />
    </div>
  );
}
