import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";

export function ThankYouConfirmation() {
  return (
    <div className="mx-auto w-full max-w-xl text-center">
      <span className="badge-orange mb-5 inline-flex items-center gap-2">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Thank you
      </span>

      <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
        You&apos;re <span className="gradient-text">all set</span>.
      </h1>

      <div className="mx-auto mt-8 max-w-md rounded-[24px] border border-white/10 bg-white/[0.03] p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C88BEF]/15 text-[#C88BEF]">
          <Mail className="h-5 w-5" />
        </div>
        <p className="mt-5 text-base leading-relaxed text-[color:var(--text-muted)] md:text-lg">
          All details have been mailed to you.
        </p>
      </div>

      <Link href="/" className="btn-primary mt-10 inline-flex !px-6 !py-3 !text-sm">
        Back to homepage <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
