import { Reveal, SectionHeader, useSpotlight } from "../components/ui";
import { services, type Service } from "../data/content";
import { cn } from "../utils/cn";

export const SERVICE_EVENT = "wegrow:select-service";

function selectService(title: string) {
  window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: title }));
}

/* ---------- Illustrations ---------- */
function ArtWeb() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-x-4 top-4 bottom-0 overflow-hidden rounded-t-xl border hair-strong bg-void/70 md:inset-x-10">
        <div className="flex items-center gap-1.5 border-b hair px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-lime" />
          <span className="ml-3 h-4 flex-1 rounded-full bg-white/[0.05] px-2 font-mono text-[9px] leading-4 text-faint">yourbrand.com</span>
        </div>
        <div className="grid grid-cols-5 gap-3 p-4">
          <div className="col-span-3 space-y-2">
            <div className="h-3 w-4/5 rounded bg-white/80 transition-all duration-700 group-hover:w-full" />
            <div className="h-3 w-3/5 rounded bg-white/80" />
            <div className="h-1.5 w-full rounded bg-white/10" />
            <div className="h-1.5 w-5/6 rounded bg-white/10" />
            <div className="mt-3 h-6 w-24 rounded-full bg-lime transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="col-span-2 rounded-lg bg-gradient-to-br from-iris/50 to-lime/40 transition-transform duration-700 group-hover:-rotate-3 group-hover:scale-105" />
          <div className="col-span-5 hidden h-8 rounded-md border hair bg-white/[0.03] sm:block" />
        </div>
      </div>
    </div>
  );
}

function ArtApp() {
  return (
    <div className="relative grid h-full place-items-center">
      <div className="relative h-[150px] w-[84px] rounded-[18px] border-2 border-white/20 bg-void/80 p-2 transition-transform duration-700 group-hover:-rotate-6">
        <div className="mx-auto mb-2 h-1 w-6 rounded-full bg-white/20" />
        <div className="space-y-1.5">
          <div className="h-8 rounded-lg bg-gradient-to-br from-lime/70 to-iris/60" />
          <div className="h-4 rounded bg-white/10" />
          <div className="h-4 rounded bg-white/10" />
          <div className="grid grid-cols-2 gap-1">
            <div className="h-6 rounded bg-white/10" />
            <div className="h-6 rounded bg-lime/60" />
          </div>
        </div>
      </div>
      <div className="glass absolute right-[14%] top-[22%] rounded-lg px-2 py-1 text-[10px] transition-all duration-700 group-hover:-translate-y-2 group-hover:translate-x-2">
        ✓ Synced
      </div>
      <div className="glass absolute bottom-[18%] left-[12%] rounded-lg px-2 py-1 font-mono text-[10px] text-lime transition-all duration-700 group-hover:-translate-x-2 group-hover:translate-y-1">
        API ⇄
      </div>
    </div>
  );
}

function ArtSocial() {
  return (
    <div className="relative grid h-full place-items-center">
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-9 w-9 rounded-md transition-transform duration-500 group-hover:scale-95",
              i === 4 ? "bg-lime" : i % 3 === 0 ? "bg-iris/50" : "bg-white/10"
            )}
            style={{ transitionDelay: `${i * 30}ms` }}
          />
        ))}
      </div>
      <div className="absolute right-[18%] top-[12%] grid h-8 w-8 place-items-center rounded-full bg-lime text-void shadow-[0_0_30px_rgba(197,255,61,0.5)] transition-transform duration-500 group-hover:scale-125">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M12 21s-7.5-4.6-9.5-9.2C1 8.2 3.4 4.5 7 4.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.6 0 6 3.7 4.5 7.3C19.5 16.4 12 21 12 21Z" />
        </svg>
      </div>
    </div>
  );
}

function ArtReels() {
  return (
    <div className="relative grid h-full place-items-center">
      <div className="relative h-[150px] w-[86px] overflow-hidden rounded-xl border hair-strong bg-gradient-to-b from-iris/40 via-void to-lime/20">
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-void transition-transform duration-500 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M7 4.5v15l13-7.5-13-7.5Z" />
            </svg>
          </span>
        </div>
        <div className="absolute bottom-2 left-2 right-2 h-1 overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-1/4 rounded-full bg-lime transition-all duration-[2s] ease-linear group-hover:w-full" />
        </div>
        <div className="absolute right-1.5 top-8 flex flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-3 w-3 rounded-full bg-white/40" />
          ))}
        </div>
      </div>
      <span className="absolute left-[16%] top-[20%] rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-dim">9:16</span>
    </div>
  );
}

