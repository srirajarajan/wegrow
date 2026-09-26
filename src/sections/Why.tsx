import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { EASE, Reveal, SectionHeader } from "../components/ui";
import { reasons } from "../data/content";
import { cn } from "../utils/cn";

export default function Why() {
  const [active, setActive] = useState(0);

  return (
    <section id="why" aria-labelledby="why-title" className="relative border-t hair pt-16 pb-24 md:pt-20 md:pb-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_10%_60%,rgba(197,255,61,0.06),transparent)]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div id="why-title">
            <SectionHeader index="05" label="Why WEGROW" title="A partner that grows" accent="with you." />
          </div>

          <Reveal delay={0.15} className="mt-12 hidden lg:block">
            <div className="card relative h-64 overflow-hidden p-8">
              <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-lime/10 blur-3xl" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative flex h-full flex-col justify-between"
                >
                  <span className="font-display text-8xl font-semibold leading-none tracking-[-0.015em] text-gradient">0{active + 1}</span>
                  <p className="font-display text-2xl font-medium tracking-tight">{reasons[active].title}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        <ul className="border-t hair">
          {reasons.map((r, i) => {
            const open = active === i;
            return (
              <Reveal as="li" key={r.title} delay={i * 0.05} className="border-b hair">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`why-${i}`}
                    id={`why-btn-${i}`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex w-full items-center gap-6 py-7 text-left md:py-8"
                  >
                    <span className={cn("font-mono text-xs transition-colors", open ? "text-lime" : "text-faint")}>0{i + 1}</span>
                    <span
                      className={cn(
                        "flex-1 font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-[-0.015em] transition-all duration-500",
                        open ? "text-fg" : "text-fg/45 group-hover:text-fg/80"
                      )}
                    >
                      {r.title}
                    </span>
                    <span
                      className={cn(
                        "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500",
                        open ? "rotate-45 border-lime bg-lime text-void" : "hair-strong text-dim"
                      )}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`why-${i}`}
                      role="region"
                      aria-labelledby={`why-btn-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-lg pb-8 pl-10 text-lg leading-relaxed text-dim md:pl-12">{r.body}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
