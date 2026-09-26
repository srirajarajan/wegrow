// Single source of truth for WEGROW content.
// Only verified information lives here — no invented clients, stats or quotes.

export const brand = {
  name: "WEGROW",
  tagline: "Digital growth partner",
  founder: "Kavinkumar Ganesan",
  email: "kavinkumarrganesan@gmail.com",
  phoneDisplay: "+91 90800 06047",
  phoneHref: "tel:+919080006047",
  whatsappNumber: "919080006047",
  location: "Bengaluru, India",
  experience: "5+ years of digital expertise",
};

export const whatsappLink = (text = "Hi WEGROW, I'd like to talk about a project.") =>
  `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

export type Service = {
  id: string;
  title: string;
  short: string;
  body: string;
  deliverables: string[];
  art: "web" | "app" | "social" | "reels" | "brand" | "strategy";
};

export const services: Service[] = [
  {
    id: "web",
    title: "Website Design & Development",
    short: "Websites",
    body: "Fast, responsive, conversion-focused websites that make a strong first impression and turn visitors into enquiries.",
    deliverables: ["Business & landing sites", "E-commerce", "CMS & integrations", "Performance & SEO basics"],
    art: "web",
  },
  {
    id: "app",
    title: "App Development",
    short: "Apps",
    body: "Web and mobile apps, dashboards and business systems that simplify operations and create better customer journeys.",
    deliverables: ["Web apps", "Mobile apps", "Dashboards & tools", "API integrations"],
    art: "app",
  },
  {
    id: "social",
    title: "Social Media Management",
    short: "Social",
    body: "A consistent, on-brand presence — planned calendars, publishing and community care that keep your audience engaged.",
    deliverables: ["Content calendars", "Publishing", "Community management", "Monthly insights"],
    art: "social",
  },
  {
    id: "reels",
    title: "Reels & Short-Form Content",
    short: "Reels",
    body: "Scroll-stopping reels and short videos, from concept and script to shoot direction, edit and motion.",
    deliverables: ["Concepts & scripts", "Editing & captions", "Motion graphics", "Platform-ready formats"],
    art: "reels",
  },
  {
    id: "brand",
    title: "Branding & Graphic Design",
    short: "Brand",
    body: "Distinct identities and visual systems that make your business memorable across every touchpoint.",
    deliverables: ["Logo & identity", "Brand guidelines", "Social creatives", "Print & packaging"],
    art: "brand",
  },
  {
    id: "strategy",
    title: "Digital Growth Strategy",
    short: "Strategy",
    body: "A clear roadmap from today’s challenge to tomorrow’s opportunity — audits, SEO foundations and growth reviews.",
    deliverables: ["Digital audits", "SEO foundations", "Marketing roadmap", "Ongoing growth reviews"],
    art: "strategy",
  },
];

export const pillars = [
  { title: "Strategy", body: "Find the clearest way from today’s challenge to tomorrow’s opportunity." },
  { title: "Execution", body: "Build the systems, experiences and campaigns that make that path real." },
  { title: "Growth", body: "Keep improving what works and create momentum that lasts." },
];

export const process = [
  { step: "Discover", body: "We learn your business, audience, goals and what’s holding growth back.", out: "Brief & goals" },
  { step: "Strategize", body: "We define the direction — priorities, channels, structure and success measures.", out: "Roadmap" },
  { step: "Design", body: "We shape the brand, interface and content so every touchpoint feels intentional.", out: "Designs & prototypes" },
  { step: "Develop", body: "We build fast, reliable websites, apps and systems with clean, maintainable code.", out: "Production build" },
  { step: "Launch", body: "We test, polish and go live — with everything set up for you to manage confidently.", out: "Live product" },
  { step: "Grow", body: "We review what’s working, improve it and keep the momentum going.", out: "Growth reviews" },
];

export const reasons = [
  {
    title: "Creative problem-solving",
    body: "We start from the business problem, not a template — and design the simplest, sharpest way to solve it.",
  },
  {
    title: "Tailored solutions",
    body: "Every scope is built around your goals, stage and budget. No bloated packages, no one-size-fits-all.",
  },
  {
    title: "Transparent communication",
    body: "Clear timelines, honest recommendations and regular updates — you always know what’s happening and why.",
  },
  {
    title: "Reliable delivery",
    body: "Defined milestones and a focused team mean work ships on time, tested and ready to use.",
  },
  {
    title: "Long-term partnership",
    body: "Launch is the starting line. We stay close to keep improving what works as your business grows.",
  },
];

export type Plan = {
  id: string;
  name: string;
  price: string;
  note: string;
  forWho: string;
  features: string[];
  featured?: boolean;
};

// Prices are WEGROW's published packages from the existing website.
export const plans: Plan[] = [
  {
    id: "launch",
    name: "Launch",
    price: "₹14,999",
    note: "Package",
    forWho: "For new businesses that need a sharp, modern presence.",
    features: ["Modern website UI/UX", "Performance essentials", "Email support", "Monthly content update"],
  },
  {
    id: "grow",
    name: "Grow",
    price: "₹24,999",
    note: "Package",
    forWho: "For businesses ready to build momentum online.",
    features: ["Website design & development", "Bi-weekly updates", "SEO foundations", "Priority support", "Growth review"],
    featured: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: "Custom",
    note: "Tailored quote",
    forWho: "For platforms, apps and full brand + marketing programmes.",
    features: ["Custom platform or app work", "Branding & marketing", "Advanced integrations", "Ongoing optimisation"],
  },
];

// Add real client testimonials here as they come in. Leave empty to show the invitation state.
export type Testimonial = { quote: string; name: string; role: string; company: string };
export const testimonials: Testimonial[] = [];

export const featuredProject = {
  client: "Woof Heaven",
  sector: "Hospitality · Pet-friendly restaurant",
  location: "Saravanampatti, Coimbatore",
  year: "2026",
  url: "https://we-grow-topaz.vercel.app/",
  summary:
    "A warm, story-led website for a pet-friendly multi-cuisine restaurant — built so humans and their dogs can discover the food, the turf, and plan a celebration before they arrive.",
  challenge:
    "Communicate a genuinely unusual concept — a restaurant where dogs are guests too — and give families an easy way to explore the space, menu and events.",
  built: [
    "Story-led, mobile-first website with editorial photography",
    "Interactive event designer — pick theme, décor, lighting and guests",
    "Experience sections for Play, Dine and Connect",
    "Reservation, visit and Instagram community sections",
  ],
  tags: ["Web design", "Development", "Interactive UI", "Content"],
  images: {
    hero: "/work/woof-hero.jpg",
    dine: "/work/woof-dine.jpg",
    play: "/work/woof-play.jpg",
    connect: "/work/woof-connect.jpg",
    evening: "/work/woof-evening.jpg",
  },
};

export const budgetOptions = ["Launch · ₹14,999", "Grow · ₹24,999", "Custom / Scale", "Not sure yet"];
