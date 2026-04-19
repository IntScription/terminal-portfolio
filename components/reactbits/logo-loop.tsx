"use client";

import Image from "next/image";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type LogoNodeItem = {
  node: React.ReactNode;
  title?: string;
  href?: string;
  ariaLabel?: string;
};

type LogoImageItem = {
  src: string;
  alt?: string;
  href?: string;
  title?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

export type LogoItem = LogoNodeItem | LogoImageItem;

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
};

const MIN_COPIES = 2;
const COPY_HEADROOM = 2;
const SMOOTH_TAU = 0.25;

const toCssLength = (value?: number | string) =>
  typeof value === "number" ? `${value}px` : value ?? undefined;

function debounce<T extends (...args: any[]) => void>(fn: T, wait: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 60,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = "Technology logos",
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const seqRef = useRef<HTMLUListElement | null>(null);

  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const measuredSeqSizeRef = useRef(0);
  const copyCountRef = useRef(MIN_COPIES);

  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const isVertical = direction === "up" || direction === "down";

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    let directionMultiplier: number;

    if (isVertical) {
      directionMultiplier = direction === "up" ? 1 : -1;
    } else {
      directionMultiplier = direction === "left" ? 1 : -1;
    }

    const speedMultiplier = speed < 0 ? -1 : 1;
    return magnitude * directionMultiplier * speedMultiplier;
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const container = containerRef.current;
    const seq = seqRef.current;
    if (!container || !seq) return;

    const seqRect = seq.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const seqSize = isVertical ? seqRect.height : seqRect.width;
    const containerSize = isVertical ? containerRect.height : containerRect.width;

    if (seqSize <= 0 || containerSize <= 0) return;

    measuredSeqSizeRef.current = Math.ceil(seqSize);

    const neededCopies = Math.max(
      MIN_COPIES,
      Math.ceil(containerSize / seqSize) + COPY_HEADROOM
    );

    if (copyCountRef.current !== neededCopies) {
      copyCountRef.current = neededCopies;
      setCopyCount(neededCopies);
    }
  }, [isVertical]);

  useEffect(() => {
    const debounced = debounce(updateDimensions, 60);

    if (!window.ResizeObserver) {
      window.addEventListener("resize", debounced);
      debounced();
      return () => window.removeEventListener("resize", debounced);
    }

    const observers: ResizeObserver[] = [];
    [containerRef.current, seqRef.current].forEach((el) => {
      if (!el) return;
      const observer = new ResizeObserver(() => debounced());
      observer.observe(el);
      observers.push(observer);
    });

    debounced();

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [updateDimensions, logos, gap, logoHeight]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target =
        isHovered && effectiveHoverSpeed !== undefined
          ? effectiveHoverSpeed
          : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      const seqSize = measuredSeqSizeRef.current;
      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;

        track.style.transform = isVertical
          ? `translate3d(0, ${-nextOffset}px, 0)`
          : `translate3d(${-nextOffset}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimestampRef.current = null;
    };
  }, [effectiveHoverSpeed, isHovered, isVertical, targetVelocity]);

  const cssVariables = useMemo(
    () =>
      ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : {}),
      }) as React.CSSProperties,
    [gap, logoHeight, fadeOutColor]
  );

  const rootClassName = useMemo(
    () =>
      [
        "logoloop",
        isVertical ? "logoloop--vertical" : "logoloop--horizontal",
        fadeOut && "logoloop--fade",
        scaleOnHover && "logoloop--scale-hover",
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [className, fadeOut, isVertical, scaleOnHover]
  );

  const renderLogoItem = useCallback(
    (item: LogoItem, key: React.Key) => {
      if (renderItem) {
        return (
          <li className="logoloop__item" key={key} role="listitem">
            {renderItem(item, key)}
          </li>
        );
      }

      const isNodeItem = "node" in item;

      const content = isNodeItem ? (
        <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
          {item.node}
        </span>
      ) : (
        <Image
          src={item.src}
          alt={item.alt ?? ""}
          title={item.title}
          width={item.width ?? 120}
          height={item.height ?? logoHeight}
          sizes={item.sizes ?? "(max-width: 768px) 120px, 160px"}
          className="logoloop__image"
          draggable={false}
        />
      );

      const label = isNodeItem
        ? item.ariaLabel ?? item.title
        : item.alt ?? item.title;

      const wrapped =
        "href" in item && item.href ? (
          <a
            className="logoloop__link"
            href={item.href}
            aria-label={label || "logo link"}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        );

      return (
        <li className="logoloop__item" key={key} role="listitem">
          {wrapped}
        </li>
      );
    },
    [renderItem, logoHeight]
  );

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className="logoloop__list"
          key={`copy-${copyIndex}`}
          role="list"
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, itemIndex) =>
            renderLogoItem(item, `${copyIndex}-${itemIndex}`)
          )}
        </ul>
      )),
    [copyCount, logos, renderLogoItem]
  );

  const containerStyle = useMemo(
    () => ({
      width: isVertical
        ? toCssLength(width) === "100%"
          ? undefined
          : toCssLength(width)
        : toCssLength(width) ?? "100%",
      ...cssVariables,
      ...style,
    }),
    [cssVariables, isVertical, style, width]
  );

  return (
    <>
      <div
        ref={containerRef}
        className={rootClassName}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
      >
        <div
          className="logoloop__track"
          ref={trackRef}
          onMouseEnter={() => {
            if (effectiveHoverSpeed !== undefined) setIsHovered(true);
          }}
          onMouseLeave={() => {
            if (effectiveHoverSpeed !== undefined) setIsHovered(false);
          }}
        >
          {logoLists}
        </div>
      </div>

      <style jsx global>{`
        .logoloop {
          position: relative;
          --logoloop-gap: 32px;
          --logoloop-logoHeight: 28px;
          --logoloop-fadeColorAuto: #ffffff;
        }

        .logoloop--vertical {
          height: 100%;
          display: inline-block;
        }

        .logoloop--scale-hover {
          padding-top: calc(var(--logoloop-logoHeight) * 0.1);
          padding-bottom: calc(var(--logoloop-logoHeight) * 0.1);
        }

        @media (prefers-color-scheme: dark) {
          .logoloop {
            --logoloop-fadeColorAuto: #0b0b0b;
          }
        }

        .logoloop__track {
          display: flex;
          width: max-content;
          will-change: transform;
          user-select: none;
          position: relative;
          z-index: 0;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
        }

        .logoloop--vertical .logoloop__track {
          flex-direction: column;
          height: max-content;
          width: 100%;
        }

        .logoloop__list {
          display: flex;
          align-items: center;
        }

        .logoloop--vertical .logoloop__list {
          flex-direction: column;
        }

        .logoloop__item {
          flex: 0 0 auto;
          margin-right: var(--logoloop-gap);
          font-size: var(--logoloop-logoHeight);
          line-height: 1;
        }

        .logoloop--vertical .logoloop__item {
          margin-right: 0;
          margin-bottom: var(--logoloop-gap);
        }

        .logoloop__item:last-child {
          margin-right: var(--logoloop-gap);
        }

        .logoloop--vertical .logoloop__item:last-child {
          margin-right: 0;
          margin-bottom: var(--logoloop-gap);
        }

        .logoloop__node {
          display: inline-flex;
          align-items: center;
        }

        .logoloop__image {
          height: var(--logoloop-logoHeight);
          width: auto;
          display: block;
          object-fit: contain;
          image-rendering: -webkit-optimize-contrast;
          -webkit-user-drag: none;
          pointer-events: none;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logoloop--scale-hover .logoloop__item {
          overflow: visible;
        }

        .logoloop--scale-hover .logoloop__item:hover .logoloop__image,
        .logoloop--scale-hover .logoloop__item:hover .logoloop__node {
          transform: scale(1.2);
          transform-origin: center center;
        }

        .logoloop--scale-hover .logoloop__node {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logoloop__link {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          border-radius: 4px;
          transition: opacity 0.2s ease;
        }

        .logoloop__link:hover {
          opacity: 0.8;
        }

        .logoloop__link:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }

        .logoloop--fade::before,
        .logoloop--fade::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: clamp(28px, 10%, 110px);
          pointer-events: none;
          z-index: 10;
        }

        .logoloop--fade::before {
          left: 0;
          background: linear-gradient(
            to right,
            var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,
            rgba(255, 255, 255, 0.88) 18%,
            rgba(255, 255, 255, 0) 100%
          );
        }

        .logoloop--fade::after {
          right: 0;
          background: linear-gradient(
            to left,
            var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,
            rgba(255, 255, 255, 0.88) 18%,
            rgba(255, 255, 255, 0) 100%
          );
        }

        @media (prefers-color-scheme: dark) {
          .logoloop--fade::before {
            background: linear-gradient(
              to right,
              var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,
              rgba(11, 11, 11, 0.9) 18%,
              rgba(11, 11, 11, 0) 100%
            );
          }

          .logoloop--fade::after {
            background: linear-gradient(
              to left,
              var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,
              rgba(11, 11, 11, 0.9) 18%,
              rgba(11, 11, 11, 0) 100%
            );
          }
        }

        .logoloop--vertical.logoloop--fade::before,
        .logoloop--vertical.logoloop--fade::after {
          left: 0;
          right: 0;
          width: 100%;
          height: clamp(24px, 8%, 120px);
        }

        .logoloop--vertical.logoloop--fade::before {
          top: 0;
          bottom: auto;
          background: linear-gradient(
            to bottom,
            var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        .logoloop--vertical.logoloop--fade::after {
          bottom: 0;
          top: auto;
          background: linear-gradient(
            to top,
            var(--logoloop-fadeColor, var(--logoloop-fadeColorAuto)) 0%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        @media (prefers-reduced-motion: reduce) {
          .logoloop__track {
            transform: translate3d(0, 0, 0) !important;
          }

          .logoloop__image,
          .logoloop__node {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
});

export default LogoLoop;
