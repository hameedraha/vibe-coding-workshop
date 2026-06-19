export const TICKET_PRICE_INR = 3499;

export const LOVABLE_CREDITS_VALUE_INR = 7000;
export const SAYABOUTUS_CREDITS_VALUE_INR = 8500;
export const PARTNER_CREDITS_TOTAL_VALUE_INR =
  LOVABLE_CREDITS_VALUE_INR + SAYABOUTUS_CREDITS_VALUE_INR;

/** Rounded up to nearest 0.5× for pricing callout copy */
export const PARTNER_CREDITS_VALUE_MULTIPLIER =
  Math.ceil((PARTNER_CREDITS_TOTAL_VALUE_INR / TICKET_PRICE_INR) * 2) / 2;

export function getRazorpayPaymentPageUrl() {
  return process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_PAGE_URL?.trim() ?? "";
}
