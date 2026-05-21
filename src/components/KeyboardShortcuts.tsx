"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * KeyboardShortcuts — ⌘K command palette for quick navigation.
 * Design reasoning: power-user delight that also serves as a
 * discoverability tool. Glassmorphism modal over dimmed backdrop.
 */

const SECTIONS = [
  { label: "Hero", shortcut: "1", href: "#" },
  { label: "Why otterly", shortcut: "2", href: "#receipt" },
  { label: "Three modes", shortcut: "3", href: "#modes" },
  { label: "OpenClaw moment", shortcut: "4", href: "#openclaw" },
  { label: "Install", shortcut: "5", href: "#install" },
  { label: "FAQ", shortcut: "6", href: "/faq" },
];

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const navigate = useCallback((href: string) => {
    setOpen(false);
    if (href.startsWith("/")) {
      window.location.href = href;
    } else if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      /* ⌘K or Ctrl+K to toggle */
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setActiveIndex(0);
        return;
      }

      /* Escape to close */
      if (e.key === "Escape" && open) {
        setOpen(false);
        return;
      }

      if (!open) return;

      /* Arrow navigation */
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % SECTIONS.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + SECTIONS.length) % SECTIONS.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        navigate(SECTIONS[activeIndex].href);
      }

      /* Number shortcuts */
      const num = parseInt(e.key);
      if (num >= 1 && num <= SECTIONS.length) {
        e.preventDefault();
        navigate(SECTIONS[num - 1].href);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, activeIndex, navigate]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-ink/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
          />

          {/* Palette */}
          <motion.div
            className="fixed top-[20%] left-1/2 z-[101] w-[90vw] max-w-[480px]"
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -10, x: "-50%" }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-panel rounded-xl shadow-[0_24px_80px_-12px_rgba(14,13,12,0.25)] overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 border-b border-rule flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                  Quick navigation
                </span>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-ink-3 bg-paper-deep border border-rule rounded">
                  esc
                </kbd>
              </div>

              {/* Items */}
              <ul className="py-2">
                {SECTIONS.map((s, i) => (
                  <li key={s.href}>
                    <button
                      onClick={() => navigate(s.href)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-full px-4 py-2.5 flex items-center justify-between text-left transition-colors cursor-pointer ${
                        i === activeIndex
                          ? "bg-amber/10 text-ink"
                          : "text-ink-2 hover:bg-paper-deep"
                      }`}
                    >
                      <span className="text-[14px]">{s.label}</span>
                      <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-ink-3 bg-paper border border-rule rounded">
                        {s.shortcut}
                      </kbd>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Footer hint */}
              <div className="px-4 py-2.5 border-t border-rule flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.16em] text-ink-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-paper-deep border border-rule rounded text-[9px]">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-paper-deep border border-rule rounded text-[9px]">↵</kbd>
                  select
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * KeyboardHint — small indicator showing ⌘K availability.
 * Design reasoning: discoverability without being intrusive.
 */
export function KeyboardHint() {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(navigator.platform.toLowerCase().includes("mac"));
  }, []);

  return (
    <button
      onClick={() => {
        /* Dispatch a synthetic ⌘K event to open the palette */
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "k",
            metaKey: true,
            ctrlKey: !isMac,
            bubbles: true,
          })
        );
      }}
      className="hidden md:inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-ink-3 hover:text-ink border border-rule hover:border-ink/20 rounded-md transition-colors cursor-pointer"
      aria-label="Open command palette"
    >
      {isMac ? "⌘" : "Ctrl+"}K
    </button>
  );
}
