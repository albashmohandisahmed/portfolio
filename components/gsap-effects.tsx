"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function GsapEffects() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const stage = document.querySelector(".gsap-stage");
    const reveals = document.querySelectorAll(".gsap-reveal");
    if (!stage || reveals.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        reveals,
        { autoAlpha: 0, y: 42 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: stage, start: "top 78%" } }
      );
    });
    return () => ctx.revert();
  }, []);
  return null;
}
