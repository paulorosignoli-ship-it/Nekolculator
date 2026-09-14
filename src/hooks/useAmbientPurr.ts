import { useEffect } from "react";

/** Plays a random purr sound every so often while the app is open and unmuted. */
export function useAmbientPurr(playPurr: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let timeoutId: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const delay = 25000 + Math.random() * 35000; // roughly every 25-60s
      timeoutId = setTimeout(() => {
        playPurr();
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
}
