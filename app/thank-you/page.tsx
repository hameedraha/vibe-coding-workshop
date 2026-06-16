import { redirect } from "next/navigation";

import { ThankYouConfirmation } from "@/components/thank-you/ThankYouConfirmation";

type ThankYouPageProps = {
  searchParams: Promise<{
    name?: string;
    email?: string;
    phone?: string;
    ref?: string;
    payment?: string;
    experience?: string;
    linkedin?: string;
  }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;

  if (!params.name || !params.email || !params.phone || !params.ref || !params.payment) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,139,239,0.15), transparent 65%)" }}
      />
      <div className="vc-container relative flex min-h-screen items-center justify-center py-24">
        <ThankYouConfirmation
          name={params.name}
          email={params.email}
          phone={params.phone}
          referenceId={params.ref}
          paymentId={params.payment}
          experience={params.experience}
          linkedin={params.linkedin}
        />
      </div>
    </div>
  );
}
