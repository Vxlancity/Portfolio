"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroLoader() {
  const [active, setActive] = useState(true);
  const [faded, setFaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Lade Vxlancity Module...");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if already shown in this session (optional, but keep it per session or enable on home)
    // To show every reload, we can let it run directly:
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const STAR_COUNT = 320;
    const stars: Array<{ x: number; y: number; z: number; pz: number }> = [];
    let speed = 2.5;

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * w * 2,
        y: (Math.random() - 0.5) * h * 2,
        z: Math.random() * w,
        pz: w,
      });
    }

    const drawWarp = () => {
      ctx.fillStyle = "rgba(7, 5, 14, 0.35)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      for (let i = 0; i < STAR_COUNT; i++) {
        const s = stars[i];
        s.pz = s.z;
        s.z -= speed;

        if (s.z <= 0) {
          s.z = w;
          s.pz = w;
          s.x = (Math.random() - 0.5) * w * 2;
          s.y = (Math.random() - 0.5) * h * 2;
        }

        const k = 220 / s.z;
        const px = s.x * k + cx;
        const py = s.y * k + cy;

        const pk = 220 / s.pz;
        const prevX = s.x * pk + cx;
        const prevY = s.y * pk + cy;

        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          const alpha = Math.min(1, (1 - s.z / w) * 1.5);
          ctx.strokeStyle = `rgba(192, 132, 252, ${alpha})`;
          ctx.lineWidth = Math.max(1, (1 - s.z / w) * 2.8);
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      }

      animRef.current = requestAnimationFrame(drawWarp);
    };
    animRef.current = requestAnimationFrame(drawWarp);

    // Progress counter & fade logic
    const DURATION = 2200; // 2.2s total
    const startTime = performance.now();
    let isDone = false;

    const completeIntro = () => {
      if (isDone) return;
      isDone = true;
      speed = 45.0;

      if (flashRef.current) {
        flashRef.current.style.opacity = "0.75";
      }

      setTimeout(() => {
        if (flashRef.current) flashRef.current.style.opacity = "0";
        setFaded(true);

        setTimeout(() => {
          setActive(false);
          if (animRef.current) cancelAnimationFrame(animRef.current);
        }, 900);
      }, 140);
    };

    const updateTimer = (now: number) => {
      if (isDone) return;
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / DURATION) * 100));
      setProgress(pct);

      speed = 2.5 + (pct / 100) * 22.0;

      if (pct < 35) {
        setStatusText("Lade Vxlancity Module...");
      } else if (pct < 75) {
        setStatusText("Styles & Shader initialisiert...");
      } else {
        setStatusText("Portfolio bereit ➔ Starte...");
      }

      if (elapsed >= DURATION) {
        completeIntro();
      } else {
        requestAnimationFrame(updateTimer);
      }
    };
    requestAnimationFrame(updateTimer);

    return () => {
      window.removeEventListener("resize", onResize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      id="introLoaderOverlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "#07050e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: faded ? 0 : 1,
        transform: faded ? "scale(1.08)" : "scale(1)",
        filter: faded ? "blur(16px)" : "none",
        pointerEvents: faded ? "none" : "auto",
        transition:
          "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), filter 0.85s ease",
      }}
    >
      {/* Ambient Pulsing Nebulae */}
      <div
        style={{
          position: "absolute",
          width: "min(75vw, 650px)",
          height: "min(75vw, 650px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.28) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Hyperspace Starfield Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* Flash Overlay */}
      <div
        ref={flashRef}
        style={{
          position: "fixed",
          inset: 0,
          background: "#ffffff",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 10,
          transition: "opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Center Cyber Card */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          width: "min(420px, calc(100vw - 2.5rem))",
          background: "rgba(14, 10, 26, 0.84)",
          border: "1px solid rgba(168, 85, 247, 0.4)",
          borderRadius: "24px",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          padding: "2.2rem 1.8rem 1.8rem",
          boxShadow:
            "0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 50px -5px rgba(147, 51, 234, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
          textAlign: "center",
        }}
      >
        {/* Accent top line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: "2.5px",
            background:
              "linear-gradient(90deg, transparent, #a855f7 35%, #06b6d4 65%, transparent)",
            boxShadow: "0 0 14px #a855f7",
          }}
        />

        {/* HUD Top Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.4rem",
            fontSize: "0.68rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "#94a3b8",
          }}
        >
          <span>VXLANCITY // NODE</span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "3px 9px",
              borderRadius: "9999px",
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              color: "#fbbf24",
              fontWeight: 700,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#fbbf24",
                boxShadow: "0 0 8px #fbbf24",
              }}
            />
            INITIALIZING
          </span>
        </div>

        {/* Spinning Cyber Reactor */}
        <div
          style={{
            position: "relative",
            width: "96px",
            height: "96px",
            margin: "0 auto 1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Outer dashed ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              border: "2px dashed rgba(168, 85, 247, 0.55)",
              borderRadius: "50%",
              animation: "spin-cw 10s linear infinite",
            }}
          />
          {/* Inner cyan ring */}
          <div
            style={{
              position: "absolute",
              inset: "10px",
              border: "2px solid rgba(6, 182, 212, 0.65)",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin-ccw 2.2s linear infinite",
            }}
          />
          {/* Core */}
          <div
            style={{
              width: "62px",
              height: "62px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(147, 51, 234, 0.45) 0%, rgba(15, 10, 30, 0.95) 80%)",
              border: "1.5px solid rgba(168, 85, 247, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 24px rgba(168, 85, 247, 0.55)",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/emojis/kuromi_love.gif"
              alt="Kuromi"
              style={{
                width: "42px",
                height: "42px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))",
              }}
            />
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "1.65rem",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            marginBottom: "0.2rem",
            background: "linear-gradient(135deg, #ffffff 30%, #c084fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Vxlancity.
        </h1>
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#06b6d4",
            textShadow: "0 0 12px rgba(6, 182, 212, 0.5)",
            marginBottom: "1.25rem",
          }}
        >
          PORTFOLIO INITIALIZING
        </div>

        {/* Terminal Telemetry */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.48)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "12px",
            padding: "0.75rem 0.9rem",
            marginBottom: "1.25rem",
            textAlign: "left",
            fontSize: "0.72rem",
            lineHeight: 1.55,
            color: "#94a3b8",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <span style={{ color: "#a855f7", fontWeight: 700 }}>SYSTEM:</span>
            <span style={{ color: "#e2e8f0" }}>Rendering pipeline bereit</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <span style={{ color: "#a855f7", fontWeight: 700 }}>STATUS:</span>
            <span style={{ color: "#e2e8f0" }}>{statusText}</span>
          </div>
        </div>

        {/* Progress Tracker */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.7rem",
            color: "#94a3b8",
            marginBottom: "0.4rem",
          }}
        >
          <span>INITIALISIERUNG</span>
          <span>{progress}%</span>
        </div>
        <div
          style={{
            width: "100%",
            height: "7px",
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: "9999px",
            overflow: "hidden",
            marginBottom: "1.25rem",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #7e22ce, #a855f7, #06b6d4)",
              boxShadow: "0 0 14px #a855f7",
              borderRadius: "9999px",
              transition: "width 0.04s linear",
            }}
          />
        </div>

        {/* Skip button */}
        <button
          onClick={() => {
            setFaded(true);
            setTimeout(() => setActive(false), 900);
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
            padding: "0.75rem 1.2rem",
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.05)",
            color: "#cbd5e1",
            fontFamily: "inherit",
            fontSize: "0.8rem",
            fontWeight: 600,
            border: "1px solid rgba(255, 255, 255, 0.12)",
            cursor: "pointer",
          }}
        >
          <span>Direkt starten</span>
          <span>➔</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes spin-cw {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-ccw {
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
