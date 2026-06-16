import { ArrowRight, MapPin } from "lucide-react";

import hameedPhoto from "@/assets/hameed.jpeg";
import hariPhoto from "@/assets/hari.png";
import leoPhoto from "@/assets/leo.jpeg";
import { HERO_MARQUEE_ITEMS } from "@/components/landing/data";
import { D } from "@/components/landing/utils";
import { ReserveSeatButton } from "@/components/ReservationWizard";
import ScrollVelocity from "@/components/ui/scroll-velocity";

export function Hero() {
  return (
    <section className="hero-bg relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
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
            <span className="badge-orange mb-6" data-reveal>
              Offline Event · Chennai
            </span>
            <h1
              data-hero-title
              className="font-display uppercase tracking-tight font-extrabold leading-[0.88] text-[clamp(56px,9vw,120px)]"
            >
              <span data-hero-line className="block gradient-text">
                <D text="AI Vibe" />
              </span>
              <span data-hero-line className="block font-light text-[#EDEDF5]">
                <D text="Coding" />
              </span>
              <span data-hero-line className="block text-[0.42em] tracking-tight mt-4 text-white">
                <D text="THE " />
                <span className="underline-word">
                  <D text="RIGHT" />
                </span>
                <D text=" WAY" />
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
                <div className="avatar-ring r1 overflow-hidden !p-0">
                  <img src={hameedPhoto.src} alt="Hameed" className="w-full h-full object-cover" />
                </div>
                <div className="avatar-ring r2 overflow-hidden !p-0">
                  <img src={leoPhoto.src} alt="Leo" className="w-full h-full object-cover" />
                </div>
                <div className="avatar-ring r3 overflow-hidden !p-0">
                  <img src={hariPhoto.src} alt="Hari" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-[color:var(--text-soft)]">
                <MapPin className="h-5 w-5" />
                <span>Paperflite HQ, Perungudi, Chennai</span>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-4" data-reveal>
              <ReserveSeatButton>
                Reserve Your Seat <ArrowRight className="h-4 w-4" />
              </ReserveSeatButton>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end" data-date-card>
            <div className="date-card">
              <div className="text-[96px] leading-none font-black">27</div>
              <div className="text-2xl font-extrabold tracking-[0.08em] uppercase mt-1">
                June 2026
              </div>
              <div className="mt-3 text-xs font-bold tracking-[0.2em] uppercase opacity-70">
                Saturday · 4 Hours
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-20 overflow-hidden border-y border-white/10 py-5 bg-black/40">
        <ScrollVelocity
          velocity={50}
          numCopies={4}
          className="inline-flex items-center gap-12 text-2xl md:text-3xl font-extrabold uppercase tracking-tight"
          texts={[
            <>
              {HERO_MARQUEE_ITEMS.map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className={i % 2 === 0 ? "gradient-text" : "text-white/40"}
                >
                  {item}
                </span>
              ))}
            </>,
          ]}
        />
      </div>
    </section>
  );
}
