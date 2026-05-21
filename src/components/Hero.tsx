"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CopyPill } from "./CopyButton";
import { GITHUB_URL, HERO_TERMINAL, VERSION } from "@/lib/constants";
import { GitHub, ArrowRight } from "@/lib/icons";

/**
 * Hero — two-panel layout.
 * LEFT: plain-words explanation of what otterly is.
 * RIGHT: a static terminal showing the actual server output, so a visitor
 *        sees the product (a running local server) within 3 seconds.
 * BOTTOM: live status strip — the personality detail, reinforces "this is
 *         a real running thing, not a marketing page."
 */
export function Hero() {
  return (
    <section className="relative min-h-[100svh] px-6 md:px-10 overflow-hidden bg-[#000000] pt-28 md:pt-32 pb-20 md:pb-24 flex flex-col justify-center">
      <HeroAmbience />

      <div className="relative z-10 mx-auto w-full max-w-[1320px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center">
          <LeftPanel />
          <RightPanel />
        </div>
      </div>

      <ServerStatusStrip />
    </section>
  );
}

/* ─────────────────────────  LEFT PANEL  ───────────────────────── */

function LeftPanel() {
  return (
    <div>
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-3 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.01] backdrop-blur-md mb-8"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/65">
          Ollama for Claude · v{VERSION}
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-white text-[clamp(34px,4.4vw,56px)] tracking-[-0.025em] leading-[1.05] mb-6 text-balance"
      >
        Your Claude subscription,
        <br />
        <span className="text-white/45">as a local API.</span>
      </motion.h1>

      {/* Plain-words explanation — two short sentences */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="text-[16px] md:text-[17px] leading-[1.65] text-white/55 mb-10 max-w-[48ch]"
      >
        Run <span className="font-mono text-white/85">npx otterly serve</span>{" "}
        on your machine. Point any OpenAI SDK at{" "}
        <span className="font-mono text-white/85">localhost:11434</span>. Free
        with your Claude Code subscription. No API key. No per-token bill.
      </motion.p>

      {/* CTA row */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
      >
        <CopyPill text="npx otterly serve" dark />
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm group transition-colors"
        >
          <GitHub className="w-4 h-4" />
          <span className="link-underline">View source</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </a>
      </motion.div>

      {/* Credibility row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/35"
      >
        <span>mit</span>
        <span className="text-white/15">·</span>
        <span>node 18+</span>
        <span className="text-white/15">·</span>
        <span>1 runtime dep</span>
        <span className="text-white/15">·</span>
        <span>port 11434</span>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────  RIGHT PANEL  ───────────────────────── */

function RightPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Soft glow under the terminal */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 blur-3xl opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(184,99,45,0.20), transparent 65%)",
        }}
      />
      <TerminalCard />
      <p className="mt-4 text-center font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/35">
        your machine · right now
      </p>
    </motion.div>
  );
}

function TerminalCard() {
  return (
    <div className="relative rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
      {/* terminal chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
          ~/your-app
        </span>
      </div>

      <pre className="px-5 py-5 font-mono text-[12.5px] md:text-[13px] leading-[1.7] text-white/85 whitespace-pre overflow-x-auto">
        {HERO_TERMINAL.map((line, i) => {
          if (line.startsWith("$ ")) {
            return (
              <span key={i}>
                <span className="text-amber-soft">$</span>
                <span className="text-white"> {line.slice(2)}</span>
                {"\n"}
              </span>
            );
          }
          if (line.includes("Ready.")) {
            return (
              <span key={i} className="text-[#7fc89f]">
                {line}
                {"\n"}
              </span>
            );
          }
          return (
            <span key={i}>
              {line}
              {"\n"}
            </span>
          );
        })}
        <span className="text-amber-soft">$</span>{" "}
        <span className="inline-block w-[7px] h-[14px] align-middle bg-white/85 animate-blink" />
      </pre>
    </div>
  );
}

/* ─────────────────────────  AMBIENT BACKGROUND  ───────────────────────── */

function HeroAmbience() {
  return (
    <>
      {/* Hairline grid, faded out to the edges */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
      {/* Warm anchor wash, anchored to the right where the terminal sits */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 900px 700px at 75% 40%, rgba(184,99,45,0.12), transparent 65%), radial-gradient(ellipse 700px 500px at 15% 80%, rgba(45,90,90,0.08), transparent 70%)",
        }}
      />
      {/* Subtle noise — gives the black some grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />
    </>
  );
}

/* ─────────────────────────  SERVER STATUS STRIP  ───────────────────────── */

function ServerStatusStrip() {
  const [latency, setLatency] = useState(4);
  const [queue, setQueue] = useState(0);
  const [reqs, setReqs] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setLatency(3 + Math.floor(Math.random() * 4));
      setQueue((q) =>
        Math.random() > 0.78 ? Math.min(3, q + 1) : Math.max(0, q - 1)
      );
      setReqs((r) => r + (Math.random() > 0.55 ? 1 : 0));
    }, 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/[0.06] bg-black/40 backdrop-blur-md"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 h-9 flex items-center justify-between gap-6 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/40">
        <div className="flex items-center gap-2.5">
          <span className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-[#28c840] opacity-50 animate-ping" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-[#28c840] shadow-[0_0_8px_rgba(40,200,64,0.5)]" />
          </span>
          <span className="text-white/65">listening</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-white/40">
          <span>
            <span className="text-white/30">:</span>11434
          </span>
          <span className="text-white/20">·</span>
          <span>claude-sonnet-4</span>
          <span className="text-white/20">·</span>
          <span className="tabular-nums">q {queue}/5</span>
          <span className="text-white/20">·</span>
          <span className="tabular-nums">μ {latency}ms</span>
          <span className="text-white/20">·</span>
          <span className="tabular-nums">
            <span className="text-white/30">req</span>{" "}
            {reqs.toString().padStart(3, "0")}
          </span>
        </div>

        <div className="text-white/35 font-mono tabular-nums">
          <span className="text-white/30 mr-2">uptime</span>0d 14h
        </div>
      </div>
    </motion.div>
  );
}
