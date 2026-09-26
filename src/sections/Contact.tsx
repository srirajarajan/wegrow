import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";
import { Button, EASE, Reveal, Words } from "../components/ui";
import { brand, budgetOptions, services, whatsappLink } from "../data/content";
import { cn } from "../utils/cn";
import { SERVICE_EVENT } from "./Services";
import { BUDGET_EVENT } from "./Pricing";

type Form = { name: string; email: string; phone: string; company: string; message: string };
type Errors = Partial<Record<keyof Form, string>>;

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

function ToggleChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-all duration-300",
        active ? "border-lime bg-lime text-void" : "hair-strong bg-white/[0.02] text-dim hover:border-white/30 hover:text-fg"
      )}
    >
      {active && <span className="mr-1.5">✓</span>}
      {children}
    </button>
  );
}

function ContactCard({ label, value, href, external }: { label: string; value: string; href?: string; external?: boolean }) {
  const inner = (
    <>
      <span className="eyebrow text-[0.6rem] text-faint">{label}</span>
      <span className="mt-1 block break-words text-fg transition-colors group-hover:text-lime">{value}</span>
    </>
  );
  return href ? (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group block rounded-2xl border hair bg-white/[0.02] p-4 transition-colors hover:border-lime/40"
    >
      {inner}
    </a>
  ) : (
    <div className="rounded-2xl border hair bg-white/[0.02] p-4">{inner}</div>
  );
}

