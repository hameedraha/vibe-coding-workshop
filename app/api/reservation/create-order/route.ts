import { NextResponse } from "next/server";

import { registrationFields } from "@/lib/registration.schema";
import { getRazorpayClient, getRazorpayConfig, getTicketAmountPaise } from "@/lib/razorpay.server";

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
        linkedin: data.linkedin,
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
