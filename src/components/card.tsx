"use client";

import { ReactNode, MouseEvent, useRef } from "react";
import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  image?: string;
  hoverColor?: string;
  href?: string;
  route?: string;
  archived?: boolean;
  badge?: string;
}

export default function Card({
  title,
  description,
  icon,
  image,
  hoverColor = "var(--accent)",
  href,
  route,
  archived = false,
  badge,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("smoke-tint", {
          detail: { color: hoverColor },
        }),
      );
    }
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    card.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("smoke-burst", {
          detail: { color: hoverColor },
        }),
      );
    }
  };

  const content = (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-archived={archived}
      className="panel project-card relative flex h-full flex-col p-5"
    >
      <div
        aria-hidden="true"
        className="project-glow pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full"
        style={{
          background: `radial-gradient(circle, ${hoverColor}, transparent 70%)`,
          filter: "blur(52px)",
        }}
      />

      {(archived || badge) && (
        <span
          className="absolute right-4 top-4 rounded-[var(--radius-sm)] px-2.5 py-1 text-xs font-medium"
          style={
            archived
              ? {
                  background: "oklch(80% 0.15 85 / 0.15)",
                  border: "1px solid oklch(80% 0.15 85 / 0.45)",
                  color: "oklch(85% 0.13 85)",
                }
              : {
                  background: "oklch(70% 0.18 145 / 0.15)",
                  border: "1px solid oklch(70% 0.18 145 / 0.45)",
                  color: "oklch(82% 0.16 145)",
                }
          }
        >
          {badge || (archived ? "Discontinued" : "")}
        </span>
      )}

      <div className="relative z-10 flex h-full flex-col">
        {icon && <div className="project-icon mb-4 w-fit">{icon}</div>}

        <div className="mb-2 flex items-center gap-2">
          <h3
            className="text-lg font-semibold"
            style={{ color: "var(--text)" }}
          >
            {title}
          </h3>
          {image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={
                image.startsWith("/") &&
                !image.startsWith(process.env.NEXT_PUBLIC_BASE_PATH || "")
                  ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${image}`
                  : image
              }
              alt=""
              aria-hidden="true"
              className="project-emoji h-6 w-6 object-contain"
            />
          )}
        </div>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );

  if (route) {
    return (
      <Link href={route} className="block h-full">
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {content}
      </a>
    );
  }

  return content;
}
