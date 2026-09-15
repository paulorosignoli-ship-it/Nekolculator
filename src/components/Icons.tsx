export function PawIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 100 100" fill={color}>
      <ellipse cx="50" cy="66" rx="24" ry="19" />
      <ellipse cx="26" cy="38" rx="10" ry="13" />
      <ellipse cx="42" cy="26" rx="10" ry="13" />
      <ellipse cx="58" cy="26" rx="10" ry="13" />
      <ellipse cx="74" cy="38" rx="10" ry="13" />
    </svg>
  );
}

export function SoundIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="4 9 8 9 12 5 12 19 8 15 4 15" fill={color} stroke="none" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 6a8.5 8.5 0 0 1 0 12" />
    </svg>
  );
}

export function MuteIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="4 9 8 9 12 5 12 19 8 15 4 15" fill={color} stroke="none" />
      <path d="M17 9l5 6M22 9l-5 6" />
    </svg>
  );
}

export function SunIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
    </svg>
  );
}

export function MoonIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color} stroke="none">
      <path d="M20.5 14.5a8.5 8.5 0 1 1-9-11.9 7 7 0 0 0 9 11.9Z" />
    </svg>
  );
}
