import { WORKSHOP_EVENT } from "./event.constants";

function formatIcsUtc(date: Date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function buildWorkshopIcsContent(options?: { attendeeName?: string; referenceId?: string }) {
  const start = new Date(WORKSHOP_EVENT.startIso);
  const end = new Date(WORKSHOP_EVENT.endIso);
  const uid = `vibe-coding-workshop-2026-${options?.referenceId ?? "registration"}@vibeproductlab`;
  const description = [
    WORKSHOP_EVENT.description,
    options?.attendeeName ? `Registered by: ${options.attendeeName}` : null,
    options?.referenceId ? `Reference: ${options.referenceId}` : null,
  ]
    .filter(Boolean)
    .join("\\n\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Vibe Product Lab//Workshop//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatIcsUtc(new Date())}`,
    `DTSTART:${formatIcsUtc(start)}`,
    `DTEND:${formatIcsUtc(end)}`,
    `SUMMARY:${escapeIcsText(WORKSHOP_EVENT.title)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    `LOCATION:${escapeIcsText(WORKSHOP_EVENT.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadWorkshopIcs(options?: { attendeeName?: string; referenceId?: string }) {
  const content = buildWorkshopIcsContent(options);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "vibe-coding-workshop.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
