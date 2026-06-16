"use client";

import { ArrowRight, CalendarPlus, CheckCircle2, Mail, MapPin } from "lucide-react";
import Link from "next/link";

import { WORKSHOP_EVENT } from "@/lib/event.constants";
import { downloadWorkshopIcs } from "@/lib/ics";
import { VIBE_EXPERIENCE_OPTIONS } from "@/lib/reservation.constants";

type ThankYouConfirmationProps = {
  name: string;
  email: string;
  phone: string;
  referenceId: string;
  paymentId: string;
  experience?: string;
  linkedin?: string;
};

function experienceLabel(value?: string) {
  if (!value) return null;
  return VIBE_EXPERIENCE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function ThankYouConfirmation({
  name,
  email,
  phone,
  referenceId,
  paymentId,
  experience,
  linkedin,
}: ThankYouConfirmationProps) {
  const firstName = name.split(" ")[0] || "there";
  const experienceText = experienceLabel(experience);

  return (
    <div className="glass-card w-full max-w-2xl rounded-[28px] p-8 text-left md:p-12">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full gradient-bg">
          <CheckCircle2 className="h-8 w-8 text-[#050505]" strokeWidth={2.5} />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight md:text-4xl">
          You&apos;re in, {firstName}!
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[color:var(--text-muted)]">
          Payment confirmed. Your seat for{" "}
          <strong className="text-white">{WORKSHOP_EVENT.title}</strong> is reserved.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5 md:p-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--text-soft)]">
          Registration confirmation
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
              Name
            </dt>
            <dd className="mt-1 text-sm font-medium text-white">{name}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
              Email
            </dt>
            <dd className="mt-1 text-sm font-medium text-white">{email}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
              Phone
            </dt>
            <dd className="mt-1 text-sm font-medium text-white">{phone}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
              Reference
            </dt>
            <dd className="mt-1 font-mono text-sm font-medium text-white">{referenceId}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
              Payment ID
            </dt>
            <dd className="mt-1 break-all font-mono text-sm font-medium text-white">{paymentId}</dd>
          </div>
          {experienceText ? (
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
                Experience level
              </dt>
              <dd className="mt-1 text-sm font-medium text-white">{experienceText}</dd>
            </div>
          ) : null}
          {linkedin ? (
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
                LinkedIn
              </dt>
              <dd className="mt-1 text-sm font-medium text-white">
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#BDEEFF] underline-offset-2 hover:underline"
                >
                  {linkedin}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--text-soft)]">
          Event details
        </h2>
        <div className="mt-4 space-y-3 text-sm text-[color:var(--text-muted)]">
          <p className="flex items-start gap-2.5">
            <CalendarPlus className="mt-0.5 h-4 w-4 shrink-0 text-[#C88BEF]" />
            <span>{WORKSHOP_EVENT.displayWhen}</span>
          </p>
          <p className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#BDEEFF]" />
            <span>{WORKSHOP_EVENT.displayWhere}</span>
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={() => downloadWorkshopIcs({ attendeeName: name, referenceId })}
          className="btn-secondary !py-3 !px-5 !text-sm"
        >
          <CalendarPlus className="h-4 w-4" />
          Add to calendar (.ics)
        </button>
        <Link href="/" className="btn-primary !py-3 !px-5 !text-sm text-center">
          Back to homepage <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-[color:var(--text-soft)]">
        <Mail className="h-4 w-4 shrink-0" />A confirmation email will be sent to {email} shortly.
      </p>
    </div>
  );
}
