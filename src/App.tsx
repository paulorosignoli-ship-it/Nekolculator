import { useCallback, useState } from "react";
import { Header } from "./components/Header";
import { ModeTabs } from "./components/ModeTabs";
import { BasicMode } from "./components/Modes/BasicMode";
import { ScientificMode } from "./components/Modes/ScientificMode";
import { FinancialStandard } from "./components/Modes/Financial/FinancialStandard";
import { FinancialHP } from "./components/Modes/Financial/FinancialHP";
import { CatPaw, usePawEvent } from "./components/CatPaw";
import { useTheme } from "./hooks/useTheme";
import { useSound } from "./hooks/useSound";
import { useAmbientPurr } from "./hooks/useAmbientPurr";
import type { CalculatorMode, MascotEmotion } from "./types";

export default function App() {
  const { theme, cycleTheme } = useTheme();
  const { muted, toggleMuted, playClick, playError, playPurr } = useSound(theme.soundPitch);
  const [mode, setMode] = useState<CalculatorMode>("basic");
  const [emotion, setEmotion] = useState<MascotEmotion>("idle");

  const { pawActive, pawTop } = usePawEvent(!muted);
  useAmbientPurr(playPurr, !muted);

  const handlePress = useCallback(() => {
    playClick();
  }, [playClick]);

  // Only invalid / illogical actions get a reaction sound here — the button
  // press itself already played a click meow via handlePress, and the purr
  // is ambient (see useAmbientPurr) rather than tied to a successful "=".
  const handleResult = useCallback(
    (success: boolean) => {
      if (!success) playError();
    },
    [playError]
  );

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <div
        className="relative w-full max-w-md overflow-hidden rounded-cute p-5 shadow-soft"
        style={{ backgroundColor: "var(--color-body)", border: "2px solid var(--color-body-border)" }}
      >
        <CatPaw furColor={theme.furColor} active={pawActive} style={{ top: pawTop }} />

        <Header theme={theme} emotion={emotion} muted={muted} onToggleMute={toggleMuted} onCycleTheme={cycleTheme} />
        <ModeTabs mode={mode} onChange={setMode} />

        {mode === "basic" && <BasicMode onPress={handlePress} onResult={handleResult} onEmotion={setEmotion} />}
        {mode === "scientific" && (
          <ScientificMode onPress={handlePress} onResult={handleResult} onEmotion={setEmotion} />
        )}
        {mode === "financial" && <FinancialStandard />}
        {mode === "hp" && <FinancialHP />}

        <p className="mt-4 text-center text-[10px] opacity-50" style={{ color: "var(--color-display)" }}>
          Made with 🐾 by Nekolculator
        </p>
      </div>
    </div>
  );
}
