import { NextResponse } from "next/server";
import { z } from "zod";

import { VIBE_EXPERIENCE_OPTIONS } from "@/lib/reservation.constants";
import { verifyRazorpaySignature } from "@/lib/razorpay.server";

const experienceValues = VIBE_EXPERIENCE_OPTIONS.map((o) => o.value) as [
  (typeof VIBE_EXPERIENCE_OPTIONS)[number]["value"],
  ...(typeof VIBE_EXPERIENCE_OPTIONS)[number]["value"][],
];

const completeFields = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number")
    .regex(/^[+\d\s-]+$/, "Enter a valid phone number"),
  experience: z.enum(experienceValues),
  acceptedTerms: z.literal(true),
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = completeFields.parse(json);

    const isValid = verifyRazorpaySignature(
      data.razorpayOrderId,
      data.razorpayPaymentId,
      data.razorpaySignature,
    );
    if (!isValid) {
      return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
    }

    const referenceId = `VPL-${data.razorpayPaymentId.slice(-8).toUpperCase()}`;
    return NextResponse.json({ ok: true as const, referenceId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to complete reservation.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
