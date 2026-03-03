'use client'
import React, { useRef, useEffect, useCallback } from "react";

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

const useAnimationFrame = (callback: (time: number, delta: number) => void) => {
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  // Store callback in a ref to keep effect stable
  const callbackRef = useRef(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // 1. Define animate inside useEffect as a standard function
    function animate(time: number) {
      if (previousTimeRef.current !== null) {
        const delta = time - previousTimeRef.current;
        callbackRef.current(time, delta);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    }

    // 2. Start the animation
    requestRef.current = requestAnimationFrame(animate);
    
    // 3. Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []); // Empty dependencies
};

interface MarqueeProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  speed?: number;
  vertical?: boolean;
  repeat?: number;
}

function NewArrivalEffect({
  className,
  reverse = false,
  pauseOnHover = true,
  children,
  speed = 40,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const singleContentBlockRef = useRef<HTMLDivElement | null>(null);
  const animX = useRef<number>(0);
  const isPaused = useRef<boolean>(false);

  useAnimationFrame((t, delta) => {
    if (!containerRef.current || !contentRef.current || !singleContentBlockRef.current) return;
    
    if (pauseOnHover && isPaused.current) {
      return;
    }

    const singleContentBlockSize = vertical 
      ? singleContentBlockRef.current.offsetHeight 
      : singleContentBlockRef.current.offsetWidth;

    const contentStyle = window.getComputedStyle(contentRef.current);
    const computedGap = parseFloat(vertical ? contentStyle.rowGap || '0' : contentStyle.columnGap || '0');
    const loopDistance = singleContentBlockSize + computedGap;
    const dx = (speed * delta) / 1000;
    const effectiveDx = reverse ? dx : -dx;
    animX.current += effectiveDx;

    if (Math.abs(animX.current) >= loopDistance) {
      animX.current = animX.current % loopDistance;
    }

    if (vertical) {
      contentRef.current.style.transform = `translateY(${animX.current}px)`;
    } else {
      contentRef.current.style.transform = `translateX(${animX.current}px)`;
    }
  });

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      isPaused.current = true;
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      isPaused.current = false;
    }
  }, [pauseOnHover]);

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        "group flex overflow-hidden p-2 [--gap:2rem] [gap:var(--gap)]" +
          (vertical ? " flex-col" : " flex-row"),
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={contentRef}
        className={cn(
          "flex shrink-0 justify-around [gap:var(--gap)]" +
            (vertical ? " flex-col" : " flex-row")
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div key={i} ref={i === 0 ? singleContentBlockRef : null} className="flex gap-8">
              {children}
            </div>
          ))}
      </div>
    </div>
  );
}

export default NewArrivalEffect;