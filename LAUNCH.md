# Production cutover runbook

Current state: the Vercel production deployment serves the old February
prototype from `main` (which renders a blank page — it never loads the app).
The finished site lives on this branch (`launch/v1`, built on `master`).

## Step 1 — Point production at this branch

Pick ONE of:

**Option A (no git surgery, 1 minute):** Vercel → Project → Settings →
Git → Production Branch → set to `launch/v1`. Vercel redeploys production
from this branch immediately.

**Option B (clean history going forward):** make `launch/v1` the new `main`:

```bash
git push origin launch/v1
git push origin launch/v1:main --force-with-lease
```

`main` and `master` share no git history (two separate "Initial commit"
lineages), so a regular merge/PR is not possible — the force-push replaces
the stale prototype wholesale. Afterwards, delete the leftover `master`
branch on GitHub to end the two-histories confusion:

```bash
git push origin --delete master
```

## Step 2 — Environment variables

In Vercel → Settings → Environment Variables, add the values from
`.env.example`. Minimum for launch: `RESEND_API_KEY` + `LEAD_TO_EMAIL`
(so form leads reach the inbox). `GEMINI_API_KEY` whenever ready — until
then the widget shows a labeled sample.

## Step 3 — Verify production

- Page renders (not blank), title reads "Outgrow | Advertising · PR · …"
- Submit the contact form → arrives at LEAD_TO_EMAIL / webhook
- AI widget returns a strategy (labeled "AI Analysis" once a key is set)
- View source: no `cdn.tailwindcss.com`, no API keys in any JS asset

## Recommended next

- Custom domain (e.g. `outgrowagency.com`) in Vercel → Domains
- Repo hygiene: make this repo private; it is public today
- Analytics: enable Vercel Analytics (one click) or add a GA4/Plausible tag
