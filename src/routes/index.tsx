import { createFileRoute } from "@tanstack/react-router";
import {
  MapPin,
  Clock,
  Laptop,
  Coffee,
  Check,
  X,
  Sparkles,
  Target,
  Wrench,
  Rocket,
  Calendar,
  Users,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vibe Coding: The Right Way — AI Product Workshop, Chennai" },
      {
        name: "description",
        content:
          "A 4-hour hands-on workshop in Chennai with Hameed, Leo and Hari. Go from idea to product to customer using modern AI tools and proven startup thinking.",
      },
      { property: "og:title", content: "Vibe Coding: The Right Way" },
      {
        property: "og:description",
        content:
          "Build the right thing. Build it the right way. Take it to the right people. A 4-hour AI product workshop in Chennai.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: VibeCodingPage,
});

const REGISTER_URL = "https://luma.com/event/evt-MrNHUahHMbUuA6I";

function VibeCodingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <WhyMatters />
      <WhatYouLearn />
      <Speakers />
      <Audience />
      <TakeHome />
      <EventDetails />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="vc-container flex items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg gradient-bg" />
          <span className="font-bold tracking-tight">AI:BN</span>
        </div>
        <a href={REGISTER_URL} target="_blank" rel="noreferrer" className="btn-secondary !py-2.5 !px-5 !text-sm">
          Reserve Your Seat
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-bg relative overflow-hidden pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="vc-container relative">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <span className="badge-orange mb-6">Offline Event · Chennai</span>
            <h1 className="font-display uppercase tracking-tight font-extrabold leading-[0.88] text-[clamp(56px,9vw,120px)]">
              <span className="block gradient-text">AI Vibe</span>
              <span className="block font-light text-[#EDEDF5]">Coding</span>
              <span className="block text-[0.42em] tracking-tight mt-4 text-white">
                THE <span className="underline-word">RIGHT</span> WAY
              </span>
            </h1>

            <p className="mt-8 text-xl md:text-[22px] text-[color:var(--text-muted)] leading-relaxed max-w-2xl">
              A <strong className="text-white font-extrabold">4-hour, hands-on workshop</strong> by{" "}
              <span className="gradient-text font-extrabold">Hameed</span>,{" "}
              <span className="gradient-text font-extrabold">Leo</span> and{" "}
              <span className="gradient-text font-extrabold">Hari</span>.
            </p>

            <div className="mt-8 flex items-center gap-5">
              <div className="flex">
                <div className="avatar-ring r1">H</div>
                <div className="avatar-ring r2">L</div>
                <div className="avatar-ring r3">H</div>
              </div>
              <div className="flex items-center gap-2 text-[color:var(--text-soft)]">
                <MapPin className="h-5 w-5" />
                <span>Chennai, India</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href={REGISTER_URL} target="_blank" rel="noreferrer" className="btn-primary">
                Reserve Your Seat <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#details" className="btn-secondary">
                View Details
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="date-card">
              <div className="text-[96px] leading-none font-black">27</div>
              <div className="text-2xl font-extrabold tracking-[0.08em] uppercase mt-1">June 2026</div>
              <div className="mt-3 text-xs font-bold tracking-[0.2em] uppercase opacity-70">
                Saturday · 4 Hours
              </div>
            </div>
          </div>
        </div>

        {/* skyline line-art */}
        <svg
          viewBox="0 0 1180 120"
          className="mt-20 w-full opacity-25"
          fill="none"
          stroke="white"
          strokeWidth="1.2"
          aria-hidden
        >
          <path d="M0 110 L60 110 L60 70 L100 70 L100 90 L140 90 L140 40 L180 40 L180 80 L220 80 L220 30 L260 30 L260 60 L300 60 L300 75 L340 75 L340 50 L380 50 L380 95 L420 95 L420 25 L450 25 L450 60 L490 60 L490 80 L530 80 L530 45 L570 45 L570 70 L610 70 L610 90 L650 90 L650 35 L690 35 L690 70 L730 70 L730 55 L770 55 L770 85 L810 85 L810 40 L850 40 L850 75 L890 75 L890 60 L930 60 L930 90 L970 90 L970 50 L1010 50 L1010 80 L1050 80 L1050 65 L1090 65 L1090 95 L1130 95 L1130 70 L1180 70 L1180 110 Z" />
          <circle cx="220" cy="20" r="3" />
          <circle cx="650" cy="25" r="3" />
          <circle cx="850" cy="30" r="3" />
        </svg>
      </div>
    </section>
  );
}

