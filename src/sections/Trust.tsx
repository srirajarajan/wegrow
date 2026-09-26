import { Reveal } from "../components/ui";
import { featuredProject, services } from "../data/content";

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.55em] w-[0.55em] shrink-0 text-lime" aria-hidden>
      <path d="M12 0c.6 6.4 5 11 12 12-7 1-11.4 5.6-12 12-.6-6.4-5-11-12-12 7-1 11.4-5.6 12-12Z" fill="currentColor" />
    </svg>
  );
}

const facts = [
  { k: "5+", label: "Years of digital expertise", sub: "Strategy, design, development and marketing." },
  { k: String(services.length).padStart(2, "0"), label: "Core services, one team", sub: "No hand-offs between five different agencies." },
  { k: "01", label: "Clear point of contact", sub: "Direct access to the people doing the work." },
];

export default function Trust() {
  const words = services.map((s) => s.short);
  const row = [...words, ...words];
  return (
    <section id="trust" aria-label="Why businesses trust WEGROW" className="relative border-y hair bg-night/60 py-16 md:py-24">
      {/* Kinetic marquee */}
      <div className="relative overflow-hidden" aria-hidden>
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap pr-10 font-display text-[clamp(3rem,9vw,8rem)] font-semibold leading-none tracking-[-0.02em]">
          {[...row, ...row].map((w, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_rgba(238,241,247,0.35)]" : "text-fg"}>{w}</span>
              <Star />
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0e1c] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0e1c] to-transparent" />
      </div>

      <div className="container-x mt-16 grid gap-10 md:mt-24 lg:grid-cols-[1fr_1.4fr] lg:items-end">
        <Reveal>
          <p className="max-w-md font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium leading-[1.15] tracking-[-0.02em]">
            One focused partner for strategy, design, technology and content —{" "}
            <span className="text-dim">so your growth has a single, clear direction.</span>
          </p>
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-3xl border hair bg-white/[0.06] sm:grid-cols-3">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08} className="bg-night p-6 md:p-7">
              <div className="font-display text-5xl font-semibold tracking-[-0.02em] text-lime">{f.k}</div>
              <div className="mt-4 font-medium">{f.label}</div>
              <p className="mt-1 text-sm leading-relaxed text-dim">{f.sub}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="container-x mt-10">
        <a
          href={featuredProject.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between gap-4 rounded-2xl border hair bg-white/[0.02] px-6 py-5 transition-colors hover:border-lime/40 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-4">
            <span className="eyebrow text-dim">Recently launched</span>
            <span className="h-4 w-px bg-white/15" />
            <span className="font-display text-xl font-semibold tracking-tight">{featuredProject.client}</span>
            <span className="hidden text-sm text-dim md:inline">— {featuredProject.location}</span>
          </div>
          <span className="inline-flex items-center gap-2 text-sm text-lime">
            Visit live site
            <span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </span>
        </a>
      </Reveal>
    </section>
  );
}
