import { ArrowRight, Check, IndianRupee, X } from "lucide-react";

import {
  BRING_ITEMS,
  EVENT_DETAILS,
  FIT_AUDIENCE,
  LEARN_BLOCKS,
  PRICING_INCLUDES,
  SKIP_AUDIENCE,
  SPONSORS,
  WORKSHOP_BENEFITS,
} from "@/components/landing/data";
import { D } from "@/components/landing/utils";
import { ReserveSeatButton } from "@/components/ReservationWizard";
import { TICKET_PRICE_INR } from "@/lib/reservation.constants";

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
        <div className="mb-12 max-w-2xl" data-reveal>
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--text-soft)]">
            Event essentials
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            <D text="When, where, what, " />
            <span className="gradient-text">
              <D text="and who" />
            </span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" data-stagger>
          {EVENT_DETAILS.map((detail) => (
            <article
              key={detail.label}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#C88BEF]/40 hover:bg-white/[0.06]"
              data-stagger-item
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/25 text-[#BDEEFF] transition-colors group-hover:text-[#C88BEF] group-hover:border-[#C88BEF]/40">
                <detail.icon className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <div className="mt-4 text-[11px] font-bold tracking-[0.22em] uppercase text-[color:var(--text-soft)]">
                {detail.label}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-muted)]">{detail.value}</p>
            </article>
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

function BentoBenefitCard({
  item,
  spanClass,
  className,
}: {
  item: (typeof WORKSHOP_BENEFITS)[number];
  spanClass: string;
  className: string;
}) {
  const Icon = item.icon;

  return (
    <article
      data-stagger-item
      className={`group relative ${className} ${spanClass}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-[1.35rem] bg-gradient-to-br from-[#C88BEF]/0 via-[#7DD3FC]/0 to-[#C88BEF]/0 opacity-0 blur-2xl transition-all duration-500 group-hover:from-[#C88BEF]/35 group-hover:via-[#A78BFA]/20 group-hover:to-[#7DD3FC]/30 group-hover:opacity-100"
      />

      <div className="relative h-full min-h-[inherit] [perspective:1200px]">
        <div className="relative h-full w-full min-h-[inherit] rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0c10] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] [backface-visibility:hidden]">
            <div className="pointer-events-none absolute -right-6 -top-6 select-none opacity-[0.14] blur-[3px]">
              {item.logo ? (
                <img
                  src={item.logo}
                  alt=""
                  aria-hidden
                  className="h-44 w-44 object-contain md:h-52 md:w-52"
                />
              ) : (
                <Icon className="h-44 w-44 text-white md:h-52 md:w-52" strokeWidth={1.25} />
              )}
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/75 to-[#0a0c10]/20" />

            <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end p-6 md:p-7">
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={`${item.title} logo`}
                  loading="lazy"
                  className={`mb-auto ${item.logoClassName ?? "h-10 w-10 rounded-lg object-cover"}`}
                />
              ) : null}
              <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-white md:text-xl">
                {item.title}
              </h3>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0f1117] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] [transform:rotateY(180deg)] [backface-visibility:hidden] md:p-7">
            <div className="pointer-events-none absolute -left-8 bottom-0 select-none opacity-[0.08] blur-[4px]">
              {item.logo ? (
                <img src={item.logo} alt="" aria-hidden className="h-36 w-36 object-contain" />
              ) : (
                <Icon className="h-36 w-36 text-white" strokeWidth={1.25} />
              )}
            </div>
            <div className="relative z-10 flex h-full flex-col justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                Included
              </span>
              <p className="text-sm leading-relaxed text-white/80 md:text-[15px]">{item.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function WhatYouGetBento() {
  const bentoSpans = [
    "md:col-span-6",
    "md:col-span-3",
    "md:col-span-3",
    "md:col-span-4",
    "md:col-span-4",
    "md:col-span-4",
    "md:col-span-8",
    "md:col-span-2",
    "md:col-span-2",
  ];

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
          <p className="mt-4 text-[color:var(--text-muted)]">
            Tangible deliverables you can use immediately to build and launch your MLP.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-12" data-stagger>
          {bentoSpans.map((spanClass, index) => {
            const item = WORKSHOP_BENEFITS[index];
            if (!item) {
              return (
                <article
                  key={`empty-${spanClass}-${index}`}
                  data-stagger-item
                  aria-hidden="true"
                  className={`relative min-h-[220px] rounded-2xl border border-dashed border-white/[0.06] bg-white/[0.015] ${spanClass}`}
                />
              );
            }

            return (
              <BentoBenefitCard
                key={item.title}
                item={item}
                spanClass={spanClass}
                className={item.className}
              />
            );
          })}
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
    <section id="pricing" className="section-pad relative scroll-mt-8">
      <div
        data-parallax="0.3"
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,139,239,0.18), transparent 60%)" }}
      />
      <div className="vc-container relative">
        <div className="text-center max-w-2xl mx-auto mb-12" data-reveal>
          <span className="badge-orange mb-4">Limited seats · Chennai</span>
          <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
            <D text="One ticket. " />
            <span className="gradient-text">
              <D text="Everything you need" />
            </span>
            <D text=" to ship." />
          </h2>
          <p className="mt-4 text-lg text-[color:var(--text-muted)]">
            Walk in with an idea. Walk out with a product playbook, builder perks, and a path to your
            first customers.
          </p>
        </div>
        <div data-scale-in className="relative max-w-4xl mx-auto">
          <div className="relative glass-card p-8 md:p-12 rounded-[22px]">
            <div className="text-center">
              <div className="text-xs font-bold tracking-[0.3em] uppercase text-[color:var(--text-soft)]">
                General Admission
              </div>
              <div className="mt-6 flex items-end justify-center gap-2">
                <IndianRupee className="h-12 w-12 md:h-16 md:w-16 mb-2 md:mb-3" strokeWidth={2.5} />
                <span className="text-7xl md:text-9xl font-black tracking-tighter leading-none gradient-text">
                  {TICKET_PRICE_INR.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="mt-4 text-sm text-[color:var(--text-muted)]">
                Per seat · secure payment via Razorpay · first come, first served
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2" data-stagger>
              <div
                data-stagger-item
                className="rounded-2xl border border-white/10 bg-black/20 p-5 md:p-6"
              >
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)]">
                  What you get
                </h3>
                <ul className="mt-4 space-y-3">
                  {PRICING_INCLUDES.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[color:var(--text-muted)] text-sm"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#BDEEFF]" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                data-stagger-item
                className="rounded-2xl border border-white/10 bg-black/20 p-5 md:p-6"
              >
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)]">
                  What you bring
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">
                  We handle the venue, materials, food, and perks. You show up ready to build.
                </p>
                <ul className="mt-4 space-y-3">
                  {BRING_ITEMS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[color:var(--text-muted)] text-sm"
                    >
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/20">
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
              <p className="text-center text-xs text-[color:var(--text-soft)]">
                Your seat is confirmed only after successful payment.
              </p>
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
        <div className="mb-14 text-center max-w-2xl mx-auto" data-reveal>
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--text-soft)]">
            Sponsors & partners
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            <D text="Backed by teams that " />
            <span className="gradient-text">
              <D text="build" />
            </span>
          </h2>
          <p className="mt-4 text-[color:var(--text-muted)]">
            The ecosystem behind this workshop — tools, communities, and builders who ship.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 lg:gap-4" data-stagger>
          {SPONSORS.map((sponsor) => {
            const content = (
              <>
                {sponsor.logo ? (
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    loading="lazy"
                    className={
                      sponsor.logoClass ??
                      "h-9 w-auto max-w-[120px] object-contain opacity-80 transition-opacity group-hover:opacity-100"
                    }
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                ) : null}
                <span
                  className={`text-center text-sm font-semibold leading-tight text-white/70 transition-colors group-hover:text-white ${
                    sponsor.logo ? "hidden" : ""
                  }`}
                >
                  {sponsor.name}
                </span>
              </>
            );

            const tileClass =
              "group relative flex w-[calc(50%-0.375rem)] min-h-[108px] max-w-[280px] items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(200,139,239,0.12)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)]";

            if (sponsor.href) {
              return (
                <a
                  key={sponsor.name}
                  href={sponsor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-stagger-item
                  className={tileClass}
                  title={sponsor.name}
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={sponsor.name} data-stagger-item className={tileClass}>
                {content}
              </div>
            );
          })}
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
