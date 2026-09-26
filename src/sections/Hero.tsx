import { lazy, Suspense, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button, EASE, Words } from "../components/ui";
import { brand } from "../data/content";

const GrowthSpiral = lazy(() => import("../three/GrowthSpiral"));

const modules = [
  { label: "Strategy", w: "82%" },
  { label: "Design", w: "94%" },
  { label: "Technology", w: "88%" },
  { label: "Content", w: "76%" },
];

function SceneFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-40 w-40 rounded-full bg-lime/20 blur-3xl" />
    </div>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 md:pt-32"
    >
      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_0%,rgba(139,125,255,0.20),transparent_60%),radial-gradient(45%_40%_at_85%_45%,rgba(197,255,61,0.10),transparent_65%),linear-gradient(180deg,#0a0e1c_0%,#06070b_85%)]" />
        <div
          className="absolute inset-x-0 bottom-0 h-[55%] opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(238,241,247,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(238,241,247,0.07) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            transform: "perspective(700px) rotateX(62deg)",
            transformOrigin: "50% 100%",
            maskImage: "linear-gradient(to top, black 10%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 85%)",
          }}
        />
      </div>

      <div className="container-x relative flex flex-1 flex-col">
        {/* 3D scene — right side on desktop */}
        <motion.div
          style={{ y: sceneY, opacity: fade }}
          className="pointer-events-none absolute bottom-[88px] right-[-4%] top-0 hidden w-[50%] lg:block"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          >
            {ready && (
              <Suspense fallback={<SceneFallback />}>
                <GrowthSpiral />
              </Suspense>
            )}
          </motion.div>

          {/* floating UI */}
          <motion.div {...fadeUp(1.1)} className="absolute right-[6%] top-[8%] xl:right-[10%]">
            <div className="glass animate-float w-56 rounded-2xl p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
              <div className="mb-3 flex items-center justify-between">
                <span className="eyebrow text-[0.62rem] text-dim">Growth system</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping-soft absolute inset-0 rounded-full bg-lime" />
                  <span className="relative h-2 w-2 rounded-full bg-lime" />
                </span>
              </div>
              <ul className="space-y-2.5">
                {modules.map((m, i) => (
                  <li key={m.label}>
                    <div className="mb-1 text-xs text-fg/90">{m.label}</div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-iris to-lime"
                        initial={{ width: 0 }}
                        animate={ready ? { width: m.w } : {}}
                        transition={{ duration: 1.4, ease: EASE, delay: 1.3 + i * 0.12 }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div {...fadeUp(1.3)} className="absolute bottom-[6%] right-[8%]">
            <div className="glass animate-float rounded-2xl px-4 py-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] [animation-delay:1.5s]">
              <div className="eyebrow text-[0.6rem] text-dim">Idea → Live</div>
              <div className="mt-1 flex items-center gap-2 font-display text-lg font-medium tracking-tight">
                Built to scale
                <svg viewBox="0 0 48 16" className="h-4 w-12" aria-hidden>
                  <path d="M1 14 12 9l9 3 12-8 14-3" fill="none" stroke="#c5ff3d" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Copy */}
        <motion.div style={{ y: textY }} className="relative z-10 flex flex-1 flex-col justify-center pb-10">
          <motion.div {...fadeUp(0.05)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border hair-strong bg-white/[0.03] py-1.5 pl-2 pr-4 text-xs text-dim backdrop-blur">
              <span className="rounded-full bg-lime/15 px-2 py-0.5 font-mono text-[0.65rem] tracking-wider text-lime">WEGROW</span>
              Digital growth partner · {brand.location}
            </span>
          </motion.div>

          <h1
            id="hero-title"
            className="display mt-7 max-w-[15ch] text-[clamp(2.7rem,6.6vw,6.6rem)] leading-[0.95] lg:max-w-none"
          >
            <span className="lg:block">
              <Words text="We build digital" play={ready} delay={0.1} />{" "}
            </span>
            <span className="lg:block">
              <Words text="systems that help" play={ready} delay={0.22} />{" "}
            </span>
            <span className="lg:block">
              <Words text="ambitious businesses" play={ready} delay={0.34} />{" "}
            </span>
            <span className="items-end gap-10 lg:flex">
              <Words text="grow." play={ready} delay={0.48} wordClassName="serif-accent text-gradient pr-2" />
              <motion.span {...fadeUp(0.8)} className="mb-3 hidden max-w-sm text-base font-normal leading-relaxed tracking-normal text-dim [font-family:var(--font-sans)] lg:block">
                Websites, apps, brands, social content and growth strategy — designed and engineered as one system.
              </motion.span>
            </span>
          </h1>

          <motion.p {...fadeUp(0.75)} className="mt-7 max-w-md text-lg leading-relaxed text-dim lg:hidden">
            Websites, apps, brands, social content and growth strategy — designed and engineered as one system for
            businesses ready to move with clarity and momentum.
          </motion.p>

          <motion.div {...fadeUp(0.9)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#contact" size="lg">
              Start your growth journey
            </Button>
            <Button href="#projects" size="lg" variant="ghost" arrow={false}>
              Explore our work
            </Button>
          </motion.div>
        </motion.div>

        {/* 3D scene — mobile/tablet */}
        <div className="relative -mx-5 h-[340px] sm:h-[420px] lg:hidden" aria-hidden>
          {ready && (
            <Suspense fallback={<SceneFallback />}>
              <GrowthSpiral />
            </Suspense>
          )}
        </div>

        {/* Bottom rail */}
        <motion.div
          {...fadeUp(1.1)}
          className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t hair py-6 text-sm text-dim"
        >
          <a href="#trust" className="group inline-flex items-center gap-3 hover:text-fg">
            <span className="relative grid h-9 w-6 place-items-start justify-center rounded-full border hair-strong pt-1.5">
              <motion.span
                className="h-1.5 w-1 rounded-full bg-lime"
                animate={reduce ? {} : { y: [0, 10, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            Scroll to explore
          </a>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>{brand.experience}</span>
            <span className="hidden h-1 w-1 rounded-full bg-faint sm:block" />
            <span>Strategy · Design · Technology · Content</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
