import { z } from "zod";

import { VIBE_EXPERIENCE_OPTIONS } from "../reservation.constants";

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

const completeReservationFields = registrationFields.extend({
  acceptedTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});

async function postJson<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => null)) as
    | { error?: string }
    | TResponse
    | null;
  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "error" in payload && payload.error
        ? payload.error
        : "Request failed.";
    throw new Error(message);
  }
  return payload as TResponse;
}

export async function createRazorpayOrder({ data }: { data: unknown }) {
  const parsed = registrationFields.parse(data);
  return postJson<
    typeof parsed,
    { keyId: string; orderId: string; amount: number; currency: string }
  >("/api/reservation/create-order", parsed);
}

export async function completeReservation({ data }: { data: unknown }) {
  const parsed = completeReservationFields.parse(data);
  return postJson<typeof parsed, { ok: true; referenceId: string }>(
    "/api/reservation/complete",
    parsed,
  );
}
