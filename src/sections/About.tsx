import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Reveal, SectionHeader } from "../components/ui";
import { pillars } from "../data/content";

const manifesto =
  "We Grow brings strategy, design, technology and content into one direction — so your business looks stronger, works smarter and reaches further. No templates, no noise. Just thoughtful digital systems built around real goals.";

function Word({ children, range, progress }: { children: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const lime = /direction|stronger|smarter|further|systems/.test(children);
  return (
    <motion.span style={{ opacity }} className={lime ? "text-lime" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = manifesto.split(" ");
  if (reduce) {
    return <p className="font-display text-[clamp(1.7rem,3.6vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.025em]">{manifesto}</p>;
  }
  return (
    <p ref={ref} className="font-display text-[clamp(1.7rem,3.6vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.025em]">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Orbit() {
  const labels = [
    { t: "Creativity", a: -90 },
    { t: "Technology", a: 30 },
    { t: "Growth", a: 150 },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]" aria-hidden>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(139,125,255,0.18),transparent_65%)]" />
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="og" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#8b7dff" />
            <stop offset="1" stopColor="#c5ff3d" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(238,241,247,0.08)" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(238,241,247,0.1)" strokeDasharray="2 6" />
        <circle cx="200" cy="200" r="90" fill="none" stroke="url(#og)" strokeOpacity="0.6" />
        <g className="animate-spin-slow" style={{ transformOrigin: "200px 200px" }}>
          <circle cx="200" cy="10" r="5" fill="#c5ff3d" />
          <circle cx="390" cy="200" r="3" fill="#8b7dff" />
        </g>
        <g className="animate-spin-slow" style={{ transformOrigin: "200px 200px", animationDirection: "reverse", animationDuration: "26s" }}>
          <circle cx="200" cy="60" r="4" fill="#e4ffa3" />
        </g>
      </svg>
      <div className="absolute inset-[34%] grid place-items-center rounded-full border border-lime/30 bg-void/80 text-center shadow-[0_0_60px_rgba(197,255,61,0.18)] backdrop-blur">
        <span className="font-display text-sm font-semibold leading-tight tracking-tight md:text-base">
          Your
          <br />
          <span className="serif-accent text-lg text-lime md:text-xl">business</span>
        </span>
      </div>
      {labels.map((l) => {
        const rad = (l.a * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * 35;
        const y = 50 + Math.sin(rad) * 35;
        return (
          <span
            key={l.t}
            className="glass absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3.5 py-1.5 text-xs font-medium md:text-sm"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {l.t}
          </span>
        );
      })}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-36">
      <div className="container-x">
        <div id="about-title">
          <SectionHeader index="01" label="About WEGROW" title="Creative thinking, engineered for" accent="growth." />
        </div>

        <div className="mt-14 max-w-5xl md:mt-20">
          <Manifesto />
        </div>

        <div className="mt-20 grid items-center gap-14 md:mt-28 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Orbit />
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow text-dim">Our approach</p>
            </Reveal>
            <ol className="mt-6 divide-y divide-white/[0.08] border-y hair">
              {pillars.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 0.08} className="group relative py-7">
                  <span className="absolute left-0 top-0 h-px w-0 bg-lime transition-all duration-700 ease-[var(--ease-premium)] group-hover:w-full" />
                  <div className="flex items-start gap-6">
                    <span className="mt-1.5 font-mono text-xs text-lime">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-3xl font-semibold tracking-[-0.015em] transition-transform duration-500 group-hover:translate-x-1 md:text-4xl">
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-md text-dim">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-dim">
                We combine creative direction with solid engineering and a clear commitment to measurable business
                outcomes — then keep refining after launch.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
