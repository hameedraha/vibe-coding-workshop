"use client";

import { useEffect, useState } from "react";

type UseScrollSpyInViewOptions = {
  rootMargin?: string;
  threshold?: number | number[];
};

export function useScrollSpyInView(
  targetId: string,
  { rootMargin = "-10% 0px -15% 0px", threshold = [0, 0.05, 0.15, 0.35] }: UseScrollSpyInViewOptions = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let raf = 0;

    const attach = (element: HTMLElement) => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) setInView(entry.isIntersecting);
        },
        { root: null, rootMargin, threshold },
      );
      observer.observe(element);
    };

    const resolveTarget = () => document.getElementById(targetId);

    const target = resolveTarget();
    if (target) {
      attach(target);
    } else {
      raf = requestAnimationFrame(() => {
        const deferredTarget = resolveTarget();
        if (deferredTarget) attach(deferredTarget);
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [targetId, rootMargin, threshold]);

  return inView;
}
