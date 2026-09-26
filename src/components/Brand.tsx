import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { EASE } from "./ui";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative grid h-8 w-8 place-items-center rounded-[10px] bg-lime text-void", className)} aria-hidden>
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none">
        <path d="M4 16.5 9 11.5 12.5 15 20 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 7.5h5v5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-[1.28rem] font-semibold tracking-[-0.02em]">
        WE<span className="text-lime">GROW</span>
      </span>
    </span>
  );
}

/** Short brand intro that lifts away like a curtain. Skipped for reduced motion. */
export function Intro({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setShow(false), reduce ? 0 : 1250);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] grid place-items-center bg-void"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: EASE }}
          aria-hidden
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex overflow-hidden font-display text-[clamp(2.8rem,9vw,6rem)] font-semibold leading-none tracking-[-0.015em]">
              {"WEGROW".split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.05 * i }}
                  className={i >= 2 ? "text-lime" : ""}
                >
                  {ch}
                </motion.span>
              ))}
            </div>
            <div className="h-px w-48 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-lime"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ originX: 0 }}
                transition={{ duration: 1.05, ease: EASE }}
              />
            </div>
            <motion.p
              className="eyebrow text-dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              Digital growth partner
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
