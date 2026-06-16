import {
  Children,
  cloneElement,
  createRef,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react";
import gsap from "gsap";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  customClass?: string;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, className, ...rest }, ref) => (
    <div ref={ref} {...rest} className={`card ${customClass ?? ""} ${className ?? ""}`.trim()} />
  ),
);
Card.displayName = "Card";

type CardSlot = {
  x: number;
  y: number;
  z: number;
  zIndex: number;
};

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number,
  flat = false,
): CardSlot => ({
  x: flat ? 0 : i * distX,
  y: -i * distY,
  z: flat ? 0 : -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: CardSlot, skew: number, flat = false) =>
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

export type CardSwapHandle = {
  pause: () => void;
  resume: () => void;
  forceResume: () => void;
  bringToFront: (idx: number) => void;
  getFrontIndex: () => number;
};

type CardSwapProps = {
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
  children: ReactNode;
};

type CardElementProps = {
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
};

const CardSwap = forwardRef<CardSwapHandle, CardSwapProps>(function CardSwap(
  {
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
    children,
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

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(() => childArr.map(() => createRef<HTMLDivElement>()), [childArr]);

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const container = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const isManualAnimatingRef = useRef(false);
  const pauseLockRef = useRef(0);
  const swapRef = useRef<() => void>(() => {});

  const clearRotation = useCallback(() => {
    tlRef.current?.kill();
    clearInterval(intervalRef.current);
  }, []);

  const scheduleRotation = useCallback(() => {
    clearInterval(intervalRef.current);
    if (!isPausedRef.current && !isManualAnimatingRef.current) {
      intervalRef.current = window.setInterval(() => swapRef.current(), delay);
    }
  }, [delay]);

  const pause = useCallback(() => {
    pauseLockRef.current += 1;
    isPausedRef.current = true;
    tlRef.current?.pause();
    clearInterval(intervalRef.current);
  }, []);

  const resume = useCallback(() => {
    pauseLockRef.current = Math.max(0, pauseLockRef.current - 1);
    if (pauseLockRef.current > 0) return;
    isPausedRef.current = false;
    scheduleRotation();
  }, [scheduleRotation]);

  const forceResume = useCallback(() => {
    pauseLockRef.current = 0;
    isPausedRef.current = false;
    scheduleRotation();
  }, [scheduleRotation]);

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
      isManualAnimatingRef.current = true;
      clearInterval(intervalRef.current);
      tlRef.current?.kill();

      const tl = gsap.timeline({
        onComplete: () => {
          order.current = newOrder;
          isManualAnimatingRef.current = false;
          scheduleRotation();
          onComplete?.();
        },
      });
      tlRef.current = tl;

      newOrder.forEach((cardIdx, slotIdx) => {
        const el = refs[cardIdx].current;
        if (!el) return;
        const slot = makeSlot(slotIdx, cardDistance, verticalDistance, refs.length, flat);
        const isFront = slotIdx === 0;

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
          isFront ? 0 : slotIdx * 0.06,
        );

        if (popFront && isFront) {
          tl.to(el, { scale: 1, duration: 0.35, ease: "power2.out" });
        }
      });

      return tl;
    },
    [cardDistance, verticalDistance, flat, refs, scheduleRotation, skewAmount],
  );

  const bringToFront = useCallback(
    (targetIdx: number) => {
      if (isManualAnimatingRef.current) return;

      const stackPos = order.current.indexOf(targetIdx);
      if (stackPos <= 0) return;

      const newOrder = [targetIdx, ...order.current.filter((i) => i !== targetIdx)];
      animateToOrder(newOrder, { popFront: true });
    },
    [animateToOrder],
  );

  const getFrontIndex = useCallback(() => order.current[0] ?? 0, []);

  useImperativeHandle(ref, () => ({ pause, resume, forceResume, bringToFront, getFrontIndex }), [
    pause,
    resume,
    forceResume,
    bringToFront,
    getFrontIndex,
  ]);

  useEffect(() => {
    const total = refs.length;
    order.current = Array.from({ length: total }, (_, i) => i);
    refs.forEach((r, i) => {
      if (r.current)
        placeNow(
          r.current,
          makeSlot(i, cardDistance, verticalDistance, total, flat),
          skewAmount,
          flat,
        );
    });

    const swap = () => {
      if (order.current.length < 2 || isPausedRef.current || isManualAnimatingRef.current) return;

      clearInterval(intervalRef.current);

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;

      const tl = gsap.timeline({
        onComplete: () => {
          order.current = [...rest, front];
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
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length, flat);
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
          `promote+=${i * 0.15}`,
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length, flat);
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
    };

    swapRef.current = swap;
    scheduleRotation();

    const node = container.current;
    const handleMouseEnter = () => {
      if (!pauseOnHover) return;
      pause();
    };
    const handleMouseLeave = () => {
      if (!pauseOnHover) return;
      resume();
    };

    node?.addEventListener("mouseenter", handleMouseEnter);
    node?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node?.removeEventListener("mouseenter", handleMouseEnter);
      node?.removeEventListener("mouseleave", handleMouseLeave);
      clearRotation();
    };
  }, [
    cardDistance,
    verticalDistance,
    pauseOnHover,
    skewAmount,
    flat,
    config,
    refs,
    pause,
    resume,
    clearRotation,
    scheduleRotation,
  ]);

  const rendered = childArr.map((child, i) => {
    if (!isValidElement(child)) return child;
    const element = child as ReactElement<CardElementProps>;
    return cloneElement(element, {
      key: i,
      ref: refs[i] as RefObject<HTMLDivElement>,
      style: { width, height, ...(element.props.style ?? {}) },
      "data-card-index": i,
      onClick: (e: React.MouseEvent) => {
        element.props.onClick?.(e);
      },
    });
  });

  return (
    <div
      ref={container}
      className={`card-swap-container${flat ? " card-swap-container--flat" : ""} ${containerClassName ?? ""}`.trim()}
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
});

export default CardSwap;
