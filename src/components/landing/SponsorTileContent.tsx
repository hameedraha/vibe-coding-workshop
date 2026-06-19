"use client";

import { useState } from "react";

import type { Sponsor } from "@/components/landing/data";

export function SponsorTileContent({ sponsor }: { sponsor: Sponsor }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = Boolean(sponsor.logo) && !logoFailed;

  if (!showLogo) {
    return (
      <span className="px-2 text-center text-sm font-semibold leading-tight text-[color:var(--text-muted)] transition-colors group-hover:text-[color:var(--text-main)]">
        {sponsor.name}
      </span>
    );
  }

  return (
    <img
      src={sponsor.logo}
      alt={`${sponsor.name} logo`}
      loading="lazy"
      className={
        sponsor.logoClass ??
        "h-8 w-auto max-w-[120px] object-contain opacity-70 transition-opacity group-hover:opacity-100"
      }
      onError={() => setLogoFailed(true)}
    />
  );
}
