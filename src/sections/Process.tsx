import { useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { Reveal, SectionHeader } from "../components/ui";
import { process } from "../data/content";
import { cn } from "../utils/cn";

function StepCard({ i, step, body, out, active }: { i: number; step: string; body: string; out: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "card relative flex h-full flex-col overflow-hidden p-7 transition-colors duration-500 md:p-8",
        active && "border-lime/40"
      )}
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-[5.5rem] font-semibold leading-none tracking-[-0.015em] text-transparent [-webkit-text-stroke:1px_rgba(238,241,247,0.22)]">
          0{i + 1}
        </span>
        <span className="rounded-full border hair-strong px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-dim">{out}</span>
      </div>
      <h3 className="mt-auto font-display text-4xl font-semibold tracking-[-0.015em]">{step}</h3>
      <p className="mt-3 text-dim">{body}</p>
      <div className="mt-7 flex h-16 items-end gap-1.5" aria-hidden>
        {Array.from({ length: 6 }).map((_, k) => (
          <span
            key={k}
            className={cn("flex-1 rounded-sm transition-colors duration-500", k <= i ? "bg-gradient-to-t from-iris to-lime" : "bg-white/[0.06]")}
            style={{ height: `${22 + k * 15.6}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function HorizontalJourney() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const updateActive = () => {
    const el = track.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setActive(maxScroll > 0 ? Math.round((el.scrollLeft / maxScroll) * (process.length - 1)) : 0);
  };

  const goTo = (index: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(process.length - 1, index));
    el.scrollTo({
      left: ((el.scrollWidth - el.clientWidth) * next) / (process.length - 1),
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActive(next);
  };

  return (
    <div className="hidden lg:block">
      <div className="container-x flex items-end justify-between gap-8">
        <SectionHeader index="04" label="Our process" title="A clear path from idea to" accent="momentum." />
        <div className="mb-2 flex shrink-0 items-center gap-4">
          <span aria-live="polite" className="font-mono text-sm text-dim">
            <span className="text-lime">0{active + 1}</span> / 0{process.length}
          </span>
          <div className="flex gap-2">
            {([-1, 1] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => goTo(active + direction)}
                disabled={direction === -1 ? active === 0 : active === process.length - 1}
                aria-label={direction === -1 ? "Previous process step" : "Next process step"}
                className="grid h-11 w-11 place-items-center rounded-full border hair-strong text-fg transition-colors hover:border-lime hover:bg-lime hover:text-void disabled:cursor-not-allowed disabled:opacity-35"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path d={direction === -1 ? "M19 12H5m6 6-6-6 6-6" : "M5 12h14m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        ref={track}
        onScroll={updateActive}
        tabIndex={0}
        role="region"
        aria-label="Our process steps, scroll horizontally to explore"
        className="container-x mt-10 flex gap-5 overflow-x-auto overscroll-x-contain pb-5 outline-none focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-lime"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#c5ff3d transparent" }}
      >
        {process.map((p, i) => (
          <div key={p.step} className="h-[380px] w-[400px] shrink-0 xl:w-[430px]">
            <StepCard i={i} {...p} active={i === active} />
          </div>
        ))}
      </div>
      <div className="container-x mt-5 flex items-center justify-between gap-6">
        <span className="font-mono text-xs uppercase tracking-wider text-dim">Scroll or use arrows to explore</span>
        <div className="flex items-center gap-2" aria-label="Jump to a process step">
          {process.map((p, i) => (
            <button
              key={p.step}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to ${p.step}`}
              aria-current={active === i ? "step" : undefined}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                i === active ? "w-7 bg-lime" : "w-2.5 bg-white/25 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function VerticalJourney() {
  return (
    <div className="container-x lg:hidden">
      <SectionHeader index="04" label="Our process" title="A clear path from idea to" accent="momentum." />
      <ol className="relative mt-12 space-y-5 border-l hair pl-6 sm:pl-8">
        {process.map((p, i) => (
          <Reveal as="li" key={p.step} className="relative">
            <span className="absolute -left-[31px] top-8 h-3 w-3 rounded-full border-2 border-lime bg-void sm:-left-[39px]" />
            <StepCard i={i} {...p} />
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" aria-label="Our process" className="relative pt-20 pb-6 md:pt-24 md:pb-8">
      <HorizontalJourney />
      <VerticalJourney />
    </section>
  );
}
