"use client";

import { useEffect, useRef } from "react";

/**
 * WebGL or CSS-based particle/grid background for hero. Placeholder: subtle grid + orbs to match brand.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const step = 80;
      ctx.strokeStyle = "rgba(255,255,255,0.02)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      />
      {/* Ambient orbs (CSS) */}
      <div
        className="absolute w-[500px] h-[500px] -top-24 -right-24 rounded-full pointer-events-none opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(124,131,229,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "pulseGlow 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] -bottom-20 -left-20 rounded-full pointer-events-none opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(6,214,160,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "pulseGlow 6s ease-in-out infinite 2s",
        }}
      />
    </>
  );
}
