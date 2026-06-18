import { ArrowRight, Check, IndianRupee, X } from "lucide-react";

import {
  BRING_ITEMS,
  EVENT_DETAILS,
  FAQ_ITEMS,
  FIT_AUDIENCE,
  LEARN_BLOCKS,
  PRICING_INCLUDES,
  SKIP_AUDIENCE,
  SPONSORS,
  WORKSHOP_BENEFITS,
} from "@/components/landing/data";
import { D } from "@/components/landing/utils";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/motion";
import { ReserveSeatButton } from "@/components/ReservationWizard";
import { TICKET_PRICE_INR } from "@/lib/reservation.constants";

export function EventDetails() {
  return (
    <section
      id="details"
      className="section-pad bg-[color:var(--bg-section)] border-t border-[color:var(--border)]"
    >
      <div className="vc-container">
        <Reveal>
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-0.02em] leading-[1.05] max-w-2xl">
            <D text="When, where, what, " />
            <span className="accent-text">
              <D text="and who" />
            </span>
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {EVENT_DETAILS.map((detail, idx) => (
            <StaggerItem key={detail.label} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-card)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--accent-vermillion)]/30 hover:shadow-[0_20px_48px_oklch(0.18_0.008_60/0.1)]">
                <div className="absolute top-0 left-0 h-1 w-0 bg-[color:var(--accent-vermillion)] transition-all duration-500 group-hover:w-full" />
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-section)] accent-text transition-colors group-hover:bg-[color:var(--accent-vermillion)] group-hover:text-[color:var(--bg-card)] group-hover:border-[color:var(--accent-vermillion)]">
                    <detail.icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <span className="font-display text-3xl font-extrabold tracking-tighter text-[color:var(--border)]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-6 editorial-label">{detail.label}</div>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-muted)]">
                  {detail.value}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function WhatYouLearn() {
  return (
    <section className="section-pad border-t border-[color:var(--border)]">
      <div className="vc-container">
        <Reveal>
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-0.02em] leading-[1.05] max-w-2xl">
            What you&apos;ll <span className="accent-text">walk away with</span>
          </h2>
          <p className="mt-4 text-lg text-[color:var(--text-muted)] max-w-xl">
            Four connected phases. One session. A complete path from idea to paying customers.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {LEARN_BLOCKS.map((block) => (
            <StaggerItem key={block.title} className="phase-step">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-card)] accent-text">
                  <block.icon className="h-4 w-4" strokeWidth={2.25} />
                </div>
                <span className="phase-step__num">{block.step}</span>
              </div>
              <div className="phase-step__line" />
              <h3 className="font-display text-xl font-extrabold tracking-tight text-[color:var(--text-main)]">
                <D text={block.title} />
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[color:var(--text-muted)]">
                {block.desc}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function BentoBenefitCard({
  item,
  spanClass,
}: {
  item: (typeof WORKSHOP_BENEFITS)[number];
  spanClass: string;
}) {
  const Icon = item.icon;

  return (
    <article className={`bento-cell ${spanClass}`}>
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            {item.logo ? (
              <img
                src={item.logo}
                alt={`${item.title} logo`}
                loading="lazy"
                className={item.logoClassName ?? "h-10 w-10 rounded-lg object-cover"}
              />
            ) : (
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-section)] accent-text">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
            )}
          </div>

          <div className="bento-value-pill shrink-0">
            <span className="bento-value-pill__amount">
              ₹{item.valueInr.toLocaleString("en-IN")}
            </span>
            <span className="bento-value-pill__label">
              {item.valueEstimated ? "est. value" : "value"}
            </span>
          </div>
        </div>

        <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-[color:var(--text-main)]">
          {item.title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[color:var(--text-muted)]">
          {item.desc}
        </p>
      </div>
    </article>
  );
}

export function WhatYouGetBento() {
  return (
    <section className="section-pad bg-[color:var(--bg-section)] border-t border-[color:var(--border)]">
      <div className="vc-container">
        <Reveal>
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-0.02em] leading-[1.05] max-w-2xl">
            A high-leverage <span className="accent-text">builder stack</span>
          </h2>
          <p className="mt-4 text-lg text-[color:var(--text-muted)] max-w-xl">
            Tangible deliverables you can use immediately to build and launch your MLP.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-12">
          <StaggerItem className="md:col-span-6">
            <BentoBenefitCard item={WORKSHOP_BENEFITS[0]} spanClass="h-full" />
          </StaggerItem>
          <StaggerItem className="md:col-span-3">
            <BentoBenefitCard item={WORKSHOP_BENEFITS[1]} spanClass="h-full" />
          </StaggerItem>
          <StaggerItem className="md:col-span-3">
            <BentoBenefitCard item={WORKSHOP_BENEFITS[2]} spanClass="h-full" />
          </StaggerItem>
          <StaggerItem className="md:col-span-4">
            <BentoBenefitCard item={WORKSHOP_BENEFITS[3]} spanClass="h-full" />
          </StaggerItem>
          <StaggerItem className="md:col-span-4">
            <BentoBenefitCard item={WORKSHOP_BENEFITS[4]} spanClass="h-full" />
          </StaggerItem>
          <StaggerItem className="md:col-span-4">
            <BentoBenefitCard item={WORKSHOP_BENEFITS[5]} spanClass="h-full" />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

export function Audience() {
  return (
    <section className="section-pad border-t border-[color:var(--border)]">
      <div className="vc-container">
        <Reveal>
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-0.02em] leading-[1.05] max-w-2xl">
            <D text="Built for people who " />
            <span className="accent-text">
              <D text="ship with intent" />
            </span>
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 lg:grid-cols-2">
          <StaggerItem className="h-full">
            <article className="audience-panel audience-panel--fit h-full flex flex-col">
              <div>
                <p className="editorial-label accent-text">Recommended</p>
                <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-[color:var(--text-main)]">
                  Who should attend
                </h3>
              </div>
              <ul className="mt-5 space-y-3.5 flex-1">
                {FIT_AUDIENCE.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[color:var(--text-muted)] text-sm leading-relaxed"
                  >
                    <Check className="mt-0.5 shrink-0 accent-text h-4 w-4" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>
          <StaggerItem className="h-full">
            <article className="audience-panel audience-panel--skip h-full flex flex-col">
              <div>
                <p className="editorial-label text-[color:var(--text-soft)]">Not a match</p>
                <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-[color:var(--text-main)]">
                  Who should not attend
                </h3>
              </div>
              <ul className="mt-5 space-y-3.5">
                {SKIP_AUDIENCE.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[color:var(--text-muted)] text-sm leading-relaxed"
                  >
                    <X
                      className="mt-0.5 shrink-0 text-[color:var(--text-soft)] h-4 w-4"
                      strokeWidth={2.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      className="section-pad relative scroll-mt-20 bg-[color:var(--bg-section)] border-t border-[color:var(--border)]"
    >
      <div className="vc-container relative">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge-accent">Limited seats · Chennai</span>
            <h2 className="mt-5 font-display text-[clamp(36px,6vw,68px)] font-extrabold tracking-[-0.02em] leading-[1.02]">
              <D text="One ticket. " />
              <span className="accent-text">
                <D text="Everything you need" />
              </span>
              <D text=" to ship." />
            </h2>
            <p className="mt-5 text-lg text-[color:var(--text-muted)]">
              Walk in with an idea. Walk out with a product playbook, builder perks, and a path to
              your first customers.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 max-w-4xl mx-auto">
          <div className="pricing-card p-8 md:p-12">
            <div className="text-center">
              <div className="editorial-label">General Admission</div>
              <div className="mt-5 flex items-end justify-center gap-1">
                <IndianRupee
                  className="h-10 w-10 md:h-14 md:w-14 mb-2 md:mb-3 accent-text"
                  strokeWidth={2.5}
                />
                <span className="font-display text-6xl md:text-8xl font-extrabold tracking-tighter leading-none accent-text">
                  {TICKET_PRICE_INR.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="mt-3 text-sm text-[color:var(--text-muted)]">
                Per seat · secure payment via Razorpay · first come, first served
              </p>
            </div>

            <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
              <StaggerItem className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-card)] p-6">
                <h3 className="editorial-label">What you get</h3>
                <ul className="mt-4 space-y-3">
                  {PRICING_INCLUDES.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[color:var(--text-muted)] text-sm"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 accent-text" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>

              <StaggerItem className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-card)] p-6">
                <h3 className="editorial-label">What you bring</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">
                  We handle the venue, materials, food, and perks. You show up ready to build.
                </p>
                <ul className="mt-4 space-y-3">
                  {BRING_ITEMS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[color:var(--text-muted)] text-sm"
                    >
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[color:var(--border)]">
                        <span className="text-[10px] font-bold accent-text">·</span>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            </Stagger>

            <div className="mt-10 flex flex-col items-center gap-3">
              <ReserveSeatButton>
                Reserve Your Seat <ArrowRight className="h-4 w-4" />
              </ReserveSeatButton>
              <p className="text-center text-xs text-[color:var(--text-soft)]">
                Your seat is confirmed only after successful payment.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Sponsors() {
  return (
    <section className="section-pad border-t border-[color:var(--border)]">
      <div className="vc-container">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-0.02em] leading-[1.05]">
              <D text="Backed by teams that " />
              <span className="accent-text">
                <D text="build" />
              </span>
            </h2>
            <p className="mt-4 text-lg text-[color:var(--text-muted)]">
              The ecosystem behind this workshop: tools, communities, and builders who ship.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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
                      "h-8 w-auto max-w-[120px] object-contain opacity-70 transition-opacity group-hover:opacity-100"
                    }
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                ) : null}
                <span
                  className={`text-center text-sm font-semibold leading-tight text-[color:var(--text-muted)] transition-colors group-hover:text-[color:var(--text-main)] ${
                    sponsor.logo ? "hidden" : ""
                  }`}
                >
                  {sponsor.name}
                </span>
              </>
            );

            const tileClass = "sponsor-tile group";

            if (sponsor.href) {
              return (
                <StaggerItem key={sponsor.name}>
                  <a
                    href={sponsor.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={tileClass}
                    title={sponsor.name}
                  >
                    {content}
                  </a>
                </StaggerItem>
              );
            }

            return (
              <StaggerItem key={sponsor.name}>
                <div className={tileClass}>{content}</div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] py-10">
      <div className="vc-container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[color:var(--text-soft)]">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-[color:var(--accent-vermillion)] flex items-center justify-center">
            <span className="font-display font-bold text-[color:var(--bg-main)] text-xs">V</span>
          </div>
          <span className="font-bold text-[color:var(--text-main)]">
            Vibe Coding: The Right Way
          </span>
        </div>
        <div>© 2026 AI:BN · Chennai, India</div>
      </div>
    </footer>
  );
}

import { ChevronDown } from "lucide-react";

export function FAQ() {
  return (
    <section className="section-pad bg-[color:var(--bg-section)] border-t border-[color:var(--border)]">
      <div className="vc-container">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-0.02em] leading-[1.05]">
              Frequently asked <span className="accent-text">questions</span>
            </h2>
            <p className="mt-4 text-lg text-[color:var(--text-muted)]">
              Everything you need to know before you reserve your seat.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 max-w-3xl mx-auto">
          {FAQ_ITEMS.map((faq) => (
            <StaggerItem key={faq.question}>
              <details className="group rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-card)] transition-colors hover:border-[color:var(--accent-vermillion)]/30">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-bold text-[color:var(--text-main)] text-sm list-none">
                  {faq.question}
                  <ChevronDown className="h-4 w-4 shrink-0 text-[color:var(--text-soft)] transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed text-[color:var(--text-muted)]">
                  {faq.answer}
                </div>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
