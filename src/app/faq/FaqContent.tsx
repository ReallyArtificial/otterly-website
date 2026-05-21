"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GITHUB_URL } from "@/lib/constants";
import { SectionReveal, StaggerReveal } from "@/components/SectionReveal";
import { ArrowRight } from "@/lib/icons";

type FaqItem = { q: string; a: React.ReactNode };
type FaqSection = { id: string; title: string; items: FaqItem[] };

const FAQ: FaqSection[] = [
  {
    id: "what-it-is",
    title: "what otterly is",
    items: [
      {
        q: "What does otterly actually do?",
        a: (
          <>
            <p>
              It spawns the <code>claude</code> CLI installed on your machine
              and exposes its output as an OpenAI-compatible HTTP API on{" "}
              <code>localhost:11434</code>. When your app POSTs to{" "}
              <code>/v1/chat/completions</code>, otterly translates that into
              a <code>claude</code> invocation, captures the streamed
              response, and re-formats it as an OpenAI completion. Everything
              happens locally.
            </p>
            <p>
              The package itself has one runtime dependency (<code>ws</code>)
              and ships as ~45 kB. It is not a model, not a fork, not a
              proxy in the cloud, just a thin translator between two APIs
              on the same machine.
            </p>
          </>
        ),
      },
      {
        q: "So I'm using my Claude Code subscription, not the Anthropic API?",
        a: (
          <p>
            Exactly. The <code>claude</code> CLI authenticates with your
            Claude Code subscription via a browser-based login (one-time, per
            machine). Every request you route through otterly counts toward
            your subscription&apos;s usage, not the pay-per-token API, not
            the &quot;Agent SDK credit&quot; pool Anthropic introduced in
            April 2026. That&apos;s the whole pitch.
          </p>
        ),
      },
    ],
  },
  {
    id: "self-hosting",
    title: "self-hosting & deployment",
    items: [
      {
        q: "Can I run otterly on a server (EC2, Hetzner, my home box)?",
        a: (
          <>
            <p>
              Yes. otterly is a Node process listening on a TCP port, it
              runs anywhere Node 18+ runs. The catch is the one-time{" "}
              <code>claude</code> browser login. Easiest path:
            </p>
            <ol>
              <li>SSH in with interactive port forwarding.</li>
              <li>
                Run <code>claude</code> on the server. It prints a URL.
              </li>
              <li>
                Open that URL on your laptop, paste the auth code back into
                the SSH session.
              </li>
              <li>
                The token persists in <code>~/.claude/</code> and survives
                reboots.
              </li>
            </ol>
            <p>
              After that, run <code>otterly serve</code> as a systemd user
              service. Bind it to <code>127.0.0.1</code> and reach it over
              Tailscale / WireGuard / SSH-tunnel, don&apos;t expose port
              11434 to the public internet (see below).
            </p>
          </>
        ),
      },
      {
        q: "Can I run it in Docker?",
        a: (
          <>
            <p>
              Yes, with one quirk: the <code>claude</code> browser login
              won&apos;t work *inside* a fresh container. Two reasonable
              patterns:
            </p>
            <ul>
              <li>
                <strong>Mount the host token.</strong> Sign in once on the
                host, then mount <code>~/.claude/</code> into the container
                as a read-write volume.
              </li>
              <li>
                <strong>One-time interactive login in the container.</strong>{" "}
                <code>docker exec -it</code> in, run <code>claude</code>,
                complete the login. The token now lives in the container&apos;s
                <code>~/.claude/</code>. Persist that volume across restarts.
                Do <em>not</em> commit the image after login, you&apos;d be
                baking your auth into a tarball.
              </li>
            </ul>
          </>
        ),
      },
      {
        q: "If I expose otterly to the public internet, does the internet get a free Claude API?",
        a: (
          <p>
            Yes, and you will regret it. Whoever can reach the port can use
            your subscription. You will (a) blow through your rate limits in
            an afternoon, (b) violate Anthropic&apos;s ToS for individual
            subscriptions, and (c) very plausibly get your account flagged.
            otterly is built for <em>your</em> tools talking to{" "}
            <em>your</em> machine. If you want to give an agent on a remote
            box access to your subscription, tunnel it (Tailscale, WireGuard,
            SSH-port-forward), don&apos;t open port 11434 to the world.
          </p>
        ),
      },
      {
        q: "Can I put otterly behind nginx / Caddy / Cloudflare?",
        a: (
          <p>
            For your own tunneling, sure. Bind otterly to{" "}
            <code>127.0.0.1</code>, put a reverse proxy in front with HTTP
            auth + an IP allowlist (your VPN or Tailscale CIDR). Also set{" "}
            <code>OTTERLY_API_KEY</code> in the environment so otterly
            additionally requires a <code>Bearer</code> token. Belt and
            suspenders. The threat model isn&apos;t script kiddies; it&apos;s
            anyone who finds your port and burns your subscription quota.
          </p>
        ),
      },
    ],
  },
  {
    id: "sharing",
    title: "sharing & team use",
    items: [
      {
        q: "Can my team share one subscription via otterly?",
        a: (
          <>
            <p>
              Mechanically, yes. Morally / legally, no. Anthropic&apos;s
              terms for Claude Pro and Claude Max are written for{" "}
              <strong>one individual</strong>. If five teammates point their
              tools at one otterly instance running on one person&apos;s
              subscription, that&apos;s five people using a single-seat
              account. Anthropic does notice patterns like that; you can
              expect rate-limit pain at minimum and account action at worst.
            </p>
            <p>
              The right shape for a team:{" "}
              <strong>one developer, one subscription, one otterly</strong>.
              The whole package is designed around that. Don&apos;t turn it
              into a workaround for team licensing, they exist for a reason.
            </p>
          </>
        ),
      },
      {
        q: "What about a CI server using otterly?",
        a: (
          <p>
            Same line. A CI runner on your laptop or personal Mac mini using
            your subscription to power your personal projects is fine. A
            company GitHub-Actions farm burning one employee&apos;s
            subscription to run agentic tests for the whole team is not.
            Anthropic eventually sees the request patterns. If you need that,
            buy Claude for Work or use the API with the company&apos;s
            billing.
          </p>
        ),
      },
    ],
  },
  {
    id: "limits",
    title: "limits & quotas",
    items: [
      {
        q: "Do my subscription's rate limits still apply?",
        a: (
          <p>
            Fully. otterly doesn&apos;t bypass anything, it routes through
            the same authenticated <code>claude</code> CLI that you&apos;d
            use directly. If Claude Code throws a rate-limit, otterly returns
            the same error to your app formatted as an OpenAI{" "}
            <code>429</code>.
          </p>
        ),
      },
      {
        q: "Does the Agent SDK credit pool tick when I use otterly?",
        a: (
          <p>
            No. The Agent SDK credit pool is charged only when third-party
            tools use Anthropic&apos;s <em>API</em> via the Agent SDK flow.
            otterly spawns the local <code>claude</code> CLI, which
            authenticates against your Claude Code subscription, a different
            path. You can verify this by watching the Agent SDK credits row
            on your Anthropic dashboard while otterly serves traffic. It
            doesn&apos;t move.
          </p>
        ),
      },
      {
        q: "What about Claude Code's own usage caps?",
        a: (
          <p>
            Whatever Claude Code enforces, otterly inherits. Pro, Max-$100,
            Max-$200, your tier&apos;s message and compute limits apply
            exactly as they would if you were typing in Claude Code yourself.
            If you hammer otterly 24/7 with an agent, you&apos;ll hit those
            ceilings faster than you would as a human user. That&apos;s a
            usage-pattern thing, not an otterly thing.
          </p>
        ),
      },
    ],
  },
  {
    id: "compat",
    title: "compatibility",
    items: [
      {
        q: "Which Claude models can I use?",
        a: (
          <p>
            Whatever your subscription includes. As of May 2026 that means
            Sonnet 4.x, Opus 4.x, and Haiku 4.x, pass the model id in the{" "}
            <code>model</code> field of your OpenAI request and otterly
            forwards it to the CLI. Ask for a model your subscription doesn&apos;t
            include and you&apos;ll get an error from Claude, not from otterly.
          </p>
        ),
      },
      {
        q: "Does it support streaming?",
        a: (
          <p>
            Yes. Set <code>stream: true</code> on the OpenAI request and
            you&apos;ll get SSE chunks back. There&apos;s also a native
            NDJSON streaming endpoint at <code>/api/stream</code> with
            richer event types (<code>text_delta</code>,{" "}
            <code>tool_use</code>, <code>tool_result</code>, etc.) if you
            want them.
          </p>
        ),
      },
      {
        q: "Function calling / tool use?",
        a: (
          <p>
            Partial. The library mode (<code>claude.run</code>,{" "}
            <code>claude.stream</code>) exposes Claude Code&apos;s tool calls
            (<code>Read</code>, <code>Edit</code>, <code>Bash</code>, …)
            directly in the result. The OpenAI-compatible endpoint translates
            them to OpenAI function-call format on a best-effort basis.
            Round-tripping complex tool orchestration from clients that
            aren&apos;t Claude-aware isn&apos;t guaranteed. If you hit a gap,
            file an issue with the request/response.
          </p>
        ),
      },
      {
        q: "Vision / image input?",
        a: (
          <p>
            Not yet. The <code>claude</code> CLI accepts images but otterly
            doesn&apos;t pipe them through <code>/v1/chat/completions</code>{" "}
            at this point. On the roadmap.
          </p>
        ),
      },
      {
        q: "Which tools have you actually tested it with?",
        a: (
          <p>
            OpenAI SDK (Node + Python), Cursor, Continue.dev, Aider, raw{" "}
            <code>curl</code>, OpenClaw. If yours isn&apos;t on that list and
            you try it, please open an issue with the result, we&apos;ll add
            a recipe if it&apos;s common.
          </p>
        ),
      },
    ],
  },
  {
    id: "privacy",
    title: "privacy & security",
    items: [
      {
        q: "Does otterly send anything to a third party?",
        a: (
          <p>
            No. There is no telemetry, no analytics, no &quot;phone
            home.&quot; Your prompts go from your app to otterly to the{" "}
            <code>claude</code> CLI to Anthropic, exactly the path your
            requests would take if you used Claude Code directly. otterly
            itself adds zero network hops.
          </p>
        ),
      },
      {
        q: "What does it log?",
        a: (
          <p>
            When run as a server, otterly logs HTTP method, path, status, and
            duration to stdout. No prompt bodies. Library mode logs nothing.
            The source is on GitHub, verify it.
          </p>
        ),
      },
      {
        q: "Auth?",
        a: (
          <p>
            By default, none, designed for binding to{" "}
            <code>127.0.0.1</code>. Set <code>OTTERLY_API_KEY</code> in the
            environment and otterly will require a <code>Bearer</code> header
            on every route. Use this whenever you bind to anything other than
            loopback.
          </p>
        ),
      },
    ],
  },
  {
    id: "legal",
    title: "legal & longevity",
    items: [
      {
        q: "Is this allowed by Anthropic's ToS?",
        a: (
          <p>
            For personal use of your own subscription on your own machines.
            yes. You&apos;re calling Anthropic&apos;s API through the same
            authenticated session Claude Code uses; the request comes from
            your account. For team sharing or public exposure, you&apos;re in
            violation. We&apos;re not lawyers; read your subscription terms.
          </p>
        ),
      },
      {
        q: "What if Anthropic decides this isn't okay and breaks the CLI?",
        a: (
          <p>
            If Anthropic changes the <code>claude</code> CLI&apos;s output or
            invocation contract, otterly breaks until it&apos;s rewritten
            against the new interface, or until it&apos;s sunset. The good
            news: the CLI is Anthropic&apos;s own paid product used by tens
            of thousands of customers, so silent breaking changes are
            unlikely. If something does break, the package is MIT-licensed
            and small, open a PR.
          </p>
        ),
      },
      {
        q: "Will I get banned?",
        a: (
          <p>
            Not for personal use within your subscription&apos;s normal
            limits. If you publicly expose otterly, or use one subscription
            to power a team, or run an always-on agent that hammers the
            quota, yes, eventually. Be a normal user. otterly is a
            convenience layer, not a quota-laundering tool.
          </p>
        ),
      },
      {
        q: "Did otterly need to change when Anthropic's policy shifted in April 2026?",
        a: (
          <p>
            No. otterly was already routing through the local{" "}
            <code>claude</code> CLI, which uses the Claude Code subscription
            directly, not the Agent SDK credit flow Anthropic invented and
            then half-walked-back. That&apos;s why the package is{" "}
            <em>more</em> useful now than before the policy change.
          </p>
        ),
      },
    ],
  },
];