function WhyMatters() {
  return (
    <section className="section-pad">
      <div className="vc-container">
        <div className="max-w-3xl">
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)]">
            Why this workshop
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Everyone is building apps. <span className="gradient-text">Very few are building products people actually want.</span>
          </h2>
          <div className="mt-8 space-y-5 text-lg text-[color:var(--text-muted)] leading-relaxed">
            <p>Most people start with the tool. The best builders start with the problem.</p>
            <p>
              <strong className="text-white">Vibe Coding: The Right Way</strong> is a hands-on, 4-hour workshop designed to teach you how to go from{" "}
              <span className="gradient-text font-bold">idea → product → customer</span> using modern AI tools and proven startup thinking.
            </p>
            <p>
              This isn't another session where someone builds a to-do app in 15 minutes and calls it innovation. You'll learn how to identify real problems, validate opportunities, rapidly build solutions using AI, and take those solutions to market.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatYouLearn() {
  const blocks = [
    {
      icon: Target,
      title: "Identify",
      desc: "Find real problems worth solving — not problems you invent to use a cool tool.",
    },
    {
      icon: Sparkles,
      title: "Validate",
      desc: "Pressure-test customer pain points before you write a single prompt.",
    },
    {
      icon: Wrench,
      title: "Build",
      desc: "Use AI tools to rapidly ship a Minimum Lovable Product — not just an MVP.",
    },
    {
      icon: Rocket,
      title: "Launch",
      desc: "Position, price, and get your first real customers using a practical go-to-market plan.",
    },
  ];
  return (
    <section className="section-pad bg-[color:var(--bg-section)]">
      <div className="vc-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            What you'll <span className="gradient-text">walk away with</span>
          </h2>
          <p className="mt-4 text-[color:var(--text-muted)] text-lg">
            Four hours. One end-to-end product playbook.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {blocks.map((b) => (
            <div key={b.title} className="glass-card p-7">
              <div className="h-11 w-11 rounded-xl gradient-bg flex items-center justify-center text-[#050505]">
                <b.icon className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <h3 className="mt-5 text-xl font-bold">{b.title}</h3>
              <p className="mt-2 text-[color:var(--text-soft)] leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Speakers() {
  const speakers = [
    {
      ring: "r1",
      initial: "H",
      name: "Hameed",
      role: "The Why",
      tagline: "Product Thinking Before Product Building",
      bio: "20+ years as a product builder with Silicon Valley experience. Gartner recognized.",
      points: [
        "How to identify real problems worth solving",
        "How to avoid building products nobody wants",
        "How to think before writing prompts or code",
        "How to validate customer pain points",
        "How to approach product building like a founder",
      ],
    },
    {
      ring: "r2",
      initial: "L",
      name: "Leo",
      role: "The How",
      tagline: "Building the MLP — Minimum Lovable Product",
      bio: "10+ years building world-class, process-driven products. 3x award winner for Innovation in Technology.",
      points: [
        "How to use AI tools to rapidly build products",
        "How to structure a vibe coding workflow",
        "How to move from idea to working prototype",
        "How to build a Minimum Lovable Product, not just an MVP",
        "How to create launch-ready products with process-driven execution",
      ],
    },
    {
      ring: "r3",
      initial: "H",
      name: "Hari",
      role: "The Who",
      tagline: "Taking Your Product to Customers",
      bio: "12+ years of digital product marketing expertise.",
      points: [
        "How to identify the right customer segment",
        "How to position your product clearly",
        "How to create a practical go-to-market plan",
        "How to get your first users or customers",
        "How to turn a product into a sellable offer",
      ],
    },
  ];

  return (
    <section className="section-pad">
      <div className="vc-container">
        <div className="max-w-2xl mb-14">
          <span className="badge-orange mb-4">Led by industry leaders</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Three builders. <span className="gradient-text">One complete playbook.</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {speakers.map((s) => (
            <div key={s.name} className="glass-card p-8 flex flex-col">
              <div className="flex items-center gap-4">
                <div className={`avatar-ring ${s.ring} !ml-0 !w-16 !h-16 text-xl`}>{s.initial}</div>
                <div>
                  <div className="text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)]">
                    {s.role}
                  </div>
                  <div className="text-2xl font-extrabold">{s.name}</div>
                </div>
              </div>
              <h3 className="mt-6 text-lg font-bold gradient-text">{s.tagline}</h3>
              <p className="mt-2 text-sm text-[color:var(--text-soft)] leading-relaxed">{s.bio}</p>
              <ul className="mt-6 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-[color:var(--text-muted)]">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#BDEEFF]" strokeWidth={2.5} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audience() {
  const yes = [
    "Founders",
    "Entrepreneurs",
    "Product Managers",
    "Developers",
    "Students",
    "Freelancers",
    "Consultants",
    "Business Owners",
    "Anyone turning ideas into products with AI",
  ];
  const no = [
    "You want passive theory without hands-on work",
    "You expect AI to magically build a business for you",
    "You don't want to think about customers, problems, or markets",
    "You only want prompts without product thinking",
    "You're looking for a generic coding class",
    "You're not serious about building or launching something",
  ];
  return (
    <section className="section-pad bg-[color:var(--bg-section)]">
      <div className="vc-container">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🤩</span>
              <h3 className="text-2xl font-extrabold">Who should attend</h3>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">
              {yes.map((y) => (
                <li key={y} className="flex items-center gap-2.5 text-[color:var(--text-muted)]">
                  <Check className="h-4 w-4 text-[#BDEEFF]" strokeWidth={3} />
                  <span>{y}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🤦‍♂️</span>
              <h3 className="text-2xl font-extrabold">Who should NOT attend</h3>
            </div>
            <ul className="space-y-3">
              {no.map((n) => (
                <li key={n} className="flex items-start gap-2.5 text-[color:var(--text-muted)]">
                  <X className="h-4 w-4 mt-1 text-[#FF7A1A] flex-shrink-0" strokeWidth={3} />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function TakeHome() {
  const items = [
    "Lovable Pro Subscription — 1 Month (subject to confirmation)",
    "Prompt Library used during the workshop",
    "Printed Product Building Cheat Sheet",
    "Rapid Product Development Roadmap",
    "Physical Certificate of Completion (online verifiable)",
    "Access to AI:BN — an AI-first community of builders",
  ];
  return (
    <section className="section-pad">
      <div className="vc-container">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <div>
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)]">
              What you'll bring
            </span>
            <div className="mt-4 flex items-center gap-3 text-3xl font-extrabold">
              <Laptop className="h-8 w-8" /> Your laptop.
            </div>
            <p className="mt-3 text-[color:var(--text-muted)]">That's it. Come ready to build.</p>
          </div>
          <div className="glass-card p-8">
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)]">
              What you'll take home
            </span>
            <h3 className="mt-3 text-3xl font-extrabold">
              Tools you'll <span className="gradient-text">actually use</span>.
            </h3>
            <ul className="mt-6 space-y-3.5">
              {items.map((i) => (
                <li key={i} className="flex items-start gap-3 text-[color:var(--text-muted)]">
                  <div className="mt-1 h-5 w-5 rounded-md gradient-bg flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-[#050505]" strokeWidth={4} />
                  </div>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function EventDetails() {
  return (
    <section id="details" className="section-pad bg-[color:var(--bg-section)]">
      <div className="vc-container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge-orange mb-4">Event Details</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            The <span className="gradient-text">essentials</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Calendar, label: "Date", value: "27 June 2026" },
            { icon: Clock, label: "Duration", value: "4-Hour Intensive" },
            { icon: MapPin, label: "Location", value: "Chennai, India" },
            { icon: Coffee, label: "Included", value: "Light Snacks & Refreshments" },
          ].map((d) => (
            <div key={d.label} className="glass-card p-6">
              <d.icon className="h-6 w-6 text-[#BDEEFF]" strokeWidth={2} />
              <div className="mt-4 text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)]">
                {d.label}
              </div>
              <div className="mt-1 text-lg font-bold text-white">{d.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 glass-card p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[color:var(--text-soft)] text-sm font-bold tracking-[0.2em] uppercase">
                <Users className="h-4 w-4" /> Limited Seats · Interactive Workshop
              </div>
              <h3 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
                ₹₹₹₹₹ — <span className="gradient-text">Paid Event</span>
              </h3>
              <p className="mt-3 text-[color:var(--text-muted)] max-w-xl">
                Pricing will be communicated once the venue is confirmed. Location in Chennai will be shared with registered attendees.
              </p>
            </div>
            <a href={REGISTER_URL} target="_blank" rel="noreferrer" className="btn-primary self-start">
              Register on Luma <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section-pad hero-bg">
      <div className="vc-container">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95]">
            <span className="block">Build the right thing.</span>
            <span className="block gradient-text">Build it the right way.</span>
            <span className="block">Take it to the right people.</span>
          </h2>
          <p className="mt-8 text-xl text-[color:var(--text-muted)] max-w-2xl">
            If you've ever wanted to build something meaningful with AI but weren't sure where to start — this is where you begin.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={REGISTER_URL} target="_blank" rel="noreferrer" className="btn-primary">
              Reserve Your Seat <ArrowRight className="h-4 w-4" />
            </a>
            <div className="flex items-center gap-2 text-[color:var(--text-soft)] text-sm">
              <MapPin className="h-4 w-4" /> Chennai, Tamil Nadu, India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="vc-container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[color:var(--text-soft)]">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded gradient-bg" />
          <span className="font-bold text-white">Vibe Coding: The Right Way</span>
        </div>
        <div>© 2026 AI:BN · Chennai, India</div>
      </div>
    </footer>
  );
}
