import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";

import { ThankYouConfirmation } from "@/components/thank-you/ThankYouConfirmation";
import {
  CONFIRMATION_COOKIE_NAME,
  decodeConfirmationCookie,
} from "@/lib/confirmation-cookie.server";

export const dynamic = "force-dynamic";

export default async function ThankYouPage() {
  const cookieStore = await cookies();
  const confirmation = decodeConfirmationCookie(cookieStore.get(CONFIRMATION_COOKIE_NAME)?.value);

  if (!confirmation) {
    redirect("/");
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="hero-bg absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(200,139,239,0.2), transparent 70%)" }}
      />

      <header className="relative border-b border-white/10">
        <div className="vc-container flex h-16 items-center justify-between">
          <Link href="/" className="text-sm font-bold tracking-[0.18em] uppercase text-white/80">
            Vibe Coding
          </Link>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-soft)]">
            Confirmation
          </span>
        </div>
      </header>

      <main className="relative">
        <div className="vc-container py-12 md:py-16 lg:py-20">
          <ThankYouConfirmation confirmation={confirmation} />
        </div>
      </main>
    </div>
  );
}
