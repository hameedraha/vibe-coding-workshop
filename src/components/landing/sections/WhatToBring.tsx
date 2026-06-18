"use client";

import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Reveal } from "@/components/landing/motion";

export function WhatToBring() {
  return (
    <section className="relative overflow-hidden border-t border-[color:var(--border)] bg-[color:var(--text-main)]">
      <div
        className="pointer-events-none absolute left-1/2 top-[30%] h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200,139,239,0.18), transparent 68%)",
        }}
      />
      <div className="vc-container relative pt-20 pb-4 md:pt-28 md:pb-6">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="editorial-label text-white/50">Packing list</p>
            <h2 className="mt-3 font-display text-[clamp(36px,6vw,72px)] font-extrabold tracking-[-0.02em] leading-[1.02] text-white">
              Just bring your <span className="accent-text">laptop.</span>
            </h2>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-md mx-auto">
              Everything else will be provided at the workshop.
            </p>
          </div>
        </Reveal>
      </div>

      <MacbookScroll
        compact
        screen={
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#f5f3ee] px-10 text-center">
            {/* Ambient wallpaper glow */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, rgba(200,139,239,0.12), transparent 50%), radial-gradient(circle at 75% 80%, rgba(189,238,255,0.1), transparent 55%)",
              }}
            />
            {/* Subtle grid texture */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-white shadow-sm">
                <span className="font-display text-2xl font-extrabold text-[color:var(--accent-vermillion)]">
                  V
                </span>
              </div>
              <p className="font-display text-3xl font-extrabold leading-tight tracking-tight text-[color:var(--text-main)] md:text-4xl">
                Just bring your <span className="accent-text">laptop.</span>
              </p>
              <p className="mt-4 max-w-sm text-base font-medium leading-relaxed text-[color:var(--text-muted)] md:text-lg">
                Everything else will be provided at the workshop.
              </p>

              {/* Checklist dock */}
              <div className="mt-8 flex items-center gap-2 rounded-2xl border border-[color:var(--border)] bg-white px-5 py-3 shadow-sm">
                {["Laptop", "An idea", "4 focused hours"].map((item, i) => (
                  <div key={item} className="flex items-center gap-2">
                    {i > 0 && <span className="text-[color:var(--text-soft)]/30">·</span>}
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[color:var(--accent-vermillion)]">
                      <svg
                        className="h-2.5 w-2.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={4}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm font-semibold text-[color:var(--text-muted)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
        showGradient={false}
      />
    </section>
  );
}
