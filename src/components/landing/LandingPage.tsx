"use client";

import { useRef } from "react";

import { ReservationProvider } from "@/components/ReservationWizard";
import {
  EventDetails,
  Audience,
  Footer,
  Pricing,
  Sponsors,
  WhatYouGetBento,
  WhatYouLearn,
  WhyMatters,
} from "@/components/landing/sections/ContentSections";
import { Hero } from "@/components/landing/sections/Hero";
import { Nav } from "@/components/landing/sections/Nav";
import { SpeakersCardSwap } from "@/components/landing/sections/Speakers";
import { Testimonials } from "@/components/landing/sections/Testimonials";
import { useLandingAnimations } from "@/components/landing/useLandingAnimations";

export function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useLandingAnimations(rootRef);

  return (
    <ReservationProvider>
      <div ref={rootRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Nav />
        <Hero />
        <WhyMatters />
        <EventDetails />
        <WhatYouLearn />
        <WhatYouGetBento />
        <SpeakersCardSwap />
        <Audience />
        <Pricing />
        <Testimonials />
        <Sponsors />
        <Footer />
      </div>
    </ReservationProvider>
  );
}
