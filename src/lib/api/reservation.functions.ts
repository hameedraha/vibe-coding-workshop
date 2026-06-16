import { completeReservationFields, registrationFields } from "../registration.schema";

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
  return postJson<typeof parsed, { ok: true; confirmationId: string }>(
    "/api/reservation/complete",
    parsed,
  );
}
