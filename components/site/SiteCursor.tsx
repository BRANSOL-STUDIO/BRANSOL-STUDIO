"use client";

import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR =
  "a, button, .ws-card, .work-card, .expertise-item, .pf-card, .diff-card, .exp-glass-card, .btn-primary, .btn-ghost, .hero-platform-pill, .begin-email, .wss-cta";

export function SiteCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Avoid unnecessary animation work on low-power devices or when the user requests reduced motion.
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const coarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: coarse)")?.matches;

    setEnabled(Boolean(!reduceMotion && !coarsePointer));
  }, []);

  useEffect(() => {
    if (!mounted || !enabled || typeof document === "undefined") return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("site-cursor-active");

    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      dot.style.transform = `translate(${mx.current}px, ${my.current}px) translate(-50%, -50%)`;
      lastMoveAt.current = performance.now();
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };
    document.addEventListener("mousemove", onMove);

    const lastMoveAt = { current: performance.now() };
    const rafRef = { current: 0 as number | 0 };
    const tick = () => {
      rx.current += (mx.current - rx.current) * 0.1;
      ry.current += (my.current - ry.current) * 0.1;
      ring.style.transform = `translate(${rx.current}px, ${ry.current}px) translate(-50%, -50%)`;

      const sinceMove = performance.now() - lastMoveAt.current;
      const dist = Math.hypot(mx.current - rx.current, my.current - ry.current);

      // If the mouse stopped and the ring is close enough, stop the animation loop to save CPU/GPU.
      if (sinceMove > 250 && dist < 0.5) {
        rafRef.current = 0;
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const setHover = (hover: boolean) => {
      document.body.classList.toggle("site-cursor-hover", hover);
      if (hover) {
        dot.style.width = dot.style.height = "14px";
        ring.style.width = ring.style.height = "44px";
        ring.style.borderColor = "rgba(124, 131, 229, 0.5)";
      } else {
        dot.style.width = dot.style.height = "7px";
        ring.style.width = ring.style.height = "30px";
        ring.style.borderColor = "rgba(124, 131, 229, 0.32)";
      }
    };
    const onEnter = (e: MouseEvent) => {
      if ((e.target as Element).closest(HOVER_SELECTOR)) setHover(true);
    };
    const onLeave = (e: MouseEvent) => {
      if (!(e.relatedTarget as Element)?.closest(HOVER_SELECTOR)) setHover(false);
    };
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    const onVisibility = () => {
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      } else if (!document.hidden && !rafRef.current) {
        // Restart the loop only when returning to the tab (mouse may have moved).
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.classList.remove("site-cursor-active");
      document.body.classList.remove("site-cursor-hover");
    };
  }, [mounted, enabled]);

  if (!mounted || !enabled) return null;

  return (
    <>
      <div ref={dotRef} className="site-cursor-dot" aria-hidden />
      <div ref={ringRef} className="site-cursor-ring" aria-hidden />
    </>
  );
}
