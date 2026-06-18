"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Linkedin, Mic, X } from "lucide-react";

import { SPEAKERS, toYouTubeEmbedUrl, type Speaker } from "@/components/landing/data";
import { D } from "@/components/landing/utils";
import { Reveal, Stagger, StaggerItem } from "@/components/landing/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

function SpeakerDetailModal({
  speaker,
  onClose,
}: {
  speaker: Speaker | null;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!speaker) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [speaker, onClose]);

  if (!speaker) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-[color:var(--text-main)]/60 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${speaker.name} instructor details`}
        initial={reduce ? false : { opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="speaker-modal-frame relative w-full max-w-lg max-h-[88vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg-card)]/80 text-[color:var(--text-muted)] backdrop-blur-sm transition hover:bg-[color:var(--accent-vermillion)] hover:text-white hover:border-[color:var(--accent-vermillion)]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-7 md:p-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-[color:var(--accent-vermillion)] shrink-0">
              <img src={speaker.photo} alt={speaker.name} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="editorial-label accent-text">{speaker.role}</div>
              <div className="font-display text-2xl font-extrabold tracking-tight text-[color:var(--text-main)]">
                {speaker.name}
              </div>
            </div>
            <a
              href={speaker.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex shrink-0 items-center justify-center rounded-lg border border-[#0A66C2]/30 bg-[#0A66C2]/8 text-[#0A66C2] transition hover:bg-[#0A66C2]/16 h-10 w-10"
              aria-label={`${speaker.name} on LinkedIn`}
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          <h3 className="mt-5 font-display text-xl font-bold leading-snug accent-text">
            <D text={speaker.tagline} />
          </h3>
          <p className="mt-2 leading-relaxed text-[color:var(--text-muted)]">{speaker.bio}</p>

          <ul className="mt-5 space-y-2.5">
            {speaker.points.map((point) => (
              <li key={point} className="flex gap-2.5 text-[color:var(--text-muted)] text-sm">
                <Check className="mt-0.5 shrink-0 accent-text h-4 w-4" strokeWidth={2.5} />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-[color:var(--border)] pt-5">
            <div className="mb-3 flex items-center gap-2 editorial-label">
              <Mic className="h-3.5 w-3.5" /> Listen to {speaker.name}
            </div>
            <div className="space-y-3">
              {speaker.videos.map((videoUrl, idx) => (
                <div
                  key={videoUrl}
                  className="overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-section)]"
                >
                  <div className="aspect-video w-full">
                    <iframe
                      src={toYouTubeEmbedUrl(videoUrl)}
                      width="100%"
                      height="100%"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={`${speaker.name} video ${idx + 1}`}
                      className="h-full w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function SpeakersCardSwap() {
  const [modalSpeaker, setModalSpeaker] = useState<Speaker | null>(null);
  const reduce = useReducedMotion();

  const handleOpen = useCallback((speaker: Speaker) => setModalSpeaker(speaker), []);
  const handleClose = useCallback(() => setModalSpeaker(null), []);

  useEffect(() => {
    if (!modalSpeaker) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalSpeaker]);

  return (
    <section
      id="speakers"
      className="section-pad relative scroll-mt-20 border-t border-[color:var(--border)]"
    >
      <div className="vc-container">
        <Reveal>
          <span className="badge-accent mb-4">Meet the instructors</span>
          <h2 className="mt-4 font-display text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-0.02em] leading-[1.05] max-w-2xl">
            <D text="Three builders. " />
            <span className="accent-text">
              <D text="One complete playbook." />
            </span>
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {SPEAKERS.map((speaker) => (
            <StaggerItem key={speaker.name} className="h-full">
              <button
                type="button"
                onClick={() => handleOpen(speaker)}
                className="speaker-card w-full h-full text-left flex flex-col"
                aria-label={`View ${speaker.name} details`}
              >
                <div className="speaker-card__photo shrink-0">
                  <img src={speaker.photo} alt={speaker.name} />
                  <span className="speaker-card__role">{speaker.role}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-2xl font-extrabold tracking-tight text-[color:var(--text-main)]">
                    {speaker.name}
                  </h3>
                  <p className="mt-1.5 font-bold text-sm accent-text leading-snug">
                    <D text={speaker.tagline} />
                  </p>
                  <p className="mt-3 text-sm text-[color:var(--text-muted)] leading-relaxed line-clamp-2">
                    {speaker.bio}
                  </p>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-semibold text-[color:var(--text-main)]">
                    <span>View details</span>
                    <Linkedin className="h-3.5 w-3.5 text-[color:var(--text-soft)]" />
                  </div>
                </div>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <AnimatePresence>
        {modalSpeaker && <SpeakerDetailModal speaker={modalSpeaker} onClose={handleClose} />}
      </AnimatePresence>
    </section>
  );
}
