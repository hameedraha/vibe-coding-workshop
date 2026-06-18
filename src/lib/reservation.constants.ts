export const TICKET_PRICE_INR = 3499;

export function getRazorpayPaymentPageUrl() {
  return process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_PAGE_URL?.trim() ?? "";
}
