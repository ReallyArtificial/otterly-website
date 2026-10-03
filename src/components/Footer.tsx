"use client";

import { GITHUB_URL, NPM_URL, VERSION } from "@/lib/constants";
import { ArrowRight } from "@/lib/icons";

export function Footer() {
  return (
    <footer className="bg-[#000000] text-ink pt-16 pb-12 px-6 md:px-10 relative overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16">
          
          {/* Logo & Info column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative group">
                {/* Cyan glow behind logo */}
                <div className="absolute inset-0 bg-amber/20 blur-md rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative font-display text-[24px] leading-none text-ink group-hover:text-white transition-colors">
                  otterly
                </span>
              </div>
              {/* Minimal swimming otter mark */}
              <svg 
                viewBox="0 0 100 40" 
                className="w-10 opacity-40 text-ink"
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M10 25 C 20 15, 45 15, 65 22 C 75 26, 82 28, 90 26" />
                <circle cx="89" cy="24" r="3" fill="currentColor" stroke="none" />
                <path d="M10 25 q -5 2 -8 -2" />
                <path d="M10 32 q 15 -3 30 0" opacity="0.5" />
              </svg>
            </div>
            <div className="text-sm text-ink-2 max-w-xs leading-relaxed">
              OpenAI-compatible local server for Claude Code.
              <a href="https://www.reallyartificial.org" className="block mt-2 hover:text-ink transition-colors">A Really Artificial project ↗</a>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3 flex items-center gap-2">
              <span>v{VERSION}</span>
              <span>·</span>
              <span>MIT License</span>
            </div>
          </div>

          {/* Links columns */}
          <div className="flex flex-wrap gap-12 md:gap-20">
            
            <div className="flex flex-col gap-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3 mb-2">
                Project
              </div>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors w-fit">
                GitHub source
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
              </a>
              <a href={NPM_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors w-fit">
                npm registry
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
              </a>
              <a href="/faq" className="group flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors w-fit">
                FAQ & Troubleshooting
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3 mb-2">
                Sections
              </div>
              <a href="#receipt" className="text-sm text-ink-2 hover:text-ink transition-colors w-fit link-underline">
                Why otterly?
              </a>
              <a href="#modes" className="text-sm text-ink-2 hover:text-ink transition-colors w-fit link-underline">
                Three modes
              </a>
              <a href="#openclaw" className="text-sm text-ink-2 hover:text-ink transition-colors w-fit link-underline">
                OpenClaw
              </a>
              <a href="#install" className="text-sm text-ink-2 hover:text-ink transition-colors w-fit link-underline">
                Installation
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
