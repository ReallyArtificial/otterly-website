"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki/bundle/web";

export function CodeCard({ code, language = "typescript" }: { code: string, language?: string }) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    async function highlight() {
      try {
        const result = await codeToHtml(code, {
          lang: language,
          theme: "vitesse-dark",
        });
        setHtml(result);
      } catch (e) {
        console.error(e);
        // Fallback
        setHtml(`<pre><code>${code}</code></pre>`);
      }
    }
    highlight();
  }, [code, language]);

  return (
    <div className="relative group/card cursor-default">
      {/* Proximity hover glow */}
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-[10px] bg-amber/0 group-hover/card:bg-amber/10 group-hover/card:blur-2xl transition-all duration-700 ease-out"
      />
      {/* Inner card with tilt hover */}
      <div className="bg-[#000000] text-ink rounded-[10px] border border-white/10 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover/card:scale-[1.01] group-hover/card:-translate-y-1">
        {/* Terminal Chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
            example
          </span>
        </div>
        
        {/* Code Content */}
        <div className="px-5 py-5 overflow-x-auto">
          {html ? (
            <div 
              className="font-mono text-[12.5px] leading-[1.7] text-ink-2 shiki-container" 
              dangerouslySetInnerHTML={{ __html: html }} 
            />
          ) : (
            <pre className="font-mono text-[12.5px] leading-[1.7] text-ink-2 whitespace-pre">
              {code}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
