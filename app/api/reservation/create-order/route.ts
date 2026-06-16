import { NextResponse } from "next/server";
import { z } from "zod";

import { VIBE_EXPERIENCE_OPTIONS } from "@/lib/reservation.constants";
import { getRazorpayClient, getRazorpayConfig, getTicketAmountPaise } from "@/lib/razorpay.server";

const experienceValues = VIBE_EXPERIENCE_OPTIONS.map((o) => o.value) as [
  (typeof VIBE_EXPERIENCE_OPTIONS)[number]["value"],
  ...(typeof VIBE_EXPERIENCE_OPTIONS)[number]["value"][],
];

const registrationFields = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number")
    .regex(/^[+\d\s-]+$/, "Enter a valid phone number"),
  experience: z.enum(experienceValues),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = registrationFields.parse(json);

    const referenceId = `VPL-${Date.now().toString(36).toUpperCase()}`;
    const { keyId } = getRazorpayConfig();
    const razorpay = getRazorpayClient();

    const order = await razorpay.orders.create({
      amount: getTicketAmountPaise(),
      currency: "INR",
      receipt: referenceId,
      notes: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        experience: data.experience,
      },
    });

    return NextResponse.json({
      keyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      referenceId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create order.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
