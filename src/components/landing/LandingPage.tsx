"use client";

import { ReservationProvider } from "@/components/ReservationWizard";
import {
  EventDetails,
  Audience,
  FAQ,
  Footer,
  Pricing,
  Sponsors,
  WhatYouGetBento,
  WhatYouLearn,
} from "@/components/landing/sections/ContentSections";
import { Hero } from "@/components/landing/sections/Hero";
import { Location } from "@/components/landing/sections/Location";
import { Nav } from "@/components/landing/sections/Nav";
import { SpeakersCardSwap } from "@/components/landing/sections/Speakers";
// import { Testimonials } from "@/components/landing/sections/Testimonials";
import { WhatToBring } from "@/components/landing/sections/WhatToBring";
import { WhyMatters } from "@/components/landing/sections/WhyMatters";

export function LandingPage() {
  return (
    <ReservationProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
        <div className="paper-grain" aria-hidden />
        <div className="relative z-10">
          <Nav />
          <Hero />
          <WhyMatters />
          <SpeakersCardSwap />
          <EventDetails />
          <WhatToBring />
          <WhatYouLearn />
          <WhatYouGetBento />
          <Pricing />
          <Location />
          <Audience />
          {/* <Testimonials /> */}
          <FAQ />
          <Sponsors />
          <Footer />
        </div>
      </div>
    </ReservationProvider>
  );
}
