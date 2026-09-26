import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { brand, navLinks, whatsappLink } from "../data/content";
import { lockScroll } from "../lib/scroll";
import { cn } from "../utils/cn";
import { Logo } from "./Brand";
import { Button, EASE } from "./ui";

function useActiveSection() {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export default function Nav({ ready }: { ready: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);
  const active = useActiveSection();
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 240 && y > last.current + 4 ? true : y < last.current - 4 ? false : hidden);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden]);

  useEffect(() => {
    lockScroll(open);
    if (open) setTimeout(() => firstLink.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[120] -translate-y-24 rounded-full bg-lime px-4 py-2 text-sm font-medium text-void focus:translate-y-0"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: hidden && !open ? -110 : 0, opacity: 1 } : { y: -40, opacity: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[80] pt-3 md:pt-4"
      >
        <div
          className={cn(
            "container-x flex h-16 items-center justify-between rounded-full pl-4 pr-2 transition-all duration-500",
            scrolled && !open ? "glass shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]" : "border border-transparent"
          )}
        >
          <a href="#top" aria-label="WEGROW — back to top" className="rounded-full">
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border hair bg-white/[0.02] p-1">
              {navLinks.map((l) => {
                const isActive = active === l.href.slice(1);
                return (
                  <li key={l.href} className="relative">
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.08]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <a
                      href={l.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block rounded-full px-4 py-2 text-sm transition-colors",
                        isActive ? "text-fg" : "text-dim hover:text-fg"
                      )}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button href="#contact" className="hidden sm:inline-flex" size="md">
              Start a project
            </Button>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-12 w-12 place-items-center rounded-full border hair-strong bg-white/[0.03] lg:hidden"
            >
              <span
                className={cn(
                  "absolute h-[1.5px] w-5 bg-fg transition-transform duration-500 ease-[var(--ease-premium)]",
                  open ? "rotate-45" : "-translate-y-[4px]"
                )}
              />
              <span
                className={cn(
                  "absolute h-[1.5px] w-5 bg-fg transition-transform duration-500 ease-[var(--ease-premium)]",
                  open ? "-rotate-45" : "translate-y-[4px]"
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[70] flex flex-col bg-night/95 px-6 pb-8 pt-28 backdrop-blur-2xl lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav aria-label="Mobile" className="flex-1">
              <ul className="space-y-1">
                {navLinks.map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.a
                      ref={i === 0 ? firstLink : undefined}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.06 }}
                      className="flex items-baseline gap-4 py-2 font-display text-[clamp(2.4rem,11vw,4rem)] font-semibold leading-none tracking-[-0.02em]"
                    >
                      <span className="font-mono text-xs text-lime">0{i + 1}</span>
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-5 border-t hair pt-6"
            >
              <div className="flex flex-col gap-1 text-dim">
                <a href={`mailto:${brand.email}`} className="break-all hover:text-lime">
                  {brand.email}
                </a>
                <a href={brand.phoneHref} className="hover:text-lime">
                  {brand.phoneDisplay}
                </a>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="#contact" onClick={() => setOpen(false)}>
                  Start a project
                </Button>
                <Button href={whatsappLink()} external variant="ghost">
                  WhatsApp
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
