import { useMemo } from "react";
import type { CatTheme } from "../lib/themes";
import type { MascotEmotion } from "../types";

interface MascotProps {
  theme: CatTheme;
  emotion?: MascotEmotion;
  size?: number;
  className?: string;
}

/** Renders the pattern-specific overlay markings for a given theme's cat. */
function PatternOverlay({ theme }: { theme: CatTheme }) {
  switch (theme.pattern) {
    case "tabby":
      return (
        <g stroke={theme.furAccent} strokeWidth="2.4" strokeLinecap="round" opacity="0.75">
          <path d="M28 20 L34 28" />
          <path d="M35 16 L40 25" />
          <path d="M65 16 L60 25" />
          <path d="M72 20 L66 28" />
          <path d="M30 46 L38 46" />
          <path d="M62 46 L70 46" />
        </g>
      );
    case "void":
      return (
        <g>
          <ellipse cx="50" cy="50" rx="30" ry="27" fill="url(#voidGlow)" opacity="0.5" />
        </g>
      );
    case "siamese":
      return (
        <g fill={theme.furAccent} opacity="0.9">
          <path d="M18 30 Q22 14 34 12 Q26 20 26 32 Z" />
          <path d="M82 30 Q78 14 66 12 Q74 20 74 32 Z" />
          <ellipse cx="50" cy="66" rx="13" ry="8" />
        </g>
      );
    case "calico":
      return (
        <g opacity="0.85">
          <path d="M20 24 Q30 14 42 20 Q34 28 30 38 Q20 34 20 24 Z" fill={theme.furAccent} />
          <path d="M78 34 Q80 22 68 16 Q70 28 62 34 Q70 40 78 34 Z" fill="#3B3B3B" />
          <ellipse cx="40" cy="58" rx="8" ry="6" fill="#3B3B3B" opacity="0.7" />
        </g>
      );
    case "fluffy":
      return (
        <g fill="none" stroke={theme.furAccent} strokeWidth="1.6" opacity="0.6">
          <path d="M16 40 q4 -6 8 0" />
          <path d="M20 52 q4 -6 8 0" />
          <path d="M76 40 q4 -6 8 0" />
          <path d="M72 52 q4 -6 8 0" />
        </g>
      );
    case "tuxedo":
      return (
        <g fill={theme.furAccent}>
          <path d="M50 52 Q60 58 58 74 Q50 80 42 74 Q40 58 50 52 Z" />
          <circle cx="50" cy="58" r="2.4" fill="#232730" />
          <circle cx="50" cy="64" r="2.4" fill="#232730" />
        </g>
      );
    case "kitten":
      return (
        <g>
          <ellipse cx="50" cy="70" rx="9" ry="5" fill={theme.furAccent} opacity="0.8" />
        </g>
      );
    default:
      return null;
  }
}

export function Mascot({ theme, emotion = "idle", size = 56, className }: MascotProps) {
  const eyeShape = useMemo(() => {
    if (emotion === "happy") return "happy";
    if (emotion === "sleepy") return "sleepy";
    if (emotion === "confused") return "confused";
    return "idle";
  }, [emotion]);

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`${theme.name} cat mascot`}
    >
      <defs>
        <radialGradient id="voidGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor={theme.eyeColor} stopOpacity="0.35" />
          <stop offset="100%" stopColor={theme.eyeColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ears */}
      <path d="M20 34 L14 8 L38 24 Z" fill={theme.furColor} />
      <path d="M80 34 L86 8 L62 24 Z" fill={theme.furColor} />
      <path d="M22 27 L19 15 L32 24 Z" fill={theme.furAccent} opacity="0.55" />
      <path d="M78 27 L81 15 L68 24 Z" fill={theme.furAccent} opacity="0.55" />

      {/* head */}
      <circle cx="50" cy="52" r="34" fill={theme.furColor} />

      <PatternOverlay theme={theme} />

      {/* cheeks */}
      <ellipse cx="28" cy="58" rx="7" ry="5" fill="#FFFFFF" opacity="0.18" />
      <ellipse cx="72" cy="58" rx="7" ry="5" fill="#FFFFFF" opacity="0.18" />

      {/* eyes */}
      {eyeShape === "happy" && (
        <g stroke={theme.eyeColor} strokeWidth="3.4" strokeLinecap="round" fill="none">
          <path d="M34 48 Q40 42 46 48" />
          <path d="M54 48 Q60 42 66 48" />
        </g>
      )}
      {eyeShape === "sleepy" && (
        <g stroke={theme.eyeColor} strokeWidth="3" strokeLinecap="round">
          <path d="M34 49 L46 49" />
          <path d="M54 49 L66 49" />
        </g>
      )}
      {eyeShape === "confused" && (
        <g>
          <circle cx="40" cy="48" r="4.2" fill={theme.eyeColor} />
          <circle cx="63" cy="46" r="3" fill={theme.eyeColor} />
        </g>
      )}
      {eyeShape === "idle" && (
        <g>
          <ellipse cx="40" cy="48" rx="4.4" ry="6" fill={theme.eyeColor} />
          <ellipse cx="60" cy="48" rx="4.4" ry="6" fill={theme.eyeColor} />
          <circle cx="41.5" cy="45" r="1.3" fill="#FFFFFF" />
          <circle cx="61.5" cy="45" r="1.3" fill="#FFFFFF" />
        </g>
      )}

      {/* nose + mouth */}
      <path d="M47 58 L53 58 L50 62 Z" fill="#E97C6B" />
      {eyeShape === "happy" ? (
        <path d="M50 62 Q50 68 44 68 M50 62 Q50 68 56 68" stroke={theme.furAccent} strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M50 62 Q46 66 42 64 M50 62 Q54 66 58 64" stroke={theme.furAccent} strokeWidth="2" fill="none" strokeLinecap="round" />
      )}

      {/* whiskers */}
      <g stroke={theme.furAccent} strokeWidth="1.4" opacity="0.6" strokeLinecap="round">
        <path d="M14 56 L30 54" />
        <path d="M13 63 L30 61" />
        <path d="M86 56 L70 54" />
        <path d="M87 63 L70 61" />
      </g>
    </svg>
  );
}
