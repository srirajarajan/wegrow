import { Button, Reveal, SectionHeader, useSpotlight } from "../components/ui";
import { brand, plans, testimonials, budgetOptions, type Plan } from "../data/content";
import { cn } from "../utils/cn";

export const BUDGET_EVENT = "wegrow:select-budget";

function PlanCard({ plan, i }: { plan: Plan; i: number }) {
  const onMove = useSpotlight();
  const budget = budgetOptions[i] ?? budgetOptions[budgetOptions.length - 1];
  return (
    <Reveal delay={i * 0.1} className="h-full">
      <article
        onPointerMove={onMove}
        className={cn(
          "spotlight group relative flex h-full flex-col rounded-3xl p-7 transition-transform duration-700 ease-[var(--ease-premium)] hover:-translate-y-2 md:p-9",
          plan.featured
            ? "bg-[linear-gradient(180deg,#1a2238,#0d1224)] shadow-[0_40px_90px_-30px_rgba(197,255,61,0.35)] ring-1 ring-lime/50"
            : "card"
        )}
      >
        {plan.featured && (
          <>
            <div aria-hidden className="pointer-events-none absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-lime to-transparent" />
            <span className="absolute right-6 top-6 rounded-full bg-lime px-3 py-1 text-[11px] font-medium text-void">Most popular</span>
          </>
        )}
        <span className="font-mono text-xs text-lime">0{i + 1}</span>
        <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-0.015em]">{plan.name}</h3>
        <p className="mt-2 min-h-[3rem] text-sm text-dim">{plan.forWho}</p>
        <div className="mt-6 flex items-baseline gap-2">
          <span className={cn("font-display text-5xl font-semibold tracking-[-0.02em] md:text-6xl", plan.featured && "text-gradient")}>
            {plan.price}
          </span>
          <span className="text-sm text-faint">{plan.note}</span>
        </div>
        <ul className="mt-8 flex-1 space-y-3.5 border-t hair pt-7">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[0.95rem] text-fg/90">
              <span className={cn("mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full", plan.featured ? "bg-lime" : "bg-iris")} />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-9">
          <Button
            href="#contact"
            variant={plan.featured ? "primary" : "ghost"}
            className="w-full justify-between pl-6"
            onClick={() => window.dispatchEvent(new CustomEvent(BUDGET_EVENT, { detail: budget }))}
            ariaLabel={`Talk to us about the ${plan.name} package`}
          >
            {plan.price === "Custom" ? "Request a quote" : `Start with ${plan.name}`}
          </Button>
        </div>
      </article>
    </Reveal>
  );
}

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative border-t hair bg-night/50 py-24 md:py-36">
      <div className="container-x">
        <div id="pricing-title">
          <SectionHeader
            index="06"
            label="Ways to work together"
            title="Flexible engagement, built around"
            accent="your goals."
            intro="Start with a package or ask for a tailored quote. Every project begins with a free conversation about what you actually need."
          />
        </div>

        <div className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-3">
          {plans.map((p, i) => (
            <PlanCard key={p.id} plan={p} i={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-3xl border hair bg-white/[0.02] p-7 md:flex-row md:items-center md:p-9">
            <div>
              <p className="font-display text-2xl font-semibold tracking-tight">Need social, reels or branding on their own?</p>
              <p className="mt-1 text-dim">We’ll scope a tailored plan for content, social media or identity work — just tell us your goals.</p>
            </div>
            <Button
              href="#contact"
              variant="light"
              onClick={() => window.dispatchEvent(new CustomEvent(BUDGET_EVENT, { detail: budgetOptions[2] }))}
            >
              Get a tailored quote
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  const hasReal = testimonials.length > 0;
  return (
    <section id="stories" aria-labelledby="stories-title" className="relative py-24 md:py-36">
      <div className="container-x">
        <div id="stories-title">
          <SectionHeader index="07" label="Client stories" title="Real words from" accent="real partners." />
        </div>

        {hasReal ? (
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name + i} delay={i * 0.08}>
                <figure className="card flex h-full flex-col p-8">
                  <span className="serif-accent text-6xl leading-none text-lime">“</span>
                  <blockquote className="mt-2 flex-1 text-lg leading-relaxed">{t.quote}</blockquote>
                  <figcaption className="mt-8 border-t hair pt-5">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-sm text-dim">
                      {t.role}, {t.company}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={0.1}>
            <div className="relative mt-14 overflow-hidden rounded-3xl border hair bg-[linear-gradient(135deg,rgba(26,32,54,0.6),rgba(10,14,28,0.6))] p-8 md:p-14">
              <div aria-hidden className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-iris/15 blur-3xl" />
              <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
                <div>
                  <span className="serif-accent block text-8xl leading-[0.6] text-lime" aria-hidden>
                    “
                  </span>
                  <p className="mt-6 max-w-xl font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.15] tracking-[-0.02em]">
                    We’re collecting stories from the businesses we work with.{" "}
                    <span className="text-dim">Only genuine words from real clients will ever appear here.</span>
                  </p>
                </div>
                <div className="space-y-4">
                  <div aria-hidden className="space-y-3">
                    {[0, 1].map((k) => (
                      <div key={k} className="flex items-center gap-3 rounded-2xl border border-dashed hair-strong p-4">
                        <span className="h-10 w-10 rounded-full bg-white/[0.06]" />
                        <div className="flex-1 space-y-2">
                          <div className="h-2 w-3/4 rounded bg-white/[0.08]" />
                          <div className="h-2 w-1/2 rounded bg-white/[0.05]" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    href={`mailto:${brand.email}?subject=${encodeURIComponent("Feedback for WEGROW")}`}
                    variant="ghost"
                  >
                    Worked with us? Share feedback
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
