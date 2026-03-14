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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof document === "undefined") return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("site-cursor-active");

    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      dot.style.transform = `translate(${mx.current}px, ${my.current}px) translate(-50%, -50%)`;
    };
    document.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      rx.current += (mx.current - rx.current) * 0.1;
      ry.current += (my.current - ry.current) * 0.1;
      ring.style.transform = `translate(${rx.current}px, ${ry.current}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const setHover = (hover: boolean) => {
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

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
      document.body.classList.remove("site-cursor-active");
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div ref={dotRef} className="site-cursor-dot" aria-hidden />
      <div ref={ringRef} className="site-cursor-ring" aria-hidden />
    </>
  );
}
