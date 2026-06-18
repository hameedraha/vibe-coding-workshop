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
      <div className="paper-grain" aria-hidden />

      <header className="relative border-b border-[color:var(--border)]">
        <div className="vc-container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-[color:var(--accent-vermillion)] flex items-center justify-center">
              <span className="font-display font-bold text-[color:var(--bg-main)] text-xs">V</span>
            </div>
            <span className="text-sm font-bold tracking-tight text-[color:var(--text-main)]">
              Vibe Coding
            </span>
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
