"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import gsap from "gsap";

type CardSlot = {
  x: number;
  y: number;
  z: number;
  zIndex: number;
};

const makeSlot = (
  stackIndex: number,
  distX: number,
  distY: number,
  total: number,
  flat = false,
): CardSlot => ({
  x: flat ? 0 : stackIndex * distX,
  y: -stackIndex * distY,
  z: flat ? 0 : -stackIndex * distX * 1.5,
  zIndex: total - stackIndex,
});

const placeNow = (el: HTMLElement, slot: CardSlot, skew: number, flat = false) => {
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    scale: 1,
    xPercent: -50,
    yPercent: -50,
    skewY: flat ? 0 : skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: !flat,
  });
};

export type CardSwapHandle = {
  pause: () => void;
  resume: () => void;
  forceResume: () => void;
  bringToFront: (idx: number) => void;
  getFrontIndex: () => number;
};

type CardSwapProps = {
  count: number;
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  skewAmount?: number;
  flat?: boolean;
  easing?: "linear" | "elastic";
  containerClassName?: string;
  renderCard: (index: number) => ReactNode;
  renderTab: (index: number, isActive: boolean) => ReactNode;
  getCardClassName?: (index: number) => string;
  onFrontClick?: (index: number) => void;
};

const CardSwap = forwardRef<CardSwapHandle, CardSwapProps>(function CardSwap(
  {
    count,
    width = 500,
    height = 400,
    cardDistance = 60,
    verticalDistance = 70,
    delay = 5000,
    pauseOnHover = false,
    skewAmount = 6,
    flat = false,
    easing = "elastic",
    containerClassName,
    renderCard,
    renderTab,
    getCardClassName,
    onFrontClick,
  },
  ref,
) {
  const config = useMemo(
    () =>
      easing === "elastic"
        ? {
            ease: "elastic.out(0.6,0.9)",
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05,
          }
        : {
            ease: "power1.inOut",
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2,
          },
    [easing],
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orderRef = useRef<number[]>(Array.from({ length: count }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const pausedRef = useRef(false);
  const manualAnimRef = useRef(false);
  const pauseLockRef = useRef(0);

  const [frontIndex, setFrontIndex] = useState(0);

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    [],
  );

  const clearRotation = useCallback(() => {
    tlRef.current?.kill();
    window.clearInterval(intervalRef.current);
  }, []);

  const scheduleRotation = useCallback(() => {
    window.clearInterval(intervalRef.current);
    if (!pausedRef.current && !manualAnimRef.current && count > 1) {
      intervalRef.current = window.setInterval(() => {
        swapRef.current();
      }, delay);
    }
  }, [count, delay]);

  const syncFrontIndex = useCallback((order: number[]) => {
    setFrontIndex(order[0] ?? 0);
  }, []);

  const applyLayout = useCallback(
    (order: number[]) => {
      order.forEach((cardIndex, stackIndex) => {
        const el = cardRefs.current[cardIndex];
        if (!el) return;
        placeNow(
          el,
          makeSlot(stackIndex, cardDistance, verticalDistance, count, flat),
          skewAmount,
          flat,
        );
      });
    },
    [cardDistance, verticalDistance, count, flat, skewAmount],
  );

  const animateToOrder = useCallback(
    (
      newOrder: number[],
      {
        duration = 0.85,
        ease = "power3.inOut",
        popFront = false,
        onComplete,
      }: {
        duration?: number;
        ease?: string;
        popFront?: boolean;
        onComplete?: () => void;
      } = {},
    ) => {
      manualAnimRef.current = true;
      clearRotation();
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          orderRef.current = newOrder;
          syncFrontIndex(newOrder);
          manualAnimRef.current = false;
          scheduleRotation();
          onComplete?.();
        },
      });
      tlRef.current = tl;

      newOrder.forEach((cardIndex, stackIndex) => {
        const el = cardRefs.current[cardIndex];
        if (!el) return;
        const slot = makeSlot(stackIndex, cardDistance, verticalDistance, count, flat);
        const isFront = stackIndex === 0;

        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            skewY: flat ? 0 : skewAmount,
            zIndex: slot.zIndex,
            scale: popFront && isFront ? 1.03 : 1,
            duration,
            ease,
          },
          isFront ? 0 : stackIndex * 0.06,
        );

        if (popFront && isFront) {
          tl.to(el, { scale: 1, duration: 0.35, ease: "power2.out" });
        }
      });
    },
    [
      cardDistance,
      verticalDistance,
      count,
      flat,
      scheduleRotation,
      skewAmount,
      syncFrontIndex,
      clearRotation,
    ],
  );

  const swapRef = useRef<() => void>(() => {});

  const runAutoSwap = useCallback(() => {
    const order = orderRef.current;
    if (order.length < 2 || pausedRef.current || manualAnimRef.current) return;

    clearRotation();

    const [front, ...rest] = order;
    const elFront = cardRefs.current[front];
    if (!elFront) return;

    const tl = gsap.timeline({
      onComplete: () => {
        const newOrder = [...rest, front];
        orderRef.current = newOrder;
        syncFrontIndex(newOrder);
        scheduleRotation();
      },
    });
    tlRef.current = tl;

    tl.to(elFront, {
      y: "+=500",
      duration: config.durDrop,
      ease: config.ease,
    });

    tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((cardIndex, stackIndex) => {
      const el = cardRefs.current[cardIndex];
      if (!el) return;
      const slot = makeSlot(stackIndex, cardDistance, verticalDistance, count, flat);
      tl.set(el, { zIndex: slot.zIndex }, "promote");
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          skewY: flat ? 0 : skewAmount,
          duration: config.durMove,
          ease: config.ease,
        },
        `promote+=${stackIndex * 0.15}`,
      );
    });

    const backSlot = makeSlot(count - 1, cardDistance, verticalDistance, count, flat);
    tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
    tl.call(
      () => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      },
      undefined,
      "return",
    );
    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        skewY: flat ? 0 : skewAmount,
        duration: config.durReturn,
        ease: config.ease,
      },
      "return",
    );
  }, [
    cardDistance,
    verticalDistance,
    count,
    flat,
    skewAmount,
    config,
    clearRotation,
    scheduleRotation,
    syncFrontIndex,
  ]);

  swapRef.current = runAutoSwap;

  const pause = useCallback(() => {
    pauseLockRef.current += 1;
    pausedRef.current = true;
    tlRef.current?.pause();
    clearRotation();
  }, [clearRotation]);

  const resume = useCallback(() => {
    pauseLockRef.current = Math.max(0, pauseLockRef.current - 1);
    if (pauseLockRef.current > 0) return;
    pausedRef.current = false;
    scheduleRotation();
  }, [scheduleRotation]);

  const forceResume = useCallback(() => {
    pauseLockRef.current = 0;
    pausedRef.current = false;
    scheduleRotation();
  }, [scheduleRotation]);

  const bringToFront = useCallback(
    (targetIdx: number) => {
      const stackPos = orderRef.current.indexOf(targetIdx);
      if (stackPos <= 0) return;

      const newOrder = [targetIdx, ...orderRef.current.filter((i) => i !== targetIdx)];
      setFrontIndex(targetIdx);
      animateToOrder(newOrder, { popFront: true });
    },
    [animateToOrder],
  );

  const getFrontIndex = useCallback(() => orderRef.current[0] ?? 0, []);

  useImperativeHandle(ref, () => ({ pause, resume, forceResume, bringToFront, getFrontIndex }), [
    pause,
    resume,
    forceResume,
    bringToFront,
    getFrontIndex,
  ]);

  const prevCountRef = useRef(count);

  useLayoutEffect(() => {
    if (prevCountRef.current !== count) {
      orderRef.current = Array.from({ length: count }, (_, i) => i);
      prevCountRef.current = count;
      syncFrontIndex(orderRef.current);
    }
    cardRefs.current = cardRefs.current.slice(0, count);
    applyLayout(orderRef.current);
  }, [count, applyLayout, syncFrontIndex]);

  useEffect(() => {
    scheduleRotation();

    const node = containerRef.current;
    const onEnter = () => pauseOnHover && pause();
    const onLeave = () => pauseOnHover && resume();

    node?.addEventListener("mouseenter", onEnter);
    node?.addEventListener("mouseleave", onLeave);

    return () => {
      node?.removeEventListener("mouseenter", onEnter);
      node?.removeEventListener("mouseleave", onLeave);
      clearRotation();
    };
  }, [scheduleRotation, pauseOnHover, pause, resume, clearRotation]);

  const handleCardClick = useCallback(
    (index: number) => {
      const isFront = orderRef.current[0] === index;
      if (isFront) {
        onFrontClick?.(index);
        return;
      }
      bringToFront(index);
    },
    [bringToFront, onFrontClick],
  );

  return (
    <div className="card-swap-root">
      <div className="card-swap-tabs" aria-label="Select instructor">
        {Array.from({ length: count }, (_, index) => {
          const isActive = frontIndex === index;
          return (
            <button
              key={index}
              type="button"
              className={`card-swap-tab${isActive ? " card-swap-tab--active" : ""}`}
              aria-pressed={isActive}
              onClick={() => {
                if (isActive) {
                  onFrontClick?.(index);
                  return;
                }
                bringToFront(index);
              }}
            >
              {renderTab(index, isActive)}
            </button>
          );
        })}
      </div>

      <div
        ref={containerRef}
        className={`card-swap-container${flat ? " card-swap-container--flat" : ""} ${containerClassName ?? ""}`.trim()}
        style={{ width, height }}
      >
        {Array.from({ length: count }, (_, index) => {
          const isFront = frontIndex === index;
          return (
            <div
              key={index}
              ref={setCardRef(index)}
              role="button"
              tabIndex={isFront ? 0 : -1}
              data-card-index={index}
              style={{ width, height }}
              className={`card ${getCardClassName?.(index) ?? ""} cursor-pointer shadow-[0_24px_80px_rgba(0,0,0,0.45)]`.trim()}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a, button")) return;
                handleCardClick(index);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(index);
                }
              }}
            >
              <div className="card-inner">{renderCard(index)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default CardSwap;