export function FaqContent() {
  const [activeId, setActiveId] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll spy for TOC and Scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const observer = new IntersectionObserver(
      (entries) => {
        let maxVisibility = 0;
        let mostVisibleId = activeId;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxVisibility) {
            maxVisibility = entry.intersectionRatio;
            mostVisibleId = entry.target.id;
          }
        });
        
        if (mostVisibleId) {
          setActiveId(mostVisibleId);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const sections = document.querySelectorAll("div[data-faq-section]");
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [activeId]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <main className="relative bg-paper">
        <FaqHeader activeId={activeId} />
        <FaqBody />
        <FaqClosing />
      </main>
      <Footer />
      
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center bg-ink text-paper rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 transition-transform"
            aria-label="Scroll to top"
          >
            <span className="text-[18px] mb-1">↑</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function FaqHeader({ activeId }: { activeId: string }) {
  return (
    <section className="relative px-6 md:px-10 pt-32 md:pt-44 pb-16 border-b border-rule">
      <div className="mx-auto max-w-[1080px]">
        <SectionReveal direction="up" delay={0.1}>
          <div className="eyebrow mb-6">questions, answered honestly</div>
        </SectionReveal>
        
        <SectionReveal direction="up" delay={0.2}>
          <h1 className="font-display text-ink text-[clamp(42px,5.5vw,84px)] leading-[1.02] max-w-[18ch] text-balance">
            The things our friends keep asking.
          </h1>
        </SectionReveal>
        
        <SectionReveal direction="up" delay={0.3}>
          <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.6] text-ink-2">
            otterly is a small, opinionated package with a specific scope. The
            questions below cover what it does, what it doesn&apos;t, and where
            the lines are, especially around deployment and team use, because
            that&apos;s where people&apos;s assumptions tend to outrun reality.
          </p>
        </SectionReveal>

        {/* table of contents */}
        <SectionReveal direction="up" delay={0.4}>
          <nav className="mt-12 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
            {FAQ.map((s, i) => {
              const isActive = activeId === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`hover:text-ink transition-colors relative ${isActive ? "text-amber font-semibold" : ""}`}
                >
                  §{String(i + 1).padStart(2, "0")} {s.title}
                  {isActive && (
                    <motion.div
                      layoutId="tocIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-amber"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </SectionReveal>
      </div>
    </section>
  );
}

function FaqBody() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24">
      <div className="mx-auto max-w-[1080px] space-y-20 md:space-y-28">
        {FAQ.map((section, sectionIdx) => (
          <div key={section.id} id={section.id} data-faq-section className="scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16">
              {/* section label rail */}
              <div className="md:sticky md:top-28 md:self-start">
                <SectionReveal direction="right">
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                    §{String(sectionIdx + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-2 font-display text-ink text-[clamp(20px,2vw,28px)] leading-[1.15]">
                    {section.title}
                  </div>
                </SectionReveal>
              </div>

              {/* items */}
              <div className="space-y-4">
                {section.items.map((item, idx) => (
                  <SectionReveal key={idx} direction="up" delay={0.1 * idx}>
                    <AccordionItem q={item.q} a={item.a} defaultOpen={sectionIdx === 0 && idx === 0} />
                  </SectionReveal>
                ))}
              </div>
            </div>

            {sectionIdx < FAQ.length - 1 && (
              <div className="rule mt-20 md:mt-28" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function AccordionItem({ q, a, defaultOpen = false }: { q: string, a: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-rule group last:border-b-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-6 flex items-start justify-between gap-6 hover:bg-ink/[0.02] px-4 -mx-4 rounded-lg transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="font-display text-ink text-[clamp(20px,2.3vw,26px)] leading-[1.25] max-w-[42ch]">
          {q}
        </h3>
        <span className={`text-amber transition-transform duration-300 ease-[0.22,1,0.36,1] flex-shrink-0 mt-1.5 ${isOpen ? 'rotate-180' : ''}`}>
          ↓
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 px-4 -mx-4 max-w-[66ch] text-[16px] leading-[1.65] text-ink-2 space-y-4 faq-prose">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqClosing() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-32 border-t border-rule bg-paper-deep">
      <div className="mx-auto max-w-[800px] text-center">
        <SectionReveal direction="up" delay={0.1}>
          <div className="eyebrow mb-6 justify-center inline-flex">
            one last thing
          </div>
        </SectionReveal>
        
        <SectionReveal direction="up" delay={0.2}>
          <h2 className="font-display text-ink text-[clamp(32px,3.4vw,44px)] leading-[1.1] max-w-[28ch] mx-auto">
            Have a question we didn&apos;t answer?
          </h2>
        </SectionReveal>
        
        <SectionReveal direction="up" delay={0.3}>
          <p className="mt-5 text-[17px] leading-[1.6] text-ink-2 max-w-[52ch] mx-auto">
            Open an issue on GitHub. If multiple people ask the same thing,
            it lands here next.
          </p>
        </SectionReveal>
        
        <SectionReveal direction="up" delay={0.4}>
          <a
            href={`${GITHUB_URL}/issues/new`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 border border-ink/30 hover:border-ink rounded-full font-mono text-[13px] uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-paper transition-colors group"
          >
            open an issue
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
