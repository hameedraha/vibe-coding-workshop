import { z } from "zod";

import { VIBE_EXPERIENCE_OPTIONS } from "./reservation.constants";

const experienceValues = VIBE_EXPERIENCE_OPTIONS.map((o) => o.value) as [
  (typeof VIBE_EXPERIENCE_OPTIONS)[number]["value"],
  ...(typeof VIBE_EXPERIENCE_OPTIONS)[number]["value"][],
];

export const linkedinField = z
  .string()
  .trim()
  .min(1, "LinkedIn URL is required")
  .url("Enter a valid LinkedIn URL");

export const registrationFields = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number")
    .regex(/^[+\d\s-]+$/, "Enter a valid phone number"),
  linkedin: linkedinField,
  experience: z.enum(experienceValues),
});

export const completeReservationFields = registrationFields.extend({
  acceptedTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});

export type RegistrationWebhookPayload = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  experience: string;
  payment_done: boolean;
  payment_id: string;
};
