import { useEffect } from "react";
import { useHp12c } from "../../../hooks/useHp12c";
import { useTranslation } from "../../../lib/i18n";
import { Hp12cKey } from "../../Keypad/Hp12cKey";
import type { MascotEmotion } from "../../../types";

interface Hp12cProps {
  onPress: () => void;
  onError: () => void;
  onEmotion: (emotion: MascotEmotion) => void;
}

const ERROR_KEYS = new Set(["errorDivZero", "errorDomain", "errorOverflow", "errorNoSolution", "errorGeneric"]);

export function Hp12c({ onPress, onError, onEmotion }: Hp12cProps) {
  const t = useTranslation();
  const {
    state,
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
  } = useHp12c();

  const shift = state.shift;

  useEffect(() => {
    if (!state.messageKey) {
      onEmotion("idle");
    } else if (ERROR_KEYS.has(state.messageKey)) {
      onEmotion("confused");
    } else if (state.messageKey === "notImplemented") {
      onEmotion("sleepy");
    } else {
      onEmotion("happy");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.messageKey]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!state.poweredOn) return;
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        press(() => pressDigit(e.key));
      } else if (e.key === ".") {
        e.preventDefault();
        press(pressDecimal);
      } else if (e.key === "Enter") {
        e.preventDefault();
        press(pressEnter);
      } else if (e.key === "Backspace") {
        e.preventDefault();
        press(pressBackspace);
      } else if (e.key === "Escape") {
        e.preventDefault();
        press(pressClx);
      } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        e.preventDefault();
        press(() => pressArithmetic(e.key as "+" | "-" | "*" | "/", onError));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.poweredOn, onPress, onError]);

  const press = (action: () => void) => {
    onPress();
    action();
    clearShift();
  };

  const pressF = () => {
    onPress();
    pressShift("f");
  };
  const pressG = () => {
    onPress();
    pressShift("g");
  };

  const digitGShiftAction: Record<string, () => void> = {
    "0": notImplemented,
    "1": notImplemented,
    "2": notImplemented,
    "3": () => pressUnary("fact", onError),
    "4": notImplemented,
    "5": notImplemented,
    "6": notImplemented,
    "7": () => pressBeginEnd("begin"),
    "8": () => pressBeginEnd("end"),
    "9": notImplemented,
  };

  const handleDigit = (d: string) =>
    press(() => {
      if (shift === "g") digitGShiftAction[d]();
      else pressDigit(d);
    });

  const messageText = (() => {
    const key = state.messageKey;
    if (!key) return t.hp.subtitle;
    if (key === "stored") return t.hp.stored;
    if (key === "computed") return t.hp.computed;
    if (key === "notImplemented") return t.hp.notImplemented;
    if (key === "errorNoSolution") return t.hp.errorNoSolution;
    if (key in t.status) return t.status[key as keyof typeof t.status];
    return t.hp.subtitle;
  })();

  return (
    <div className="rounded-2xl p-3" style={{ backgroundColor: "#E9E1D0" }}>
      {/* Display */}
      <div className="mb-3 rounded-xl px-4 py-4" style={{ backgroundColor: "#AEB99C", boxShadow: "inset 0 2px 6px rgba(0,0,0,0.25)" }}>
        <div className="mb-1 flex items-center justify-between text-[10px] font-bold" style={{ color: "#3A4331" }}>
          <span>{messageText}</span>
          <div className="flex items-center gap-1.5">
            {shift !== "none" && (
              <span
                className="rounded px-1.5 py-0.5 font-bold text-white"
                style={{ backgroundColor: shift === "f" ? "#D97B2E" : "#3E7FBF" }}
              >
                {shift === "f" ? t.hp.shiftOrangeActive : t.hp.shiftBlueActive}
              </span>
            )}
            <span>{state.beginMode ? t.hp.begin : t.hp.end}</span>
            <span>{t.hp.paymentsPerYear}={state.pyr}</span>
          </div>
        </div>
        <div className="scrollbar-none overflow-x-auto whitespace-nowrap text-right font-rounded text-3xl font-bold" style={{ color: "#20261B", minHeight: "2.4rem" }}>
          {state.poweredOn ? displayString : ""}
        </div>
      </div>

      {!state.poweredOn ? (
        <button
          type="button"
          onClick={() => {
            onPress();
            togglePower();
          }}
          className="btn-press w-full rounded-xl py-6 text-center text-xs font-bold text-white"
          style={{ backgroundColor: "#1B1A1C" }}
        >
          ON
        </button>
      ) : (
        <>
          {/* Function / TVM block */}
          <div className="mb-2 grid grid-cols-5 gap-1.5">
            <Hp12cKey label="n" fLabel="AMORT" gLabel="12×" onClick={() => press(() => pressTvm("N", onError))} />
            <Hp12cKey label="i" fLabel="INT" gLabel="12÷" onClick={() => press(() => pressTvm("I", onError))} />
            <Hp12cKey label="PV" fLabel="NPV" onClick={() => press(() => pressTvm("PV", onError))} />
            <Hp12cKey label="PMT" fLabel="RND" onClick={() => press(() => pressTvm("PMT", onError))} />
            <Hp12cKey label="FV" fLabel="IRR" onClick={() => press(() => pressTvm("FV", onError))} />

            <Hp12cKey
              label="yˣ"
              gLabel="√x"
              onClick={() => press(() => (shift === "g" ? pressUnary("sqrt", onError) : pressUnary("yx", onError)))}
            />
            <Hp12cKey
              label="1/x"
              gLabel="eˣ"
              onClick={() => press(() => (shift === "g" ? pressUnary("ex", onError) : pressUnary("1/x", onError)))}
            />
            <Hp12cKey
              label="%T"
              gLabel="LN"
              onClick={() => press(() => (shift === "g" ? pressUnary("ln", onError) : pressPercentFamily("%T")))}
            />
            <Hp12cKey
              label="Δ%"
              gLabel="FRAC"
              onClick={() => press(() => (shift === "g" ? pressUnary("frac", onError) : pressPercentFamily("d%")))}
            />
            <Hp12cKey
              label="%"
              gLabel="INTG"
              onClick={() => press(() => (shift === "g" ? pressUnary("intg", onError) : pressPercentFamily("%")))}
            />

            <Hp12cKey label="R/S" fLabel="P/R" onClick={() => press(notImplemented)} />
            <Hp12cKey label="SST" gLabel="BST" onClick={() => press(notImplemented)} />
            <Hp12cKey label="R↓" gLabel="x⋚y" onClick={() => press(pressRollDown)} />
            <Hp12cKey label="CLx" gLabel="x=0" onClick={() => press(() => (shift === "g" ? notImplemented() : pressClx()))} />
            <Hp12cKey label="ENTER" variant="enter" onClick={() => press(pressEnter)} />

            <Hp12cKey label="ON" variant="power" onClick={() => { onPress(); togglePower(); }} />
            <Hp12cKey label="f" variant="shiftF" active={shift === "f"} onClick={pressF} />
            <Hp12cKey label="g" variant="shiftG" active={shift === "g"} onClick={pressG} />
            <Hp12cKey label="STO" onClick={() => press(() => pressStoRcl("sto"))} />
            <Hp12cKey label="RCL" gLabel="LSTx" onClick={() => press(() => pressStoRcl("rcl"))} />
          </div>

          {/* Numeric block */}
          <div className="grid grid-cols-5 gap-1.5">
            <Hp12cKey label="CHS" fLabel="DATE" onClick={() => press(() => (shift === "f" ? notImplemented() : pressChs()))} />
            <Hp12cKey label="7" gLabel="BEG" onClick={() => handleDigit("7")} />
            <Hp12cKey label="8" gLabel="END" onClick={() => handleDigit("8")} />
            <Hp12cKey label="9" gLabel="MEM" onClick={() => handleDigit("9")} />
            <Hp12cKey label="÷" onClick={() => press(() => pressArithmetic("/", onError))} />

            <Hp12cKey label="EEX" onClick={() => press(pressEex)} />
            <Hp12cKey label="4" gLabel="D.MY" onClick={() => handleDigit("4")} />
            <Hp12cKey label="5" gLabel="M.DY" onClick={() => handleDigit("5")} />
            <Hp12cKey label="6" onClick={() => handleDigit("6")} />
            <Hp12cKey label="×" onClick={() => press(() => pressArithmetic("*", onError))} />

            <Hp12cKey label="Σ+" gLabel="Σ-" onClick={() => press(() => pressStats(shift === "g" ? "minus" : "plus"))} />
            <Hp12cKey label="1" onClick={() => handleDigit("1")} />
            <Hp12cKey label="2" onClick={() => handleDigit("2")} />
            <Hp12cKey label="3" gLabel="n!" onClick={() => handleDigit("3")} />
            <Hp12cKey label="−" onClick={() => press(() => pressArithmetic("-", onError))} />

            <Hp12cKey label="⌫" onClick={() => press(pressBackspace)} />
            <Hp12cKey label="0" onClick={() => handleDigit("0")} />
            <Hp12cKey label="." onClick={() => press(() => (shift === "g" ? notImplemented() : pressDecimal()))} />
            <Hp12cKey label="+" onClick={() => press(() => pressArithmetic("+", onError))} />
          </div>
        </>
      )}
    </div>
  );
}
