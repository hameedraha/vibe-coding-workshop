import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  IndianRupee,
  Loader2,
  ShieldAlert,
  X,
} from "lucide-react";

import { completeReservation, createRazorpayOrder } from "@/lib/api/reservation.functions";
import { openRazorpayCheckout } from "@/lib/razorpay";
import {
  PAYMENT_NOTE,
  TERMS_AND_CONDITIONS,
  TICKET_PRICE_INR,
  VIBE_EXPERIENCE_OPTIONS,
  type VibeExperience,
} from "@/lib/reservation.constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FloatingReserveButton } from "@/components/FloatingReserveButton";
import { useScrollSpyInView } from "@/hooks/use-scroll-spy-in-view";

type ReservationContextValue = {
  openReservation: () => void;
};

const ReservationContext = createContext<ReservationContextValue | null>(null);

const PRICING_SECTION_ID = "pricing";

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
      <ReservationWizard open={open} onOpenChange={setOpen} />
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

type StepOneData = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  experience: VibeExperience | "";
};

type ReservationWizardProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function ReservationWizard({ open, onOpenChange }: ReservationWizardProps) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stepContentRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepOne, setStepOne] = useState<StepOneData>({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    experience: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const reset = useCallback(() => {
    setStep(1);
    setSubmitting(false);
    setError(null);
    setStepOne({ name: "", email: "", phone: "", linkedin: "", experience: "" });
    setAcceptedTerms(false);
    closingRef.current = false;
  }, []);

  const handleClose = useCallback(() => {
    if (closingRef.current || !overlayRef.current || !panelRef.current) return;
    closingRef.current = true;

    gsap
      .timeline({
        onComplete: () => {
          onOpenChange(false);
          window.setTimeout(reset, 50);
        },
      })
      .to(panelRef.current, { opacity: 0, y: 28, scale: 0.96, duration: 0.32, ease: "power2.in" })
      .to(overlayRef.current, { opacity: 0, duration: 0.28, ease: "power2.in" }, "-=0.2");
  }, [onOpenChange, reset]);

  useEffect(() => {
    if (!open || !overlayRef.current || !panelRef.current) return;

    closingRef.current = false;
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

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) handleClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [open, handleClose, submitting]);

  useEffect(() => {
    if (!open || !stepContentRef.current) return;

    gsap.fromTo(
      stepContentRef.current,
      { opacity: 0, x: step === 1 ? -18 : 18 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [open, step]);

  const validateStepOne = () => {
    if (stepOne.name.trim().length < 2) return "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stepOne.email.trim()))
      return "Please enter a valid email.";
    if (!/^[+\d\s-]{10,15}$/.test(stepOne.phone.trim()))
      return "Please enter a valid phone number.";
    if (stepOne.linkedin.trim() && !/^https?:\/\/.+/i.test(stepOne.linkedin.trim())) {
      return "Please enter a valid LinkedIn URL.";
    }
    if (!stepOne.experience) return "Please select your vibe coding experience.";
    return null;
  };

  const handleStepOneSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = validateStepOne();
    if (message) {
      setError(message);
      return;
    }
    setError(null);
    setStep(2);
  };

  const handlePayWithRazorpay = async (e: FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setError("Please accept the terms and conditions.");
      return;
    }

    const message = validateStepOne();
    if (message) {
      setError(message);
      setStep(1);
      return;
    }

    setSubmitting(true);
    setError(null);

    const registration = {
      name: stepOne.name.trim(),
      email: stepOne.email.trim(),
      phone: stepOne.phone.trim(),
      linkedin: stepOne.linkedin.trim(),
      experience: stepOne.experience as VibeExperience,
    };

    try {
      const order = await createRazorpayOrder({ data: registration });

      await openRazorpayCheckout({
        keyId: order.keyId,
        orderId: order.orderId,
        amount: Number(order.amount),
        currency: order.currency,
        name: registration.name,
        email: registration.email,
        phone: registration.phone,
        onDismiss: () => setSubmitting(false),
        onSuccess: async (response) => {
          try {
            const result = await completeReservation({
              data: {
                ...registration,
                acceptedTerms: true,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
            });

            closingRef.current = true;
            onOpenChange(false);
            reset();
            const params = new URLSearchParams({
              name: result.confirmation.name,
              email: result.confirmation.email,
              phone: result.confirmation.phone,
              ref: result.referenceId,
              payment: result.paymentId,
              experience: result.confirmation.experience,
            });
            if (result.confirmation.linkedin) {
              params.set("linkedin", result.confirmation.linkedin);
            }
            router.push(`/thank-you?${params.toString()}`);
          } catch {
            setError("Payment received but confirmation failed. Contact us with your payment ID.");
            setSubmitting(false);
          }
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start payment. Please try again.");
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={() => !submitting && handleClose()}
        aria-hidden
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-title"
        className="relative z-10 flex max-h-[94vh] w-full max-w-xl flex-col overflow-hidden rounded-t-[28px] border border-white/10 bg-[#0c0c10] shadow-[0_40px_120px_rgba(0,0,0,0.65)] sm:rounded-[28px]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[color:var(--text-soft)]">
              Step {step} of 2
            </p>
            <h2 id="reservation-title" className="mt-1 text-2xl font-extrabold tracking-tight">
              {step === 1 ? "Reserve your seat" : "Payment & confirmation"}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[color:var(--text-muted)] transition hover:bg-white/5 disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div ref={stepContentRef} className="overflow-y-auto px-6 py-6">
          {step === 1 ? (
            <form id="reservation-step-one" onSubmit={handleStepOneSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="res-name">Full name</Label>
                <input
                  id="res-name"
                  value={stepOne.name}
                  onChange={(e) => setStepOne((s) => ({ ...s, name: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-[#C88BEF]/60"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="res-email">Email</Label>
                <input
                  id="res-email"
                  type="email"
                  value={stepOne.email}
                  onChange={(e) => setStepOne((s) => ({ ...s, email: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-[#C88BEF]/60"
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="res-phone">Phone number</Label>
                <input
                  id="res-phone"
                  type="tel"
                  value={stepOne.phone}
                  onChange={(e) => setStepOne((s) => ({ ...s, phone: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-[#C88BEF]/60"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="res-linkedin">LinkedIn profile (optional)</Label>
                <input
                  id="res-linkedin"
                  type="url"
                  value={stepOne.linkedin}
                  onChange={(e) => setStepOne((s) => ({ ...s, linkedin: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-[#C88BEF]/60"
                  placeholder="https://linkedin.com/in/you"
                  autoComplete="url"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="res-experience">Vibe coding experience</Label>
                <Select
                  value={stepOne.experience || undefined}
                  onValueChange={(value) =>
                    setStepOne((s) => ({ ...s, experience: value as VibeExperience }))
                  }
                >
                  <SelectTrigger
                    id="res-experience"
                    className="h-auto w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm shadow-none outline-none transition focus:border-[#C88BEF]/60 focus:ring-0 data-[placeholder]:text-[color:var(--text-soft)]"
                  >
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent className="z-[250] border-white/10 bg-[#0c0c10] text-white">
                    {VIBE_EXPERIENCE_OPTIONS.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-[color:var(--text-muted)]"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </form>
          ) : (
            <form id="reservation-step-two" onSubmit={handlePayWithRazorpay} className="space-y-5">
              <div className="rounded-2xl border border-[#C88BEF]/30 bg-[#C88BEF]/10 p-4">
                <div className="flex items-start gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[#C88BEF]">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  Important
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-muted)]">
                  Seats are{" "}
                  <strong className="text-white">strictly first come, first served</strong>. Right
                  of admission is reserved — your seat is confirmed only after successful Razorpay
                  payment.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-end gap-2">
                  <IndianRupee className="mb-1 h-6 w-6 text-[#BDEEFF]" />
                  <span className="text-4xl font-black tracking-tight gradient-text">
                    {TICKET_PRICE_INR.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[color:var(--text-soft)]">{PAYMENT_NOTE}</p>

                <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-[color:var(--text-muted)]">
                  <CreditCard className="h-5 w-5 shrink-0 text-[#C88BEF]" />
                  <span>
                    Secure payment via <strong className="text-white">Razorpay</strong> — UPI,
                    cards, netbanking, and wallets accepted.
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--text-soft)]">
                  Terms & conditions
                </div>
                <div className="mt-3 max-h-36 overflow-y-auto whitespace-pre-wrap text-xs leading-relaxed text-[color:var(--text-muted)]">
                  {TERMS_AND_CONDITIONS}
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 px-4 py-3">
                <Checkbox
                  checked={acceptedTerms}
                  onCheckedChange={(v) => setAcceptedTerms(v === true)}
                  className="mt-0.5"
                />
                <span className="text-sm leading-relaxed text-[color:var(--text-muted)]">
                  I have read and agree to the terms and conditions.
                </span>
              </label>
            </form>
          )}

          {error && (
            <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-6 py-5">
          {step === 2 ? (
            <button
              type="button"
              onClick={() => {
                setError(null);
                setStep(1);
              }}
              className="btn-secondary !py-2.5 !px-4 !text-sm"
              disabled={submitting}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step === 1 ? (
            <button
              type="submit"
              form="reservation-step-one"
              className="btn-primary !py-2.5 !px-5 !text-sm"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              form="reservation-step-two"
              className="btn-primary !py-2.5 !px-5 !text-sm"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Processing…
                </>
              ) : (
                <>
                  Pay with Razorpay <CreditCard className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
