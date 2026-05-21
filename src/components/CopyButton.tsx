"use client";

import { useState } from "react";
import { Copy, Check } from "@/lib/icons";

export function CopyButton({
  text,
  className,
  dark = false,
}: {
  text: string;
  className?: string;
  dark?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be denied */
    }
  };

  const colorClass = dark 
    ? "text-ink-3 hover:text-white" 
    : "text-ink-3 hover:text-white";

  return (
    <button
      onClick={copy}
      className={`inline-flex items-center justify-center p-1.5 transition-colors cursor-pointer rounded ${colorClass} ${className ?? ""}`}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className={`w-4 h-4 text-amber`} />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}

/** Obsidian pill — amber prefix, monospace inside. Shimmer effect applied via parent container class `shimmer-hover`. */
export function CopyPill({ text, label, dark = false }: { text: string; label?: string; dark?: boolean }) {
  const bgClass = "bg-[#000000]";
  const borderClass = "border-white/10 hover:border-amber/40";
  const textClass = "text-ink";
  const prefixClass = "text-amber";
  
  return (
    <div className={`relative inline-flex items-center gap-4 px-5 py-2.5 border ${borderClass} rounded-full font-mono text-[14.5px] ${textClass} ${bgClass} transition-colors group cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.05)]`}
      onClick={() => navigator.clipboard.writeText(text)}
    >
      <span className={`${prefixClass} select-none group-hover:opacity-80 transition-opacity`}>$</span>
      <span className="translate-y-[1px]">{label ?? text}</span>
      <CopyButton text={text} dark={dark} />
    </div>
  );
}
