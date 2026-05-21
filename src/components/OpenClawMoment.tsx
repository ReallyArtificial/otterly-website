"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SectionReveal, StaggerReveal } from "./SectionReveal";

/**
 * §04 — the openclaw moment.
 *
 * Visual treatment preserved from the Antigravity pass (the orbiting glass
 * ring, scanning laser, incoming packets, pass / block states). Only the
 * copy has been corrected: this is not a security / inspection story — it's
 * the routing story. Anthropic cut OpenClaw off from Claude Code
 * subscriptions on Apr 4, 2026. otterly routes OpenClaw → claude CLI →
 * subscription. Two states animate: "routed via otterly" (pass) and "direct
 * path · cut off" (block), reusing the existing animation.
 */

export function OpenClawMoment() {
  return (
    <section id="openclaw" className="relative bg-[#000000] border-b border-rule py-32 md:py-48 overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPgo8L3N2Zz4=')] opacity-50" />

      <div className="relative z-10 px-6 mx-auto w-full max-w-[1320px]">
        <SectionReveal direction="up" delay={0.1}>
          <div className="eyebrow mb-8 text-ink-3">§04 · the openclaw moment</div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 md:gap-24 items-center">

          {/* Left: Routing visualization (Antigravity's Glass Gate, repurposed) */}
          <div className="order-2 lg:order-1 relative h-[450px] w-full flex items-center justify-center perspective-[1200px]">
            <RoutingRadar />
          </div>

          {/* Right: Typography */}
          <div className="order-1 lg:order-2">
            <SectionReveal direction="up" delay={0.15}>
              <blockquote className="border-l-2 border-amber pl-5 max-w-[44ch] text-white/65 text-[14px] md:text-[15px] leading-[1.6] mb-8">
                &ldquo;Claude Code subscribers can no longer use their Claude
                subscription limits for third-party harnesses including
                OpenClaw.&rdquo;
                <footer className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  <a
                    href="https://techcrunch.com/2026/04/04/anthropic-says-claude-code-subscribers-will-need-to-pay-extra-for-openclaw-support/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber transition-colors"
                  >
                    TechCrunch
                  </a>
                  , April 4, 2026
                </footer>
              </blockquote>
            </SectionReveal>

            <SectionReveal direction="up" delay={0.2}>
              <h2 className="font-display text-ink text-[clamp(28px,3.6vw,48px)] tracking-[-0.025em] leading-[1.1] text-balance mb-6 max-w-[22ch]">
                Get OpenClaw back{" "}
                <span className="text-white/55">on your subscription.</span>
              </h2>
            </SectionReveal>

            <StaggerReveal direction="up" baseDelay={0.3} staggerDelay={0.1}>
              <p className="text-[16px] md:text-[18px] leading-[1.6] text-ink-2 max-w-[480px] mb-6">
                On April 4, 2026 Anthropic cut OpenClaw off from Claude Code subscriptions. Heavy users saw bills jump up to <span className="text-ink font-semibold">50×</span>. otterly routes around the cut. Every call lands on the subscription you already pay for.
              </p>
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-4 text-ink-2 text-sm font-mono p-3 bg-white/[0.03] border border-white/5 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-[#28c840] shadow-[0_0_8px_rgba(40,200,64,0.6)]" />
                  via otterly · routed to subscription
                </div>
                <div className="flex items-center gap-4 text-ink-2 text-sm font-mono p-3 bg-white/[0.03] border border-white/5 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-red shadow-[0_0_8px_rgba(255,51,102,0.6)] animate-pulse" />
                  direct path · cut off apr 2026
                </div>
              </div>
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoutingRadar() {
  // 0: idle, 1: scanning, 2: pass (routed via otterly), 3: block (direct path, cut off)
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Animation sequencer — alternates "via otterly" (pass) and "direct path"
    // (block) to dramatize the two routes. Same visual logic as before,
    // re-skinned for the routing narrative.
    const sequence = async () => {
      while (true) {
        setStage(1); // Request inbound
        await new Promise(r => setTimeout(r, 1500));

        // Slight bias toward pass — otterly is the success state.
        const isPass = Math.random() > 0.35;
        setStage(isPass ? 2 : 3);

        await new Promise(r => setTimeout(r, 1500));
        setStage(0); // Reset
        await new Promise(r => setTimeout(r, 1000));
      }
    };
    sequence();
  }, []);

  return (
    <div className="relative w-[400px] h-[400px] transform-style-3d rotate-x-[60deg] rotate-z-[-20deg]">

      {/* Local Machine Node (Center) — the otterly endpoint */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber shadow-[0_0_60px_rgba(0,240,255,0.8)]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* The Glass Routing Ring */}
      <motion.div
        className="absolute top-[10%] left-[10%] right-[10%] bottom-[10%] rounded-full border-4 border-white/20 backdrop-blur-md"
        style={{
          boxShadow: stage === 3
            ? "inset 0 0 40px rgba(255,51,102,0.6), 0 0 60px rgba(255,51,102,0.4)"
            : stage === 2
            ? "inset 0 0 40px rgba(40,200,64,0.6), 0 0 60px rgba(40,200,64,0.4)"
            : "inset 0 0 20px rgba(255,255,255,0.1)",
          borderColor: stage === 3 ? "rgba(255,51,102,0.8)" : stage === 2 ? "rgba(40,200,64,0.8)" : "rgba(255,255,255,0.2)"
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* Routing scan */}
        <motion.div
          className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-white origin-bottom shadow-[0_0_15px_rgba(255,255,255,1)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Incoming Payload (OpenClaw request) */}
      <motion.div
        className="absolute w-6 h-6 rounded bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
        initial={{ top: "-20%", left: "50%", opacity: 0, scale: 0 }}
        animate={{
          top: stage === 1 ? "10%" : stage === 2 ? "50%" : stage === 3 ? "10%" : "-20%",
          opacity: stage === 0 ? 0 : stage === 3 ? 0 : 1, // Severed if blocked
          scale: stage === 3 ? 2 : 1,
        }}
        transition={{ duration: 0.5, ease: "circOut" }}
      />

      {/* Particle Shatter (the cut-off path) */}
      {stage === 3 && (
        <motion.div
          className="absolute top-[10%] left-[50%] w-32 h-32 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-red rounded-full shadow-[0_0_10px_rgba(255,51,102,0.8)]"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 150,
                y: (Math.random() - 0.5) * 150,
                opacity: 0,
                scale: 0
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      )}

      {/* Ripple Rings */}
      <motion.div
        className="absolute top-0 left-0 right-0 bottom-0 rounded-full border border-amber/30"
        animate={{ scale: [1, 2], opacity: [0.8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-0 left-0 right-0 bottom-0 rounded-full border border-amber/30"
        animate={{ scale: [1, 2], opacity: [0.8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 3 }}
      />
    </div>
  );
}
