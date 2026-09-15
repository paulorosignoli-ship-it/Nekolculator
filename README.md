# 🐾 Nekolculator

A cute, cat-themed calculator PWA — Basic, Scientific, Financial (standard forms), and a real HP-12C-style RPN financial calculator, seven feline color themes, dark mode, four languages, real cat sound effects, and legal pages with a cookie consent banner. Installable, offline-ready app shell.

Built with **React + TypeScript + Vite + Tailwind CSS**. No extra runtime dependencies beyond React — the i18n system, dark mode, and legal pages are all hand-rolled (no react-router, no i18next).

## Features

- **Basic mode** — the classic 4-function calculator.
- **Scientific mode** — parentheses, `x^y`, `x²`, `√x`, `sin/cos/tan`, `log/ln`, `π`/`e`, `n!`, DEG/RAD toggle.
- **Financial (Standard)** — loan/mortgage payment (PMT), compound growth & future value, discount + sales tax.
- **HP-12C mode** — a genuine RPN engine modeled on the real HP-12C: 4-register stack (X/Y/Z/T), `ENTER` with proper stack lift, `f` (orange) and `g` (blue) shift keys, TVM keys (`n`, `i`, `PV`, `PMT`, `FV`) that **store** a value when you've just typed one and **solve** for it when you haven't (exactly like the real thing), 10 storage registers (`STO`/`RCL`), `LSTx`, `x⋚y` swap, `R↓` roll, `√x`/`eˣ`/`LN`/`FRAC`/`INTG`/`n!` as shifted functions, `BEGIN`/`END` payment timing, settable decimal display precision (`f`+digit), and an `ON` power toggle. See "HP-12C scope" below for what's intentionally not implemented.
- **Safe math engine** — a hand-rolled tokenizer + shunting-yard parser + RPN evaluator in `src/lib/calculator.ts`. No `eval()`, anywhere.
- **Real cat sound FX** — your recorded meows/errors/purr, played via the Web Audio API for low-latency overlapping playback (`src/lib/soundEffects.ts`), each theme applying a subtle pitch shift. Volumes are tuned down ~40% from the initial pass.
- **Cat paw easter egg** — a paw occasionally swipes in from the edge of the card.
- **Dynamic theme engine** — 13 feline themes (Orange Tabby, Black Void, Siamese Point, Calico, Fluffy White, Tuxedo, Kitten, Jaguar, Brown Tabby, Russian Gray, Tortoiseshell, Bengal, Sphynx), randomized on load, cycled via the paw button in the side rail.
- **Dark mode** — a programmatic dark-mode pass (`src/lib/color.ts`) derives a dark palette from *any* theme (light or future ones) rather than hand-tuning 7 separate dark palettes. Toggle in the header; respects OS preference on first visit, persists after that.
- **4 languages** — English, Brazilian Portuguese, Spanish, and Japanese. Flag button in the side rail cycles through them; auto-detects from the browser on first visit. See `src/lib/i18n/`.
- **Side control rail** — theme, dark/light, and volume buttons stacked vertically on the right edge of the card, with the language button below them (`src/components/SideControls.tsx`), matching the layout you sketched.
- **Real URLs for legal pages** — `/privacy`, `/terms`, `/cookies` are genuine, shareable, bookmarkable, crawlable routes (via a small hand-rolled History API router, `src/hooks/useRouter.ts`) rather than in-app-only state, which matters for SEO and for direct linking.
- **SEO basics** — `robots.txt`, `sitemap.xml`, canonical URL, Open Graph + Twitter Card tags, a static 1200×630 share image (`public/og-image.png`), and JSON-LD `WebApplication` structured data. See "SEO — please review before publishing" below.
- **Legal pages** — Privacy Policy, Terms of Use, and Cookie Policy, written and translated into all 4 languages, linked from the footer. See "Legal content — please review" below.
- **Cookie consent banner** — bottom sheet on first visit with "Accept all" / "Necessary only", reopenable anytime via the footer's "Cookie settings" link. Stores its choice in `localStorage`.
- **Full keyboard support** — digits, numpad, `+ - * /`, `Enter`/`=`, `Escape` (clear), `Backspace`, parentheses (Basic/Scientific); a separate RPN-flavored keyboard mapping for HP-12C mode (`Enter` = ENTER, not `=`).
- **PWA** — installable, offline-capable, via `vite-plugin-pwa`.

## Project structure

```
src/
  components/
    Header.tsx              Mascot, title, theme/dark-mode/language/mute buttons
    ModeTabs.tsx             Pill tab navigation between modes
    Footer.tsx                Legal page links + cookie settings link
    LegalPage.tsx              Generic renderer for Privacy/Terms/Cookies content
    CookieConsent.tsx          The consent banner
    Display.tsx                Basic/Scientific display screen
    Mascot.tsx                 Theme-aware cat SVG with reaction expressions
    CatPaw.tsx                 The decorative paw-swipe animation
    Keypad/
      Button.tsx, BasicKeypad.tsx, ScientificKeypad.tsx
      Hp12cKey.tsx              HP-12C key with f/g shifted labels
    Modes/
      BasicMode.tsx, ScientificMode.tsx
      Financial/
        FinancialStandard.tsx   Loan / growth / discount forms
        Hp12c.tsx                 The HP-12C mode UI
  hooks/
    useCalculator.ts          Basic/Scientific expression state machine
    useHp12c.ts                 The HP-12C RPN engine (stack, shift system, TVM)
    useTheme.ts                  Theme + dark mode selection, CSS var application
    useSound.ts / useAmbientPurr.ts
    useKeyboard.ts
  lib/
    calculator.ts              Tokenizer, shunting-yard, RPN evaluator (Basic/Sci)
    financial.ts                 PMT / FV / discount+tax / TVM solver (shared with HP-12C)
    soundEffects.ts / soundManifest.ts
    themes.ts / color.ts          Theme defs + programmatic dark-mode derivation
    i18n/                          types.ts + en.ts/pt-BR.ts/es.ts/ja.ts + index.tsx (context)
  content/
    legal/                          types.ts + en/pt-BR/es/ja content + index.ts (resolver)
public/
  sounds/
    clicks/  click-01.mp3 ... click-23.mp3
    errors/  error-01.mp3, error-02.mp3
    purr/    purr-01.mp3
```

