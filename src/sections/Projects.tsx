import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button, Reveal, SectionHeader } from "../components/ui";
import { featuredProject as p } from "../data/content";

function BrowserMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-7%", "7%"]);

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(197,255,61,0.14),transparent)] blur-2xl" />
      <div className="overflow-hidden rounded-2xl border hair-strong bg-deep shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] md:rounded-3xl">
        <div className="flex items-center gap-2 border-b hair bg-void/60 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-3 flex-1 truncate rounded-full bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-dim">
            we-grow-topaz.vercel.app
          </span>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.img
            src={p.images.hero}
            alt="Woof Heaven website hero — guests dining on a lantern-lit terrace with a golden retriever"
            style={{ y, scale: 1.18 }}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">Saravanampatti · Coimbatore</p>
            <p className="mt-2 max-w-sm font-display text-2xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
              Where every meal comes with a wag.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative border-t hair bg-night/50 pt-20 pb-16 md:pt-28 md:pb-20">
      <div className="container-x">
        <div id="projects-title">
          <SectionHeader index="03" label="Featured work" title="Work that feels good and" accent="works hard." />
        </div>

        <article className="mt-10 grid items-center gap-10 md:mt-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16" aria-labelledby="case-woof">
          <Reveal y={40}>
            <BrowserMockup />
          </Reveal>

          <div>
            <Reveal>
              <p className="eyebrow text-lime">{p.sector} / {p.year}</p>
              <h3 id="case-woof" className="display mt-4 text-5xl md:text-6xl">
                {p.client}
              </h3>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-dim">{p.summary}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-7 space-y-3 border-t hair pt-6">
                {p.built.slice(0, 2).map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-fg/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2} className="mt-8">
              <Button href={p.url} external>
                Explore the live site
              </Button>
            </Reveal>
          </div>
        </article>
      </div>
    </section>
  );
}
