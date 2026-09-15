import { useCallback, useState } from "react";
import { Header } from "./components/Header";
import { ModeTabs } from "./components/ModeTabs";
import { Footer } from "./components/Footer";
import { LegalPage } from "./components/LegalPage";
import { CookieConsent } from "./components/CookieConsent";
import { BasicMode } from "./components/Modes/BasicMode";
import { ScientificMode } from "./components/Modes/ScientificMode";
import { FinancialStandard } from "./components/Modes/Financial/FinancialStandard";
import { Hp12c } from "./components/Modes/Financial/Hp12c";
import { CatPaw, usePawEvent } from "./components/CatPaw";
import { useTheme } from "./hooks/useTheme";
import { useSound } from "./hooks/useSound";
import { useAmbientPurr } from "./hooks/useAmbientPurr";
import { useLanguage } from "./lib/i18n";
import { getLegalContent } from "./content/legal";
import type { AppView, CalculatorMode, LegalView, MascotEmotion } from "./types";

export default function App() {
  const { theme, cycleTheme, darkMode, toggleDarkMode } = useTheme();
  const { muted, toggleMuted, playClick, playError, playPurr } = useSound(theme.soundPitch);
  const { language } = useLanguage();
  const [mode, setMode] = useState<CalculatorMode>("basic");
  const [emotion, setEmotion] = useState<MascotEmotion>("idle");
  const [view, setView] = useState<AppView>("calculator");
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

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

  const goToLegal = (v: LegalView) => {
    setView(v);
  };

  const legal = getLegalContent(language);

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <div
        className="relative w-full max-w-md overflow-hidden rounded-cute p-5 shadow-soft"
        style={{ backgroundColor: "var(--color-body)", border: "2px solid var(--color-body-border)" }}
      >
        <CatPaw furColor={theme.furColor} active={pawActive} style={{ top: pawTop }} />

        <Header
          theme={theme}
          emotion={emotion}
          muted={muted}
          onToggleMute={toggleMuted}
          onCycleTheme={cycleTheme}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />

        {view === "calculator" ? (
          <>
            <ModeTabs mode={mode} onChange={setMode} />

            {mode === "basic" && <BasicMode onPress={handlePress} onResult={handleResult} onEmotion={setEmotion} />}
            {mode === "scientific" && (
              <ScientificMode onPress={handlePress} onResult={handleResult} onEmotion={setEmotion} />
            )}
            {mode === "financial" && <FinancialStandard />}
            {mode === "hp" && <Hp12c onPress={handlePress} onError={playError} onEmotion={setEmotion} />}
          </>
        ) : (
          <LegalPage document={legal[view]} onBack={() => setView("calculator")} />
        )}

        <Footer onNavigate={goToLegal} onOpenCookieSettings={() => setCookieSettingsOpen(true)} />
      </div>

      <CookieConsent
        forceOpen={cookieSettingsOpen}
        onResolved={() => setCookieSettingsOpen(false)}
        onNavigate={(v) => {
          setCookieSettingsOpen(false);
          setView(v);
        }}
      />
    </div>
  );
}
