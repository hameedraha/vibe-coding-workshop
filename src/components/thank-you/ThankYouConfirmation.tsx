"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  CalendarPlus,
  Camera,
  CheckCircle2,
  Clock,
  Lightbulb,
  MapPin,
} from "lucide-react";
import Link from "next/link";

import type { ConfirmationRecord } from "@/lib/confirmation-cookie.server";
import { WORKSHOP_EVENT } from "@/lib/event.constants";
import { downloadWorkshopIcs } from "@/lib/ics";
import { TICKET_PRICE_INR, VIBE_EXPERIENCE_OPTIONS } from "@/lib/reservation.constants";

type ThankYouConfirmationProps = {
  confirmation: ConfirmationRecord;
};

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
};

function experienceLabel(value: string) {
  return VIBE_EXPERIENCE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

function getCountdown(targetIso: string): CountdownParts {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-section)] px-3 py-4 sm:px-4 sm:py-5">
      <span className="font-mono text-2xl font-extrabold tabular-nums text-[color:var(--text-main)] sm:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--text-soft)] sm:text-[11px]">
        {label}
      </span>
    </div>
  );
}

function EventCountdown() {
  const [parts, setParts] = useState<CountdownParts>(() => getCountdown(WORKSHOP_EVENT.startIso));

  useEffect(() => {
    const tick = () => setParts(getCountdown(WORKSHOP_EVENT.startIso));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (parts.isPast) {
    return (
      <p className="text-base font-semibold text-[color:var(--text-main)]">
        Workshop day — see you at Paperflite!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      <CountdownUnit value={parts.days} label="Days" />
      <CountdownUnit value={parts.hours} label="Hours" />
      <CountdownUnit value={parts.minutes} label="Mins" />
      <CountdownUnit value={parts.seconds} label="Secs" />
    </div>
  );
}

function SectionCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-[24px] border border-[color:var(--border)] bg-[color:var(--bg-section)] p-6 md:p-7 ${className}`}
    >
      {children}
    </section>
  );
}

export function ThankYouConfirmation({ confirmation }: ThankYouConfirmationProps) {
  const firstName = confirmation.name.split(" ")[0] || "there";
  const experienceText = experienceLabel(confirmation.experience);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="text-center">
        <span className="badge-orange mb-5 inline-flex items-center gap-2">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Payment confirmed
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          You&apos;re in, <span className="accent-text">{firstName}</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[color:var(--text-muted)] md:text-lg">
          Your seat for{" "}
          <strong className="text-[color:var(--text-main)]">{WORKSHOP_EVENT.title}</strong> is
          reserved.
        </p>
      </div>

      <SectionCard className="mt-10 border-[color:var(--accent-vermillion)]/30 bg-[color:var(--accent-vermillion)]/8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--accent-vermillion)]/20 text-[color:var(--accent-vermillion)]">
            <Camera className="h-5 w-5" strokeWidth={2.25} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-extrabold text-[color:var(--text-main)]">
              Screenshot this page
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-muted)]">
              Show it at check-in on 27 June. This confirmation lives in your browser only — save it
              on your phone before you close this tab.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="mt-5">
        <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--text-soft)]">
          Your proof of payment
        </h2>
        <dl className="mt-5 space-y-5">
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
              Confirmation ID
            </dt>
            <dd className="mt-1.5 font-mono text-2xl font-extrabold tracking-wide text-[color:var(--text-main)] sm:text-3xl">
              {confirmation.id}
            </dd>
          </div>
          <div className="border-t border-[color:var(--border)] pt-5">
            <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
              Razorpay payment ID
            </dt>
            <dd className="mt-1.5 break-all font-mono text-sm font-medium leading-relaxed text-[color:var(--text-main)] sm:text-base">
              {confirmation.paymentId}
            </dd>
          </div>
        </dl>
      </SectionCard>

      <SectionCard className="mt-5">
        <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--text-soft)]">
          Workshop starts in
        </h2>
        <p className="mt-2 text-sm text-[color:var(--text-muted)]">{WORKSHOP_EVENT.displayWhen}</p>
        <div className="mt-5">
          <EventCountdown />
        </div>
      </SectionCard>

      <SectionCard className="mt-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--accent-vermillion)]/15 text-[color:var(--accent-vermillion)]">
            <Lightbulb className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-[color:var(--text-main)]">What next?</h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)] md:text-base">
              Think of an idea you&apos;re excited to build. Bring it to the workshop — we&apos;ll
              help you pressure-test it and ship it with AI.
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard className="mt-5">
        <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--text-soft)]">
          When &amp; where
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[color:var(--text-muted)]">
          <p className="flex items-start gap-2.5">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--accent-vermillion)]" />
            <span>{WORKSHOP_EVENT.displayWhen}</span>
          </p>
          <p className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--accent-vermillion)]" />
            <span>{WORKSHOP_EVENT.displayWhere}</span>
          </p>
        </div>
      </SectionCard>

      <SectionCard className="mt-5">
        <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--text-soft)]">
          Registration details
        </h2>
        <dl className="mt-4 divide-y divide-[color:var(--border)] text-sm">
          <div className="flex justify-between gap-4 py-3 first:pt-0">
            <dt className="shrink-0 text-[color:var(--text-soft)]">Name</dt>
            <dd className="text-right font-medium text-[color:var(--text-main)]">
              {confirmation.name}
            </dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="shrink-0 text-[color:var(--text-soft)]">Email</dt>
            <dd className="break-all text-right font-medium text-[color:var(--text-main)]">
              {confirmation.email}
            </dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="shrink-0 text-[color:var(--text-soft)]">Phone</dt>
            <dd className="text-right font-medium text-[color:var(--text-main)]">
              {confirmation.phone}
            </dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="shrink-0 text-[color:var(--text-soft)]">Experience</dt>
            <dd className="text-right font-medium text-[color:var(--text-main)]">
              {experienceText}
            </dd>
          </div>
          <div className="flex justify-between gap-4 py-3 last:pb-0">
            <dt className="shrink-0 text-[color:var(--text-soft)]">Amount paid</dt>
            <dd className="text-right font-medium text-[color:var(--text-main)]">
              ₹{TICKET_PRICE_INR.toLocaleString("en-IN")}
            </dd>
          </div>
        </dl>
      </SectionCard>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() =>
            downloadWorkshopIcs({
              attendeeName: confirmation.name,
              referenceId: confirmation.id,
            })
          }
          className="btn-secondary !px-5 !py-3 !text-sm sm:flex-1"
        >
          <CalendarPlus className="h-4 w-4" />
          Add to calendar
        </button>
        <Link href="/" className="btn-primary !px-5 !py-3 !text-sm text-center sm:flex-1">
          Back to homepage <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
