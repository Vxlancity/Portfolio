"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function ContactFx() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Pre-set initial states to prevent flash
      gsap.set("[data-contact='eyebrow']", { y: 16, opacity: 0 });
      gsap.set("[data-contact='char']", { yPercent: 110 });
      gsap.set("[data-contact='item']", { y: 24, opacity: 0 });

      gsap.to("[data-contact='eyebrow']", {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.to("[data-contact='char']", {
        yPercent: 0,
        stagger: 0.05,
        duration: 1.0,
        delay: 0.1,
        ease: "power4.out",
      });

      gsap.to("[data-contact='item']", {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.8,
        delay: 0.35,
        ease: "power3.out",
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return null;
}