function ArtBrand() {
  return (
    <div className="relative grid h-full place-items-center">
      <div className="relative h-28 w-40">
        <div className="absolute left-2 top-2 h-20 w-20 rounded-full bg-iris/70 mix-blend-screen transition-transform duration-700 group-hover:translate-x-3" />
        <div className="absolute right-2 top-6 h-20 w-20 rounded-2xl bg-lime/80 mix-blend-screen transition-transform duration-700 group-hover:-translate-x-3 group-hover:rotate-12" />
        <span className="absolute inset-0 grid place-items-center font-serif text-5xl italic text-white mix-blend-difference">Aa</span>
      </div>
      <div className="absolute bottom-4 flex gap-1.5">
        {["#c5ff3d", "#8b7dff", "#eef1f7", "#13182a"].map((c) => (
          <span key={c} className="h-3 w-7 rounded-full border hair" style={{ background: c }} />
        ))}
      </div>
    </div>
  );
}

function ArtStrategy() {
  return (
    <div className="relative h-full w-full px-4 md:px-8">
      <svg viewBox="0 0 400 140" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="sg" x1="0" x2="1">
            <stop offset="0" stopColor="#8b7dff" />
            <stop offset="1" stopColor="#c5ff3d" />
          </linearGradient>
          <linearGradient id="sf" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#c5ff3d" stopOpacity="0.25" />
            <stop offset="1" stopColor="#c5ff3d" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[35, 70, 105].map((y) => (
          <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(238,241,247,0.06)" />
        ))}
        <path d="M0 125 L60 110 L120 115 L180 85 L240 90 L300 50 L360 35 L400 12 L400 140 L0 140 Z" fill="url(#sf)" />
        <path
          d="M0 125 L60 110 L120 115 L180 85 L240 90 L300 50 L360 35 L400 12"
          fill="none"
          stroke="url(#sg)"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          className="[stroke-dashoffset:0] group-hover:[animation:redraw_1.4s_var(--ease-premium)]"
        />
        {[
          [180, 85],
          [300, 50],
          [400, 12],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#06070b" stroke="#c5ff3d" strokeWidth="2.5" />
        ))}
      </svg>
      <div className="absolute left-[8%] top-3 flex flex-wrap gap-2">
        {["Audit", "Roadmap", "SEO", "Review"].map((t, i) => (
          <span
            key={t}
            className="rounded-full border hair-strong bg-void/60 px-2.5 py-1 font-mono text-[10px] text-dim transition-colors duration-300 group-hover:border-lime/40 group-hover:text-fg"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

const ART: Record<Service["art"], () => React.ReactElement> = {
  web: ArtWeb,
  app: ArtApp,
  social: ArtSocial,
  reels: ArtReels,
  brand: ArtBrand,
  strategy: ArtStrategy,
};

const LAYOUT: Record<Service["art"], string> = {
  web: "lg:col-span-4",
  app: "lg:col-span-2",
  social: "lg:col-span-2",
  reels: "lg:col-span-2",
  brand: "lg:col-span-2",
  strategy: "md:col-span-2 lg:col-span-6",
};

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const onMove = useSpotlight();
  const Art = ART[s.art];
  const wide = s.art === "strategy";
  return (
    <Reveal delay={(i % 3) * 0.08} className={cn("h-full", LAYOUT[s.art])}>
      <article
        onPointerMove={onMove}
        className={cn(
          "card spotlight group flex h-full flex-col overflow-hidden transition-transform duration-700 ease-[var(--ease-premium)] hover:-translate-y-1.5",
          wide && "lg:grid lg:grid-cols-[1fr_1.2fr]"
        )}
      >
        <div
          className={cn(
            "relative h-44 overflow-hidden border-b hair bg-[radial-gradient(80%_100%_at_50%_0%,rgba(139,125,255,0.12),transparent)] md:h-52",
            wide && "lg:order-2 lg:h-auto lg:border-b-0 lg:border-l"
          )}
        >
          <Art />
        </div>
        <div className="relative flex flex-1 flex-col p-6 md:p-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-lime">0{i + 1}</span>
            <span className="eyebrow text-[0.62rem] text-faint">{s.short}</span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-[-0.025em] md:text-[1.75rem]">{s.title}</h3>
          <p className="mt-3 max-w-lg text-dim">{s.body}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${s.title} deliverables`}>
            {s.deliverables.map((d) => (
              <li key={d} className="rounded-full border hair bg-white/[0.02] px-3 py-1 text-xs text-dim">
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-7">
            <a
              href="#contact"
              onClick={() => selectService(s.title)}
              className="inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-lime"
              aria-label={`Enquire about ${s.title}`}
            >
              Enquire
              <span className="grid h-7 w-7 place-items-center rounded-full border hair-strong transition-all duration-500 group-hover:rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-void">
                ↗
              </span>
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(50%_60%_at_80%_0%,rgba(139,125,255,0.10),transparent)]" />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div id="services-title">
            <SectionHeader index="02" label="What we do" title="Everything your business needs to" accent="grow online." />
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-dim lg:mb-3">
              A capable digital partner across the work that matters most — from the first pixel to the next campaign.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
