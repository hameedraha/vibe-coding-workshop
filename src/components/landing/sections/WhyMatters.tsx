import { Reveal } from "@/components/landing/motion";
import { D } from "@/components/landing/utils";

export function WhyMatters() {
  return (
    <section className="section-pad relative">
      <div className="vc-container">
        <Reveal>
          <h2 className="font-display text-[clamp(32px,5vw,60px)] font-extrabold leading-[1.05] tracking-[-0.02em] max-w-4xl">
            <D text="Everyone is building apps. " />
            <span className="accent-text">
              <D text="Very few are building products people actually want." />
            </span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1fr] md:gap-16">
          <Reveal delay={0.1}>
            <p className="text-lg text-[color:var(--text-muted)] leading-relaxed">
              <strong className="text-[color:var(--text-main)]">Vibe Coding: The Right Way</strong>{" "}
              is a hands-on, 4-hour workshop that teaches you how to go from{" "}
              <span className="accent-text font-bold">idea to product to customer</span> using
              modern AI tools and proven startup thinking.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-[color:var(--text-muted)] leading-relaxed">
              You won&apos;t watch someone build a to-do app in 15 minutes. You&apos;ll learn how to
              find real problems, validate them, ship with AI, and take your product to market.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
