"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useLandingAnimations(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0.3");
        gsap.to(el, {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none none" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((container) => {
        const children = container.querySelectorAll<HTMLElement>("[data-stagger-item]");
        gsap.fromTo(
          children,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: container,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      const heroTitle = document.querySelector("[data-hero-title]");
      if (heroTitle) {
        gsap.to(heroTitle.querySelectorAll("[data-hero-line]"), {
          yPercent: (i) => -10 - i * 8,
          ease: "none",
          scrollTrigger: {
            trigger: heroTitle,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.to("[data-date-card]", {
        yPercent: -20,
        rotate: -4,
        scrollTrigger: {
          trigger: "[data-date-card]",
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-scale-in]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 95%", toggleActions: "play none none none" },
          },
        );
      });
    }, rootRef);

    const refresh = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(refresh, 300);
    const t2 = window.setTimeout(refresh, 1200);
    window.addEventListener("load", refresh);
    document.querySelectorAll("img").forEach((img) => {
      if (!(img as HTMLImageElement).complete)
        img.addEventListener("load", refresh, { once: true });
    });

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [rootRef]);
}
