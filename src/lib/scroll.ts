import Lenis from "lenis";

let lenis: Lenis | null = null;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  let id = 0;
  const raf = (time: number) => {
    lenis?.raf(time);
    id = requestAnimationFrame(raf);
  };
  id = requestAnimationFrame(raf);
  return () => {
    cancelAnimationFrame(id);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToHash(hash: string) {
  if (hash === "#top" || hash === "#") {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    history.replaceState(null, "", " ");
    return;
  }
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -16 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  history.replaceState(null, "", hash);
  // move keyboard focus to the section for accessibility
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

export function lockScroll(lock: boolean) {
  if (lock) {
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    lenis?.start();
    document.documentElement.style.overflow = "";
  }
}

/** Delegate all in-page anchor clicks to the smooth scroller. */
export function bindAnchorClicks() {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const a = (e.target as HTMLElement).closest("a");
    const href = a?.getAttribute("href");
    if (!a || !href || !href.startsWith("#")) return;
    e.preventDefault();
    scrollToHash(href);
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
