"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePalette } from "./CommandPalette";

const links = [
  { href: "/about", label: "~/about" },
  { href: "/projects", label: "~/projects" },
  { href: "/resume", label: "~/resume" },
];

export default function Nav() {
  const { openPalette } = usePalette();
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
    }
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur border-b border-[var(--color-line)]">
      <nav className="mx-auto max-w-5xl px-6 h-12 flex items-center justify-between text-sm">
        <Link
          href="/"
          className="hover:text-[var(--color-accent)] transition-colors"
        >
          <span className="text-[var(--color-accent)]">$</span>{" "}
          <span>justinchan.dev</span>
        </Link>
        <ul className="flex items-center gap-4 sm:gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="ml-1">
            <button
              type="button"
              onClick={openPalette}
              aria-label="Open command palette"
              className="text-[11px] text-[var(--color-fg-muted)] border border-[var(--color-line)] px-2 py-0.5 rounded-sm hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors flex items-center gap-1"
            >
              <span>{isMac ? "⌘" : "Ctrl"}</span>
              <span>K</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
