"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { CopyPill } from "./CopyButton";
import { SectionReveal } from "./SectionReveal";
import { GITHUB_URL, NPM_URL, VERSION } from "@/lib/constants";
import { GitHub, Npm, ArrowRight } from "@/lib/icons";

const COMMAND = "npx otterly serve";

const BOOT_SEQUENCE = [
  `otterly v${VERSION}`,
  `─────────────────────────────────────`,
  `API         localhost:11434`,
  `Playground  localhost:11434/playground`,
  `Claude      claude-sonnet-4-20250514`,
  ``,
  `Ready.`
];

export function FinalCTA() {
  const [typed, setTyped] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  
  // Parallax / Spatial terminal effect
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  
  // Butter-smooth springs for the 3D tilt
  const smx = useSpring(mx, { stiffness: 100, damping: 30, mass: 1 });
  const smy = useSpring(my, { stiffness: 100, damping: 30, mass: 1 });
  
  // Max rotation angles (degrees)
  const rotateX = useTransform(smy, [0, 1], [15, -15]);
  const rotateY = useTransform(smx, [0, 1], [-15, 15]);
  // Specular highlight gradient shift
  const glareX = useTransform(smx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(smy, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let charIndex = 0;

    const typeNext = () => {
      if (charIndex < COMMAND.length) {
        setTyped(COMMAND.slice(0, charIndex + 1));
        
        const isSpace = COMMAND[charIndex] === " ";
        const delay = isSpace 
          ? 200 
          : Math.random() * 90 + 40; 

        charIndex++;
        timeoutId = setTimeout(typeNext, delay);
      } else {
        setTypingComplete(true);
        setTimeout(() => setShowHint(true), 800);
      }
    };

    const initialDelay = setTimeout(typeNext, 500);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!typingComplete) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < BOOT_SEQUENCE.length) {
        setBootLines((prev) => [...prev, BOOT_SEQUENCE[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [typingComplete]);

  // Handle mouse move for parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Calculate mouse position relative to the container center (0 to 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mx.set(x);
    my.set(y);
  };

  const handleMouseLeave = () => {
    // Reset to center smoothly when mouse leaves
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <section
      id="install"
      className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-10 py-32 overflow-hidden bg-[#000000]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={ref}
    >
      <CTABackground />

      <div className="relative z-10 mx-auto w-full max-w-[800px] text-center">
        <SectionReveal direction="up" delay={0.1}>
          <div className="eyebrow mb-6 text-ink-3">
            §05 · install
          </div>
        </SectionReveal>

        <SectionReveal direction="up" delay={0.2}>
          <h2 className="font-display text-[clamp(28px,3.6vw,48px)] tracking-[-0.025em] leading-[1.1] text-white text-balance mb-6 drop-shadow-xl">
            Stop paying twice.
          </h2>
        </SectionReveal>

        <SectionReveal direction="up" delay={0.3}>
          <p className="mx-auto max-w-[520px] text-[18px] md:text-[20px] leading-[1.6] text-ink-2 mb-16">
            Run{" "}
            <span className="font-mono text-ink">npx otterly serve</span>.
            Point any OpenAI client at{" "}
            <span className="font-mono text-ink">localhost:11434</span>.
            That&apos;s the whole setup.
          </p>
        </SectionReveal>

        {/* Spatial 3D Terminal Container */}
        <div className="mx-auto max-w-[540px] perspective-[2000px]">
          <SectionReveal direction="up" delay={0.4}>
            <motion.div 
              style={{ rotateX, rotateY }}
              className="relative terminal-window shadow-[0_40px_100px_-20px_rgba(0,240,255,0.25)] text-left transform-style-3d border border-white/10 backdrop-blur-3xl"
            >
              {/* Dynamic Glare Highlight */}
              <motion.div 
                className="absolute inset-0 pointer-events-none z-50 rounded-xl mix-blend-overlay opacity-30"
                style={{
                  background: useTransform(
                    [glareX, glareY],
                    ([gx, gy]: string[]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.8) 0%, transparent 50%)`
                  )
                }}
              />

              <div className="terminal-chrome bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="terminal-dot terminal-dot--close" />
                  <div className="terminal-dot terminal-dot--minimize" />
                  <div className="terminal-dot terminal-dot--maximize" />
                </div>
                <div className="mx-auto text-[10px] font-mono uppercase tracking-[0.2em] text-ink-3">
                  localhost
                </div>
              </div>
              
              <div className="relative p-6 md:p-8 font-mono text-[13px] md:text-[14px] leading-relaxed text-ink z-10">
                <div className="flex items-center gap-3">
                  <span className="text-amber">~</span>
                  <span>
                    {typed}
                    {!typingComplete && (
                      <span className="inline-block w-2 h-4 bg-white/80 align-middle ml-1 animate-blink shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    )}
                  </span>
                </div>
                <div className="mt-4 text-ink-2 flex flex-col gap-1 min-h-[140px]">
                  {bootLines.map((line, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </SectionReveal>
        </div>

        <SectionReveal direction="up" delay={0.7} className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-4">
            <div className="shimmer-hover rounded-full p-[1px] bg-gradient-to-b from-white/20 to-white/5">
              <CopyPill text={COMMAND} dark />
            </div>
            <AnimatePresence>
              {showHint && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px] font-mono text-ink-3 uppercase tracking-[0.1em]"
                >
                  <kbd>⌘</kbd><kbd>C</kbd> to copy
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SectionReveal>

        <SectionReveal direction="up" delay={0.8} className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-6">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[15px] font-medium text-ink-2 hover:text-white transition-colors duration-200"
          >
            <GitHub className="w-[18px] h-[18px]" />
            <span>GitHub</span>
          </a>
          <a
            href={NPM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-[15px] font-medium text-ink-2 hover:text-white transition-colors duration-200"
          >
            <Npm className="w-[18px] h-[18px]" />
            <span>npm registry</span>
          </a>
          <a
            href="/faq"
            className="group flex items-center gap-2 text-[15px] font-medium text-ink-2 hover:text-white transition-colors duration-200"
          >
            <span className="link-underline">Read the FAQ</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}

function CTABackground() {
  return (
    <>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber/10 blur-[100px] rounded-[100%] pointer-events-none opacity-60" />
      
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 60% 80% at center, black 10%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 80% at center, black 10%, transparent 80%)",
        }}
      />
    </>
  );
}
