# 🐾 Nekolculator

A cute, cat-themed calculator PWA — Basic, Scientific, and Financial (standard + HP-style TVM/RPN) modes, seven feline color themes, synthesized cat sound effects, and an installable offline-ready app shell.

Built with **React + TypeScript + Vite + Tailwind CSS**.

## Features

- **Basic mode** — the classic 4-function calculator with a "Ready to pounce..." status line.
- **Scientific mode** — parentheses, `x^y`, `x²`, `√x`, `sin/cos/tan`, `log/ln`, `π`/`e`, `n!`, and a DEG/RAD toggle.
- **Financial (Standard)** — loan/mortgage payment (PMT), compound growth & future value, and discount + sales tax.
- **Financial (HP-style)** — a TVM row (`N`, `I/YR`, `PV`, `PMT`, `FV`) that solves for whichever value you leave blank, plus an optional RPN stack calculator with `ENTER`.
- **Safe math engine** — a hand-rolled tokenizer + shunting-yard parser + RPN evaluator in `src/lib/calculator.ts`. No `eval()`, anywhere.
- **Cat sound FX** — meow-ish clicks, an error hiss, and a purr on successful `=`, all synthesized live with the Web Audio API (`src/lib/soundEffects.ts`) — no audio files to ship.
- **Cat paw easter egg** — a paw occasionally swipes in from the edge of the card, purely cosmetic.
- **Dynamic theme engine** — 7 feline themes (Orange Tabby, Black Void, Siamese Point, Calico, Fluffy White, Tuxedo, Kitten) defined as CSS variables in `src/lib/themes.ts`. A random theme is picked on load; the paw icon in the header cycles through the rest.
- **Full keyboard support** — digits, numpad, `+ - * /`, `Enter`/`=`, `Escape` (clear), `Backspace`, parentheses.
- **PWA** — installable, offline-capable, via `vite-plugin-pwa` (auto-generates the manifest + service worker at build time).

## Project structure

```
src/
  components/
    Header.tsx            Mascot, app title, theme + mute buttons
    ModeTabs.tsx           Pill tab navigation between modes
    Display.tsx            The dark "screen"
    Mascot.tsx             Theme-aware cat SVG with reaction expressions
    CatPaw.tsx             The decorative paw-swipe animation
    Keypad/
      Button.tsx
      BasicKeypad.tsx
      ScientificKeypad.tsx
    Modes/
      BasicMode.tsx
      ScientificMode.tsx
      Financial/
        FinancialStandard.tsx
        FinancialHP.tsx
  hooks/
    useCalculator.ts       Expression state machine
    useTheme.ts             Theme selection + CSS var application
    useSound.ts              Mute state + sound playback
    useKeyboard.ts           Desktop keyboard mapping
  lib/
    calculator.ts           Tokenizer, shunting-yard, RPN evaluator
    financial.ts             PMT / FV / discount+tax / TVM solver
    soundEffects.ts          Web Audio synthesis
    themes.ts                 Theme definitions + CSS var application
```

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build & deploy on Vercel

```bash
npm run build      # outputs to /dist
```

Push this repo to GitHub, then in Vercel:

1. **New Project → Import** your GitHub repo.
2. Framework preset: **Vite** (Vercel auto-detects this).
3. Build command: `npm run build` · Output directory: `dist` (already set in `vercel.json`).
4. Deploy. The service worker and manifest are generated automatically at build time by `vite-plugin-pwa`.

No environment variables are required for the current feature set.

## Notes on the math

- Percent (`%`) is implemented as "divide by 100" applied to the number it follows (e.g. `50+10%` → `50.1`), which keeps the parser simple and predictable across nested expressions. If you'd like the "10% of the left-hand operand" convention some calculators use instead, that logic lives entirely in `evalRPN`/`toRPN` in `src/lib/calculator.ts`.
- Trig functions respect the DEG/RAD toggle in Scientific mode (default: degrees).
- The HP-style TVM solver treats **N as total periods** (not years) and follows the standard cash-flow sign convention: money paid out is negative, money received is positive.

## Roadmap: monetization

This build intentionally ships with **no ad code**. When you're ready to wire up Monetag and/or AdSense:
- We'll want a dedicated `<AdSlot />` component with reserved layout space (to avoid layout shift) that can be toggled per-mode.
- AdSense requires its verification script in `index.html` and a `ads.txt` in `public/`.
- Monetag is typically a single script tag plus zone IDs.
- Both should be loaded only after the PWA shell and calculator are interactive, and gated behind a check so they never load in the installed/standalone PWA context if you want the installed app ad-free.

Come back to this section (or just ask) when you're ready and we'll wire it in without disrupting the existing UI.
