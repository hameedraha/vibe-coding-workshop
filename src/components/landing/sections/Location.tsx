"use client";

import { motion, useReducedMotion } from "motion/react";
import { MapPin, Navigation } from "lucide-react";

import { Reveal } from "@/components/landing/motion";
import loc1 from "@/assets/location/loc-1.jpeg";
import loc2 from "@/assets/location/loc-2.jpeg";
import loc3 from "@/assets/location/loc-3.jpeg";
import loc4 from "@/assets/location/loc-4.jpeg";

const IMAGES = [loc1, loc2, loc3, loc4];

const EASE = [0.16, 1, 0.3, 1] as const;

const CLUSTER = [
  { src: IMAGES[0], className: "col-span-2 row-span-2", delay: 0 },
  { src: IMAGES[1], className: "col-span-1 row-span-1", delay: 0.08 },
  { src: IMAGES[2], className: "col-span-1 row-span-2", delay: 0.16 },
  { src: IMAGES[3], className: "col-span-2 row-span-1", delay: 0.12 },
];

export function Location() {
  const reduce = useReducedMotion();
  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Paperflite+383+1st+Cross+St+Nehru+Nagar+Perungudi+Chennai+Tamil+Nadu+600041";

  return (
    <section className="section-pad bg-[color:var(--bg-section)] border-t border-[color:var(--border)]">
      <div className="vc-container">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-0.02em] leading-[1.05]">
              Happening at <span className="accent-text">Chennai</span>
            </h2>
            <p className="mt-4 text-lg text-[color:var(--text-muted)]">
              Paperflite HQ in Perungudi. Easy access from OMR and the city.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Info card */}
          <Reveal delay={0.1} className="h-full">
            <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-card)] p-8 md:p-10 lg:aspect-square">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-section)] accent-text">
                  <MapPin className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-[color:var(--text-main)]">
                  Paperflite HQ
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">
                  383, 1st Cross St, Nehru Nagar, Perungudi, Chennai, Tamil Nadu 600041
                </p>
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-3 !px-5 !text-sm w-fit"
              >
                <Navigation className="h-4 w-4" />
                Get directions
              </a>
            </div>
          </Reveal>

          {/* Animated image cluster */}
          <div className="grid min-h-[300px] grid-cols-3 grid-rows-3 gap-3 sm:gap-4 lg:aspect-square lg:min-h-0">
            {CLUSTER.map((img, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, scale: 0.85, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: img.delay, ease: EASE }}
                whileHover={
                  reduce ? undefined : { scale: 1.03, zIndex: 10, transition: { duration: 0.3 } }
                }
                className={`group relative overflow-hidden rounded-xl border border-[color:var(--border)] ${img.className}`}
              >
                <img
                  src={img.src.src}
                  alt={`Paperflite HQ ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[color:var(--text-main)]/0 transition-colors duration-300 group-hover:bg-[color:var(--text-main)]/10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
