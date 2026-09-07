"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function DevBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const grabHandRef = useRef<HTMLDivElement>(null);
  const glueGroupRef = useRef<HTMLDivElement>(null);
  const glueSpot1Ref = useRef<HTMLDivElement>(null);
  const glueSpot2Ref = useRef<HTMLDivElement>(null);
  const glueSpot3Ref = useRef<HTMLDivElement>(null);
  const gooStringsRef = useRef<SVGSVGElement>(null);
  const wiperHandRef = useRef<HTMLDivElement>(null);
  const wipeStreakRef = useRef<HTMLDivElement>(null);
  const sparkle1Ref = useRef<HTMLDivElement>(null);
  const sparkle2Ref = useRef<HTMLDivElement>(null);
  const sparkle3Ref = useRef<HTMLDivElement>(null);
  const sparkleCenterRef = useRef<HTMLDivElement>(null);

  // Entrance slide-in after page load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  const handleDismiss = () => {
    if (isClosing) return;
    setIsClosing(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setDismissed(true);
      },
    });

    // Step 1: Hand reaches in fast from the right and grips the card
    tl.fromTo(
      grabHandRef.current,
      { x: 240, opacity: 0, rotate: 14 },
      {
        x: 15,
        opacity: 1,
        rotate: -3,
        duration: 0.28,
        ease: "back.out(1.4)",
      },
    );

    // Card reacts: squishes physically under the fingers' squeeze
    tl.to(
      cardRef.current,
      {
        scaleY: 0.92,
        scaleX: 0.96,
        rotate: -4,
        duration: 0.12,
        ease: "power2.out",
      },
      "<0.14",
    );

    // Anticipation / windup: hand pulls back slightly to gather force
    tl.to(
      [cardRef.current, grabHandRef.current],
      {
        x: "-=14",
        y: "-=3",
        duration: 0.09,
        ease: "power1.in",
      },
      "+=0.04",
    );

    // Reveal the glue residue and elastic gooey strands right as rip starts
    tl.set(glueGroupRef.current, { opacity: 1 });
    tl.set(gooStringsRef.current, { opacity: 1 });

    // Step 2: VIOLENT YANK! Card and hand are ripped off to the right
    tl.to([cardRef.current, grabHandRef.current], {
      x: 540,
      y: 80,
      rotate: 26,
      opacity: 0,
      duration: 0.36,
      ease: "power4.in",
    });

    // Elastic glue strands stretch dynamically and snap!
    tl.to(
      gooStringsRef.current,
      {
        scaleX: 2.6,
        opacity: 0,
        duration: 0.18,
        ease: "power3.in",
      },
      "<0.02",
    );

    // Sticky glue residue marks pop and wobble on the glass
    tl.fromTo(
      [glueSpot1Ref.current, glueSpot2Ref.current, glueSpot3Ref.current],
      { scale: 0.7, opacity: 0.2 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.24,
        stagger: 0.04,
        ease: "elastic.out(1.4, 0.4)",
      },
      "<0.08",
    );

    // Noticeable pause: the user sees the gooey glue stuck to the screen!
    tl.to({}, { duration: 0.2 });

    // Step 3: Wiper hand with sponge sweeps in from the top-right
    tl.fromTo(
      wiperHandRef.current,
      { x: 190, y: -120, opacity: 0, rotate: 25 },
      {
        x: 45,
        y: -15,
        opacity: 1,
        rotate: -5,
        duration: 0.26,
        ease: "power2.out",
      },
    );

    // Wipe #1: Sweeps across top-left glue residue
    tl.to(wiperHandRef.current, {
      x: -95,
      y: -5,
      rotate: -22,
      duration: 0.22,
      ease: "power1.inOut",
    });
    tl.to(glueSpot1Ref.current, { scale: 0, opacity: 0, duration: 0.12 }, "<0.06");
    tl.fromTo(
      sparkle1Ref.current,
      { scale: 0, opacity: 1, rotate: 0 },
      { scale: 1.5, opacity: 0, rotate: 90, duration: 0.35, ease: "power2.out" },
      "<",
    );

    // Wipe #2: Sweeps down across bottom-left glue residue
    tl.to(wiperHandRef.current, {
      x: -35,
      y: 65,
      rotate: 18,
      duration: 0.22,
      ease: "power1.inOut",
    });
    tl.to(glueSpot2Ref.current, { scale: 0, opacity: 0, duration: 0.12 }, "<0.06");
    tl.fromTo(
      sparkle2Ref.current,
      { scale: 0, opacity: 1, rotate: 0 },
      { scale: 1.5, opacity: 0, rotate: 90, duration: 0.35, ease: "power2.out" },
      "<",
    );

    // Wipe #3: Sweeps right across remaining glue residue
    tl.to(wiperHandRef.current, {
      x: 75,
      y: 30,
      rotate: -12,
      duration: 0.2,
      ease: "power1.inOut",
    });
    tl.to(glueSpot3Ref.current, { scale: 0, opacity: 0, duration: 0.12 }, "<0.06");
    tl.fromTo(
      sparkle3Ref.current,
      { scale: 0, opacity: 1, rotate: 0 },
      { scale: 1.6, opacity: 0, rotate: 120, duration: 0.35, ease: "power2.out" },
      "<",
    );

    // Big central squeaky-clean sparkle ✨
    tl.fromTo(
      sparkleCenterRef.current,
      { scale: 0, opacity: 1, rotate: -45 },
      {
        scale: 1.9,
        opacity: 0,
        rotate: 45,
        duration: 0.45,
        ease: "back.out(1.6)",
      },
      "<0.05",
    );

    // Wiper hand exits cleanly off-screen
    tl.to(wiperHandRef.current, {
      x: 250,
      y: -90,
      rotate: 35,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  if (dismissed) return null;

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "5.5rem",
        right: "1.25rem",
        zIndex: 200,
        width: "min(350px, calc(100vw - 2.5rem))",
        pointerEvents: isClosing ? "none" : "auto",
      }}
    >
      {/* ================= HIGH-DETAIL STICKY GLUE RESIDUE LAYER ================= */}
      <div
        ref={glueGroupRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{ zIndex: 10 }}
      >
        {/* Glue Spot 1: Top-Left torn adhesive tape + viscous goo blob */}
        <div
          ref={glueSpot1Ref}
          className="absolute -top-4 -left-4 w-32 h-20 origin-center"
        >
          <svg viewBox="0 0 130 80" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="tape1Grad" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="rgba(254, 240, 138, 0.55)" />
                <stop offset="50%" stopColor="rgba(251, 191, 36, 0.4)" />
                <stop offset="100%" stopColor="rgba(245, 158, 11, 0.2)" />
              </linearGradient>
              <radialGradient id="goo1Grad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="rgba(254, 249, 195, 0.95)" />
                <stop offset="30%" stopColor="rgba(251, 191, 36, 0.8)" />
                <stop offset="75%" stopColor="rgba(217, 119, 6, 0.65)" />
                <stop offset="100%" stopColor="rgba(180, 83, 9, 0.4)" />
              </radialGradient>
              <filter id="gooGlow1">
                <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="#78350f" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* Torn frosted duct-tape backing with jagged edges */}
            <path
              d="M 12 16 L 85 20 L 80 48 L 74 44 L 68 49 L 60 43 L 52 47 L 44 42 L 36 46 L 28 41 L 18 48 L 8 42 Z"
              fill="url(#tape1Grad)"
              stroke="rgba(251, 191, 36, 0.6)"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />
            {/* Peel stress wrinkles in tape */}
            <path d="M 22 20 Q 32 30 40 44" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
            <path d="M 45 22 Q 54 32 62 44" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />

            {/* Viscous 3D rubbery glue blob */}
            <path
              filter="url(#gooGlow1)"
              d="M 18 24 C 28 14, 58 16, 70 26 C 80 34, 76 52, 58 52 C 44 52, 34 62, 22 54 C 10 46, 8 32, 18 24 Z"
              fill="url(#goo1Grad)"
            />
            {/* Glossy 3D liquid highlight */}
            <path
              d="M 24 22 C 38 18, 54 20, 64 27"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 20 28 C 16 36, 18 46, 26 50"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Sticky micro-bubbles & droplets */}
            <circle cx="28" cy="56" r="3.5" fill="url(#goo1Grad)" filter="url(#gooGlow1)" />
            <circle cx="27" cy="55" r="1.2" fill="#ffffff" />
            <circle cx="42" cy="58" r="2.5" fill="url(#goo1Grad)" />
            <circle cx="72" cy="46" r="3.2" fill="url(#goo1Grad)" />
            <circle cx="71" cy="45" r="1" fill="#ffffff" />
            <circle cx="36" cy="30" r="1.5" fill="rgba(255,255,255,0.7)" />
            <circle cx="50" cy="36" r="1.8" fill="rgba(255,255,255,0.6)" />
          </svg>
        </div>

        {/* Glue Spot 2: Bottom-Left heavy glue smudge + shredded tape */}
        <div
          ref={glueSpot2Ref}
          className="absolute -bottom-4 -left-3 w-36 h-24 origin-center"
        >
          <svg viewBox="0 0 140 90" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="tape2Grad" x1="10%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" stopColor="rgba(253, 230, 138, 0.55)" />
                <stop offset="100%" stopColor="rgba(217, 119, 6, 0.25)" />
              </linearGradient>
              <radialGradient id="goo2Grad" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="rgba(254, 240, 138, 0.95)" />
                <stop offset="40%" stopColor="rgba(245, 158, 11, 0.85)" />
                <stop offset="85%" stopColor="rgba(180, 83, 9, 0.65)" />
              </radialGradient>
            </defs>

            {/* Ripped tape footprint */}
            <polygon
              points="14,24 88,30 82,58 74,54 66,59 58,53 48,58 38,52 26,59 10,54"
              fill="url(#tape2Grad)"
              stroke="rgba(245, 158, 11, 0.5)"
              strokeWidth="1.2"
            />
            {/* Main gooey blob */}
            <path
              d="M 16 30 C 28 20, 68 22, 86 34 C 98 42, 90 62, 72 64 C 54 66, 40 76, 24 68 C 10 58, 6 40, 16 30 Z"
              fill="url(#goo2Grad)"
            />
            {/* Curved sticky string stretching to the right */}
            <path
              d="M 78 58 Q 98 66 116 60"
              stroke="rgba(245, 158, 11, 0.85)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="118" cy="61" r="3" fill="#f59e0b" />
            <circle cx="117" cy="60" r="1" fill="#fff" />

            {/* Wet highlights */}
            <path
              d="M 24 30 Q 50 24 72 34"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 20 40 Q 24 55 35 62"
              stroke="rgba(255, 255, 255, 0.55)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Glue Spot 3: Right side sticky footprint with peel ridges */}
        <div
          ref={glueSpot3Ref}
          className="absolute top-10 -right-3 w-32 h-28 origin-center"
        >
          <svg viewBox="0 0 120 110" className="w-full h-full drop-shadow-lg">
            <defs>
              <radialGradient id="goo3Grad" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="rgba(254, 243, 199, 0.95)" />
                <stop offset="35%" stopColor="rgba(251, 191, 36, 0.8)" />
                <stop offset="80%" stopColor="rgba(217, 119, 6, 0.6)" />
              </radialGradient>
            </defs>

            {/* Peeling adhesive patch */}
            <path
              d="M 28 20 C 52 14, 88 28, 82 54 C 76 76, 52 82, 38 72 C 22 62, 16 32, 28 20 Z"
              fill="url(#goo3Grad)"
            />
            {/* Sticky ridges left from peeling direction */}
            <path d="M 34 32 Q 58 34 72 46" stroke="rgba(180, 83, 9, 0.45)" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 30 46 Q 52 48 66 60" stroke="rgba(180, 83, 9, 0.4)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 32 24 Q 60 22 72 38" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="2.8" strokeLinecap="round" fill="none" />

            <circle cx="86" cy="56" r="4" fill="url(#goo3Grad)" />
            <circle cx="85" cy="55" r="1.2" fill="#fff" />
            <circle cx="76" cy="74" r="4.5" fill="url(#goo3Grad)" />
            <circle cx="75" cy="73" r="1.4" fill="#fff" />
          </svg>
        </div>

        {/* Clean Sparkles */}
        <div ref={sparkle1Ref} className="absolute -top-2 left-6 pointer-events-none opacity-0">
          <svg viewBox="0 0 40 40" className="w-9 h-9 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
            <path d="M 20 0 Q 20 20 40 20 Q 20 20 20 40 Q 20 20 0 20 Q 20 20 20 0 Z" fill="currentColor" />
            <circle cx="20" cy="20" r="3" fill="#ffffff" />
          </svg>
        </div>
        <div ref={sparkle2Ref} className="absolute bottom-3 left-8 pointer-events-none opacity-0">
          <svg viewBox="0 0 40 40" className="w-9 h-9 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
            <path d="M 20 0 Q 20 20 40 20 Q 20 20 20 40 Q 20 20 0 20 Q 20 20 20 0 Z" fill="currentColor" />
            <circle cx="20" cy="20" r="3" fill="#ffffff" />
          </svg>
        </div>
        <div ref={sparkle3Ref} className="absolute top-12 right-6 pointer-events-none opacity-0">
          <svg viewBox="0 0 40 40" className="w-10 h-10 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
            <path d="M 20 0 Q 20 20 40 20 Q 20 20 20 40 Q 20 20 0 20 Q 20 20 20 0 Z" fill="currentColor" />
            <circle cx="20" cy="20" r="3.5" fill="#ffffff" />
          </svg>
        </div>
        <div ref={sparkleCenterRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0">
          <svg viewBox="0 0 50 50" className="w-16 h-16 text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.95)]">
            <path d="M 25 0 Q 25 25 50 25 Q 25 25 25 50 Q 25 25 0 25 Q 25 25 25 0 Z" fill="currentColor" />
            <circle cx="25" cy="25" r="5" fill="#fef08a" />
          </svg>
        </div>
      </div>

      {/* ================= ELASTIC GOO STRINGS (SNAPPING AT RIP) ================= */}
      <svg
        ref={gooStringsRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0 origin-left"
        style={{ zIndex: 15 }}
      >
        <path
          d="M 25 35 Q 160 50 310 75"
          stroke="rgba(245, 158, 11, 0.9)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 35 120 Q 170 110 320 95"
          stroke="rgba(245, 158, 11, 0.85)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* ================= WIPER HAND WITH FOAMY SPONGE ================= */}
      <div
        ref={wiperHandRef}
        className="absolute top-0 right-0 w-52 h-48 pointer-events-none opacity-0"
        style={{ zIndex: 60 }}
      >
        <svg viewBox="0 0 190 170" className="w-full h-full drop-shadow-2xl">
          <defs>
            <filter id="wiperShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="3" dy="6" stdDeviation="6" floodOpacity="0.55" />
            </filter>
            <linearGradient id="wiperSleeve" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#065f46" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
            <linearGradient id="spongeBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Cleaning sleeve */}
          <path d="M 130 0 L 190 0 L 155 70 L 115 55 Z" fill="url(#wiperSleeve)" stroke="#047857" strokeWidth="3" />

          <g filter="url(#wiperShadow)">
            {/* SPONGE: Scouring green pad top */}
            <rect
              x="25"
              y="46"
              width="80"
              height="20"
              rx="6"
              fill="#15803d"
              stroke="#14532d"
              strokeWidth="2.5"
              transform="rotate(-15 65 56)"
            />
            {/* SPONGE: Yellow absorbent body */}
            <rect
              x="23"
              y="64"
              width="80"
              height="40"
              rx="8"
              fill="url(#spongeBodyGrad)"
              stroke="#b45309"
              strokeWidth="2.5"
              transform="rotate(-15 63 84)"
            />
            {/* Sponge pores */}
            <ellipse cx="40" cy="78" rx="4" ry="2.5" fill="#92400e" opacity="0.65" transform="rotate(-15 40 78)" />
            <ellipse cx="64" cy="84" rx="4.5" ry="3" fill="#92400e" opacity="0.65" transform="rotate(-15 64 84)" />
            <ellipse cx="82" cy="76" rx="3.5" ry="2.2" fill="#92400e" opacity="0.65" transform="rotate(-15 82 76)" />
            <ellipse cx="52" cy="92" rx="3.5" ry="2" fill="#92400e" opacity="0.65" transform="rotate(-15 52 92)" />

            {/* Foamy soapy lather bubbles on sponge */}
            <circle cx="28" cy="58" r="5" fill="#ffffff" opacity="0.95" />
            <circle cx="36" cy="52" r="3.5" fill="#ffffff" opacity="0.95" />
            <circle cx="94" cy="78" r="5.5" fill="#ffffff" opacity="0.95" />
            <circle cx="101" cy="88" r="4" fill="#ffffff" opacity="0.95" />
            <circle cx="68" cy="62" r="4" fill="#ffffff" opacity="0.9" />

            {/* Hand fingers grasping the sponge */}
            <path
              d="M 112 48 C 104 42 90 48 78 56 C 72 62 76 72 86 70 C 98 68 108 58 114 54 Z"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="3.5"
            />
            <path
              d="M 102 60 C 94 56 80 62 72 70 C 68 76 74 84 84 81 C 92 78 100 68 104 64 Z"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="3.5"
            />
            <path
              d="M 94 72 C 86 68 74 76 68 84 C 65 90 72 96 80 93 C 88 90 94 80 96 76 Z"
              fill="#f8fafc"
              stroke="#0f172a"
              strokeWidth="3.5"
            />
            {/* Thumb on front of sponge */}
            <path
              d="M 54 54 C 46 58 43 70 50 78 C 56 84 64 80 67 72 C 68 64 60 52 54 54 Z"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="3.5"
            />
            {/* Hand palm base */}
            <path
              d="M 100 42 C 116 44 128 60 122 76 C 116 88 100 92 90 86"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="3.5"
            />
          </g>
        </svg>
      </div>

      {/* ================= THE TOAST CARD ================= */}
      <div
        ref={cardRef}
        style={{
          transform: visible ? "translateY(0)" : "translateY(calc(100% + 2rem))",
          opacity: visible ? 1 : 0,
          transition: isClosing
            ? "none"
            : "transform 0.55s cubic-bezier(0.34, 1.32, 0.64, 1), opacity 0.4s ease",
          background: "oklch(13% 0.025 285 / 0.92)",
          border: "1px solid oklch(36% 0.08 290 / 0.6)",
          borderRadius: "var(--radius-xl)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 28px 70px -16px oklch(0% 0 0 / 0.75)",
          overflow: "hidden",
          position: "relative",
          zIndex: 20,
        }}
      >
        {/* Amber top accent line */}
        <div
          style={{
            height: "2.5px",
            background:
              "linear-gradient(90deg, transparent, oklch(78% 0.19 85) 30%, oklch(85% 0.2 85) 50%, oklch(78% 0.19 85) 70%, transparent)",
          }}
        />

        <div className="px-5 pt-4 pb-4">
          {/* Header row – NO old X button here anymore! Just clean title + badge */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2.5">
              {/* Pulsing amber indicator dot */}
              <span
                className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full"
                style={{
                  background: "oklch(78% 0.19 85)",
                  boxShadow: "0 0 0 0 oklch(78% 0.19 85 / 0.6)",
                  animation: "dev-pulse 1.8s ease-out infinite",
                }}
              />
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "oklch(88% 0.16 85)" }}
              >
                Work in Progress
              </span>
            </div>

            {/* Subtle status tag */}
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider"
              style={{
                background: "oklch(22% 0.06 85 / 0.7)",
                color: "oklch(82% 0.16 85)",
                border: "1px solid oklch(45% 0.12 85 / 0.4)",
              }}
            >
              Preview
            </span>
          </div>

          {/* Divider */}
          <div
            className="mb-3"
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, oklch(35% 0.05 290 / 0.8), transparent)",
            }}
          />

          {/* Body */}
          <p
            className="text-xs leading-relaxed mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            Diese Seite befindet sich{" "}
            <span style={{ color: "var(--text)", fontWeight: 600 }}>
              aktiv in Entwicklung
            </span>{" "}
            — manche Bereiche sind noch unvollständig oder fehlen noch. Updates
            folgen regelmäßig. 🚧
          </p>

          {/* PROMINENT "VERSTANDEN" BUTTON – The ONLY and main way to dismiss */}
          <button
            onClick={handleDismiss}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(135deg, oklch(78% 0.19 85) 0%, oklch(68% 0.22 75) 100%)",
              color: "#0f0b1b",
              boxShadow:
                "0 4px 18px oklch(75% 0.18 85 / 0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 6px 24px oklch(78% 0.2 85 / 0.55), inset 0 1px 0 rgba(255,255,255,0.5)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 18px oklch(75% 0.18 85 / 0.35), inset 0 1px 0 rgba(255,255,255,0.4)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span>Verstanden</span>
            <span className="font-extrabold text-sm transition-transform duration-200 group-hover:scale-125">
              ✓
            </span>
          </button>
        </div>
      </div>

      {/* ================= HIGH-DETAIL ANATOMICALLY DETAILED HAND ================= */}
      {/* Positioned on the right, grips the card's edge firmly */}
      <div
        ref={grabHandRef}
        className="absolute top-1/2 -right-12 -translate-y-1/2 w-64 h-56 pointer-events-none opacity-0"
        style={{ zIndex: 40 }}
      >
        <svg viewBox="0 0 250 200" className="w-full h-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.7)]">
          <defs>
            {/* Forearm sleeve gradient */}
            <linearGradient id="armSleeveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="40%" stopColor="#2e1065" />
              <stop offset="100%" stopColor="#0f0728" />
            </linearGradient>

            {/* Anatomical skin tones: rich highlight to warm subsurface shadows */}
            <linearGradient id="skinBackGrad" x1="100%" y1="20%" x2="0%" y2="80%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="45%" stopColor="#fba372" />
              <stop offset="85%" stopColor="#d96b43" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>

            <linearGradient id="fingerGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffedd5" />
              <stop offset="35%" stopColor="#fdba74" />
              <stop offset="70%" stopColor="#e26a3c" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>

            <linearGradient id="thumbGrad" x1="80%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff7ed" />
              <stop offset="40%" stopColor="#fdba74" />
              <stop offset="80%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#7c2d12" />
            </linearGradient>

            {/* Fingernail gradient with realistic glossy shine */}
            <linearGradient id="nailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="50%" stopColor="#fecdd3" />
              <stop offset="100%" stopColor="#fda4af" />
            </linearGradient>

            {/* Realistic hand drop shadow filter */}
            <filter id="handRealShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="#090514" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* Forearm & Sleeve entering from the right edge */}
          <path
            d="M 160 62 L 250 42 L 250 148 L 170 138 Z"
            fill="url(#armSleeveGrad)"
            stroke="#4c1d95"
            strokeWidth="3"
          />
          {/* Sleeve cuff with fabric crease */}
          <ellipse cx="165" cy="100" rx="12" ry="38" fill="#581c87" stroke="#6b21a8" strokeWidth="2.5" />
          <path d="M 164 68 Q 168 100 164 132" stroke="#9333ea" strokeWidth="1.8" fill="none" opacity="0.6" />

          {/* Realistic Hand Group */}
          <g filter="url(#handRealShadow)">
            {/* WRIST & BACK OF HAND */}
            <path
              d="M 162 74 C 150 72, 134 76, 120 78 C 104 80, 94 92, 90 106 C 86 120, 96 134, 114 130 C 132 126, 150 126, 164 124 Z"
              fill="url(#skinBackGrad)"
              stroke="#7c2d12"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />

            {/* Knuckle definition & tendon lines on back of hand */}
            <path d="M 142 84 Q 120 86 104 90" stroke="#7c2d12" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M 140 94 Q 118 96 102 102" stroke="#7c2d12" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M 138 106 Q 120 108 104 116" stroke="#7c2d12" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.6" />
            {/* Knuckle highlights */}
            <ellipse cx="104" cy="88" rx="4" ry="2.5" fill="#ffedd5" opacity="0.6" />
            <ellipse cx="100" cy="100" rx="4.5" ry="3" fill="#ffedd5" opacity="0.6" />
            <ellipse cx="102" cy="114" rx="4" ry="2.5" fill="#ffedd5" opacity="0.6" />

            {/* CAST SHADOW of fingers clamping onto the card surface */}
            <path
              d="M 68 64 C 54 66, 44 82, 48 98 C 52 112, 66 124, 80 126 C 72 118, 64 104, 66 90 C 68 76, 74 68, 68 64 Z"
              fill="#000000"
              opacity="0.5"
            />

            {/* FINGER 1: INDEX FINGER (curls over top-right corner of card) */}
            <g>
              <path
                d="M 98 80 C 84 72, 64 74, 52 82 C 44 88, 48 98, 58 98 C 68 98, 82 88, 94 86 Z"
                fill="url(#fingerGrad)"
                stroke="#7c2d12"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />
              {/* Joint creases */}
              <path d="M 74 79 Q 72 87 76 92" stroke="#7c2d12" strokeWidth="1.8" fill="none" />
              <path d="M 60 84 Q 58 91 62 96" stroke="#7c2d12" strokeWidth="1.8" fill="none" />
              {/* Nail */}
              <ellipse cx="50" cy="89" rx="4.5" ry="3" fill="url(#nailGrad)" stroke="#b91c1c" strokeWidth="1" transform="rotate(-15 50 89)" />
              <path d="M 48 88 Q 50 87 53 89" stroke="#fff" strokeWidth="1.2" fill="none" />
            </g>

            {/* FINGER 2: MIDDLE FINGER (longest, firm grip) */}
            <g>
              <path
                d="M 96 94 C 80 88, 56 92, 44 102 C 38 108, 42 118, 54 116 C 66 114, 80 104, 92 100 Z"
                fill="url(#fingerGrad)"
                stroke="#7c2d12"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />
              {/* Knuckle creases */}
              <path d="M 70 95 Q 68 103 72 109" stroke="#7c2d12" strokeWidth="1.8" fill="none" />
              <path d="M 54 101 Q 52 108 56 114" stroke="#7c2d12" strokeWidth="1.8" fill="none" />
              {/* Nail */}
              <ellipse cx="43" cy="108" rx="5" ry="3.2" fill="url(#nailGrad)" stroke="#b91c1c" strokeWidth="1" transform="rotate(-10 43 108)" />
              <path d="M 41 107 Q 43 106 46 108" stroke="#fff" strokeWidth="1.2" fill="none" />
            </g>

            {/* FINGER 3: RING FINGER */}
            <g>
              <path
                d="M 96 108 C 82 104, 60 108, 48 118 C 44 124, 50 132, 60 128 C 72 124, 82 116, 92 114 Z"
                fill="url(#fingerGrad)"
                stroke="#7c2d12"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />
              <path d="M 68 111 Q 66 118 70 123" stroke="#7c2d12" strokeWidth="1.8" fill="none" />
              {/* Nail */}
              <ellipse cx="48" cy="123" rx="4.5" ry="3" fill="url(#nailGrad)" stroke="#b91c1c" strokeWidth="1" />
            </g>

            {/* FINGER 4: PINKY (tucked, smaller) */}
            <g>
              <path
                d="M 98 122 C 86 120, 68 124, 58 134 C 54 140, 62 146, 70 142 C 80 138, 88 128, 96 126 Z"
                fill="url(#fingerGrad)"
                stroke="#7c2d12"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <ellipse cx="58" cy="138" rx="4" ry="2.6" fill="url(#nailGrad)" stroke="#b91c1c" strokeWidth="1" />
            </g>

            {/* THUMB (pressing firmly onto the front face of the glass card) */}
            <g>
              {/* Thumb muscle base & shaft */}
              <path
                d="M 132 105 C 118 108, 98 118, 86 130 C 78 138, 84 148, 98 144 C 114 140, 134 124, 140 114 Z"
                fill="url(#thumbGrad)"
                stroke="#7c2d12"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Thumb contact pad on front of glass */}
              <path
                d="M 88 130 C 76 136, 68 146, 74 154 C 80 160, 92 156, 98 146 Z"
                fill="url(#thumbGrad)"
                stroke="#7c2d12"
                strokeWidth="2.5"
              />
              {/* Thumb knuckle wrinkle */}
              <path d="M 108 124 Q 104 132 108 138" stroke="#7c2d12" strokeWidth="2" fill="none" />
              {/* Thumb Nail with specular reflection */}
              <ellipse cx="76" cy="148" rx="5.5" ry="4" fill="url(#nailGrad)" stroke="#b91c1c" strokeWidth="1.2" transform="rotate(-30 76 148)" />
              <path d="M 73 146 Q 76 144 80 148" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
