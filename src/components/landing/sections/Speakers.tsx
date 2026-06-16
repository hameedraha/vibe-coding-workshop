import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Check, Linkedin, Mic, X } from "lucide-react";

import CardSwap, { type CardSwapHandle } from "@/components/CardSwap";
import { SPEAKERS, toYouTubeEmbedUrl, type Speaker } from "@/components/landing/data";
import { D } from "@/components/landing/utils";
import { useIsMobile } from "@/hooks/use-mobile";

function SpeakerSwapCardContent({ s, compact = true }: { s: Speaker; compact?: boolean }) {
  const videos = compact ? s.videos.slice(0, 1) : s.videos;
  return (
    <div className={`flex h-full flex-col overflow-hidden ${compact ? "p-6" : "p-8"}`}>
      <div className="flex items-center gap-4">
        <div
          className={`avatar-ring ${s.ring} !ml-0 ${compact ? "!w-14 !h-14" : "!w-20 !h-20"} !p-0 overflow-hidden shrink-0`}
        >
          <img src={s.photo} alt={s.name} className="h-full w-full object-cover rounded-full" />
        </div>
        <div className="min-w-0 flex-1">
          <div
            className={`font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)] ${compact ? "text-[10px]" : "text-xs"}`}
          >
            {s.role}
          </div>
          <div className={`font-extrabold ${compact ? "truncate text-xl" : "text-3xl"}`}>
            {s.name}
          </div>
        </div>
        <a
          href={s.linkedin}
          target="_blank"
          rel="noreferrer"
          className={`flex shrink-0 items-center justify-center rounded-lg border border-[#0A66C2]/50 bg-[#0A66C2]/10 text-[#0A66C2] transition hover:bg-[#0A66C2]/20 ${compact ? "h-8 w-8" : "h-10 w-10"}`}
          aria-label={`${s.name} on LinkedIn`}
          onClick={(e) => e.stopPropagation()}
        >
          <Linkedin className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </a>
      </div>
      <h3
        className={`mt-4 font-bold gradient-text leading-snug ${compact ? "text-base" : "text-2xl"}`}
      >
        <D text={s.tagline} />
      </h3>
      <p
        className={`mt-2 leading-relaxed text-[color:var(--text-soft)] ${compact ? "text-xs" : "text-base"}`}
      >
        {s.bio}
      </p>
      <ul className={`space-y-2 ${compact ? "mt-4" : "mt-6 space-y-3"}`}>
        {s.points.map((point) => (
          <li
            key={point}
            className={`flex gap-2 text-[color:var(--text-muted)] ${compact ? "text-xs gap-2" : "text-sm gap-3"}`}
          >
            <Check
              className={`mt-0.5 shrink-0 text-[#BDEEFF] ${compact ? "h-3.5 w-3.5" : "h-4 w-4"}`}
              strokeWidth={2.5}
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <div className={`mt-auto border-t border-white/10 ${compact ? "pt-4" : "pt-6"}`}>
        <div
          className={`mb-2 flex items-center gap-2 font-bold tracking-[0.2em] uppercase text-[color:var(--text-soft)] ${compact ? "text-[10px]" : "text-xs"}`}
        >
          <Mic className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} /> Listen to {s.name}
        </div>
        <div className={compact ? "space-y-2" : "space-y-3"}>
          {videos.map((videoUrl, idx) => (
            <div
              key={videoUrl}
              className="overflow-hidden rounded-xl border border-white/10 bg-black/40"
            >
              <div className="aspect-video w-full">
                <iframe
                  src={toYouTubeEmbedUrl(videoUrl)}
                  width="100%"
                  height="100%"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`${s.name} video ${idx + 1}`}
                  className={`h-full w-full ${compact ? "pointer-events-none" : ""}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpeakerDetailModal({
  speaker,
  onClose,
}: {
  speaker: Speaker | null;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  useEffect(() => {
    if (!speaker || !overlayRef.current || !panelRef.current) return;
    closingRef.current = false;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current!,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: "power2.out" },
      );
      gsap.fromTo(
        panelRef.current!,
        { opacity: 0, scale: 0.9, y: 56 },
        { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: "power3.out" },
      );
    });
    return () => ctx.revert();
  }, [speaker]);

  const handleClose = useCallback(() => {
    if (closingRef.current || !speaker) return;
    if (!overlayRef.current || !panelRef.current) {
      onClose();
      return;
    }
    closingRef.current = true;
    gsap
      .timeline({ onComplete: onClose })
      .to(panelRef.current, { opacity: 0, scale: 0.94, y: 32, duration: 0.38, ease: "power2.in" })
      .to(overlayRef.current, { opacity: 0, duration: 0.32, ease: "power2.in" }, "-=0.18");
  }, [onClose, speaker]);

  useEffect(() => {
    if (!speaker) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [speaker, handleClose]);

  if (!speaker) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={handleClose}
        aria-hidden
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${speaker.name} — instructor details`}
        className={`speaker-modal-frame relative w-full max-w-lg shadow-[0_40px_120px_rgba(200,139,239,0.35)] card--${speaker.ring}`}
      >
        <div className="speaker-modal-inner max-h-[min(88vh,820px)]">
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-sm transition hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <SpeakerSwapCardContent s={speaker} compact={false} />
        </div>
      </div>
    </div>
  );
}

export function SpeakersCardSwap() {
  const cardSwapRef = useRef<CardSwapHandle>(null);
  const [modalSpeaker, setModalSpeaker] = useState<Speaker | null>(null);
  const isMobile = useIsMobile();

  const handleFrontClick = useCallback((idx: number) => {
    cardSwapRef.current?.pause();
    setModalSpeaker(SPEAKERS[idx]);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalSpeaker(null);
    cardSwapRef.current?.forceResume();
  }, []);

  useEffect(() => {
    if (!modalSpeaker) cardSwapRef.current?.forceResume();
  }, [modalSpeaker]);

  return (
    <section className="section-pad relative border-t border-white/5">
      <div
        data-parallax="0.25"
        className="absolute bottom-0 -right-32 h-[600px] w-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,139,239,0.12), transparent 70%)" }}
      />
      <div className="vc-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
          <div className="max-w-xl" data-reveal>
            <span className="badge-orange mb-4">Meet the instructors</span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
              <D text="Three builders. " />
              <span className="gradient-text">
                <D text="One complete playbook." />
              </span>
            </h2>
          </div>
          <div
            className={`relative mx-auto w-full overflow-visible lg:mx-0 lg:ml-auto ${isMobile ? "h-[480px] max-w-[min(100%,340px)]" : "h-[620px] max-w-[520px]"}`}
            data-reveal
          >
            <CardSwap
              ref={cardSwapRef}
              count={SPEAKERS.length}
              width={isMobile ? 320 : 400}
              height={isMobile ? 440 : 520}
              cardDistance={isMobile ? 0 : 50}
              verticalDistance={isMobile ? 14 : 55}
              delay={5000}
              pauseOnHover
              skewAmount={isMobile ? 0 : 5}
              flat={isMobile}
              containerClassName="card-swap-container--centered"
              getCardClassName={(i) => `card--${SPEAKERS[i].ring}`}
              onFrontClick={handleFrontClick}
              renderTab={(i) => {
                const speaker = SPEAKERS[i];
                return (
                  <>
                    <img src={speaker.photo} alt="" className="card-swap-tab__avatar" aria-hidden />
                    <span className="card-swap-tab__label">{speaker.name}</span>
                  </>
                );
              }}
              renderCard={(i) => <SpeakerSwapCardContent s={SPEAKERS[i]} />}
            />
          </div>
        </div>
      </div>
      <SpeakerDetailModal speaker={modalSpeaker} onClose={handleModalClose} />
    </section>
  );
}
