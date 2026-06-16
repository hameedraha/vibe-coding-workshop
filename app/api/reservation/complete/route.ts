import { NextResponse } from "next/server";

import { completeReservationFields } from "@/lib/registration.schema";
import { sendRegistrationWebhook } from "@/lib/registration-webhook.server";
import { verifyRazorpaySignature } from "@/lib/razorpay.server";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = completeReservationFields.parse(json);

    const isValid = verifyRazorpaySignature(
      data.razorpayOrderId,
      data.razorpayPaymentId,
      data.razorpaySignature,
    );
    if (!isValid) {
      return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
    }

    await sendRegistrationWebhook({
      name: data.name,
      email: data.email,
      phone: data.phone,
      linkedin: data.linkedin,
      experience: data.experience,
      payment_done: true,
      payment_id: data.razorpayPaymentId,
    });

    const referenceId = `VPL-${data.razorpayPaymentId.slice(-8).toUpperCase()}`;

    return NextResponse.json({
      ok: true as const,
      referenceId,
      paymentId: data.razorpayPaymentId,
      confirmation: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        linkedin: data.linkedin,
        experience: data.experience,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to complete reservation.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
