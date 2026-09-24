"use client";

import { useEffect } from "react";

export function CursorGlow() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const update = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", update);
    return () => window.removeEventListener("pointermove", update);
  }, []);

  return (
    <>
      <div className="cursor-orbit hidden lg:block" aria-hidden="true" />
      <div className="cursor-ring hidden lg:block" aria-hidden="true" />
    </>
  );
}
