// Loads third-party ad network scripts, gated behind cookie consent.
// Nothing here runs unless the person has chosen "Accept all" in the cookie
// banner (see CookieConsent.tsx) — declining ("Necessary only") means these
// scripts are never injected, and nothing here re-checks or nags about it.

interface AdNetwork {
  id: string;
  inject: () => void;
}

const MONETAG_SCRIPT_SRC = "https://quge5.com/88/tag.min.js";
const MONETAG_ZONE = "281391";

function alreadyInjected(id: string): boolean {
  return document.getElementById(id) !== null;
}

const NETWORKS: AdNetwork[] = [
  {
    id: "monetag-ad-script",
    inject: () => {
      const script = document.createElement("script");
      script.id = "monetag-ad-script";
      script.src = MONETAG_SCRIPT_SRC;
      script.async = true;
      script.setAttribute("data-zone", MONETAG_ZONE);
      script.setAttribute("data-cfasync", "false");
      document.head.appendChild(script);
    },
  },
  // Add AdSense (or any future network) here the same way once it's ready.
];

/** Injects every configured ad network's script, skipping any already present. */
export function loadAds() {
  if (typeof document === "undefined") return;
  for (const network of NETWORKS) {
    if (!alreadyInjected(network.id)) {
      network.inject();
    }
  }
}
