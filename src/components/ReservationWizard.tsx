"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ExternalLink, Loader2 } from "lucide-react";

import { FloatingReserveButton } from "@/components/FloatingReserveButton";
import { useScrollSpyInView } from "@/hooks/use-scroll-spy-in-view";
import { getRazorpayPaymentPageUrl } from "@/lib/reservation.constants";

type ReservationContextValue = {
  openReservation: () => void;
};

const ReservationContext = createContext<ReservationContextValue | null>(null);

const PRICING_SECTION_ID = "pricing";
const REDIRECT_DELAY_MS = 1200;

function FloatingReserveGate({
  reservationOpen,
  onOpen,
}: {
  reservationOpen: boolean;
  onOpen: () => void;
}) {
  const pricingInView = useScrollSpyInView(PRICING_SECTION_ID);

  return <FloatingReserveButton visible={!reservationOpen && !pricingInView} onClick={onOpen} />;
}

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openReservation = useCallback(() => setOpen(true), []);

  return (
    <ReservationContext.Provider value={{ openReservation }}>
      {children}
      <FloatingReserveGate reservationOpen={open} onOpen={openReservation} />
      <ReservationRedirectModal open={open} onOpenChange={setOpen} />
    </ReservationContext.Provider>
  );
}

export function useOpenReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) {
    throw new Error("useOpenReservation must be used within ReservationProvider");
  }
  return ctx;
}

type ReserveSeatButtonProps = {
  className?: string;
  children: ReactNode;
};

export function ReserveSeatButton({ className = "btn-primary", children }: ReserveSeatButtonProps) {
  const { openReservation } = useOpenReservation();

  return (
    <button type="button" onClick={openReservation} className={className}>
      {children}
    </button>
  );
}

type ReservationRedirectModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function ReservationRedirectModal({ open, onOpenChange }: ReservationRedirectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const paymentPageUrl = getRazorpayPaymentPageUrl();

  useEffect(() => {
    if (!open || !overlayRef.current || !panelRef.current || !paymentPageUrl) return;

    document.body.style.overflow = "hidden";

    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(panelRef.current, { opacity: 0, y: 36, scale: 0.94 });

    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.to(panelRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
        delay: 0.05,
      });
    });

    const redirectTimer = window.setTimeout(() => {
      window.location.assign(paymentPageUrl);
    }, REDIRECT_DELAY_MS);

    return () => {
      window.clearTimeout(redirectTimer);
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [open, paymentPageUrl]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[color:var(--text-main)]/55 backdrop-blur-md"
        aria-hidden
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-title"
        aria-live="polite"
        className="relative z-10 w-full max-w-md rounded-[28px] border border-[color:var(--border)] bg-[color:var(--bg-card)] px-8 py-10 text-center shadow-[0_40px_120px_oklch(0.18_0.008_60/0.18)]"
      >
        {paymentPageUrl ? (
          <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--accent-vermillion)]/10 text-[color:var(--accent-vermillion)]">
              <Loader2 className="h-7 w-7 animate-spin" />
            </div>

            <h2
              id="reservation-title"
              className="mt-6 text-2xl font-extrabold tracking-tight text-[color:var(--text-main)]"
            >
              We&apos;re redirecting you to Razorpay
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">
              Complete your registration and payment on our secure Razorpay page.
            </p>

            <a href={paymentPageUrl} className="btn-primary mt-8 !px-5 !py-2.5 !text-sm">
              Continue to payment
              <ExternalLink className="h-4 w-4" />
            </a>
          </>
        ) : (
          <>
            <h2
              id="reservation-title"
              className="text-2xl font-extrabold tracking-tight text-[color:var(--text-main)]"
            >
              Payment link unavailable
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">
              Set{" "}
              <code className="rounded bg-[color:var(--bg-section)] px-1.5 py-0.5 text-[color:var(--text-main)]">
                NEXT_PUBLIC_RAZORPAY_PAYMENT_PAGE_URL
              </code>{" "}
              in your environment and try again.
            </p>
          </>
        )}

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="btn-secondary mt-6 !border-transparent !px-4 !py-2 !text-xs !font-medium text-[color:var(--text-soft)] hover:!bg-transparent hover:!text-[color:var(--text-main)]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
