"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { id: "home", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "worked-for", label: "Worked For" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState(NAV_ITEMS[0].id);
  const [indicator, setIndicator] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [ready, setReady] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) setActiveSection(mostVisible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    NAV_ITEMS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHome]);

  useLayoutEffect(() => {
    const measure = () => {
      const activeItem = listRef.current?.querySelector<HTMLElement>(
        '[data-active="true"]',
      );

      if (activeItem) {
        setIndicator({
          left: activeItem.offsetLeft,
          top: activeItem.offsetTop,
          width: activeItem.offsetWidth,
          height: activeItem.offsetHeight,
        });
        setReady(true);
      }
    };

    // Small delay so DOM has settled after navigation
    const id = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, [activeSection, isAbout]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 md:bottom-auto md:top-5"
    >
      <ul
        ref={listRef}
        className="glass relative flex items-center gap-1 rounded-[var(--radius-md)] p-1.5"
      >
        <span
          aria-hidden="true"
          className="nav-indicator"
          style={{
            width: `${indicator.width}px`,
            height: `${indicator.height}px`,
            transform: `translate(${indicator.left}px, ${indicator.top}px)`,
            opacity: ready && indicator.width ? 1 : 0,
            transition: ready ? undefined : "none",
          }}
        />

        {/* Scroll-anchor items */}
        {NAV_ITEMS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={isHome ? `#${id}` : `/#${id}`}
              className="nav-link"
              data-active={isHome && activeSection === id}
              aria-current={isHome && activeSection === id ? "true" : undefined}
            >
              {label}
            </a>
          </li>
        ))}

        {/* About Me – eigene Seite, ganz rechts */}
        <li>
          <Link
            href="/about"
            className="nav-link"
            data-active={isAbout}
            aria-current={isAbout ? "page" : undefined}
          >
            About Me
          </Link>
        </li>
      </ul>
    </nav>
  );
}