export function Contact() {
  const [form, setForm] = useState<Form>({ name: "", email: "", phone: "", company: "", message: "" });
  const [picked, setPicked] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onService = (e: Event) => {
      const t = (e as CustomEvent<string>).detail;
      setPicked((p) => (p.includes(t) ? p : [...p, t]));
    };
    const onBudget = (e: Event) => setBudget((e as CustomEvent<string>).detail);
    window.addEventListener(SERVICE_EVENT, onService);
    window.addEventListener(BUDGET_EVENT, onBudget);
    return () => {
      window.removeEventListener(SERVICE_EVENT, onService);
      window.removeEventListener(BUDGET_EVENT, onBudget);
    };
  }, []);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (needEmail = true) => {
    const er: Errors = {};
    if (!form.name.trim()) er.name = "Please tell us your name.";
    if (needEmail && !emailOk(form.email)) er.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10) er.message = "A short description helps us prepare (10+ characters).";
    setErrors(er);
    if (Object.keys(er).length) {
      const first = Object.keys(er)[0];
      document.getElementById(`f-${first}`)?.focus();
      return false;
    }
    return true;
  };

  const brief = () => {
    const details = [
      `Name: ${form.name}`,
      form.email ? `Email: ${form.email}` : null,
      form.phone ? `Phone: ${form.phone}` : null,
      form.company ? `Company: ${form.company}` : null,
      picked.length ? `Services: ${picked.join(", ")}` : null,
      budget ? `Budget: ${budget}` : null,
    ].filter((l): l is string => l !== null);
    return [...details, "", form.message].join("\n");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const subject = `New project enquiry — ${form.name}${form.company ? ` (${form.company})` : ""}`;
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(brief())}`;
    setSent(true);
  };

  const onWhatsApp = () => {
    if (!validate(false)) return;
    window.open(whatsappLink(`Hi WEGROW! New project enquiry:\n\n${brief()}`), "_blank", "noopener,noreferrer");
  };

  const fieldProps = (k: keyof Form) => ({
    id: `f-${k}`,
    name: k,
    value: form[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
    className: "field",
  });

  const Err = ({ k }: { k: keyof Form }) =>
    errors[k] ? (
      <p id={`e-${k}`} role="alert" className="mt-1.5 text-sm text-[#ff9a9a]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t hair py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(197,255,61,0.10),transparent)]" />
        <div className="absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(139,125,255,0.14),transparent)]" />
      </div>

      <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <Reveal>
            <div className="eyebrow flex items-center gap-3 text-dim">
              <span className="text-lime">08</span>
              <span className="h-px w-8 bg-current opacity-40" />
              Let’s talk
            </div>
          </Reveal>
          <h2 id="contact-title" className="display mt-6 text-[clamp(2.8rem,6.5vw,6rem)]">
            <Words text="Ready to grow" /> <Words text="with clarity?" delay={0.15} wordClassName="serif-accent text-lime" />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-dim">
              Tell us what you’re building, improving or trying to achieve. We’ll help you choose the strongest next step.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 grid gap-3 sm:grid-cols-2">
            <ContactCard label="Email" value={brand.email} href={`mailto:${brand.email}`} />
            <ContactCard label="Phone" value={brand.phoneDisplay} href={brand.phoneHref} />
            <ContactCard label="WhatsApp" value="Chat with us ↗" href={whatsappLink()} external />
            <ContactCard label="Based in" value={brand.location} />
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex items-center gap-4 rounded-2xl border hair bg-white/[0.02] p-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-lime to-iris font-display text-lg font-semibold text-void">
                KG
              </span>
              <div>
                <div className="font-medium">{brand.founder}</div>
                <div className="text-sm text-dim">Your point of contact at WEGROW</div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="glass relative rounded-3xl p-6 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] md:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex min-h-[520px] flex-col items-start justify-center"
                  role="status"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-lime text-void">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                      <path d="M5 12.5 10 17.5 19 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="display mt-8 text-4xl md:text-5xl">Your brief is ready.</h3>
                  <p className="mt-4 max-w-md text-dim">
                    Your email app should open with everything filled in — just hit send. If it didn’t open, email us at{" "}
                    <a className="text-lime underline-offset-4 hover:underline" href={`mailto:${brand.email}`}>
                      {brand.email}
                    </a>{" "}
                    or send the same brief on WhatsApp.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button onClick={onWhatsApp}>Send on WhatsApp</Button>
                    <Button variant="ghost" arrow={false} onClick={() => setSent(false)}>
                      Edit brief
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                  aria-label="Project enquiry form"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-semibold tracking-tight">Start a project</h3>
                    <span className="font-mono text-[11px] text-faint">* required</span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="f-name" className="mb-2 block text-sm text-dim">
                        Your name *
                      </label>
                      <input {...fieldProps("name")} autoComplete="name" placeholder="Full name" required />
                      <Err k="name" />
                    </div>
                    <div>
                      <label htmlFor="f-email" className="mb-2 block text-sm text-dim">
                        Email *
                      </label>
                      <input {...fieldProps("email")} type="email" autoComplete="email" placeholder="you@company.com" required />
                      <Err k="email" />
                    </div>
                    <div>
                      <label htmlFor="f-phone" className="mb-2 block text-sm text-dim">
                        Phone / WhatsApp
                      </label>
                      <input {...fieldProps("phone")} type="tel" autoComplete="tel" placeholder="+91" />
                    </div>
                    <div>
                      <label htmlFor="f-company" className="mb-2 block text-sm text-dim">
                        Company
                      </label>
                      <input {...fieldProps("company")} autoComplete="organization" placeholder="Business name" />
                    </div>
                  </div>

                  <fieldset>
                    <legend className="mb-3 text-sm text-dim">What do you need?</legend>
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => (
                        <ToggleChip
                          key={s.id}
                          active={picked.includes(s.title)}
                          onClick={() => setPicked((p) => (p.includes(s.title) ? p.filter((x) => x !== s.title) : [...p, s.title]))}
                        >
                          {s.title.replace(" & Development", "").replace("Digital Growth ", "")}
                        </ToggleChip>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 text-sm text-dim">Budget</legend>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((b) => (
                        <ToggleChip key={b} active={budget === b} onClick={() => setBudget(budget === b ? "" : b)}>
                          {b}
                        </ToggleChip>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="f-message" className="mb-2 block text-sm text-dim">
                      Tell us about your project *
                    </label>
                    <textarea
                      {...fieldProps("message")}
                      rows={4}
                      placeholder="Goals, timeline, links — anything that helps."
                      className="field resize-y"
                      required
                    />
                    <Err k="message" />
                  </div>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <Button type="submit" size="lg" className="sm:flex-1">
                      Send enquiry
                    </Button>
                    <Button type="button" size="lg" variant="ghost" onClick={onWhatsApp} className="sm:flex-1">
                      Send via WhatsApp
                    </Button>
                  </div>
                  <p className="text-xs text-faint">
                    Submitting opens your email app with this brief addressed to {brand.email}. Nothing is stored on this site.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
