import { Linkedin } from "lucide-react";

import { TESTIMONIALS, type Testimonial } from "@/components/landing/data";
import { D, groupTestimonialsByColumns } from "@/components/landing/utils";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="glass-card p-7 flex flex-col gap-4 shrink-0">
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
          className="h-8 w-8 rounded-lg border border-[#0A66C2]/50 bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center hover:bg-[#0A66C2]/20 transition flex-shrink-0"
          aria-label={`${t.name} on LinkedIn`}
        >
          <Linkedin className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

export function Testimonials() {
  const cols = groupTestimonialsByColumns(TESTIMONIALS);

  return (
    <section className="relative bg-[color:var(--bg-section)] overflow-hidden border-t border-white/5">
      <div className="vc-container relative z-10 pt-24 pb-10">
        <span className="badge-orange mb-4">Testimonials</span>
        <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl">
          <D text="They came to build. " />
          <span className="gradient-text">
            <D text="They left shipping." />
          </span>
        </h2>
      </div>
      <div className="relative h-[720px] overflow-hidden">
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
                {[...col, ...col, ...col].map((item, i) => (
                  <TestimonialCard key={`${idx}-${i}-${item.name}`} t={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee-y-up { 0% { transform: translateY(0); } 100% { transform: translateY(-33.3333%); } }
        @keyframes marquee-y-down { 0% { transform: translateY(-33.3333%); } 100% { transform: translateY(0); } }
      `}</style>
    </section>
  );
}
