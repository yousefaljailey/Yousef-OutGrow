# Outgrow — Agency Website

Marketing, advertising, and event management company in Doha, Qatar.

React 19 + TypeScript + Vite + Tailwind CSS, with two Vercel serverless
functions: `api/lead.ts` (contact-form delivery) and `api/strategy.ts`
(Gemini-powered growth-strategy widget — the API key never leaves the server).

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

The site runs fully without any environment variables: the strategy widget
serves a labeled sample preview and the contact form falls back to WhatsApp.

## Build

```bash
npm run build      # outputs dist/
npm run preview
```

## Deploy (Vercel)

Import the repo in Vercel (framework preset: Vite). The `api/` directory is
picked up automatically as serverless functions. Copy `.env.example` into the
project's Environment Variables to enable:

- **Real AI strategies** — `GEMINI_API_KEY`
- **Lead delivery** — `RESEND_API_KEY` + `LEAD_TO_EMAIL`, and/or `LEAD_WEBHOOK_URL`

See `LAUNCH.md` for the production cutover runbook.
