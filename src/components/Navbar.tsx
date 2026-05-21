"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitHub, Npm } from "@/lib/icons";
import { GITHUB_URL, NPM_URL, VERSION } from "@/lib/constants";
import { KeyboardHint } from "@/components/KeyboardShortcuts";

const NAV_LINKS = [
  { label: "why", href: "#receipt" },
  { label: "three modes", href: "#modes" },
  { label: "openclaw", href: "#openclaw" },
  { label: "faq", href: "/faq" },
  { label: "install", href: "#install" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxVisibility = 0;
        let mostVisibleId = "";
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxVisibility) {
            maxVisibility = entry.intersectionRatio;
            mostVisibleId = entry.target.id;
          }
        });
        
        if (mostVisibleId) {
          setActiveSection(mostVisibleId);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const navTransition = "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${navTransition} ${
          scrolled
            ? "bg-[#050507]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1320px] px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="/" className="flex items-baseline gap-2 group relative z-50">
            <span className={`font-display text-[26px] leading-none text-ink ${navTransition} group-hover:-translate-y-[1px] group-hover:text-amber`}>
              otterly
            </span>
            <span className={`font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3 ${navTransition} group-hover:text-amber-soft`}>
              v{VERSION}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7 text-sm">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              const isFaqActive = link.href === "/faq" && typeof window !== "undefined" && window.location.pathname === "/faq";
              const currentlyActive = isActive || isFaqActive;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative text-ink-2 hover:text-ink transition-colors duration-200 ${
                    currentlyActive ? "text-ink font-medium" : ""
                  }`}
                >
                  {link.label}
                  {currentlyActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4 relative z-50">
            <KeyboardHint />
            <a
              href={NPM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-3 hover:text-amber transition-colors duration-200"
              aria-label="npm"
            >
              <Npm className="w-[18px] h-[18px]" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-3 hover:text-amber transition-colors duration-200"
              aria-label="GitHub"
            >
              <GitHub className="w-[18px] h-[18px]" />
            </a>
            
            <button 
              className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 ml-2 text-ink"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-current transform transition duration-300 ease-in-out ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-current transition duration-300 ease-in-out ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block w-5 h-0.5 bg-current transform transition duration-300 ease-in-out ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-paper-deep/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-6 text-xl font-display text-ink">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-rule flex items-center justify-between"
                >
                  {link.label}
                  <span className="text-ink-3 text-sm font-mono">{(i + 1).toString().padStart(2, '0')}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
