"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("bransol-theme") : null;
    if (saved === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      setIsLight(true);
    }
  }, []);

  function toggle() {
    const html = document.documentElement;
    const nextLight = !isLight;
    if (nextLight) {
      html.setAttribute("data-theme", "light");
      localStorage.setItem("bransol-theme", "light");
    } else {
      html.removeAttribute("data-theme");
      localStorage.setItem("bransol-theme", "dark");
    }
    setIsLight(nextLight);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle flex items-center gap-2 py-[7px] px-[14px] border rounded-none cursor-pointer flex-shrink-0"
      style={{
        borderColor: "var(--border)",
        background: "transparent",
        color: "var(--ter)",
        fontFamily: "var(--font-dm-mono)",
        fontSize: "8px",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
      }}
      aria-label="Toggle theme"
    >
      <div
        className="tt-track w-7 h-[15px] rounded-full border relative flex-shrink-0"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="tt-thumb absolute top-0.5 left-0.5 w-[9px] h-[9px] rounded-full transition-transform duration-200"
          style={{
            background: "var(--chrome)",
            backgroundSize: "300% 300%",
            animation: "cSpin 3s linear infinite",
            transform: isLight ? "translateX(13px)" : "translateX(2px)",
          }}
        />
      </div>
      <span>{isLight ? "Dark" : "Light"}</span>
    </button>
  );
}
