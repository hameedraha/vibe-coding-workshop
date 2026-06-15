import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  Play,
  Linkedin,
  Mic,
  Quote,
  IndianRupee,
} from "lucide-react";
import parallaxWorkshop from "@/assets/parallax-workshop.jpg";
import parallaxAbstract from "@/assets/parallax-abstract.jpg";
import parallaxHands from "@/assets/parallax-hands.jpg";
import hameedPhoto from "@/assets/hameed.jpeg.asset.json";
import hariPhoto from "@/assets/hari.png.asset.json";
import leoPhoto from "@/assets/leo.jpeg.asset.json";
import ElectricBorder from "@/components/ElectricBorder";

// Decode-reveal removed — render plain text
const D = ({ text }: { text: string; className?: string }) => <>{text}</>;


const LUMA_EVENT_ID = "evt-MrNHUahHMbUuA6I";

type LumaButtonProps = {
  className?: string;
  children: ReactNode;
};

function LumaButton({ className = "btn-primary", children }: LumaButtonProps) {
  return (
    <a
      href={REGISTER_URL}
      className={`luma-checkout--button ${className}`}
      data-luma-action="checkout"
      data-luma-event-id={LUMA_EVENT_ID}
    >
      {children}
    </a>
  );
}

function ParallaxImage({
  src,
  alt,
  height = "h-[60vh]",
  speed = "0.4",
  caption,
}: {
  src: string;
  alt: string;
  height?: string;
  speed?: string;
  caption?: string;
}) {
  return (
    <div className={`relative w-full ${height} overflow-hidden`}>
      <div
        data-parallax-img={speed}
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>
      {caption && (
        <div className="absolute bottom-10 left-0 right-0 vc-container">
          <p className="text-2xl md:text-4xl font-extrabold tracking-tight max-w-2xl gradient-text">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}

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
  const rootRef = useRef<HTMLDivElement>(null);

  // Inject Luma checkout script once
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("luma-checkout")) return;
    const s = document.createElement("script");
    s.id = "luma-checkout";
    s.src = "https://embed.lu.ma/checkout-button.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Parallax background blobs
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.3");
        gsap.to(el, {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Parallax images (move slower than scroll for depth)
      gsap.utils.toArray<HTMLElement>("[data-parallax-img]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxImg || "0.4");
        gsap.fromTo(
          el,
          { yPercent: -speed * 30 },
          {
            yPercent: speed * 30,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Fade-up reveals (fail-safe: final state guaranteed via fromTo)
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none none" },
          },
        );
      });

      // Staggered children
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((container) => {
        const children = container.querySelectorAll<HTMLElement>("[data-stagger-item]");
        gsap.fromTo(
          children,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: container, start: "top 95%", toggleActions: "play none none none" },
          },
        );
      });


      // Hero title layered parallax
      const heroTitle = document.querySelector("[data-hero-title]");
      if (heroTitle) {
        gsap.to(heroTitle.querySelectorAll("[data-hero-line]"), {
          yPercent: (i) => -10 - i * 8,
          ease: "none",
          scrollTrigger: {
            trigger: heroTitle,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Date card tilt parallax
      gsap.to("[data-date-card]", {
        yPercent: -20,
        rotate: -4,
        scrollTrigger: {
          trigger: "[data-date-card]",
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
      });

      // (Testimonials uses pure CSS infinite marquee — no GSAP pinning here)


      // Marquee
      gsap.to("[data-marquee-inner]", {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });

      // Big quote scale-in
      gsap.utils.toArray<HTMLElement>("[data-scale-in]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none none" },
          },
        );
      });
    }, rootRef);

    // Recalculate triggers after images/fonts settle (pinned testimonial section
    // changes total scroll height, which throws off earlier reveals).
    const refresh = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(refresh, 300);
    const t2 = window.setTimeout(refresh, 1200);
    window.addEventListener("load", refresh);
    document.querySelectorAll("img").forEach((img) => {
      if (!(img as HTMLImageElement).complete) img.addEventListener("load", refresh, { once: true });
    });

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);


  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <WhyVideo />
      <ParallaxBand
        src={parallaxWorkshop}
        alt="Builders working together at a Chennai workshop"
        caption="Four hours. Three instructors. One product playbook."
      />
      <WhyMatters />
      <WhatYouLearn />
      <ParallaxBand
        src={parallaxHands}
        alt="Hands on a laptop coding with AI"
        height="h-[70vh]"
        caption="Stop learning AI. Start shipping with it."
      />
      <Speakers />
      <Testimonials />
      <Audience />
      <TakeHome />
      <Pricing />
      <ParallaxBand src={parallaxAbstract} alt="Abstract gradient" height="h-[50vh]" speed="0.5" />
      <EventDetails />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function ParallaxBand({
  src,
  alt,
  height,
  speed,
  caption,
}: {
  src: string;
  alt: string;
  height?: string;
  speed?: string;
  caption?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <ParallaxImage src={src} alt={alt} height={height} speed={speed} caption={caption} />
    </section>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/5">
      <div className="vc-container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg gradient-bg" />
          <span className="font-bold tracking-tight">AI:BN</span>
        </div>
        <LumaButton className="btn-secondary !py-2.5 !px-5 !text-sm">
          Reserve Your Seat
        </LumaButton>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-bg relative overflow-hidden pt-28 pb-24 md:pt-40 md:pb-32">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      {/* Parallax blobs */}
      <div
        data-parallax="0.4"
        className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,139,239,0.35), transparent 70%)" }}
      />
      <div
        data-parallax="0.25"
        className="absolute top-40 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(189,238,255,0.25), transparent 70%)" }}
      />

      <div className="vc-container relative">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <span className="badge-orange mb-6" data-reveal>Offline Event · Chennai</span>
            <h1
              data-hero-title
              className="font-display uppercase tracking-tight font-extrabold leading-[0.88] text-[clamp(56px,9vw,120px)]"
            >
              <span data-hero-line className="block gradient-text"><D text="AI Vibe" /></span>
              <span data-hero-line className="block font-light text-[#EDEDF5]"><D text="Coding" /></span>
              <span data-hero-line className="block text-[0.42em] tracking-tight mt-4 text-white">
                <D text="THE " /><span className="underline-word"><D text="RIGHT" /></span><D text=" WAY" />
              </span>
            </h1>

            <p
              data-reveal
              className="mt-8 text-xl md:text-[22px] text-[color:var(--text-muted)] leading-relaxed max-w-2xl"
            >
              A <strong className="text-white font-extrabold">4-hour, hands-on workshop</strong> by{" "}
              <span className="gradient-text font-extrabold">Hameed</span>,{" "}
              <span className="gradient-text font-extrabold">Leo</span> and{" "}
              <span className="gradient-text font-extrabold">Hari</span>.
            </p>

            <div className="mt-8 flex items-center gap-5" data-reveal>
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

            <div className="mt-10 flex flex-wrap gap-4" data-reveal>
              <LumaButton>
                Reserve Your Seat <ArrowRight className="h-4 w-4" />
              </LumaButton>
              <a href="#why-video" className="btn-secondary">
                <Play className="h-4 w-4" /> Watch Why
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end" data-date-card>
            <div className="date-card">
              <div className="text-[96px] leading-none font-black">27</div>
              <div className="text-2xl font-extrabold tracking-[0.08em] uppercase mt-1">June 2026</div>
              <div className="mt-3 text-xs font-bold tracking-[0.2em] uppercase opacity-70">
                Saturday · 4 Hours
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-20 overflow-hidden border-y border-white/10 py-5 bg-black/40">
        <div data-marquee-inner className="flex gap-12 whitespace-nowrap text-2xl md:text-3xl font-extrabold uppercase tracking-tight">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              {["Build the right thing", "★", "Build it the right way", "★", "Take it to the right people", "★", "Chennai · 27 June 2026", "★"].map(
                (t, i) => (
                  <span key={i} className={i % 2 === 0 ? "gradient-text" : "text-white/40"}>
                    {t}
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyVideo() {
  return (
    <section id="why-video" className="section-pad relative overflow-hidden">
      <div
        data-parallax="0.3"
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(142,167,255,0.18), transparent 70%)" }}
      />
      <div className="vc-container relative">
        <div className="text-center max-w-2xl mx-auto mb-12" data-reveal>
          <span className="badge-orange mb-4">Watch first · 2 min</span>
          <h2 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight">
            <D text="Why " /><span className="gradient-text"><D text="this workshop" /></span><D text=" exists." />
          </h2>
          <p className="mt-4 text-[color:var(--text-muted)] text-lg">
            The honest reason we're running this — straight from the instructors.
          </p>
        </div>

        <div data-scale-in className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-6 rounded-[40px] gradient-bg opacity-30 blur-3xl" />
          <div className="relative aspect-video rounded-[28px] overflow-hidden border border-white/15 bg-black shadow-[0_40px_120px_rgba(200,139,239,0.25)]">
            {/* Replace src with your hosted video / YouTube embed */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Why Vibe Coding: The Right Way"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyMatters() {
  return (
    <section className="section-pad relative">
      <div className="vc-container">
        <div className="max-w-3xl" data-reveal>
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)]">
            Why this workshop
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            <D text="Everyone is building apps. " /><span className="gradient-text"><D text="Very few are building products people actually want." /></span>
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
    { icon: Target, title: "Identify", desc: "Find real problems worth solving — not problems you invent to use a cool tool." },
    { icon: Sparkles, title: "Validate", desc: "Pressure-test customer pain points before you write a single prompt." },
    { icon: Wrench, title: "Build", desc: "Use AI tools to rapidly ship a Minimum Lovable Product — not just an MVP." },
    { icon: Rocket, title: "Launch", desc: "Position, price, and get your first real customers using a practical go-to-market plan." },
  ];
  return (
    <section className="section-pad bg-[color:var(--bg-section)] relative overflow-hidden">
      <div
        data-parallax="0.2"
        className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,139,239,0.12), transparent 70%)" }}
      />
      <div className="vc-container relative">
        <div className="text-center max-w-2xl mx-auto mb-14" data-reveal>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <D text="What you'll " /><span className="gradient-text"><D text="walk away with" /></span>
          </h2>
          <p className="mt-4 text-[color:var(--text-muted)] text-lg">
            Four hours. One end-to-end product playbook.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" data-stagger>
          {blocks.map((b) => (
            <div key={b.title} className="glass-card p-7" data-stagger-item>
              <div className="h-11 w-11 rounded-xl gradient-bg flex items-center justify-center text-[#050505]">
                <b.icon className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <h3 className="mt-5 text-xl font-bold"><D text={b.title} /></h3>
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
      photo: hameedPhoto.url,
      name: "Hameed",
      role: "The Why",
      tagline: "Product Thinking Before Product Building",
      bio: "20+ years as a product builder with Silicon Valley experience. Gartner recognized.",
      points: [
        "How to identify real problems worth solving",
        "How to avoid building products nobody wants",
        "How to validate customer pain points",
      ],
      podcast: "https://open.spotify.com/embed/episode/4rOoJ6Egrf8K2IrywzwOMk",
      linkedin: "https://www.linkedin.com/in/hameedraha",
    },
    {
      ring: "r2",
      initial: "L",
      photo: leoPhoto.url,
      name: "Leo",
      role: "The How",
      tagline: "Building the Minimum Lovable Product",
      bio: "10+ years building world-class, process-driven products. 3x award winner for Innovation in Technology.",
      points: [
        "How to use AI tools to rapidly build products",
        "How to structure a vibe coding workflow",
        "How to ship launch-ready products with process",
      ],
      podcast: "https://open.spotify.com/embed/episode/4rOoJ6Egrf8K2IrywzwOMk",
      linkedin: "https://www.linkedin.com/in/leonardselvaraja/",
    },
    {
      ring: "r3",
      initial: "H",
      photo: hariPhoto.url,
      name: "Hari",
      role: "The Who",
      tagline: "Taking Your Product to Customers",
      bio: "12+ years of digital product marketing expertise.",
      points: [
        "How to identify the right customer segment",
        "How to position your product clearly",
        "How to get your first users or customers",
      ],
      podcast: "https://open.spotify.com/embed/episode/4rOoJ6Egrf8K2IrywzwOMk",
      linkedin: "https://www.linkedin.com/in/imharikumaran/",
    },
  ];

  return (
    <section className="section-pad relative overflow-hidden">
      <div
        data-parallax="0.35"
        className="absolute top-10 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(189,238,255,0.14), transparent 70%)" }}
      />
      <div className="vc-container relative">
        <div className="max-w-2xl mb-14" data-reveal>
          <span className="badge-orange mb-4">Meet the instructors</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            <D text="Three builders. " /><span className="gradient-text"><D text="One complete playbook." /></span>
          </h2>
          <p className="mt-4 text-[color:var(--text-muted)] text-lg">
            Listen to each instructor's podcast to get a feel for how they think — then come build with them.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6" data-stagger>
          {speakers.map((s) => (
            <article
              key={s.name}
              data-stagger-item
              className="glass-card p-8 flex flex-col hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="flex items-center gap-4">
                <div className={`avatar-ring ${s.ring} !ml-0 !w-16 !h-16 !p-0 overflow-hidden`}>
                  <img src={s.photo} alt={s.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)]">
                    {s.role}
                  </div>
                  <div className="text-2xl font-extrabold">{s.name}</div>
                </div>
                <a
                  href={s.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 w-9 rounded-lg border border-white/15 flex items-center justify-center hover:bg-white/10 transition"
                  aria-label={`${s.name} on LinkedIn`}
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>

              <h3 className="mt-6 text-lg font-bold gradient-text"><D text={s.tagline} /></h3>
              <p className="mt-2 text-sm text-[color:var(--text-soft)] leading-relaxed">{s.bio}</p>

              <ul className="mt-5 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-[color:var(--text-muted)]">
                    <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#BDEEFF]" strokeWidth={2.5} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)] mb-3">
                  <Mic className="h-3.5 w-3.5" /> Listen to {s.name}
                </div>
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <iframe
                    src={s.podcast}
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={`${s.name} podcast`}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      name: "Arjun Mehta",
      title: "Founder, Stackline",
      img: "https://i.pravatar.cc/400?img=12",
      linkedin: "https://linkedin.com",
      highlight: "I shipped a paying product in a weekend — something I'd been stuck on for a year.",
      body: "I came in skeptical. I'd done a dozen AI courses. This was different — they made me throw away my idea on day one and rebuild it around an actual customer.",
    },
    {
      name: "Priya Raghavan",
      title: "PM, FinEdge",
      img: "https://i.pravatar.cc/400?img=47",
      linkedin: "https://linkedin.com",
      highlight: "Hameed's framing on problem-first thinking rewired how I scope every project now.",
      body: "Leo's build flow is the fastest I've seen, and Hari pulled my GTM out of vibes into something I could defend in a room.",
    },
    {
      name: "Karthik Subramanian",
      title: "Indie Hacker",
      img: "https://i.pravatar.cc/400?img=33",
      linkedin: "https://linkedin.com",
      highlight: "Four hours that paid me back ten-fold in the next two weeks.",
      body: "The prompt library alone is worth the ticket. The community is the real bonus — I'm still shipping with people I met that day.",
    },
    {
      name: "Sneha Iyer",
      title: "Designer turned Founder",
      img: "https://i.pravatar.cc/400?img=45",
      linkedin: "https://linkedin.com",
      highlight: "Stopped 'learning' AI and started shipping with it the same evening.",
      body: "The structure — Why, How, Who — is genuinely the right order, and nobody else teaches it this way.",
    },
    {
      name: "Rahul Krishnan",
      title: "Engineer, Razorpay",
      img: "https://i.pravatar.cc/400?img=15",
      linkedin: "https://linkedin.com",
      highlight: "I stopped writing throwaway side projects. Now I ship things people pay for.",
      body: "The combination of product thinking + AI build flow + GTM is what every dev course is missing.",
    },
    {
      name: "Ananya Pillai",
      title: "Solo Founder",
      img: "https://i.pravatar.cc/400?img=49",
      linkedin: "https://linkedin.com",
      highlight: "Got my first 10 paying customers in 12 days using the GTM template from the session.",
      body: "I came in with nothing. I left with a product, a price, and a plan. That's wild for 4 hours.",
    },
    {
      name: "Vikram Shenoy",
      title: "Product Lead",
      img: "https://i.pravatar.cc/400?img=22",
      linkedin: "https://linkedin.com",
      highlight: "Best ROI I've ever had on a workshop ticket — by a wide margin.",
      body: "I sent two of my PMs the next month. They both came back shipping faster than the engineers.",
    },
    {
      name: "Meera Joseph",
      title: "Founder, Cohort",
      img: "https://i.pravatar.cc/400?img=44",
      linkedin: "https://linkedin.com",
      highlight: "Finally a workshop that respects your time and your money.",
      body: "Zero fluff. Hands on the keyboard within 20 minutes. Three frameworks I still use every week.",
    },
    {
      name: "Naveen Kumar",
      title: "CTO, early-stage SaaS",
      img: "https://i.pravatar.cc/400?img=53",
      linkedin: "https://linkedin.com",
      highlight: "I rewired our entire prototyping workflow the week after.",
      body: "Our PRD-to-prototype loop went from 3 weeks to 3 days. Genuinely changed how our team operates.",
    },
  ];

  // Split into 3 columns for the masonry feel
  const cols: typeof testimonials[] = [[], [], []];
  testimonials.forEach((t, i) => cols[i % 3].push(t));

  return (
    <section className="relative bg-[color:var(--bg-section)] overflow-hidden">
      <div className="vc-container relative z-10 pt-24 pb-10">
        <span className="badge-orange mb-4">Real builders. Real outcomes.</span>
        <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">
          <D text="They came to build. " /><span className="gradient-text"><D text="They left shipping." /></span>
        </h2>
        <p className="mt-4 text-[color:var(--text-muted)] text-lg max-w-2xl">
          A wall of receipts from past attendees — scrolling forever, because the list keeps growing.
        </p>
      </div>

      <div className="relative h-[720px] overflow-hidden">
        <div
          data-parallax="0.3"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(200,139,239,0.10), transparent 70%)" }}
        />
        {/* Top & bottom fade masks */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[color:var(--bg-section)] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[color:var(--bg-section)] to-transparent z-20" />

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-10 h-full">
          {cols.map((col, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden ${idx === 1 ? "hidden md:block" : ""} ${idx === 2 ? "hidden lg:block" : ""}`}
            >
              <div
                className="flex flex-col gap-6 will-change-transform"
                style={{
                  animation: `marquee-y-${idx % 2 === 0 ? "up" : "down"} ${40 + idx * 8}s linear infinite`,
                }}
              >
                {[...col, ...col, ...col].map((t, i) => (
                  <TestimonialCard key={`${idx}-${i}-${t.name}`} t={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline keyframes — scoped here to keep the marquee co-located */}
      <style>{`
        @keyframes marquee-y-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.3333%); }
        }
        @keyframes marquee-y-down {
          0% { transform: translateY(-33.3333%); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

type Testimonial = {
  name: string;
  title: string;
  img: string;
  linkedin: string;
  highlight: string;
  body: string;
};

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="glass-card p-7 flex flex-col gap-4 shrink-0">
      <Quote className="h-8 w-8 text-[#C88BEF] opacity-60" strokeWidth={1.5} />
      <p className="text-xl font-extrabold leading-snug tracking-tight">
        "<span className="gradient-text">{t.highlight}</span>"
      </p>
      <p className="text-sm text-[color:var(--text-muted)] leading-relaxed">{t.body}</p>
      <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-3">
        <img
          src={t.img}
          alt={t.name}
          loading="lazy"
          className="h-12 w-12 rounded-full object-cover border-2 border-white/30"
        />
        <div className="flex-1 min-w-0">
          <div className="font-extrabold text-sm truncate">{t.name}</div>
          <div className="text-xs text-[color:var(--text-soft)] truncate">{t.title}</div>
        </div>
        <a
          href={t.linkedin}
          target="_blank"
          rel="noreferrer"
          className="h-8 w-8 rounded-lg border border-white/15 flex items-center justify-center hover:bg-white/10 transition flex-shrink-0"
          aria-label={`${t.name} on LinkedIn`}
        >
          <Linkedin className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}


function Audience() {
  const yes = [
    "Founders", "Entrepreneurs", "Product Managers", "Developers",
    "Students", "Freelancers", "Consultants", "Business Owners",
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
    <section className="section-pad">
      <div className="vc-container">
        <div className="grid lg:grid-cols-2 gap-6" data-stagger>
          <div className="glass-card p-8" data-stagger-item>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🤩</span>
              <h3 className="text-2xl font-extrabold"><D text="Who should attend" /></h3>
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
          <div className="glass-card p-8" data-stagger-item>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🤦‍♂️</span>
              <h3 className="text-2xl font-extrabold"><D text="Who should NOT attend" /></h3>
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
    <section className="section-pad bg-[color:var(--bg-section)]">
      <div className="vc-container">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <div data-reveal>
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)]">
              What you'll bring
            </span>
            <div className="mt-4 flex items-center gap-3 text-3xl font-extrabold">
              <Laptop className="h-8 w-8" /> Your laptop.
            </div>
            <p className="mt-3 text-[color:var(--text-muted)]">That's it. Come ready to build.</p>
          </div>
          <div className="glass-card p-8" data-reveal>
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)]">
              What you'll take home
            </span>
            <h3 className="mt-3 text-3xl font-extrabold">
              <D text="Tools you'll " /><span className="gradient-text"><D text="actually use" /></span><D text="." />
            </h3>
            <ul className="mt-6 space-y-3.5" data-stagger>
              {items.map((i) => (
                <li key={i} className="flex items-start gap-3 text-[color:var(--text-muted)]" data-stagger-item>
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
    <section id="details" className="section-pad">
      <div className="vc-container">
        <div className="text-center max-w-2xl mx-auto mb-14" data-reveal>
          <span className="badge-orange mb-4">Event Details</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            <D text="The " /><span className="gradient-text"><D text="essentials" /></span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" data-stagger>
          {[
            { icon: Calendar, label: "Date", value: "27 June 2026" },
            { icon: Clock, label: "Duration", value: "4-Hour Intensive" },
            { icon: MapPin, label: "Location", value: "Chennai, India" },
            { icon: Coffee, label: "Included", value: "Light Snacks & Refreshments" },
          ].map((d) => (
            <div key={d.label} className="glass-card p-6" data-stagger-item>
              <d.icon className="h-6 w-6 text-[#BDEEFF]" strokeWidth={2} />
              <div className="mt-4 text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)]">
                {d.label}
              </div>
              <div className="mt-1 text-lg font-bold text-white">{d.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 glass-card p-8 md:p-10" data-reveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-[color:var(--text-soft)] text-sm font-bold tracking-[0.2em] uppercase">
                <Users className="h-4 w-4" /> Limited Seats · Interactive Workshop
              </div>
              <h3 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-1">
                <IndianRupee className="h-7 w-7" />2,999 <span className="text-[color:var(--text-soft)] text-xl font-bold ml-2">per seat</span>
              </h3>
              <p className="mt-3 text-[color:var(--text-muted)] max-w-xl">
                Includes all materials, refreshments, and a certificate of completion. Venue in Chennai will be shared with registered attendees.
              </p>
            </div>
            <LumaButton className="btn-primary self-start">
              Register Now <ArrowRight className="h-4 w-4" />
            </LumaButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section-pad hero-bg relative overflow-hidden">
      <div
        data-parallax="0.4"
        className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,139,239,0.20), transparent 70%)" }}
      />
      <div className="vc-container relative">
        <div className="max-w-3xl" data-reveal>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95]">
            <span className="block"><D text="Build the right thing." /></span>
            <span className="block gradient-text"><D text="Build it the right way." /></span>
            <span className="block"><D text="Take it to the right people." /></span>
          </h2>
          <p className="mt-8 text-xl text-[color:var(--text-muted)] max-w-2xl">
            If you've ever wanted to build something meaningful with AI but weren't sure where to start — this is where you begin.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <LumaButton>
              Reserve Your Seat <ArrowRight className="h-4 w-4" />
            </LumaButton>
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

function Pricing() {
  const includes = [
    "4-hour intensive workshop with all 3 instructors",
    "Lovable Pro Subscription — 1 Month",
    "Prompt Library + Product Building Cheat Sheet",
    "Physical Certificate (online verifiable)",
    "Access to AI:BN builder community",
    "Light snacks & refreshments",
  ];
  return (
    <section className="section-pad relative overflow-hidden">
      <div
        data-parallax="0.3"
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,139,239,0.18), transparent 60%)" }}
      />
      <div className="vc-container relative">
        <div className="text-center max-w-2xl mx-auto mb-12" data-reveal>
          <span className="badge-orange mb-4">One ticket. Everything in.</span>
          <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
            <D text="Worth it for " /><span className="gradient-text"><D text="one prompt" /></span><D text="." />
          </h2>
          <p className="mt-4 text-[color:var(--text-muted)] text-lg">
            We kept it simple. One price, one room, everything included.
          </p>
        </div>

        <div data-scale-in className="relative max-w-3xl mx-auto">
          <div className="absolute -inset-8 rounded-[44px] gradient-bg opacity-30 blur-3xl" />
          <div className="relative glass-card p-10 md:p-14 text-center">
            <div className="text-xs font-bold tracking-[0.3em] uppercase text-[color:var(--text-soft)]">
              General Admission
            </div>
            <div className="mt-6 flex items-end justify-center gap-2">
              <IndianRupee className="h-12 w-12 md:h-16 md:w-16 mb-2 md:mb-3" strokeWidth={2.5} />
              <span className="text-7xl md:text-9xl font-black tracking-tighter leading-none gradient-text">
                2,999
              </span>
            </div>
            <div className="mt-3 text-[color:var(--text-soft)] text-sm font-bold tracking-[0.2em] uppercase">
              Per Seat · All inclusive · GST extra
            </div>

            <ul className="mt-10 grid sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto" data-stagger>
              {includes.map((i) => (
                <li
                  key={i}
                  data-stagger-item
                  className="flex items-start gap-2.5 text-[color:var(--text-muted)] text-sm"
                >
                  <div className="mt-0.5 h-5 w-5 rounded-md gradient-bg flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-[#050505]" strokeWidth={4} />
                  </div>
                  <span>{i}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center gap-3">
              <LumaButton>
                Reserve Your Seat <ArrowRight className="h-4 w-4" />
              </LumaButton>
              <span className="text-xs text-[color:var(--text-soft)]">
                Secure checkout via Luma · Limited seats
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
