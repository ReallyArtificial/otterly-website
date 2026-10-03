export const GITHUB_URL = "https://github.com/ReallyArtificial/otterly";
export const NPM_URL = "https://www.npmjs.com/package/otterly";
export const VERSION = "0.4.1";

/* ----------------------------- HERO TERMINAL ----------------------------- */

export const HERO_TERMINAL = [
  "$ npx otterly serve",
  "",
  "  otterly v0.4.1",
  "  ─────────────────────────────────────",
  "  API         localhost:11434",
  "  Playground  localhost:11434/playground",
  "  Claude      claude-sonnet-4-20250514",
  "  Queue       0 / 5",
  "",
  "  Ready. Point any OpenAI client at it.",
];

/* ----------------------- THE RECEIPT — line items ----------------------- */

export const RECEIPT_LINES = [
  { label: "Input tokens, Sep",  desc: "claude-sonnet-4 · 2.4M tok",  amount: 7.20 },
  { label: "Output tokens, Sep", desc: "claude-sonnet-4 · 980K tok",  amount: 14.70 },
  { label: "Input tokens, Oct",  desc: "claude-sonnet-4 · 3.1M tok",  amount: 9.30 },
  { label: "Output tokens, Oct", desc: "claude-sonnet-4 · 1.4M tok",  amount: 21.00 },
  { label: "Input tokens, Nov",  desc: "claude-sonnet-4 · 4.6M tok",  amount: 13.80 },
  { label: "Output tokens, Nov", desc: "claude-sonnet-4 · 2.1M tok",  amount: 31.50 },
  { label: "Side-project, Dec",  desc: "tiny script · ran 4,200 times", amount: 48.16 },
  { label: "Side-project, Dec",  desc: "agent demo · 312 sessions",     amount: 91.40 },
  { label: "Side-project, Jan",  desc: "weekend hack · still running…", amount: 122.05 },
  { label: "Subtotal",           desc: "while also paying $20/mo for Claude Code", amount: 359.11 },
];

/* ----------------------- THE THREE MODES — horizontal ----------------------- */

export const MODES = [
  {
    number: "01",
    title: "As a library",
    kicker: "Import. Call. Done.",
    blurb:
      "Drop otterly into any Node script. Runs in-process: no daemon, no port, no network. Perfect for agents, build tools, and weekend hacks.",
    code: `import { claude } from "otterly";

const result = await claude.run(
  "Fix the failing tests in ./app",
  { cwd: "./app" }
);

console.log(result.text);
console.log(result.cost);   // tracked from your subscription
console.log(result.tools);  // every tool Claude used`,
  },
  {
    number: "02",
    title: "As a server",
    kicker: "Like ollama serve, but Claude.",
    blurb:
      "One command spins up an OpenAI-compatible server on localhost:11434. Same port as Ollama. Point any tool, any language, any SDK at it. Designed for your own machine. Running it on a server or sharing it with a team has nuances; read the FAQ first.",
    code: `$ npx otterly serve

  otterly v0.4.1
  ─────────────────────────────────────
  API         localhost:11434
  Playground  localhost:11434/playground

  Ready. Point any OpenAI client at it.

# now from anywhere:
$ curl localhost:11434/v1/chat/completions \\
    -d '{"model":"claude-sonnet-4-20250514", ...}'`,
  },
  {
    number: "03",
    title: "As embedded",
    kicker: "Inside your own app.",
    blurb:
      "Run the full HTTP + WebSocket server programmatically from your own Node process. Bundle it into Electron, Tauri, a CLI, a dev tool: anything.",
    code: `import { startApiServer } from "otterly";

const handle = await startApiServer({
  port: 11434,
  workingDir: "./my-project",
  maxConcurrent: 5,
});

// handle.server, handle.wss, handle.port
// handle.shutdown(10_000) for graceful drain`,
  },
] as const;

