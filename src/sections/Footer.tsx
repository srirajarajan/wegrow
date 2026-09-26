import { motion, useReducedMotion } from "motion/react";
import { Logo } from "../components/Brand";
import { Button, EASE, Reveal } from "../components/ui";
import { brand, navLinks, services, whatsappLink } from "../data/content";

const more = [
  { label: "Process", href: "#process" },
  { label: "Why WEGROW", href: "#why" },
  { label: "Client stories", href: "#stories" },
];

export default function Footer() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t hair bg-night pt-20 md:pt-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <Reveal>
            <p className="display max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)]">
              Let’s grow something <span className="serif-accent text-lime">worth talking about.</span>
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3">
            <Button href="#contact" size="lg">
              Start a project
            </Button>
            <Button href={whatsappLink()} external size="lg" variant="ghost">
              WhatsApp us
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 border-t hair pt-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-dim">
              Digital experiences, systems and strategies that move businesses forward.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="eyebrow text-faint">Navigate</h3>
            <ul className="mt-5 space-y-2.5">
              {[...navLinks, ...more].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-dim transition-colors hover:text-lime">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow text-faint">Services</h3>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="text-sm text-dim transition-colors hover:text-lime">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-faint">Contact</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${brand.email}`} className="break-all text-dim transition-colors hover:text-lime">
                  {brand.email}
                </a>
              </li>
              <li>
                <a href={brand.phoneHref} className="text-dim transition-colors hover:text-lime">
                  {brand.phoneDisplay}
                </a>
              </li>
              <li className="text-dim">{brand.location}</li>
            </ul>
            <div className="mt-6 flex gap-2">
              {[
                {
                  label: "Email WEGROW",
                  href: `mailto:${brand.email}`,
                  d: "M3 6.5h18v11H3zM3 7l9 6.5L21 7",
                },
                {
                  label: "WhatsApp WEGROW",
                  href: whatsappLink(),
                  d: "M4 20l1.3-4A8 8 0 1 1 8.4 19L4 20Z",
                  ext: true,
                },
                {
                  label: "Call WEGROW",
                  href: brand.phoneHref,
                  d: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  {...(s.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="grid h-11 w-11 place-items-center rounded-full border hair-strong text-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-lime hover:bg-lime hover:text-void"
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t hair py-6 text-xs text-faint sm:flex-row sm:items-center">
          <span>© {year} We Grow. All rights reserved.</span>
          <a href="#top" className="group inline-flex items-center gap-2 text-dim hover:text-lime">
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full border hair-strong transition-transform duration-500 group-hover:-translate-y-1">↑</span>
          </a>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <motion.div
          initial={reduce ? false : { y: "40%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
          className="-mb-[0.18em] text-center font-display text-[clamp(5rem,25vw,24rem)] font-semibold leading-[0.8] tracking-[-0.015em]"
        >
          <span className="bg-gradient-to-b from-white/[0.14] to-white/[0.01] bg-clip-text text-transparent">WE</span>
          <span className="bg-gradient-to-b from-lime/50 to-lime/[0.02] bg-clip-text text-transparent">GROW</span>
        </motion.div>
      </div>
    </footer>
  );
}
