import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const CONFIRMATION_COOKIE_NAME = "vpl_confirmation";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export type ConfirmationRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  paymentId: string;
  experience: string;
  linkedin: string;
  issuedAt: number;
};

function getCookieSecret() {
  const secret = process.env.CONFIRMATION_COOKIE_SECRET ?? process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    throw new Error("Confirmation cookie secret is not configured.");
  }
  return secret;
}

export function generateConfirmationId() {
  return `VPL-${randomBytes(4).toString("hex").toUpperCase()}`;
}

function signPayload(payload: string) {
  return createHmac("sha256", getCookieSecret()).update(payload).digest("base64url");
}

export function encodeConfirmationCookie(record: ConfirmationRecord) {
  const payload = Buffer.from(JSON.stringify(record)).toString("base64url");
  return `${payload}.${signPayload(payload)}`;
}

export function decodeConfirmationCookie(
  value: string | undefined | null,
): ConfirmationRecord | null {
  if (!value) return null;

  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;

  const expected = signPayload(payload);
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as ConfirmationRecord;
    if (
      !parsed?.id ||
      !parsed?.name ||
      !parsed?.email ||
      !parsed?.phone ||
      !parsed?.paymentId ||
      !parsed?.experience ||
      typeof parsed.issuedAt !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function confirmationCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  };
}
