// Loads third-party ad network scripts, gated behind cookie consent.
// Nothing here runs unless the person has chosen "Accept all" in the cookie
// banner (see CookieConsent.tsx) — declining ("Necessary only") means no ad
// script is ever injected, and nothing here re-checks or nags about it.
//
// No network is configured right now. When you're ready to add one:
//   1. Add an entry to NETWORKS below (id + an inject() that appends the
//      network's <script> tag to document.head).
//   2. That's it — loadAds() already runs at the right time (on load if
//      previously consented, and immediately on "Accept all").
//
// Worth choosing carefully: some ad networks (particularly ones offering
// popunders, "in-page push", or interstitial formats) inject their own
// overlays/redirects at runtime that can make a page feel broken even
// though nothing in the source code is wrong. Prefer networks/formats that
// stick to a defined ad slot (a banner or native unit in a fixed spot)
// over ones that can take over the whole page.

interface AdNetwork {
  id: string;
  inject: () => void;
}

function alreadyInjected(id: string): boolean {
  return document.getElementById(id) !== null;
}

const NETWORKS: AdNetwork[] = [
  // Example shape for later:
  // {
  //   id: "some-network-ad-script",
  //   inject: () => {
  //     const script = document.createElement("script");
  //     script.id = "some-network-ad-script";
  //     script.src = "https://example.com/ad.js";
  //     script.async = true;
  //     document.head.appendChild(script);
  //   },
  // },
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
