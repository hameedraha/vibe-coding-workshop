import { Linkedin } from "lucide-react";

import { TESTIMONIALS, type Testimonial } from "@/components/landing/data";
import { D, groupTestimonialsByColumns } from "@/components/landing/utils";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/motion";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="testimonial-card flex flex-col gap-4 h-full">
      <p className="font-display text-lg font-bold leading-snug tracking-tight text-[color:var(--text-main)]">
        &ldquo;<span className="accent-text">{t.highlight}</span>&rdquo;
      </p>
      <p className="text-sm text-[color:var(--text-muted)] leading-relaxed flex-1">{t.body}</p>
      <div className="mt-auto pt-4 border-t border-[color:var(--border)] flex items-center gap-3">
        <img
          src={t.img}
          alt={t.name}
          loading="lazy"
          className="h-11 w-11 rounded-full object-cover border border-[color:var(--border)]"
        />
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm text-[color:var(--text-main)] truncate">{t.name}</div>
          <div className="text-xs text-[color:var(--text-soft)] truncate">{t.title}</div>
        </div>
        <a
          href={t.linkedin}
          target="_blank"
          rel="noreferrer"
          className="h-8 w-8 rounded-lg border border-[#0A66C2]/30 bg-[#0A66C2]/8 text-[#0A66C2] flex items-center justify-center hover:bg-[#0A66C2]/16 transition flex-shrink-0"
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
    <section className="section-pad bg-[color:var(--bg-section)] border-t border-[color:var(--border)]">
      <div className="vc-container">
        <Reveal>
          <span className="badge-accent mb-4">Testimonials</span>
          <h2 className="mt-4 font-display text-[clamp(32px,5vw,60px)] font-extrabold tracking-[-0.02em] leading-[1.05] max-w-3xl">
            <D text="They came to build. " />
            <span className="accent-text">
              <D text="They left shipping." />
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cols.map((col, colIdx) => (
            <Stagger key={colIdx} className="flex flex-col gap-5">
              {col.map((t) => (
                <StaggerItem key={t.name}>
                  <TestimonialCard t={t} />
                </StaggerItem>
              ))}
            </Stagger>
          ))}
        </div>
      </div>
    </section>
  );
}
