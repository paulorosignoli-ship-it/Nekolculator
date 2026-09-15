import { useCallback, useEffect, useState } from "react";
import type { AppView, LegalView } from "../types";

const PATH_TO_VIEW: Record<string, AppView> = {
  "/": "calculator",
  "/privacy": "privacy",
  "/terms": "terms",
  "/cookies": "cookies",
};

const VIEW_TO_PATH: Record<AppView, string> = {
  calculator: "/",
  privacy: "/privacy",
  terms: "/terms",
  cookies: "/cookies",
};

function resolveView(pathname: string): AppView {
  return PATH_TO_VIEW[pathname] ?? "calculator";
}

/** Minimal History-API router. Keeps the calculator at "/" and legal pages at
 * their own real, crawlable, shareable URLs — without pulling in a router
 * library. Falls back to state-only navigation if History API is unavailable. */
export function useRouter() {
  const [view, setViewState] = useState<AppView>(() =>
    typeof window !== "undefined" ? resolveView(window.location.pathname) : "calculator"
  );

  useEffect(() => {
    function onPopState() {
      setViewState(resolveView(window.location.pathname));
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = useCallback((next: AppView) => {
    setViewState(next);
    if (typeof window !== "undefined" && window.history?.pushState) {
      const path = VIEW_TO_PATH[next];
      if (window.location.pathname !== path) {
        window.history.pushState({ view: next }, "", path);
      }
    }
  }, []);

  const navigateLegal = useCallback((v: LegalView) => navigate(v), [navigate]);

  return { view, navigate, navigateLegal };
}
