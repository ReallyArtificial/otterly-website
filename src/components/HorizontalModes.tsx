"use client";

import { motion } from "framer-motion";
import { MODES } from "@/lib/constants";
import { SectionReveal } from "./SectionReveal";
import { CodeCard } from "./CodeCard";

export function HorizontalModes() {
  return (
    <section id="modes" className="relative bg-paper border-b border-rule py-24 md:py-32">
      <div className="px-6 md:px-10 mx-auto w-full max-w-[1320px]">
        <SectionReveal direction="up" delay={0.1}>
          <div className="eyebrow mb-6">§03 · three ways to integrate</div>
        </SectionReveal>
        
        <SectionReveal direction="up" delay={0.2}>
          <h2 className="font-display text-ink text-[clamp(28px,3.6vw,48px)] tracking-[-0.025em] leading-[1.1] text-balance mb-20 md:mb-32 max-w-[22ch]">
            Three integration shapes.{" "}
            <span className="text-ink/55">One subscription.</span>
          </h2>
        </SectionReveal>

        {/* Sticky Card Stack */}
        <div className="flex flex-col gap-8 md:gap-12 relative pb-12">
          {MODES.map((m, i) => (
            <StickyModeCard key={m.number} mode={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StickyModeCard({
  mode,
  index,
}: {
  mode: typeof MODES[number];
  index: number;
}) {
  // Mobile: 100px, 120px, 140px. Desktop: 120px, 160px, 200px
  const topOffsetDesktop = 120 + index * 40;
  const topOffsetMobile = 90 + index * 20;

  // Volumetric internal lighting
  const glows = [
    "radial-gradient(120% 120% at 50% -20%, rgba(0, 240, 255, 0.15), transparent)",
    "radial-gradient(120% 120% at 50% -20%, rgba(139, 92, 246, 0.15), transparent)",
    "radial-gradient(120% 120% at 50% -20%, rgba(255, 51, 102, 0.15), transparent)",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="sticky w-full glass-panel rounded-[24px] md:rounded-[32px] overflow-hidden"
      style={{
        top: `clamp(${topOffsetMobile}px, 15vh, ${topOffsetDesktop}px)`,
        backgroundColor: "#0a0a0c",
        backgroundImage: glows[index],
      }}
    >
      {/* Huge subtle watermark - Updated for dark mode */}
      <div className="absolute -top-16 -left-8 md:-top-32 md:-left-16 text-[200px] md:text-[360px] font-display text-ink/[0.03] leading-none select-none z-0 tracking-tighter pointer-events-none mix-blend-plus-lighter">
        {mode.number}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 p-8 md:p-14 lg:p-16 items-center">
        {/* Left — copy */}
        <div>
          <div className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-amber mb-4 md:mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
            mode {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="font-display text-ink text-[40px] md:text-[56px] leading-[1.05] mb-5">
            {mode.title}
          </h3>
          <p className="text-ink-2 text-[20px] md:text-[24px] font-medium leading-[1.3] mb-5">
            {mode.kicker}
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.65] text-ink-3 max-w-[42ch]">
            {mode.blurb}
          </p>
        </div>

        {/* Right — code */}
        <div className="relative w-full max-w-full lg:max-w-none overflow-hidden rounded-[14px] border border-rule-soft shadow-2xl">
          <CodeCard 
            code={mode.code} 
            language={mode.title === "As a server" ? "bash" : "typescript"} 
          />
        </div>
      </div>
    </motion.div>
  );
}
