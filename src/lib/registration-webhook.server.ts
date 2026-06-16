import type { RegistrationWebhookPayload } from "./registration.schema";

export function getRegistrationWebhookUrl() {
  return process.env.N8N_REGISTRATION_WEBHOOK_URL?.trim() ?? "";
}

export async function sendRegistrationWebhook(payload: RegistrationWebhookPayload) {
  const url = getRegistrationWebhookUrl();
  if (!url) return;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("Registration webhook failed:", response.status, body);
    }
  } catch (error) {
    console.error("Registration webhook error:", error);
  }
}
