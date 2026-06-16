import { ArrowRight, Check, IndianRupee, X } from "lucide-react";

import {
  BRING_ITEMS,
  EVENT_DETAILS,
  FIT_AUDIENCE,
  LEARN_BLOCKS,
  SKIP_AUDIENCE,
  SPONSORS,
  WORKSHOP_BENEFITS,
} from "@/components/landing/data";
import { D } from "@/components/landing/utils";
import { ReserveSeatButton } from "@/components/ReservationWizard";

export function WhyMatters() {
  return (
    <section className="section-pad relative">
      <div className="vc-container">
        <div className="max-w-3xl" data-reveal>
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)]">
            Why this workshop
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            <D text="Everyone is building apps. " />
            <span className="gradient-text">
              <D text="Very few are building products people actually want." />
            </span>
          </h2>
          <div className="mt-8 space-y-5 text-lg text-[color:var(--text-muted)] leading-relaxed">
            <p>
              <strong className="text-white">Vibe Coding: The Right Way</strong> is a hands-on,
              4-hour workshop that teaches you how to go from{" "}
              <span className="gradient-text font-bold">idea → product → customer</span> using
              modern AI tools and proven startup thinking.
            </p>
            <p>
              You won't watch someone build a to-do app in 15 minutes. You'll learn how to find real
              problems, validate them, ship with AI, and take your product to market.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EventDetails() {
  return (
    <section id="details" className="section-pad bg-[color:var(--bg-section)]">
      <div className="vc-container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" data-stagger>
          {EVENT_DETAILS.map((detail) => (
            <div key={detail.label} className="glass-card p-6" data-stagger-item>
              <detail.icon className="h-6 w-6 text-[#BDEEFF]" strokeWidth={2} />
              <div className="mt-4 text-xs font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)]">
                {detail.label}
              </div>
              <div className="mt-1 text-lg font-bold text-white">{detail.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhatYouLearn() {
  return (
    <section className="section-pad bg-[color:var(--bg-section)] relative overflow-hidden">
      <div
        data-parallax="0.2"
        className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,139,239,0.12), transparent 70%)" }}
      />
      <div className="vc-container relative">
        <div
          className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          data-reveal
        >
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--text-soft)]">
              The playbook
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">
              <D text="What you'll " />
              <span className="gradient-text">
                <D text="walk away with" />
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-[color:var(--text-muted)] text-base lg:text-right lg:pb-1">
            Four connected phases. One session. A complete path from idea to paying customers.
          </p>
        </div>
        <div className="playbook-pipeline relative" data-stagger>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {LEARN_BLOCKS.map((block) => (
              <article
                key={block.title}
                data-stagger-item
                className={`playbook-step playbook-step--${block.tone} group`}
              >
                <div className="playbook-step__node">
                  <div className="playbook-step__dot">
                    <block.icon className="h-4 w-4" strokeWidth={2.25} />
                  </div>
                  <span className="playbook-step__index">{block.step}</span>
                </div>
                <div>
                  <h3 className="playbook-step__title">
                    <D text={block.title} />
                  </h3>
                  <p className="playbook-step__desc mt-3">{block.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhatYouGetBento() {
  return (
    <section className="section-pad bg-[color:var(--bg-section)] border-t border-white/5">
      <div className="vc-container">
        <div className="mb-12 max-w-2xl" data-reveal>
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--text-soft)]">
            What you get
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            <D text="A high-leverage " />
            <span className="gradient-text">
              <D text="builder stack" />
            </span>
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3 auto-rows-[minmax(130px,auto)]" data-stagger>
          {WORKSHOP_BENEFITS.map((item) => (
            <article
              key={item.title}
              data-stagger-item
              className={`group rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_14px_44px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C88BEF]/50 hover:bg-white/[0.06] hover:shadow-[0_24px_60px_rgba(200,139,239,0.24)] ${item.className}`}
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-black/25 text-[#BDEEFF] transition-colors group-hover:border-[#C88BEF]/60 group-hover:text-[#C88BEF]">
                <item.icon className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-[color:var(--text-muted)] leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Audience() {
  return (
    <section className="section-pad border-t border-white/5">
      <div className="vc-container">
        <div className="mb-12 max-w-2xl" data-reveal>
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--text-soft)]">
            Fit check
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            <D text="Built for people who " />
            <span className="gradient-text">
              <D text="ship with intent" />
            </span>
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6" data-stagger>
          <article className="audience-panel audience-panel--fit" data-stagger-item>
            <div>
              <p className="audience-panel__label">Recommended</p>
              <h3 className="audience-panel__title mt-2">Who should attend</h3>
            </div>
            <ul className="audience-panel__list">
              {FIT_AUDIENCE.map((item) => (
                <li key={item} className="audience-panel__item">
                  <Check className="audience-panel__marker h-4 w-4" strokeWidth={2.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="audience-panel audience-panel--skip" data-stagger-item>
            <div>
              <p className="audience-panel__label">Not a match</p>
              <h3 className="audience-panel__title mt-2">Who should not attend</h3>
            </div>
            <ul className="audience-panel__list">
              {SKIP_AUDIENCE.map((item) => (
                <li key={item} className="audience-panel__item">
                  <X className="audience-panel__marker h-4 w-4" strokeWidth={2.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section className="section-pad relative">
      <div
        data-parallax="0.3"
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,139,239,0.18), transparent 60%)" }}
      />
      <div className="vc-container relative">
        <div className="text-center max-w-2xl mx-auto mb-12" data-reveal>
          <span className="badge-orange mb-4">One ticket. Everything in.</span>
          <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
            <D text="Worth it for " />
            <span className="gradient-text">
              <D text="one prompt" />
            </span>
            <D text="." />
          </h2>
        </div>
        <div data-scale-in className="relative max-w-4xl mx-auto">
          <div className="relative glass-card p-8 md:p-12 rounded-[22px]">
            <div className="text-center text-xs font-bold tracking-[0.3em] uppercase text-[color:var(--text-soft)]">
              General Admission
            </div>
            <div className="mt-6 flex items-end justify-center gap-2 text-center">
              <IndianRupee className="h-12 w-12 md:h-16 md:w-16 mb-2 md:mb-3" strokeWidth={2.5} />
              <span className="text-7xl md:text-9xl font-black tracking-tighter leading-none gradient-text">
                2,999
              </span>
            </div>
            <div className="mt-10" data-stagger>
              <div
                data-stagger-item
                className="rounded-2xl border border-white/10 bg-black/20 p-5 max-w-md mx-auto"
              >
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)]">
                  What you bring
                </h3>
                <ul className="mt-4 space-y-3">
                  {BRING_ITEMS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[color:var(--text-muted)] text-sm"
                    >
                      <div className="mt-0.5 h-5 w-5 rounded-md border border-white/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-white">•</span>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10 flex flex-col items-center gap-3">
              <ReserveSeatButton>
                Reserve Your Seat <ArrowRight className="h-4 w-4" />
              </ReserveSeatButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Sponsors() {
  return (
    <section className="section-pad border-t border-white/5">
      <div className="vc-container">
        <div className="mb-10 max-w-2xl" data-reveal>
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--text-soft)]">
            Sponsors
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            <D text="Backed by teams that " />
            <span className="gradient-text">
              <D text="build" />
            </span>
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {SPONSORS.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex min-h-24 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5"
              data-stagger-item
            >
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                loading="lazy"
                className={sponsor.logoClass ?? "h-9 w-9 rounded-md bg-white object-contain p-1"}
              />
              <span className="text-lg font-semibold">{sponsor.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
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
