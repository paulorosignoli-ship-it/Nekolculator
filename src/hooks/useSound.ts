import { useCallback, useEffect, useState } from "react";
import { catSounds } from "../lib/soundEffects";

const STORAGE_KEY = "nekolculator-muted";

export function useSound(pitchMultiplier: number) {
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  });

  useEffect(() => {
    catSounds.setMuted(muted);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
    }
  }, [muted]);

  const toggleMuted = useCallback(() => setMuted((m) => !m), []);

  const playClick = useCallback(() => catSounds.playClick(pitchMultiplier), [pitchMultiplier]);
  const playError = useCallback(() => catSounds.playError(pitchMultiplier), [pitchMultiplier]);
  const playPurr = useCallback(() => catSounds.playPurr(pitchMultiplier), [pitchMultiplier]);

  return { muted, toggleMuted, playClick, playError, playPurr };
}
