import { motion, useReducedMotion } from "motion/react";
import { useRef, type ReactNode, type CSSProperties, type PointerEvent as RPointerEvent } from "react";
import { cn } from "../utils/cn";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- Reveal: fade/slide in on scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/* ---------- Words: masked, staggered word reveal ---------- */
export function Words({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  immediate = false,
  play,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
  play?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const common = {
    initial: reduce ? false : ("hidden" as const),
    variants: {
      hidden: {},
      show: { transition: { staggerChildren: stagger, delayChildren: delay } },
    },
  };
  const trigger =
    play !== undefined
      ? { animate: play ? ("show" as const) : ("hidden" as const) }
      : immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <motion.span className={cn("inline", className)} {...common} {...trigger} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={cn("inline-block", wordClassName)}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE } },
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ---------- Section header ---------- */
export function SectionHeader({
  index,
  label,
  title,
  accent,
  intro,
  className,
  align = "left",
}: {
  index: string;
  label: string;
  title: string;
  accent?: string;
  intro?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <div className={cn("eyebrow flex items-center gap-3 text-dim", align === "center" && "justify-center")}>
          <span className="text-lime">{index}</span>
          <span className="h-px w-8 bg-current opacity-40" />
          {label}
        </div>
      </Reveal>
      <h2 className="display mt-6 text-[clamp(2.3rem,5.6vw,4.9rem)]">
        <Words text={title} />
        {accent && (
          <>
            {" "}
            <Words text={accent} delay={0.12} wordClassName="serif-accent text-lime" />
          </>
        )}
      </h2>
      {intro && (
        <Reveal delay={0.15}>
          <p className={cn("mt-6 max-w-xl text-lg leading-relaxed text-dim", align === "center" && "mx-auto")}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Arrow icon with swap animation ---------- */
export function ArrowIcon({ className, diagonal = true }: { className?: string; diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-4 w-4", className)} aria-hidden>
      <path
        d={diagonal ? "M7 17L17 7M17 7H9M17 7V15" : "M5 12h14M13 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SwapArrow({ diagonal = true }: { diagonal?: boolean }) {
  return (
    <span className="relative inline-flex h-4 w-4 overflow-hidden">
      <ArrowIcon
        diagonal={diagonal}
        className="absolute inset-0 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-5 group-hover:-translate-y-5"
      />
      <ArrowIcon
        diagonal={diagonal}
        className="absolute inset-0 -translate-x-5 translate-y-5 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-0 group-hover:translate-y-0"
      />
    </span>
  );
}

/* ---------- Magnetic button / link ---------- */
type BtnProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  arrow?: boolean;
  diagonal?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  type = "button",
  onClick,
  arrow = true,
  diagonal = true,
  disabled,
  ariaLabel,
}: BtnProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: RPointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.22;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const styles = cn(
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-medium tracking-tight",
    "transition-[transform,background-color,color,box-shadow,border-color] duration-500 ease-[var(--ease-premium)] will-change-transform",
    "disabled:cursor-not-allowed disabled:opacity-50",
    size === "lg" ? "h-14 px-7 text-[1rem]" : "h-12 px-6 text-[0.95rem]",
    variant === "primary" &&
      "bg-lime text-void shadow-[0_0_0_0_rgba(197,255,61,0)] hover:shadow-[0_10px_40px_-6px_rgba(197,255,61,0.55)]",
    variant === "ghost" && "border hair-strong bg-white/[0.02] text-fg backdrop-blur hover:border-lime/60 hover:bg-white/[0.05]",
    variant === "light" && "bg-fg text-void hover:bg-lime",
    className
  );

  const inner = (
    <>
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.55),transparent)] transition-transform duration-700 ease-[var(--ease-premium)] group-hover:translate-x-full" />
      )}
      <span className="relative">{children}</span>
      {arrow && (
        <span
          className={cn(
            "relative grid h-7 w-7 place-items-center rounded-full",
            variant === "primary" ? "bg-void text-lime" : variant === "light" ? "bg-void text-fg" : "bg-lime text-void"
          )}
        >
          <SwapArrow diagonal={diagonal} />
        </span>
      )}
    </>
  );

  const common = {
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    className: cn(styles, arrow && (size === "lg" ? "pr-2.5" : "pr-2.5")),
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...common}
      >
        {inner}
      </a>
    );
  }
  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} type={type} onClick={onClick} disabled={disabled} {...common}>
      {inner}
    </button>
  );
}

/* ---------- Spotlight handler for cards ---------- */
export function useSpotlight() {
  return (e: RPointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };
}

export function Chip({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span
      style={style}
      className={cn("inline-flex items-center gap-2 rounded-full border hair-strong bg-white/[0.03] px-3 py-1.5 text-xs text-dim", className)}
    >
      {children}
    </span>
  );
}
