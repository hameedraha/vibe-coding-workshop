type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: { color?: string };
  handler: (response: RazorpaySuccessResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => {
      open: () => void;
      on: (event: string, handler: (response: { error: { description: string } }) => void) => void;
    };
  }
}

export function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existing = document.getElementById("razorpay-checkout-js");
    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-checkout-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export type OpenRazorpayCheckoutInput = {
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
  name: string;
  email: string;
  phone: string;
  onSuccess: (response: RazorpaySuccessResponse) => void | Promise<void>;
  onDismiss?: () => void;
};

export async function openRazorpayCheckout(input: OpenRazorpayCheckoutInput) {
  const loaded = await loadRazorpayScript();
  if (!loaded || !window.Razorpay) {
    throw new Error("Unable to load Razorpay checkout.");
  }

  return new Promise<void>((resolve, reject) => {
    const rzp = new window.Razorpay!({
      key: input.keyId,
      amount: input.amount,
      currency: input.currency,
      name: "Vibe Coding: The Right Way",
      description: "General Admission — Workshop Seat",
      order_id: input.orderId,
      prefill: {
        name: input.name,
        email: input.email,
        contact: input.phone.replace(/\s/g, ""),
      },
      theme: { color: "#C88BEF" },
      handler: (response) => {
        void Promise.resolve(input.onSuccess(response)).then(() => resolve());
      },
      modal: {
        ondismiss: () => {
          input.onDismiss?.();
          resolve();
        },
      },
    });

    rzp.on("payment.failed", (response) => {
      reject(new Error(response.error.description || "Payment failed. Please try again."));
    });

    rzp.open();
  });
}
