import { NextResponse } from "next/server";

import {
  confirmationCookieOptions,
  encodeConfirmationCookie,
  generateConfirmationId,
  CONFIRMATION_COOKIE_NAME,
} from "@/lib/confirmation-cookie.server";
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

    const confirmationId = generateConfirmationId();
    const confirmation = {
      id: confirmationId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      paymentId: data.razorpayPaymentId,
      experience: data.experience,
      linkedin: data.linkedin,
      issuedAt: Date.now(),
    };

    const response = NextResponse.json({ ok: true as const, confirmationId });
    response.cookies.set(
      CONFIRMATION_COOKIE_NAME,
      encodeConfirmationCookie(confirmation),
      confirmationCookieOptions(),
    );

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to complete reservation.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
