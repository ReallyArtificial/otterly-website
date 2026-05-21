# otterly-website

The marketing site for **[otterly](https://github.com/josharsh/otterly)** —
the npm package that turns your Claude Code subscription into a local
OpenAI-compatible API.

Live at: [otterly.vercel.app](https://otterly.vercel.app)
(or wherever you've deployed it).

This repo is intentionally separate from the package repo so it can move
on a different cadence — marketing copy, design refinements, and Vercel
deploys shouldn't churn the package's release history.

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) for scroll choreography
- Deployed on [Vercel](https://vercel.com)

## Local development

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

```bash
npm run build       # production build
npm run start       # serve the production build
npm run lint        # eslint
```

## Project layout

```
src/
├── app/
│   ├── layout.tsx          root layout
│   ├── page.tsx            home (hero + modes + openclaw + cta)
│   ├── globals.css         design tokens, utilities
│   └── faq/                /faq route
└── components/
    ├── Hero.tsx            two-panel hero + live status strip
    ├── HorizontalModes.tsx three integration shapes (sticky cards)
    ├── OpenClawMoment.tsx  the post-April-2026 routing story
    ├── FinalCTA.tsx        install command + 3D terminal
    └── …
```

## Deploying

```bash
# first time only
vercel link

# deploy
vercel --prod
```

## License

MIT — same as the package. See [LICENSE](./LICENSE).
