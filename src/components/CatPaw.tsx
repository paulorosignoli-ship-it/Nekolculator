import { useEffect, useState, type CSSProperties } from "react";

interface CatPawProps {
  /** Called with viewport-relative coordinates to visually target a button (purely cosmetic). */
  targetSelector?: string;
  furColor: string;
  active: boolean;
  style?: CSSProperties;
}

/** A single decorative paw-swipe animation. Never touches calculator state. */
export function CatPaw({ furColor, active, style }: CatPawProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 1450);
      return () => clearTimeout(t);
    }
  }, [active]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute z-30 animate-paw-swipe"
      style={{ left: -40, ...style }}
      aria-hidden="true"
    >
      <svg width="72" height="72" viewBox="0 0 100 100">
        <g transform="rotate(90 50 50)">
          <ellipse cx="50" cy="62" rx="26" ry="22" fill={furColor} />
          <ellipse cx="28" cy="34" rx="10" ry="13" fill={furColor} />
          <ellipse cx="43" cy="24" rx="10" ry="13" fill={furColor} />
          <ellipse cx="58" cy="24" rx="10" ry="13" fill={furColor} />
          <ellipse cx="73" cy="34" rx="10" ry="13" fill={furColor} />
        </g>
      </svg>
    </div>
  );
}

/** Hook that triggers a paw-swipe visual event on an interval, purely for delight. */
export function usePawEvent(enabled: boolean) {
  const [pawActive, setPawActive] = useState(false);
  const [pawTop, setPawTop] = useState(120);

  useEffect(() => {
    if (!enabled) return;
    let timeoutId: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const delay = 18000 + Math.random() * 22000; // roughly every 18-40s
      timeoutId = setTimeout(() => {
        setPawTop(90 + Math.random() * 220);
        setPawActive(true);
        setTimeout(() => setPawActive(false), 1500);
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timeoutId);
  }, [enabled]);

  return { pawActive, pawTop };
}
