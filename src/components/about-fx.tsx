"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function AboutFx() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-about='eyebrow']", {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      // Animate the whole title block – no overflow clipping
      gsap.from("[data-about='title']", {
        y: 48,
        opacity: 0,
        duration: 1.0,
        delay: 0.05,
        ease: "power4.out",
      });

      gsap.from("[data-about='item']", {
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