### Adding more sounds later

Drop new files into the matching `public/sounds/` folder, then add their path to the arrays in `src/lib/soundManifest.ts`.

### Adding a 5th language later

1. Add the language code to `LanguageCode` and `LANGUAGES` in `src/lib/i18n/index.tsx`.
2. Copy `src/lib/i18n/en.ts` to a new file implementing the same `Translations` interface (TypeScript will flag anything missing).
3. Copy `src/content/legal/en.ts` similarly for the legal pages, and register both in their respective `index`/resolver files.

## HP-12C scope

This is a real RPN engine, not a mockup — but a few real HP-12C features are intentionally **not** implemented in this pass, since they're substantial features in their own right: amortization schedules (`f AMORT`), interest-only (`f INT`), NPV/IRR cash-flow lists (`g CFo/CFj/Nj`, `f NPV`, `f IRR`), bond pricing (`f PRICE`/`f YTM`), depreciation (`f SL`/`f SOYD`/`f DB`), date arithmetic (`g DATE`, `g D.MY`/`g M.DY`), and the programmable-calculator features (`R/S`, `SST`, `BST`, `GTO`, `PSE`). Pressing any of these shows a friendly "not in my paws yet" status message rather than failing silently. Everything else — the stack, `ENTER`, TVM store-or-solve, the shift system, memory registers, and the math functions listed above — is fully functional.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build & deploy on Vercel

```bash
npm run build      # outputs to /dist
```

Push this repo to GitHub, then in Vercel: **New Project → Import** your repo. Vercel auto-detects Vite; build command/output directory are already pinned in `vercel.json`. Deploy.

## Legal content — please review before publishing

I wrote full Privacy Policy, Terms of Use, and Cookie Policy content in all 4 languages (`src/content/legal/`), covering local-storage-only data collection, the planned AdSense/Monetag advertising, no professional-advice disclaimers for the financial modes, and a specific list of every storage key the app uses. Two things you should update before this goes live:

1. **Contact email** — every page currently uses the placeholder `hello@nekolculator.app`. Set `CONTACT_EMAIL` at the top of each of the 4 files in `src/content/legal/`.
2. **Jurisdiction / company details** — the Terms of Use are intentionally jurisdiction-neutral (no specific governing-law clause), since I don't know where you're incorporated or operating from. If you want a specific governing-law/venue clause, that's a one-paragraph addition once you confirm the jurisdiction — happy to add it.

Non-English legal pages include a small note that the English version governs in case of any translation discrepancy, which is standard practice for machine-assisted legal translation.

## SEO — please review before publishing

I added the standard SEO groundwork, using a **placeholder domain** (`nekolculator.app`) since you haven't registered yours yet:

- `public/robots.txt` — allows all crawlers, points to the sitemap.
- `public/sitemap.xml` — lists `/`, `/privacy`, `/terms`, `/cookies`.
- `index.html` — descriptive `<title>`, meta description, canonical URL, Open Graph + Twitter Card tags, and JSON-LD `WebApplication` structured data.
- `public/og-image.png` — a static 1200×630 share image (so link previews on social/chat apps look right even without JS execution).
- `document.title` updates per page/language at runtime via `src/App.tsx`.

**Once you register your domain today, do a find-and-replace of `nekolculator.app` for your real domain** across: `public/robots.txt`, `public/sitemap.xml`, `index.html` (canonical + all `og:`/`twitter:` URLs), and `src/content/legal/*.ts` (the `CONTACT_EMAIL` constant, if your email will be on that domain).

Two honest limitations worth knowing about, given this is a client-rendered SPA:
- **hreflang** isn't set up, because language is a client-side preference (stored in `localStorage`), not part of the URL — there's no `/es/`, `/ja/` etc. to point `hreflang` at. If you want language-specific SEO later, that's a bigger change (URL-based locale routing) — happy to do it, just flagging it's a separate piece of work from what's here now.
- Meta tags in `index.html` are static per the *whole site*, not per-route — a crawler that doesn't execute JavaScript will see the homepage's title/description even when linked to `/privacy`. Google's own crawler executes JS and will see the correct per-page title (set client-side), but not every bot does. If that matters to you (e.g. for rich previews when someone shares the Privacy Policy link specifically), the fix is pre-rendering those routes at build time — again, a separate task from this pass.

## Notes on the math

- Percent (`%`) in Basic/Scientific mode is "divide by 100" applied to the number it follows. The HP-12C's `%` key follows the real calculator's convention instead (`Y × X/100`, keeping `Y` in the stack) since that's what real HP-12C usage expects.
- Trig functions respect the DEG/RAD toggle in Scientific mode (default: degrees). HP-12C mode doesn't include trig (the real HP-12C doesn't either).
- The financial TVM solver (`src/lib/financial.ts`) is shared between Financial (Standard) and HP-12C mode, and treats **N as total periods** (not years), following the standard cash-flow sign convention: money paid out is negative, money received is positive.

## Roadmap: monetization

Still no ad code shipped. The Cookie Policy and consent banner are already written with AdSense/Monetag in mind (advertising cookies are called out explicitly and gated behind the "Accept all" choice), so wiring in real ad slots later should be additive rather than requiring a rework of the legal/consent plumbing.
