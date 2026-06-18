"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";

import hameedPhoto from "@/assets/hameed.jpeg";
import hariPhoto from "@/assets/hari.png";
import leoPhoto from "@/assets/leo.jpeg";
import { HERO_MARQUEE_ITEMS } from "@/components/landing/data";
import { ReserveSeatButton } from "@/components/ReservationWizard";

const EASE = [0.16, 1, 0.3, 1] as const;

function DateStamp() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: -3 }}
      animate={
        reduce
          ? { opacity: 1, scale: 1, rotate: -2 }
          : {
              opacity: 1,
              scale: 1,
              rotate: -2,
              boxShadow: [
                "0 10px 30px oklch(0.58 0.2 32 / 0.08)",
                "0 18px 50px oklch(0.58 0.2 32 / 0.18)",
                "0 10px 30px oklch(0.58 0.2 32 / 0.08)",
              ],
            }
      }
      transition={
        reduce
          ? { duration: 0.9, delay: 0.4, ease: EASE }
          : {
              opacity: { duration: 0.9, delay: 0.4, ease: EASE },
              scale: { duration: 0.9, delay: 0.4, ease: EASE },
              rotate: { duration: 0.9, delay: 0.4, ease: EASE },
              boxShadow: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.3 },
            }
      }
      whileHover={
        reduce
          ? undefined
          : {
              y: -10,
              rotate: 0,
              scale: 1.04,
              boxShadow: "0 30px 80px oklch(0.58 0.2 32 / 0.3)",
            }
      }
      className="date-stamp w-[280px] p-8 text-center cursor-default"
    >
      <div className="date-stamp__corner" />
      <div className="editorial-label text-[color:var(--accent-vermillion)]">Save the date</div>
      <div className="mt-4 font-display text-[88px] leading-none font-extrabold tracking-tighter text-[color:var(--text-main)]">
        27
      </div>
      <div className="mt-1 font-display text-2xl font-bold tracking-tight text-[color:var(--text-main)]">
        June 2026
      </div>
      <div className="mt-4 pt-4 border-t border-[color:var(--border)] text-xs font-bold tracking-[0.18em] uppercase text-[color:var(--text-soft)]">
        Saturday · 4 Hours
      </div>
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease: EASE },
    }),
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-44 lg:pb-32">
      <div className="vc-container relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Left: content */}
          <div>
            <motion.div
              custom={0}
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={heroVariants}
            >
              <span className="badge-accent">Offline Event · Chennai</span>
            </motion.div>

            <h1 className="mt-6 font-display font-extrabold leading-[0.92] tracking-[-0.03em] text-[clamp(44px,7.5vw,92px)]">
              <motion.span
                custom={1}
                initial={reduce ? false : "hidden"}
                animate="visible"
                variants={heroVariants}
                className="block text-[color:var(--text-main)]"
              >
                AI Vibe Coding
              </motion.span>
              <motion.span
                custom={2}
                initial={reduce ? false : "hidden"}
                animate="visible"
                variants={heroVariants}
                className="block"
              >
                The <span className="accent-text">Right</span> Way
              </motion.span>
            </h1>

            <motion.p
              custom={3}
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={heroVariants}
              className="mt-7 text-lg md:text-xl text-[color:var(--text-muted)] leading-relaxed max-w-xl"
            >
              A{" "}
              <strong className="text-[color:var(--text-main)] font-bold">
                4-hour, hands-on workshop
              </strong>{" "}
              by <strong className="text-[color:var(--text-main)] font-bold">Hameed</strong>,{" "}
              <strong className="text-[color:var(--text-main)] font-bold">Leo</strong> and{" "}
              <strong className="text-[color:var(--text-main)] font-bold">Hari</strong>.
            </motion.p>

            <motion.div
              custom={4}
              initial={reduce ? false : "hidden"}
              animate="visible"
              variants={heroVariants}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <ReserveSeatButton>
                Reserve Your Seat <ArrowRight className="h-4 w-4" />
              </ReserveSeatButton>
              <div className="flex items-center gap-3">
                <div className="flex">
                  <div className="h-11 w-11 rounded-full border-2 border-[color:var(--bg-main)] overflow-hidden -ml-2 first:ml-0">
                    <img
                      src={hameedPhoto.src}
                      alt="Hameed"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="h-11 w-11 rounded-full border-2 border-[color:var(--bg-main)] overflow-hidden -ml-2">
                    <img src={leoPhoto.src} alt="Leo" className="h-full w-full object-cover" />
                  </div>
                  <div className="h-11 w-11 rounded-full border-2 border-[color:var(--bg-main)] overflow-hidden -ml-2">
                    <img src={hariPhoto.src} alt="Hari" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[color:var(--text-soft)]">
                  <MapPin className="h-4 w-4" />
                  <span>Perungudi, Chennai</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: date stamp */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.92, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
            className="flex justify-center lg:justify-end"
          >
            <DateStamp />
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative mt-24 overflow-hidden border-y border-[color:var(--border)] py-5 md:mt-40">
        <div className="marquee-track">
          {[0, 1, 2, 3].map((copy) => (
            <div key={copy} className="flex items-center gap-10 pr-10" aria-hidden={copy > 0}>
              {HERO_MARQUEE_ITEMS.map((item, i) => (
                <span
                  key={`${copy}-${i}`}
                  className={`font-display text-xl md:text-2xl font-bold uppercase tracking-tight whitespace-nowrap ${
                    i % 2 === 0 ? "text-[color:var(--text-main)]" : "accent-text"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
